import { deepStrictEqual, strictEqual } from "node:assert/strict";
import { describe, it } from "node:test";
import { hasRektion, parseRektion, rektionDistractors, slotLabel } from "./rektion";
import type { Word } from "./types";

const verb = (de: string, governs?: string): Word => ({
  id: de,
  de,
  fr: "",
  category: "verben",
  kind: "verb",
  governs,
});

describe("parseRektion", () => {
  it("relève la préposition et le cas", () => {
    const r = parseRektion("an etwas (Dat.) teilnehmen");
    deepStrictEqual(r?.slots, [{ prep: "an", caseName: "Dativ", object: "etwas" }]);
  });

  it("reconnaît un verbe pronominal", () => {
    const r = parseRektion("sich um etwas (Akk.) kümmern");
    strictEqual(r?.reflexive, true);
    strictEqual(slotLabel(r!.slots[0]), "um + Akkusativ");
  });

  /**
   * Régression : la limite de mot de JavaScript est définie sur l'ASCII, donc
   * `\b` échouait devant « über ». Trois rections du vocabulaire — informieren,
   * sich beschweren, verhandeln — n'étaient jamais reconnues.
   */
  it("reconnaît une préposition commençant par une lettre accentuée", () => {
    strictEqual(slotLabel(parseRektion("über etwas (Akk.) verhandeln")!.slots[0]), "über + Akkusativ");
    strictEqual(
      slotLabel(parseRektion("jemanden (Akk.) über etwas (Akk.) informieren")!.slots[0]),
      "über + Akkusativ"
    );
  });

  it("relève les deux prépositions d'un verbe qui en régit deux", () => {
    const r = parseRektion("sich bei jemandem (Dat.) für etwas (Akk.) bedanken");
    deepStrictEqual(r?.slots.map(slotLabel), ["bei + Dativ", "für + Akkusativ"]);
  });

  it("ignore un patron sans préposition", () => {
    strictEqual(parseRektion("jemandem (Dat.) etwas (Akk.) liefern"), null);
  });

  it("ignore un mot sans patron", () => {
    strictEqual(parseRektion(undefined), null);
    strictEqual(parseRektion(""), null);
  });

  it("ignore un mot qui ressemble à une préposition sans en être une", () => {
    strictEqual(parseRektion("gerne etwas (Akk.) machen"), null);
  });
});

describe("hasRektion", () => {
  it("ne vaut que pour un verbe à rection prépositionnelle", () => {
    strictEqual(hasRektion(verb("teilnehmen", "an etwas (Dat.) teilnehmen")), true);
    strictEqual(hasRektion(verb("liefern", "jemandem (Dat.) etwas (Akk.) liefern")), false);
    strictEqual(hasRektion(verb("prüfen")), false);
  });
});

describe("rektionDistractors", () => {
  const slot = { prep: "an", caseName: "Dativ" as const, object: "etwas" };

  it("propose d'abord la même préposition avec l'autre cas", () => {
    strictEqual(rektionDistractors(slot)[0], "an + Akkusativ");
  });

  it("ne répète jamais la bonne réponse", () => {
    const correct = slotLabel(slot);
    strictEqual(rektionDistractors(slot, 3).includes(correct), false);
  });

  it("ne produit pas de doublon", () => {
    const out = rektionDistractors(slot, 3);
    strictEqual(new Set(out).size, out.length);
  });

  /**
   * Un distracteur doit être une combinaison qui **existe** : « aus + Akkusativ »
   * se disqualifierait tout seul, et n'apprendrait donc rien.
   */
  it("n'attribue à une préposition qu'un cas qu'elle peut régir", () => {
    const out = rektionDistractors({ prep: "aus", caseName: "Dativ", object: "etwas" }, 3);
    for (const label of out) {
      if (label.startsWith("mit ") || label.startsWith("bei ") || label.startsWith("von ")) {
        strictEqual(label.endsWith("Dativ"), true, label);
      }
      if (label.startsWith("für ")) strictEqual(label.endsWith("Akkusativ"), true, label);
    }
  });

  it("en fournit autant que demandé", () => {
    strictEqual(rektionDistractors(slot, 3).length, 3);
  });
});
