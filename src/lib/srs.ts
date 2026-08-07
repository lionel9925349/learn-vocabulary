import type { Word } from "./types";

/**
 * Répétition espacée, système de Leitner à 6 boîtes.
 *
 * Un mot juste monte d'une boîte (intervalle plus long), un mot raté redescend.
 * Les intervalles sont calibrés pour un usage quotidien court : de « dans 10
 * minutes » (même session) à « dans deux mois » pour un mot bien ancré.
 */

export const BOX_COUNT = 6;

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

export interface CardState {
  box: number;
  /** Timestamp de la prochaine révision */
  due: number;
  seen: number;
  correct: number;
  /** Nombre de fois où le mot a été oublié après avoir été su */
  lapses: number;
  last: number;
}

export interface SrsData {
  cards: Record<string, CardState>;
  /** Nombre de révisions par jour, clé "YYYY-MM-DD" */
  history: Record<string, number>;
  version: number;
}

export const EMPTY_SRS: SrsData = { cards: {}, history: {}, version: 1 };

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

/** Applique une réponse à une carte et renvoie la nouvelle donnée SRS. */
export function gradeCard(data: SrsData, id: string, correct: boolean, now = Date.now()): SrsData {
  const prev = data.cards[id];
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
    cards: { ...data.cards, [id]: card },
    history: { ...data.history, [day]: (data.history[day] ?? 0) + 1 },
  };
}

export interface SessionPlan {
  words: Word[];
  dueCount: number;
  newCount: number;
}

/**
 * Compose une session : d'abord les mots à réviser (les plus en retard),
 * puis des mots neufs pour compléter. Mélangé pour éviter l'effet de liste.
 *
 * `maxNew` plafonne l'apport de nouveautés ; par défaut il vaut la taille de la
 * session, car c'est l'utilisateur qui a choisi combien il voulait en faire.
 */
export function buildSession(
  data: SrsData,
  pool: Word[],
  limit = 20,
  now = Date.now(),
  maxNew = limit
): SessionPlan {
  const due: Word[] = [];
  const fresh: Word[] = [];

  for (const w of pool) {
    const card = data.cards[w.id];
    if (!card) fresh.push(w);
    else if (card.due <= now) due.push(w);
  }

  // Les plus en retard d'abord.
  due.sort((a, b) => (data.cards[a.id]?.due ?? 0) - (data.cards[b.id]?.due ?? 0));

  const newAllowance = Math.min(maxNew, Math.max(0, limit - due.length));
  const picked = [...due.slice(0, limit - Math.min(newAllowance, fresh.length)), ...shuffle(fresh).slice(0, newAllowance)];

  return {
    words: shuffle(picked),
    dueCount: due.length,
    newCount: fresh.length,
  };
}

export interface SrsStats {
  total: number;
  untouched: number;
  learning: number; // boîtes 0-2
  known: number; // boîtes 3-4
  mastered: number; // boîte 5
  dueNow: number;
  reviewedToday: number;
  streakDays: number;
  accuracy: number | null;
}

export function computeStats(data: SrsData, pool: Word[], now = Date.now()): SrsStats {
  let learning = 0;
  let known = 0;
  let mastered = 0;
  let dueNow = 0;
  let seen = 0;
  let correct = 0;
  let touched = 0;

  for (const w of pool) {
    const card = data.cards[w.id];
    if (!card) continue;
    touched++;
    seen += card.seen;
    correct += card.correct;
    if (card.due <= now) dueNow++;
    if (card.box >= BOX_COUNT - 1) mastered++;
    else if (card.box >= 3) known++;
    else learning++;
  }

  return {
    total: pool.length,
    untouched: pool.length - touched,
    learning,
    known,
    mastered,
    dueNow,
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

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
