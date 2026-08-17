import type { Word } from "./types";
import { shuffle } from "./shuffle";
import {
  KIND_ORDER,
  availableKinds,
  cardKey,
  type QuestionKind,
  type Unit,
} from "./units";

/**
 * Répétition espacée, système de Leitner à 6 boîtes.
 *
 * Un mot juste monte d'une boîte (intervalle plus long), un mot raté redescend.
 * Les intervalles sont calibrés pour un usage quotidien court : de « dans 10
 * minutes » (même session) à « dans deux mois » pour un mot bien ancré.
 *
 * L'unité planifiée est le couple **(mot, type de question)** — voir `units.ts`.
 * C'est ce qui garantit qu'on retravaille la facette qu'on rate, et non celle
 * qu'on maîtrise déjà.
 */

export const BOX_COUNT = 6;

/** Version du format stocké. 1 = une carte par mot, 2 = une carte par facette. */
export const SRS_VERSION = 2;

/** Intervalle avant la prochaine révision, en minutes, par boîte. */
const INTERVALS_MIN = [
  10, // boîte 0 — revient dans la même session
  60 * 24, // 1 jour
  60 * 24 * 3, // 3 jours
  60 * 24 * 7, // 1 semaine
  60 * 24 * 21, // 3 semaines
  60 * 24 * 60, // 2 mois
];

export const BOX_LABELS = ["Nouveau", "1 jour", "3 jours", "1 semaine", "3 semaines", "2 mois"];

/** À partir de cette boîte, la facette est considérée comme acquise. */
const KNOWN_BOX = 3;

/** Un historique de deux ans suffit largement aux graphiques et à la série. */
const HISTORY_KEEP_DAYS = 730;

export interface CardState {
  box: number;
  /** Timestamp de la prochaine révision */
  due: number;
  seen: number;
  correct: number;
  /** Nombre de fois où la facette a été oubliée après avoir été sue */
  lapses: number;
  last: number;
}

export interface SrsData {
  /** Clé : `${wordId}|${kind}` — voir `cardKey`. */
  cards: Record<string, CardState>;
  /** Nombre de révisions par jour, clé "YYYY-MM-DD" */
  history: Record<string, number>;
  version: number;
}

export const EMPTY_SRS: SrsData = { cards: {}, history: {}, version: SRS_VERSION };

export function todayKey(d: Date = new Date()): string {
  // Date locale (pas UTC) : la « journée » doit correspondre à celle de l'utilisateur.
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function nextDue(box: number, now: number): number {
  const minutes = INTERVALS_MIN[Math.min(box, INTERVALS_MIN.length - 1)];
  return now + minutes * 60_000;
}

/** Retire les jours trop anciens pour être encore affichés ou comptés. */
export function pruneHistory(
  history: Record<string, number>,
  now = Date.now()
): Record<string, number> {
  const cutoff = todayKey(new Date(now - HISTORY_KEEP_DAYS * 86_400_000));
  const out: Record<string, number> = {};
  for (const [day, count] of Object.entries(history)) {
    if (day >= cutoff) out[day] = count;
  }
  return out;
}

/** Applique une réponse à une facette et renvoie la nouvelle donnée SRS. */
export function gradeCard(
  data: SrsData,
  wordId: string,
  kind: QuestionKind,
  correct: boolean,
  now = Date.now()
): SrsData {
  const key = cardKey(wordId, kind);
  const prev = data.cards[key];
  const wasKnown = (prev?.box ?? 0) >= 2;

  const box = correct
    ? Math.min((prev?.box ?? 0) + 1, BOX_COUNT - 1)
    : // Un oubli ne renvoie pas tout à zéro : on redescend de deux crans.
      Math.max((prev?.box ?? 0) - 2, 0);

  const card: CardState = {
    box,
    due: nextDue(box, now),
    seen: (prev?.seen ?? 0) + 1,
    correct: (prev?.correct ?? 0) + (correct ? 1 : 0),
    lapses: (prev?.lapses ?? 0) + (!correct && wasKnown ? 1 : 0),
    last: now,
  };

  const day = todayKey(new Date(now));
  return {
    ...data,
    cards: { ...data.cards, [key]: card },
    history: { ...data.history, [day]: (data.history[day] ?? 0) + 1 },
  };
}

export interface SessionPlan {
  units: Unit[];
  /** Unités arrivées à échéance dans tout le vocabulaire */
  dueCount: number;
  /** Unités encore jamais posées */
  newCount: number;
}

/**
 * Compose une session : d'abord les facettes à réviser (les plus en retard),
 * puis des facettes neuves pour compléter. Mélangé pour éviter l'effet de liste.
 *
 * Une seule facette neuve par mot et par session : on découvre un mot par son
 * sens, et ses autres facettes (pluriel, déclinaison, écriture) arrivent aux
 * sessions suivantes. Découvrir cinq facettes du même mot d'un coup n'apprend
 * rien — on les répète de mémoire immédiate, pas de mémoire durable.
 */
export function buildSession(
  data: SrsData,
  pool: Word[],
  limit = 20,
  now = Date.now(),
  maxNew = limit
): SessionPlan {
  const due: Unit[] = [];
  /** Une entrée par mot : sa facette neuve la plus élémentaire. */
  const fresh: Unit[] = [];
  let freshTotal = 0;

  for (const word of pool) {
    let firstUnseen: QuestionKind | null = null;
    for (const kind of availableKinds(word)) {
      const card = data.cards[cardKey(word.id, kind)];
      if (!card) {
        freshTotal++;
        // KIND_ORDER va du plus élémentaire au plus exigeant : on prend le premier.
        if (!firstUnseen) firstUnseen = kind;
      } else if (card.due <= now) {
        due.push({ word, kind });
      }
    }
    if (firstUnseen) fresh.push({ word, kind: firstUnseen });
  }

  // Les plus en retard d'abord.
  due.sort(
    (a, b) =>
      (data.cards[cardKey(a.word.id, a.kind)]?.due ?? 0) -
      (data.cards[cardKey(b.word.id, b.kind)]?.due ?? 0)
  );

  const newAllowance = Math.min(maxNew, Math.max(0, limit - due.length));
  const picked = [
    ...due.slice(0, limit - Math.min(newAllowance, fresh.length)),
    ...shuffle(fresh).slice(0, newAllowance),
  ];

  return { units: shuffle(picked), dueCount: due.length, newCount: freshTotal };
}

export type WordStatus = "untouched" | "learning" | "known" | "mastered";

export interface WordState {
  status: WordStatus;
  /** Palier de la facette la plus faible ; -1 si une facette n'a jamais été vue. */
  weakestBox: number;
  seenKinds: number;
  totalKinds: number;
}

/**
 * État d'un mot, déduit de ses facettes.
 *
 * C'est la facette la plus faible qui décide : tant qu'on ne sait pas décliner
 * *der Auftrag*, on ne « maîtrise » pas le mot, même si sa traduction est
 * acquise depuis deux mois. Une facette jamais posée compte comme un maillon
 * manquant, pas comme un acquis.
 */
export function wordState(data: SrsData, word: Word): WordState {
  const kinds = availableKinds(word);
  let weakest = Infinity;
  let seenKinds = 0;

  for (const kind of kinds) {
    const card = data.cards[cardKey(word.id, kind)];
    if (card) seenKinds++;
    weakest = Math.min(weakest, card ? card.box : -1);
  }

  const weakestBox = kinds.length === 0 ? -1 : weakest;
  const status: WordStatus =
    seenKinds === 0
      ? "untouched"
      : weakestBox >= BOX_COUNT - 1
        ? "mastered"
        : weakestBox >= KNOWN_BOX
          ? "known"
          : "learning";

  return { status, weakestBox, seenKinds, totalKinds: kinds.length };
}

export interface SrsStats {
  /** Mots */
  total: number;
  untouched: number;
  learning: number;
  known: number;
  mastered: number;
  /** Facettes */
  unitsTotal: number;
  unitsSeen: number;
  /** Facettes arrivées à échéance, et facettes encore jamais posées */
  dueNow: number;
  newUnits: number;
  reviewedToday: number;
  streakDays: number;
  accuracy: number | null;
}

export function computeStats(data: SrsData, pool: Word[], now = Date.now()): SrsStats {
  let learning = 0;
  let known = 0;
  let mastered = 0;
  let untouched = 0;
  let unitsTotal = 0;
  let unitsSeen = 0;
  let dueNow = 0;
  let newUnits = 0;
  let seen = 0;
  let correct = 0;

  for (const word of pool) {
    for (const kind of availableKinds(word)) {
      unitsTotal++;
      const card = data.cards[cardKey(word.id, kind)];
      if (!card) {
        newUnits++;
        continue;
      }
      unitsSeen++;
      seen += card.seen;
      correct += card.correct;
      if (card.due <= now) dueNow++;
    }

    switch (wordState(data, word).status) {
      case "untouched":
        untouched++;
        break;
      case "learning":
        learning++;
        break;
      case "known":
        known++;
        break;
      case "mastered":
        mastered++;
        break;
    }
  }

  return {
    total: pool.length,
    untouched,
    learning,
    known,
    mastered,
    unitsTotal,
    unitsSeen,
    dueNow,
    newUnits,
    reviewedToday: data.history[todayKey(new Date(now))] ?? 0,
    streakDays: computeStreak(data.history, new Date(now)),
    accuracy: seen > 0 ? correct / seen : null,
  };
}

/** Nombre de jours consécutifs avec au moins une révision (aujourd'hui ou hier compte comme vivant). */
export function computeStreak(history: Record<string, number>, now = new Date()): number {
  const cursor = new Date(now);
  // Si rien aujourd'hui, la série peut encore être vivante depuis hier.
  if (!history[todayKey(cursor)]) {
    cursor.setDate(cursor.getDate() - 1);
    if (!history[todayKey(cursor)]) return 0;
  }
  let streak = 0;
  while (history[todayKey(cursor)]) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

/** Décalage appliqué aux facettes reconstituées, pour ne pas toutes les faire échoir ensemble. */
const MIGRATION_SPREAD_MS = 6 * 3_600_000;

function isCardState(v: unknown): v is CardState {
  if (!v || typeof v !== "object") return false;
  const c = v as Record<string, unknown>;
  return (
    typeof c.box === "number" &&
    typeof c.due === "number" &&
    typeof c.seen === "number" &&
    typeof c.correct === "number"
  );
}

/**
 * Relit une sauvegarde, quelle que soit sa version, et la ramène au format courant.
 *
 * En version 1, une seule carte portait tout un mot : on ne sait donc pas quelle
 * facette avait réellement été travaillée. On recopie le palier sur toutes les
 * facettes du mot — perdre la progression d'un an serait pire qu'un crédit un
 * peu généreux, et la première erreur remettra la facette faible à sa place.
 * Les compteurs `seen`/`correct`, eux, restent sur une seule facette : les
 * dupliquer fausserait le taux de réussite global.
 */
export function migrate(raw: unknown, pool: Word[], now = Date.now()): SrsData {
  if (!raw || typeof raw !== "object") return EMPTY_SRS;
  const parsed = raw as Partial<SrsData>;

  const history: Record<string, number> = {};
  if (parsed.history && typeof parsed.history === "object") {
    for (const [day, count] of Object.entries(parsed.history)) {
      if (/^\d{4}-\d{2}-\d{2}$/.test(day) && typeof count === "number" && count >= 0) {
        history[day] = count;
      }
    }
  }

  const rawCards =
    parsed.cards && typeof parsed.cards === "object"
      ? (parsed.cards as Record<string, unknown>)
      : {};

  const clean: Record<string, CardState> = {};
  const sanitize = (c: CardState): CardState => ({
    box: Math.max(0, Math.min(BOX_COUNT - 1, Math.round(c.box))),
    due: c.due,
    seen: Math.max(0, Math.round(c.seen)),
    correct: Math.max(0, Math.round(c.correct)),
    lapses: Math.max(0, Math.round(typeof c.lapses === "number" ? c.lapses : 0)),
    last: typeof c.last === "number" ? c.last : now,
  });

  if (parsed.version === SRS_VERSION) {
    for (const [key, card] of Object.entries(rawCards)) {
      if (isCardState(card)) clean[key] = sanitize(card);
    }
    return { cards: clean, history: pruneHistory(history, now), version: SRS_VERSION };
  }

  // — Version 1 : une carte par mot, à répartir sur ses facettes —
  const byId = new Map(pool.map((w) => [w.id, w]));
  for (const [wordId, card] of Object.entries(rawCards)) {
    if (!isCardState(card)) continue;
    const word = byId.get(wordId);
    if (!word) continue; // mot retiré du vocabulaire depuis

    const base = sanitize(card);
    availableKinds(word).forEach((kind, i) => {
      clean[cardKey(wordId, kind)] =
        i === 0
          ? base
          : { ...base, due: base.due + i * MIGRATION_SPREAD_MS, seen: 0, correct: 0, lapses: 0 };
    });
  }

  return { cards: clean, history: pruneHistory(history, now), version: SRS_VERSION };
}

/** Ordre d'affichage des facettes d'un mot. Réexporté pour l'interface. */
export { KIND_ORDER };
