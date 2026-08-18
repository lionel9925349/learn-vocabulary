import { strictEqual } from "node:assert/strict";
import { describe, it } from "node:test";
import {
  FIXED_FRAMES,
  PREPOSITIONS,
  PREPOSITIONS_BY_GROUP,
  TWO_WAY_FRAMES,
  findPreposition,
  fixedCase,
} from "./prepositions";

describe("inventaire", () => {
  it("ne contient aucun doublon", () => {
    const all = PREPOSITIONS.map((p) => p.de);
    strictEqual(new Set(all).size, all.length);
  });

  it("range chaque préposition dans un seul groupe", () => {
    const total = Object.values(PREPOSITIONS_BY_GROUP).reduce((n, g) => n + g.length, 0);
    strictEqual(total, PREPOSITIONS.length);
  });

  it("contient les neuf Wechselpräpositionen, ni plus ni moins", () => {
    const twoWay = PREPOSITIONS_BY_GROUP["two-way"].map((p) => p.de).sort();
    strictEqual(
      twoWay.join(" "),
      ["an", "auf", "hinter", "in", "neben", "über", "unter", "vor", "zwischen"].sort().join(" ")
    );
  });

  it("donne une traduction à chacune", () => {
    for (const p of PREPOSITIONS) strictEqual(p.fr.trim().length > 0, true, p.de);
  });
});

describe("fixedCase", () => {
  it("donne le cas des prépositions à cas fixe", () => {
    strictEqual(fixedCase(findPreposition("für")!), "Akkusativ");
    strictEqual(fixedCase(findPreposition("mit")!), "Dativ");
    strictEqual(fixedCase(findPreposition("wegen")!), "Genitiv");
  });

  /** Une mixte n'a pas de cas propre : c'est le verbe qui décide. */
  it("ne tranche pas pour une Wechselpräposition", () => {
    strictEqual(fixedCase(findPreposition("in")!), null);
    strictEqual(fixedCase(findPreposition("auf")!), null);
  });
});

describe("tournures d'exercice", () => {
  it("laissent toujours une place au groupe nominal", () => {
    for (const f of TWO_WAY_FRAMES) strictEqual(f.sentence.includes("%"), true, f.sentence);
    for (const f of FIXED_FRAMES) strictEqual(f.sentence.includes("%"), true, f.sentence);
  });

  it("emploient la préposition qu'elles annoncent", () => {
    for (const f of TWO_WAY_FRAMES) {
      strictEqual(f.sentence.includes(` ${f.prep} `), true, f.sentence);
    }
  });

  /**
   * L'exercice n'a de sens que si les deux cas sont représentés : c'est le
   * choix entre eux qu'on travaille.
   */
  it("couvrent l'accusatif et le datif", () => {
    const cases = new Set(TWO_WAY_FRAMES.map((f) => f.caseName));
    strictEqual(cases.has("Akkusativ"), true);
    strictEqual(cases.has("Dativ"), true);
  });

  it("expliquent toujours pourquoi", () => {
    for (const f of TWO_WAY_FRAMES) {
      strictEqual(f.why.trim().length > 0, true, f.sentence);
      strictEqual(f.trigger.trim().length > 0, true, f.sentence);
    }
  });

  it("ne portent que sur des prépositions mixtes", () => {
    for (const f of TWO_WAY_FRAMES) {
      strictEqual(findPreposition(f.prep)?.group, "two-way", f.prep);
    }
  });

  it("les tournures à cas fixe ne portent que sur des prépositions à cas fixe", () => {
    for (const f of FIXED_FRAMES) {
      const prep = findPreposition(f.prep);
      strictEqual(prep !== undefined, true, f.prep);
      strictEqual(prep!.group === "two-way", false, f.prep);
    }
  });
});
