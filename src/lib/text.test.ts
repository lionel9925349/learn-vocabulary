import { strictEqual } from "node:assert/strict";
import { describe, it } from "node:test";
import { foldGerman, matchesSearch, normalize, searchKeys } from "./text";

describe("foldGerman", () => {
  it("translittère les caractères allemands", () => {
    strictEqual(foldGerman("Prüfung"), "Pruefung");
    strictEqual(foldGerman("Zählung"), "Zaehlung");
    strictEqual(foldGerman("Behörde"), "Behoerde");
    strictEqual(foldGerman("Straße"), "Strasse");
  });

  it("laisse le reste intact", () => {
    strictEqual(foldGerman("Auftrag"), "Auftrag");
  });
});

describe("normalize", () => {
  it("met en minuscules, retire la ponctuation et compacte les espaces", () => {
    strictEqual(normalize("  Der   Auftrag ! "), "der auftrag");
  });
});

describe("recherche", () => {
  const find = (haystack: string, query: string) => matchesSearch(haystack, searchKeys(query));

  it("trouve un mot avec tréma tapé sans tréma", () => {
    strictEqual(find("Prüfung", "prufung"), true);
  });

  it("trouve le même mot tapé à l'allemande", () => {
    strictEqual(find("Prüfung", "pruefung"), true);
  });

  it("trouve le même mot tapé avec le tréma", () => {
    strictEqual(find("Prüfung", "prüfung"), true);
  });

  it("trouve un mot en ß tapé avec ss", () => {
    strictEqual(find("Großhandel", "grosshandel"), true);
  });

  /**
   * Le cas qui manquait : un mot cumulant tréma et eszett, cherché sans ni
   * l'un ni l'autre. « losgroesse » marchait, « losgrosse » ne trouvait rien.
   */
  it("trouve Losgröße quelle que soit la façon de l'écrire", () => {
    for (const query of ["losgröße", "losgroesse", "losgrosse", "losgroße"]) {
      strictEqual(find("Losgröße", query), true, query);
    }
  });

  it("cherche aussi au milieu du mot — les composés allemands sont longs", () => {
    strictEqual(find("Wareneingangskontrolle", "eingang"), true);
  });

  it("ignore les accents du côté français", () => {
    strictEqual(find("déclaration en douane", "declaration"), true);
    strictEqual(find("declaration", "déclaration"), true);
  });

  it("ne trouve pas ce qui n'y est pas", () => {
    strictEqual(find("Wareneingang", "ausgang"), false);
  });
});
