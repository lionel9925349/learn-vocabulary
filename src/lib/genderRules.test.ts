import { deepStrictEqual, strictEqual } from "node:assert/strict";
import { describe, it } from "node:test";
import { explainGender, inferGender, ruleFor } from "./genderRules";
import type { Word } from "./types";

const noun = (de: string, artikel: Word["artikel"], extra: Partial<Word> = {}): Word => ({
  id: de.toLowerCase(),
  de,
  fr: "",
  category: "lager",
  kind: "noun",
  artikel,
  ...extra,
});

describe("inferGender — terminaisons", () => {
  const cases: [string, "der" | "die" | "das"][] = [
    ["Bestellung", "die"],
    ["Sicherheit", "die"],
    ["Möglichkeit", "die"],
    ["Mannschaft", "die"],
    ["Reklamation", "die"],
    ["Provision", "die"],
    ["Qualität", "die"],
    ["Logistik", "die"],
    ["Kompetenz", "die"],
    ["Inventur", "die"],
    ["Päckchen", "das"],
    ["Dokument", "das"],
    ["Ergebnis", "das"],
    ["Mechanismus", "der"],
    ["Spediteur", "der"],
    ["Lehrling", "der"],
    ["Sensor", "der"],
  ];

  for (const [word, gender] of cases) {
    it(`${word} → ${gender}`, () => {
      strictEqual(inferGender(word), gender);
    });
  }
});

describe("inferGender — composition", () => {
  it("prend le genre du dernier élément", () => {
    strictEqual(inferGender("Wareneingang"), "der"); // der Eingang
    strictEqual(inferGender("Lieferschein"), "der"); // der Schein
    strictEqual(inferGender("Wareneingangskontrolle"), "die"); // die Kontrolle
  });

  it("vaut aussi pour les noms à préfixe verbal", () => {
    strictEqual(inferGender("Umschlag"), "der"); // der Schlag
    strictEqual(inferGender("Anlage"), "die"); // die Lage
    strictEqual(inferGender("Umsatz"), "der"); // der Satz
  });

  it("indique la source de la déduction", () => {
    strictEqual(explainGender("Wareneingang")?.source, "compound");
    strictEqual(explainGender("Bestellung")?.source, "suffix");
  });
});

/**
 * Régression : « das Tor » (le quai) termine tous les noms en -tor, et la
 * composition l'emportait sur la terminaison. Monitor, Direktor, Faktor et
 * Traktor sortaient donc en « das ». Ce sont des masculins.
 */
describe("inferGender — les noms en -tor ne sont pas des composés de « Tor »", () => {
  for (const word of ["Monitor", "Motor", "Direktor", "Faktor", "Traktor", "Rotor", "Konnektor"]) {
    it(`${word} → der`, () => {
      strictEqual(inferGender(word), "der");
      strictEqual(explainGender(word)?.source, "suffix");
    });
  }
});

describe("inferGender — prudence", () => {
  it("ne tranche pas un mot sans indice morphologique", () => {
    strictEqual(inferGender("Skonto"), null);
    strictEqual(inferGender("Tisch"), null);
  });

  it("n'invente pas de composé sur un premier élément trop court", () => {
    // « Skonto » n'est pas S + Konto : der Skonto, pas das Konto.
    strictEqual(inferGender("Skonto"), null);
  });
});

describe("ruleFor", () => {
  it("préfère la règle écrite à la main", () => {
    strictEqual(ruleFor(noun("Lieferant", "der", { rule: "Règle maison." })), "Règle maison.");
  });

  it("affiche la règle déduite quand elle tombe juste", () => {
    const text = ruleFor(noun("Bestellung", "die"));
    strictEqual(text.includes("-ung"), true);
  });

  it("renvoie à la mémorisation quand la déduction contredit le genre déclaré", () => {
    // Exception assumée : la morphologie dirait « die », le mot est « der ».
    const text = ruleFor(noun("Bestellung", "der"));
    strictEqual(text.includes("s'apprend avec le mot"), true);
  });

  it("renvoie à la mémorisation quand aucune règle ne s'applique", () => {
    const text = ruleFor(noun("Skonto", "der"));
    strictEqual(text.includes("s'apprend avec le mot"), true);
  });
});

describe("explainGender", () => {
  it("nomme l'élément dont vient le genre", () => {
    const explained = explainGender("Wareneingang");
    deepStrictEqual(explained?.gender, "der");
    strictEqual(explained?.text.includes("der Eingang"), true);
  });
});
