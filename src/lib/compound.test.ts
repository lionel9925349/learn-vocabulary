import { strictEqual } from "node:assert/strict";
import { describe, it } from "node:test";
import { articleOf, decompose, explainsGender, segmented } from "./compound";
import type { Word } from "./types";

/** Les éléments d'un découpage, écrits sous leur forme autonome. */
function parts(de: string): string[] | null {
  return decompose(de)?.map((p) => p.de) ?? null;
}

describe("decompose", () => {
  it("découpe un composé en éléments connus", () => {
    strictEqual(parts("Wareneingang")?.join("+"), "Ware+Eingang");
  });

  it("découpe en profondeur, du plus long au plus court", () => {
    strictEqual(parts("Wareneingangskontrolle")?.join("+"), "Wareneingang+Kontrolle");
  });

  it("reconnaît un premier élément verbal", () => {
    strictEqual(parts("Lieferschein")?.join("+"), "liefern+Schein");
  });

  it("reconnaît un premier élément adjectival", () => {
    strictEqual(parts("Großhandel")?.join("+"), "groß+Handel");
  });

  /**
   * Le garde-fou qui compte : mieux vaut ne rien proposer qu'un découpage
   * fantaisiste. « Skonto » n'est pas S + Konto.
   */
  it("ne découpe pas quand un élément est inconnu", () => {
    strictEqual(decompose("Skonto"), null);
  });

  it("ne découpe pas un mot simple", () => {
    strictEqual(decompose("Tisch"), null);
  });
});

describe("segmented", () => {
  it("marque les frontières d'éléments avec un point médian", () => {
    const p = decompose("Wareneingang");
    strictEqual(p !== null, true);
    strictEqual(segmented(p!), "Waren·eingang");
  });

  it("restitue exactement le mot d'origine une fois les points retirés", () => {
    for (const word of ["Wareneingang", "Wareneingangskontrolle", "Lieferschein"]) {
      const p = decompose(word);
      strictEqual(segmented(p!).replace(/·/g, ""), word);
    }
  });
});

describe("articleOf", () => {
  it("donne l'article d'un élément du lexique", () => {
    strictEqual(articleOf("Eingang"), "der");
    strictEqual(articleOf("Kontrolle"), "die");
  });

  it("se rabat sur la terminaison pour un mot hors lexique", () => {
    strictEqual(articleOf("Zertifizierung"), "die");
  });

  it("renvoie null quand rien ne permet de trancher", () => {
    strictEqual(articleOf("Zqfrb"), null);
  });
});

describe("explainsGender", () => {
  const noun = (de: string, artikel: Word["artikel"]): Word => ({
    id: de.toLowerCase(),
    de,
    fr: "",
    category: "lager",
    kind: "noun",
    artikel,
  });

  it("vrai quand la décomposition montre déjà d'où vient le genre", () => {
    // der Wareneingang ← der Eingang : la règle est lisible dans le découpage.
    strictEqual(explainsGender(noun("Wareneingang", "der")), true);
  });

  it("faux quand le mot ne se décompose pas", () => {
    strictEqual(explainsGender(noun("Skonto", "der")), false);
  });
});
