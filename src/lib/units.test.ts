import { deepStrictEqual, strictEqual } from "node:assert/strict";
import { describe, it } from "node:test";
import { KIND_ORDER, availableKinds, cardKey, unitsOf } from "./units";
import type { Word } from "./types";

const noun = (extra: Partial<Word> = {}): Word => ({
  id: "auftrag",
  de: "Auftrag",
  fr: "commande",
  category: "lager",
  kind: "noun",
  artikel: "der",
  plural: "Aufträge",
  ...extra,
});

describe("availableKinds", () => {
  it("un nom avec pluriel se travaille sous sept angles", () => {
    deepStrictEqual(availableKinds(noun()).sort(), [
      "article",
      "de-fr",
      "declension",
      "fr-de",
      "plural",
      "preposition",
      "type-de",
    ]);
  });

  it("le contexte n'est proposé que si le mot figure dans une de ses phrases", () => {
    strictEqual(availableKinds(noun()).includes("cloze"), false);
    const withSentence = noun({
      example: { de: "Der Auftrag ist freigegeben.", fr: "La commande est validée." },
    });
    strictEqual(availableKinds(withSentence).includes("cloze"), true);
  });

  it("un nom sans pluriel n'a pas de question de pluriel", () => {
    strictEqual(availableKinds(noun({ plural: null })).includes("plural"), false);
  });

  it("un verbe conjugable ajoute la conjugaison et n'a pas d'article", () => {
    const kinds = availableKinds({
      id: "liefern",
      de: "liefern",
      fr: "livrer",
      category: "verben",
      kind: "verb",
    });
    strictEqual(kinds.includes("conjugation"), true);
    strictEqual(kinds.includes("article"), false);
    strictEqual(kinds.includes("declension"), false);
  });

  it("un adjectif épithète ajoute la déclinaison de l'adjectif", () => {
    const kinds = availableKinds({
      id: "verbindlich",
      de: "verbindlich",
      fr: "ferme",
      category: "adjektive",
      kind: "adjective",
      attributive: true,
    });
    strictEqual(kinds.includes("adjective"), true);
  });

  it("un adverbe invariable ne se décline pas", () => {
    const kinds = availableKinds({
      id: "sofort",
      de: "sofort",
      fr: "immédiatement",
      category: "adjektive",
      kind: "adjective",
      attributive: false,
    });
    strictEqual(kinds.includes("adjective"), false);
  });

  it("une expression ne se tape pas au clavier — trop longue sur un téléphone", () => {
    const kinds = availableKinds({
      id: "wir-sind-uns-einig",
      de: "Wir sind uns einig",
      fr: "Nous sommes d'accord",
      category: "wendungen",
      kind: "phrase",
    });
    deepStrictEqual(kinds, ["de-fr", "fr-de"]);
  });

  it("renvoie toujours les types dans l'ordre de référence", () => {
    const kinds = availableKinds(noun());
    const positions = kinds.map((k) => KIND_ORDER.indexOf(k));
    deepStrictEqual(
      positions,
      [...positions].sort((a, b) => a - b)
    );
  });

  it("commence par le sens : c'est par là qu'on découvre un mot", () => {
    strictEqual(availableKinds(noun())[0], "de-fr");
  });
});

describe("cardKey", () => {
  it("compose une clé stable", () => {
    strictEqual(cardKey("auftrag", "article"), "auftrag|article");
  });

  it("distingue deux facettes du même mot", () => {
    strictEqual(cardKey("auftrag", "article") === cardKey("auftrag", "plural"), false);
  });
});

describe("unitsOf", () => {
  it("produit une unité par facette", () => {
    const units = unitsOf(noun());
    strictEqual(units.length, availableKinds(noun()).length);
    strictEqual(units.every((u) => u.word.id === "auftrag"), true);
  });
});
