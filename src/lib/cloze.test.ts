import { strictEqual } from "node:assert/strict";
import { describe, it } from "node:test";
import { BLANK, buildCloze, clozeCandidates, hasCloze, sentencesOf } from "./cloze";
import type { Word } from "./types";

const noun = (de: string, extra: Partial<Word> = {}): Word => ({
  id: de.toLowerCase(),
  de,
  fr: "",
  category: "lager",
  kind: "noun",
  artikel: "der",
  plural: null,
  ...extra,
});

describe("sentencesOf", () => {
  it("met l'exemple principal en tête", () => {
    const w = noun("Auftrag", {
      example: { de: "A", fr: "a" },
      sentences: [{ de: "B", fr: "b" }],
    });
    strictEqual(sentencesOf(w).map((s) => s.de).join(","), "A,B");
  });

  it("ne compte pas deux fois une phrase présente des deux côtés", () => {
    const w = noun("Auftrag", {
      example: { de: "A", fr: "a" },
      sentences: [{ de: "A", fr: "a" }, { de: "B", fr: "b" }],
    });
    strictEqual(sentencesOf(w).length, 2);
  });
});

describe("buildCloze", () => {
  it("remplace le mot par un trou", () => {
    const w = noun("Auftrag", {
      example: { de: "Der Auftrag ist freigegeben.", fr: "La commande est validée." },
    });
    strictEqual(buildCloze(w)?.masked, `Der ${BLANK} ist freigegeben.`);
  });

  it("conserve la phrase entière pour l'explication", () => {
    const w = noun("Auftrag", {
      example: { de: "Der Auftrag ist freigegeben.", fr: "La commande est validée." },
    });
    strictEqual(buildCloze(w)?.full, "Der Auftrag ist freigegeben.");
    strictEqual(buildCloze(w)?.fr, "La commande est validée.");
  });

  /**
   * Le mot doit figurer **littéralement**. Une particule séparable coupe le
   * verbe en deux, et une forme fléchie ne s'écrit pas comme l'entrée : dans
   * ces cas on renonce plutôt que de fabriquer une forme approximative.
   */
  it("renonce quand le mot n'apparaît pas tel quel", () => {
    strictEqual(
      buildCloze(noun("Stellplatz", { example: { de: "Alle Stellplätze sind belegt.", fr: "" } })),
      null
    );
    strictEqual(buildCloze(noun("Auftrag")), null);
  });

  /** Sans cela, « Ware » serait trouvé à l'intérieur de « Warenausgang ». */
  it("ne coupe jamais un mot plus long en deux", () => {
    const w = noun("Ware", {
      example: { de: "Der Warenausgang ist gebucht.", fr: "" },
      sentences: [{ de: "Ist die Ware eingetroffen?", fr: "" }],
    });
    strictEqual(buildCloze(w)?.masked, `Ist die ${BLANK} eingetroffen?`);
  });

  /**
   * Régression : masquer « Ware » dans *Die Ware steht im Wareneingang*
   * laissait la réponse lisible dans le composé. La question ne testait plus
   * rien — on passe donc à la phrase suivante.
   */
  it("refuse une phrase où la réponse reste lisible ailleurs", () => {
    const onlyBad = noun("Ware", {
      example: { de: "Die Ware steht im Wareneingang.", fr: "" },
    });
    strictEqual(buildCloze(onlyBad), null);

    const withFallback = noun("Ware", {
      example: { de: "Die Ware steht im Wareneingang.", fr: "" },
      sentences: [{ de: "Ist die Ware eingetroffen?", fr: "" }],
    });
    strictEqual(buildCloze(withFallback)?.masked.includes("Ware"), false);
  });

  it("hasCloze suit buildCloze", () => {
    strictEqual(hasCloze(noun("Auftrag")), false);
    strictEqual(
      hasCloze(noun("Auftrag", { example: { de: "Der Auftrag läuft.", fr: "" } })),
      true
    );
  });
});

describe("clozeCandidates", () => {
  const target = noun("Auftrag", { artikel: "der" });
  const pool: Word[] = [
    target,
    noun("Beleg", { artikel: "der" }),
    noun("Rechnung", { artikel: "die" }),
    { id: "liefern", de: "liefern", fr: "", category: "verben", kind: "verb" },
  ];

  /**
   * Un distracteur d'un autre genre se disqualifierait par l'article resté
   * dans la phrase : la question ne testerait plus le sens.
   */
  it("ne retient que les noms de même genre", () => {
    const out = clozeCandidates(target, pool).map((w) => w.de);
    strictEqual(out.includes("Beleg"), true);
    strictEqual(out.includes("Rechnung"), false);
    strictEqual(out.includes("liefern"), false);
  });

  it("n'inclut jamais le mot lui-même", () => {
    strictEqual(clozeCandidates(target, pool).some((w) => w.id === target.id), false);
  });

  it("compare par nature pour ce qui n'est pas un nom", () => {
    const verb = pool[3];
    const out = clozeCandidates(verb, pool).map((w) => w.de);
    strictEqual(out.length, 0);
  });
});
