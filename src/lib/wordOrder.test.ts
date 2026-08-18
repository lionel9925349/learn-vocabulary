import { deepStrictEqual, strictEqual } from "node:assert/strict";
import { describe, it } from "node:test";
import {
  ORDER_PATTERNS,
  accusativePhrase,
  buildOrderExercise,
  isCorrectOrder,
  orderPatternsFor,
  sentenceOf,
} from "./wordOrder";
import type { Word } from "./types";

const noun = (de: string, artikel: Word["artikel"]): Word => ({
  id: de.toLowerCase(),
  de,
  fr: "marchandise",
  category: "lager",
  kind: "noun",
  artikel,
  plural: `${de}n`,
});

const verb = (de: string, perfekt: string, extra: Partial<Word> = {}): Word => ({
  id: de,
  de,
  fr: "livrer",
  category: "verben",
  kind: "verb",
  perfekt,
  ...extra,
});

const ware = noun("Ware", "die");
const auftrag = noun("Auftrag", "der");
const liefern = verb("liefern", "hat geliefert");
const abholen = verb("abholen", "hat abgeholt", { separable: true, praesens: "holt ab" });

const build = (pattern: Parameters<typeof buildOrderExercise>[0], v: Word, n: Word) =>
  buildOrderExercise(pattern, { verb: v, noun: n, modalIndex: 0, adverbIndex: 0 })!;

describe("accusativePhrase", () => {
  it("décline l'article à l'accusatif", () => {
    strictEqual(accusativePhrase(ware), "die Ware");
    strictEqual(accusativePhrase(auftrag), "den Auftrag");
  });

  it("renvoie null sans article", () => {
    strictEqual(accusativePhrase(liefern), null);
  });
});

describe("orderPatternsFor", () => {
  it("propose la particule séparable au seul verbe qui en a une", () => {
    strictEqual(orderPatternsFor(liefern).includes("separable"), false);
    strictEqual(orderPatternsFor(abholen).includes("separable"), true);
  });

  it("écarte les pronominaux et les locutions, dont l'ordre n'est pas unique", () => {
    deepStrictEqual(orderPatternsFor(verb("sich kümmern", "hat sich gekümmert")), []);
    deepStrictEqual(orderPatternsFor(verb("zuständig sein", "ist zuständig gewesen")), []);
  });

  it("écarte un verbe sans parfait exploitable", () => {
    deepStrictEqual(orderPatternsFor(verb("liefern", "")), []);
  });
});

describe("la parenthèse verbale", () => {
  it("parfait : auxiliaire en deuxième position, participe à la fin", () => {
    deepStrictEqual(build("perfekt", liefern, ware).solution, [
      "Wir",
      "haben",
      "die Ware",
      "geliefert",
    ]);
  });

  it("modalité : modal conjugué, verbe à l'infinitif tout à la fin", () => {
    deepStrictEqual(build("modal", liefern, ware).solution, ["Wir", "müssen", "die Ware", "liefern"]);
  });

  it("particule séparable : le radical se conjugue, la particule part à la fin", () => {
    deepStrictEqual(build("separable", abholen, ware).solution, ["Wir", "holen", "die Ware", "ab"]);
  });

  it("l'auxiliaire suit le verbe : sein reste sein", () => {
    const fahren = verb("fahren", "ist gefahren");
    strictEqual(build("perfekt", fahren, ware).solution[1], "sind");
  });
});

describe("le verbe reste en deuxième position", () => {
  it("l'adverbe en tête fait passer le sujet derrière le verbe", () => {
    deepStrictEqual(build("inversion", liefern, ware).solution, [
      "Heute",
      "liefern",
      "wir",
      "die Ware",
    ]);
  });

  /** La particule ne disparaît pas parce que la phrase commence autrement. */
  it("garde la particule séparable en fin de phrase", () => {
    deepStrictEqual(build("inversion", abholen, ware).solution, [
      "Heute",
      "holen",
      "wir",
      "die Ware",
      "ab",
    ]);
  });
});

describe("les subordonnées renvoient le verbe à la fin", () => {
  it("weil : le verbe conjugué passe derrière le participe", () => {
    const ex = build("weil", liefern, ware);
    deepStrictEqual(ex.solution, ["weil", "wir", "die Ware", "geliefert", "haben"]);
    strictEqual(sentenceOf(ex), "Wir sind im Verzug, weil wir die Ware geliefert haben.");
  });

  /**
   * Le seul endroit où la parenthèse se referme : *dass er die Ware abholt*,
   * et non *dass er die Ware holt ab*.
   */
  it("dass : la particule séparable recolle au verbe", () => {
    deepStrictEqual(build("dass", abholen, ware).solution, [
      "dass",
      "der Lieferant",
      "die Ware",
      "abholt",
    ]);
  });

  it("dass : verbe simple en dernier", () => {
    deepStrictEqual(build("dass", liefern, ware).solution, [
      "dass",
      "der Lieferant",
      "die Ware",
      "liefert",
    ]);
  });
});

describe("isCorrectOrder", () => {
  const ex = build("perfekt", liefern, ware);

  it("accepte l'ordre attendu", () => {
    strictEqual(isCorrectOrder(ex, ex.solution), true);
  });

  it("refuse un ordre différent", () => {
    strictEqual(isCorrectOrder(ex, ["Wir", "die Ware", "haben", "geliefert"]), false);
  });

  it("refuse une phrase incomplète", () => {
    strictEqual(isCorrectOrder(ex, ex.solution.slice(0, 3)), false);
  });
});

describe("sentenceOf", () => {
  it("ponctue la phrase et rappelle l'amorce", () => {
    strictEqual(sentenceOf(build("perfekt", liefern, auftrag)), "Wir haben den Auftrag geliefert.");
  });
});

describe("toutes les structures se construisent", () => {
  for (const pattern of ORDER_PATTERNS) {
    it(`${pattern} produit une phrase non vide`, () => {
      const ex = buildOrderExercise(pattern, { verb: abholen, noun: ware });
      strictEqual(ex !== null, true);
      strictEqual(ex!.solution.length >= 4, true);
      strictEqual(ex!.rule.trim().length > 0, true);
      strictEqual(
        ex!.solution.every((t) => t.trim().length > 0),
        true
      );
    });
  }
});
