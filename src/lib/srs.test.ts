import { strictEqual } from "node:assert/strict";
import { describe, it } from "node:test";
import {
  BOX_COUNT,
  EMPTY_SRS,
  SRS_VERSION,
  buildSession,
  computeStats,
  computeStreak,
  gradeCard,
  migrate,
  pruneHistory,
  todayKey,
  wordState,
  type SrsData,
} from "./srs";
import { availableKinds, cardKey } from "./units";
import type { Word } from "./types";

const DAY = 86_400_000;
const NOW = Date.UTC(2026, 0, 15, 12, 0, 0);

const noun = (id: string, extra: Partial<Word> = {}): Word => ({
  id,
  de: id,
  fr: id,
  category: "lager",
  kind: "noun",
  artikel: "der",
  plural: `${id}e`,
  ...extra,
});

/** Un mot volontairement simple : deux facettes seulement, faciles à saturer. */
const phrase = (id: string): Word => ({
  id,
  de: id,
  fr: id,
  category: "wendungen",
  kind: "phrase",
});

describe("gradeCard", () => {
  it("fait monter d'une boîte sur une bonne réponse", () => {
    const data = gradeCard(EMPTY_SRS, "a", "de-fr", true, NOW);
    strictEqual(data.cards["a|de-fr"].box, 1);
    strictEqual(data.cards["a|de-fr"].correct, 1);
    strictEqual(data.cards["a|de-fr"].seen, 1);
  });

  it("plafonne à la dernière boîte", () => {
    let data: SrsData = EMPTY_SRS;
    for (let i = 0; i < 20; i++) data = gradeCard(data, "a", "de-fr", true, NOW);
    strictEqual(data.cards["a|de-fr"].box, BOX_COUNT - 1);
  });

  it("redescend de deux crans sur un oubli, sans repartir de zéro", () => {
    let data: SrsData = EMPTY_SRS;
    for (let i = 0; i < 4; i++) data = gradeCard(data, "a", "de-fr", true, NOW);
    strictEqual(data.cards["a|de-fr"].box, 4);
    data = gradeCard(data, "a", "de-fr", false, NOW);
    strictEqual(data.cards["a|de-fr"].box, 2);
  });

  it("ne descend jamais sous zéro", () => {
    const data = gradeCard(EMPTY_SRS, "a", "de-fr", false, NOW);
    strictEqual(data.cards["a|de-fr"].box, 0);
  });

  it("ne compte un oubli que sur une facette qui était sue", () => {
    let data = gradeCard(EMPTY_SRS, "a", "de-fr", false, NOW);
    strictEqual(data.cards["a|de-fr"].lapses, 0);

    data = EMPTY_SRS;
    for (let i = 0; i < 3; i++) data = gradeCard(data, "a", "de-fr", true, NOW);
    data = gradeCard(data, "a", "de-fr", false, NOW);
    strictEqual(data.cards["a|de-fr"].lapses, 1);
  });

  it("échelonne les intervalles : boîte 0 dans la même session, boîte 5 dans deux mois", () => {
    const first = gradeCard(EMPTY_SRS, "a", "de-fr", false, NOW);
    strictEqual(first.cards["a|de-fr"].due - NOW, 10 * 60_000);

    let data: SrsData = EMPTY_SRS;
    for (let i = 0; i < 5; i++) data = gradeCard(data, "a", "de-fr", true, NOW);
    strictEqual(data.cards["a|de-fr"].due - NOW, 60 * DAY);
  });

  /**
   * Le cœur de la refonte : deux facettes du même mot vivent séparément.
   * Auparavant, savoir traduire un mot repoussait aussi sa déclinaison.
   */
  it("n'affecte que la facette notée", () => {
    const data = gradeCard(EMPTY_SRS, "auftrag", "de-fr", true, NOW);
    strictEqual(data.cards["auftrag|de-fr"].box, 1);
    strictEqual(data.cards["auftrag|declension"], undefined);
  });

  it("incrémente le compteur du jour", () => {
    let data = gradeCard(EMPTY_SRS, "a", "de-fr", true, NOW);
    data = gradeCard(data, "b", "de-fr", false, NOW);
    strictEqual(data.history[todayKey(new Date(NOW))], 2);
  });
});

describe("wordState", () => {
  const word = phrase("x"); // deux facettes : de-fr et fr-de

  it("« jamais vu » tant qu'aucune facette n'a été posée", () => {
    strictEqual(wordState(EMPTY_SRS, word).status, "untouched");
  });

  it("reste « en cours » tant qu'une facette manque à l'appel", () => {
    let data: SrsData = EMPTY_SRS;
    for (let i = 0; i < 6; i++) data = gradeCard(data, "x", "de-fr", true, NOW);
    const state = wordState(data, word);
    strictEqual(state.status, "learning");
    strictEqual(state.seenKinds, 1);
    strictEqual(state.totalKinds, 2);
  });

  it("n'est « maîtrisé » que lorsque toutes les facettes le sont", () => {
    let data: SrsData = EMPTY_SRS;
    for (let i = 0; i < 6; i++) {
      data = gradeCard(data, "x", "de-fr", true, NOW);
      data = gradeCard(data, "x", "fr-de", true, NOW);
    }
    strictEqual(wordState(data, word).status, "mastered");
  });

  /** Un oubli fait redescendre de deux boîtes : 5 → 3, soit « acquis ». */
  it("perd la maîtrise dès qu'une seule facette est ratée", () => {
    let data: SrsData = EMPTY_SRS;
    for (let i = 0; i < 6; i++) {
      data = gradeCard(data, "x", "de-fr", true, NOW);
      data = gradeCard(data, "x", "fr-de", true, NOW);
    }
    data = gradeCard(data, "x", "fr-de", false, NOW);
    strictEqual(wordState(data, word).status, "known");
  });

  it("retombe en « en cours » quand une facette s'effondre", () => {
    let data: SrsData = EMPTY_SRS;
    for (let i = 0; i < 6; i++) {
      data = gradeCard(data, "x", "de-fr", true, NOW);
      data = gradeCard(data, "x", "fr-de", true, NOW);
    }
    data = gradeCard(data, "x", "fr-de", false, NOW);
    data = gradeCard(data, "x", "fr-de", false, NOW);
    strictEqual(wordState(data, word).status, "learning");
  });
});

describe("buildSession", () => {
  const pool = [noun("a"), noun("b"), noun("c")];

  it("n'introduit qu'une facette neuve par mot et par session", () => {
    const plan = buildSession(EMPTY_SRS, pool, 20, NOW);
    strictEqual(plan.units.length, 3);
    strictEqual(new Set(plan.units.map((u) => u.word.id)).size, 3);
  });

  it("découvre un mot par son sens avant tout le reste", () => {
    const plan = buildSession(EMPTY_SRS, pool, 20, NOW);
    strictEqual(
      plan.units.every((u) => u.kind === "de-fr"),
      true
    );
  });

  it("compte toutes les facettes encore jamais posées", () => {
    const plan = buildSession(EMPTY_SRS, pool, 20, NOW);
    const total = pool.reduce((n, w) => n + availableKinds(w).length, 0);
    strictEqual(plan.newCount, total);
  });

  it("respecte la longueur demandée", () => {
    const big = Array.from({ length: 50 }, (_, i) => noun(`w${i}`));
    strictEqual(buildSession(EMPTY_SRS, big, 10, NOW).units.length, 10);
  });

  it("sert d'abord ce qui est arrivé à échéance", () => {
    let data = gradeCard(EMPTY_SRS, "a", "de-fr", false, NOW - DAY);
    data = gradeCard(data, "b", "de-fr", false, NOW - DAY);
    const plan = buildSession(data, pool, 2, NOW);
    strictEqual(plan.dueCount, 2);
    strictEqual(
      plan.units.every((u) => u.kind === "de-fr" && u.word.id !== "c"),
      true
    );
  });

  it("ne ressert pas une facette qui n'est pas encore due", () => {
    const data = gradeCard(EMPTY_SRS, "a", "de-fr", true, NOW);
    const plan = buildSession(data, [pool[0]], 20, NOW);
    strictEqual(
      plan.units.some((u) => u.kind === "de-fr"),
      false
    );
    // La facette suivante du mot prend le relais.
    strictEqual(plan.units[0]?.kind, "fr-de");
  });

  it("plafonne l'apport de nouveautés quand on le demande", () => {
    const big = Array.from({ length: 50 }, (_, i) => noun(`w${i}`));
    strictEqual(buildSession(EMPTY_SRS, big, 20, NOW, 5).units.length, 5);
  });

  it("ne renvoie rien sur un vocabulaire vide", () => {
    strictEqual(buildSession(EMPTY_SRS, [], 20, NOW).units.length, 0);
  });
});

describe("computeStats", () => {
  const pool = [phrase("x"), phrase("y")];

  it("part de zéro", () => {
    const stats = computeStats(EMPTY_SRS, pool, NOW);
    strictEqual(stats.total, 2);
    strictEqual(stats.untouched, 2);
    strictEqual(stats.unitsTotal, 4);
    strictEqual(stats.unitsSeen, 0);
    strictEqual(stats.newUnits, 4);
    strictEqual(stats.accuracy, null);
  });

  it("compte les facettes vues et le taux de réussite", () => {
    let data = gradeCard(EMPTY_SRS, "x", "de-fr", true, NOW);
    data = gradeCard(data, "x", "de-fr", false, NOW);
    const stats = computeStats(data, pool, NOW);
    strictEqual(stats.unitsSeen, 1);
    strictEqual(stats.accuracy, 0.5);
  });

  it("range chaque mot dans un seul état", () => {
    let data = gradeCard(EMPTY_SRS, "x", "de-fr", true, NOW);
    data = gradeCard(data, "x", "fr-de", true, NOW);
    const stats = computeStats(data, pool, NOW);
    strictEqual(stats.untouched + stats.learning + stats.known + stats.mastered, stats.total);
    strictEqual(stats.untouched, 1);
    strictEqual(stats.learning, 1);
  });

  it("compte les facettes échues, pas les mots", () => {
    let data = gradeCard(EMPTY_SRS, "x", "de-fr", false, NOW - DAY);
    data = gradeCard(data, "x", "fr-de", false, NOW - DAY);
    strictEqual(computeStats(data, pool, NOW).dueNow, 2);
  });
});

describe("computeStreak", () => {
  const key = (offset: number) => todayKey(new Date(NOW - offset * DAY));

  it("vaut zéro sans historique", () => {
    strictEqual(computeStreak({}, new Date(NOW)), 0);
  });

  it("compte les jours consécutifs", () => {
    const history = { [key(0)]: 3, [key(1)]: 5, [key(2)]: 1 };
    strictEqual(computeStreak(history, new Date(NOW)), 3);
  });

  it("reste vivante si rien n'a encore été fait aujourd'hui", () => {
    const history = { [key(1)]: 5, [key(2)]: 1 };
    strictEqual(computeStreak(history, new Date(NOW)), 2);
  });

  it("est rompue après deux jours sans rien", () => {
    const history = { [key(2)]: 5 };
    strictEqual(computeStreak(history, new Date(NOW)), 0);
  });

  it("s'arrête au premier trou", () => {
    const history = { [key(0)]: 1, [key(1)]: 1, [key(3)]: 1 };
    strictEqual(computeStreak(history, new Date(NOW)), 2);
  });
});

describe("pruneHistory", () => {
  it("garde les jours récents et jette les très anciens", () => {
    const recent = todayKey(new Date(NOW - 10 * DAY));
    const ancient = todayKey(new Date(NOW - 900 * DAY));
    const pruned = pruneHistory({ [recent]: 1, [ancient]: 1 }, NOW);
    strictEqual(pruned[recent], 1);
    strictEqual(pruned[ancient], undefined);
  });
});

describe("migrate", () => {
  const pool = [noun("auftrag"), phrase("x")];

  it("ne casse pas sur une entrée absurde", () => {
    strictEqual(migrate(null, pool, NOW).version, SRS_VERSION);
    strictEqual(migrate("bonjour", pool, NOW).version, SRS_VERSION);
    strictEqual(Object.keys(migrate({ cards: 42 }, pool, NOW).cards).length, 0);
  });

  it("laisse passer une sauvegarde déjà au format courant", () => {
    const data = gradeCard(EMPTY_SRS, "auftrag", "plural", true, NOW);
    const back = migrate(JSON.parse(JSON.stringify(data)), pool, NOW);
    strictEqual(back.cards["auftrag|plural"].box, 1);
  });

  it("écarte les cartes mal formées", () => {
    const raw = { version: SRS_VERSION, cards: { "auftrag|plural": { box: "trois" } }, history: {} };
    strictEqual(Object.keys(migrate(raw, pool, NOW).cards).length, 0);
  });

  it("borne un palier hors limites", () => {
    const raw = {
      version: SRS_VERSION,
      cards: { "auftrag|plural": { box: 99, due: NOW, seen: 1, correct: 1, lapses: 0, last: NOW } },
      history: {},
    };
    strictEqual(migrate(raw, pool, NOW).cards["auftrag|plural"].box, BOX_COUNT - 1);
  });

  describe("depuis la version 1 (une carte par mot)", () => {
    const v1 = {
      version: 1,
      cards: {
        auftrag: { box: 4, due: NOW + DAY, seen: 10, correct: 8, lapses: 1, last: NOW },
        disparu: { box: 3, due: NOW, seen: 2, correct: 2, lapses: 0, last: NOW },
      },
      history: { [todayKey(new Date(NOW))]: 12 },
    };

    it("reporte le palier sur toutes les facettes du mot", () => {
      const data = migrate(v1, pool, NOW);
      for (const kind of availableKinds(pool[0])) {
        strictEqual(data.cards[cardKey("auftrag", kind)].box, 4, kind);
      }
    });

    it("ne compte les réponses qu'une fois, pour ne pas gonfler le taux de réussite", () => {
      const data = migrate(v1, pool, NOW);
      const kinds = availableKinds(pool[0]);
      const totalSeen = kinds.reduce((n, k) => n + data.cards[cardKey("auftrag", k)].seen, 0);
      strictEqual(totalSeen, 10);
    });

    it("échelonne les échéances au lieu de tout faire échoir en même temps", () => {
      const data = migrate(v1, pool, NOW);
      const dues = availableKinds(pool[0]).map((k) => data.cards[cardKey("auftrag", k)].due);
      strictEqual(new Set(dues).size, dues.length);
    });

    it("oublie les mots retirés du vocabulaire depuis", () => {
      const data = migrate(v1, pool, NOW);
      strictEqual(
        Object.keys(data.cards).some((k) => k.startsWith("disparu|")),
        false
      );
    });

    it("conserve l'historique et la série", () => {
      const data = migrate(v1, pool, NOW);
      strictEqual(data.history[todayKey(new Date(NOW))], 12);
      strictEqual(computeStreak(data.history, new Date(NOW)), 1);
    });

    it("marque la sauvegarde au format courant", () => {
      strictEqual(migrate(v1, pool, NOW).version, SRS_VERSION);
    });
  });
});
