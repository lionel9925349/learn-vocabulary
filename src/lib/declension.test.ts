import { strictEqual } from "node:assert/strict";
import { describe, it } from "node:test";
import {
  articleFor,
  dativePlural,
  genitiveSg,
  getDeclensionTable,
  hasDeclension,
  nounForm,
  weakObliqueSg,
} from "./declension";
import type { Word } from "./types";

const noun = (de: string, artikel: Word["artikel"], plural: string | null, extra: Partial<Word> = {}): Word => ({
  id: de.toLowerCase(),
  de,
  fr: "",
  category: "lager",
  kind: "noun",
  artikel,
  plural,
  ...extra,
});

describe("articleFor — article défini", () => {
  it("masculin : der / den / dem / des", () => {
    strictEqual(articleFor("m", "Nominativ", "definite"), "der");
    strictEqual(articleFor("m", "Akkusativ", "definite"), "den");
    strictEqual(articleFor("m", "Dativ", "definite"), "dem");
    strictEqual(articleFor("m", "Genitiv", "definite"), "des");
  });

  it("féminin : die / die / der / der — le piège classique du datif", () => {
    strictEqual(articleFor("f", "Nominativ", "definite"), "die");
    strictEqual(articleFor("f", "Akkusativ", "definite"), "die");
    strictEqual(articleFor("f", "Dativ", "definite"), "der");
    strictEqual(articleFor("f", "Genitiv", "definite"), "der");
  });

  it("neutre : das / das / dem / des", () => {
    strictEqual(articleFor("n", "Akkusativ", "definite"), "das");
    strictEqual(articleFor("n", "Dativ", "definite"), "dem");
    strictEqual(articleFor("n", "Genitiv", "definite"), "des");
  });

  it("pluriel : die / die / den / der", () => {
    strictEqual(articleFor("pl", "Nominativ", "definite"), "die");
    strictEqual(articleFor("pl", "Dativ", "definite"), "den");
    strictEqual(articleFor("pl", "Genitiv", "definite"), "der");
  });
});

describe("articleFor — article indéfini", () => {
  it("ein / einen / einem / eines au masculin", () => {
    strictEqual(articleFor("m", "Nominativ", "indefinite"), "ein");
    strictEqual(articleFor("m", "Akkusativ", "indefinite"), "einen");
    strictEqual(articleFor("m", "Dativ", "indefinite"), "einem");
    strictEqual(articleFor("m", "Genitiv", "indefinite"), "eines");
  });

  it("ein ne marque pas l'accusatif neutre", () => {
    strictEqual(articleFor("n", "Nominativ", "indefinite"), "ein");
    strictEqual(articleFor("n", "Akkusativ", "indefinite"), "ein");
  });

  it("« kein » remplace « ein » au pluriel, qui n'en a pas", () => {
    strictEqual(articleFor("pl", "Nominativ", "indefinite"), "keine");
    strictEqual(articleFor("pl", "Dativ", "indefinite"), "keinen");
  });
});

describe("genitiveSg", () => {
  it("ajoute -s au masculin et au neutre", () => {
    strictEqual(genitiveSg(noun("Auftrag", "der", "Aufträge")), "Auftrags");
    strictEqual(genitiveSg(noun("Lager", "das", "Lager")), "Lagers");
  });

  it("ajoute -es après une sifflante, pour rester prononçable", () => {
    strictEqual(genitiveSg(noun("Preis", "der", "Preise")), "Preises");
    strictEqual(genitiveSg(noun("Platz", "der", "Plätze")), "Platzes");
    strictEqual(genitiveSg(noun("Fluss", "der", "Flüsse")), "Flusses");
  });

  it("laisse le féminin intact — il ne prend jamais de désinence", () => {
    strictEqual(genitiveSg(noun("Lieferung", "die", "Lieferungen")), "Lieferung");
  });

  it("respecte une forme irrégulière déclarée", () => {
    strictEqual(
      genitiveSg(noun("Name", "der", "Namen", { genitiveSgOverride: "Namens" })),
      "Namens"
    );
  });
});

describe("n-Deklination (declClass « weak »)", () => {
  const kunde = noun("Kunde", "der", "Kunden", { declClass: "weak" });
  const mandant = noun("Mandant", "der", "Mandanten", { declClass: "weak" });

  it("prend -n dès l'accusatif, pas seulement au génitif", () => {
    strictEqual(nounForm(kunde, "Nominativ", false), "Kunde");
    strictEqual(nounForm(kunde, "Akkusativ", false), "Kunden");
    strictEqual(nounForm(kunde, "Dativ", false), "Kunden");
    strictEqual(nounForm(kunde, "Genitiv", false), "Kunden");
  });

  it("ajoute -en quand le mot ne finit pas par -e", () => {
    strictEqual(weakObliqueSg(mandant), "Mandanten");
  });

  it("respecte une forme oblique irrégulière déclarée", () => {
    const name = noun("Name", "der", "Namen", {
      declClass: "weak",
      weakObliqueOverride: "Namen",
    });
    strictEqual(weakObliqueSg(name), "Namen");
  });
});

describe("dativePlural", () => {
  it("ajoute un -n au pluriel qui n'en a pas", () => {
    strictEqual(dativePlural(noun("Auftrag", "der", "Aufträge")), "Aufträgen");
  });

  it("laisse tel quel un pluriel déjà en -n", () => {
    strictEqual(dativePlural(noun("Lieferung", "die", "Lieferungen")), "Lieferungen");
  });

  it("laisse tel quel un pluriel en -s (emprunts)", () => {
    strictEqual(dativePlural(noun("Container", "der", "Containers")), "Containers");
  });

  it("renvoie null quand le mot n'a pas de pluriel", () => {
    strictEqual(dativePlural(noun("Zubehör", "das", null)), null);
  });
});

describe("nounForm", () => {
  it("n'applique le -n du datif pluriel qu'au datif", () => {
    const w = noun("Auftrag", "der", "Aufträge");
    strictEqual(nounForm(w, "Nominativ", true), "Aufträge");
    strictEqual(nounForm(w, "Akkusativ", true), "Aufträge");
    strictEqual(nounForm(w, "Dativ", true), "Aufträgen");
    strictEqual(nounForm(w, "Genitiv", true), "Aufträge");
  });

  it("ne change rien au singulier hors génitif", () => {
    const w = noun("Auftrag", "der", "Aufträge");
    strictEqual(nounForm(w, "Akkusativ", false), "Auftrag");
    strictEqual(nounForm(w, "Genitiv", false), "Auftrags");
  });
});

describe("hasDeclension", () => {
  it("vaut pour les noms munis d'un article", () => {
    strictEqual(hasDeclension(noun("Auftrag", "der", "Aufträge")), true);
  });

  it("ne vaut pas pour un verbe", () => {
    const verb: Word = { id: "liefern", de: "liefern", fr: "", category: "verben", kind: "verb" };
    strictEqual(hasDeclension(verb), false);
  });
});

describe("getDeclensionTable", () => {
  it("produit les huit lignes : quatre cas, deux nombres", () => {
    const rows = getDeclensionTable(noun("Auftrag", "der", "Aufträge"));
    strictEqual(rows.length, 8);
    strictEqual(rows.filter((r) => r.plural).length, 4);
  });

  it("compose article et nom de façon cohérente", () => {
    const rows = getDeclensionTable(noun("Auftrag", "der", "Aufträge"));
    const genitiveSingular = rows.find((r) => r.case === "Genitiv" && !r.plural);
    strictEqual(genitiveSingular?.definiteArticle, "des");
    strictEqual(genitiveSingular?.noun, "Auftrags");

    const dativePluralRow = rows.find((r) => r.case === "Dativ" && r.plural);
    strictEqual(dativePluralRow?.definiteArticle, "den");
    strictEqual(dativePluralRow?.noun, "Aufträgen");
  });
});
