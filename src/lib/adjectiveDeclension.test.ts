import { strictEqual } from "node:assert/strict";
import { describe, it } from "node:test";
import {
  adjectiveEnding,
  adjectiveStem,
  declensionFor,
  declineAdjective,
  endingTable,
  genderKeyOf,
} from "./adjectiveDeclension";

describe("declensionFor", () => {
  it("article défini → faible, ein → mixte, rien → forte", () => {
    strictEqual(declensionFor("definite"), "weak");
    strictEqual(declensionFor("indefinite"), "mixed");
    strictEqual(declensionFor("none"), "strong");
  });
});

describe("déclinaison faible — le déterminant porte déjà tout", () => {
  it("se réduit à -e ou -en", () => {
    const endings = new Set(
      (["Nominativ", "Akkusativ", "Dativ", "Genitiv"] as const).flatMap((c) =>
        (["m", "f", "n", "pl"] as const).map((g) => adjectiveEnding("weak", c, g))
      )
    );
    strictEqual([...endings].sort().join(","), "e,en");
  });

  it("der gute Preis / den guten Preis", () => {
    strictEqual(declineAdjective("gut", "weak", "Nominativ", "m"), "gute");
    strictEqual(declineAdjective("gut", "weak", "Akkusativ", "m"), "guten");
  });

  it("mit dem guten Preis — datif toujours en -en", () => {
    strictEqual(declineAdjective("gut", "weak", "Dativ", "m"), "guten");
    strictEqual(declineAdjective("gut", "weak", "Dativ", "f"), "guten");
    strictEqual(declineAdjective("gut", "weak", "Dativ", "pl"), "guten");
  });
});

describe("déclinaison mixte — « ein » ne marque ni masculin ni neutre au nominatif", () => {
  it("ein guter Preis, ein gutes Lager", () => {
    strictEqual(declineAdjective("gut", "mixed", "Nominativ", "m"), "guter");
    strictEqual(declineAdjective("gut", "mixed", "Nominativ", "n"), "gutes");
  });

  it("le neutre reste -es à l'accusatif, comme au nominatif", () => {
    strictEqual(declineAdjective("gut", "mixed", "Akkusativ", "n"), "gutes");
  });

  it("mais le masculin bascule en -en à l'accusatif", () => {
    strictEqual(declineAdjective("gut", "mixed", "Akkusativ", "m"), "guten");
  });
});

describe("déclinaison forte — l'adjectif reprend les terminaisons de l'article", () => {
  it("guter Preis, gute Ware, gutes Lager", () => {
    strictEqual(declineAdjective("gut", "strong", "Nominativ", "m"), "guter");
    strictEqual(declineAdjective("gut", "strong", "Nominativ", "f"), "gute");
    strictEqual(declineAdjective("gut", "strong", "Nominativ", "n"), "gutes");
  });

  it("mit gutem Preis — datif en -em au masculin et au neutre", () => {
    strictEqual(declineAdjective("gut", "strong", "Dativ", "m"), "gutem");
    strictEqual(declineAdjective("gut", "strong", "Dativ", "n"), "gutem");
    strictEqual(declineAdjective("gut", "strong", "Dativ", "f"), "guter");
  });

  /**
   * L'exception qu'il faut connaître : au génitif masculin et neutre, la
   * terminaison est -en et non -es, parce que le nom porte déjà le -s.
   */
  it("génitif masculin et neutre en -en, pas en -es", () => {
    strictEqual(declineAdjective("gut", "strong", "Genitiv", "m"), "guten");
    strictEqual(declineAdjective("gut", "strong", "Genitiv", "n"), "guten");
    strictEqual(declineAdjective("gut", "strong", "Genitiv", "f"), "guter");
    strictEqual(declineAdjective("gut", "strong", "Genitiv", "pl"), "guter");
  });
});

describe("adjectiveStem — les radicaux qui perdent une voyelle", () => {
  it("teuer → teur (ein teurer Preis)", () => {
    strictEqual(adjectiveStem("teuer"), "teur");
    strictEqual(declineAdjective("teuer", "mixed", "Nominativ", "m"), "teurer");
  });

  it("dunkel → dunkl (das dunkle Lager)", () => {
    strictEqual(adjectiveStem("dunkel"), "dunkl");
    strictEqual(declineAdjective("dunkel", "weak", "Nominativ", "n"), "dunkle");
  });

  it("hoch → hoh (das hohe Regal)", () => {
    strictEqual(adjectiveStem("hoch"), "hoh");
    strictEqual(declineAdjective("hoch", "weak", "Nominativ", "n"), "hohe");
  });

  it("un adjectif déjà en -e ne double pas le e (leise → leise)", () => {
    strictEqual(adjectiveStem("leise"), "leis");
    strictEqual(declineAdjective("leise", "weak", "Nominativ", "f"), "leise");
  });

  it("laisse intact un radical ordinaire", () => {
    strictEqual(adjectiveStem("pünktlich"), "pünktlich");
  });
});

describe("genderKeyOf", () => {
  it("traduit l'article en clé de genre", () => {
    strictEqual(genderKeyOf("der"), "m");
    strictEqual(genderKeyOf("die"), "f");
    strictEqual(genderKeyOf("das"), "n");
  });
});

describe("endingTable", () => {
  it("donne une ligne par cas", () => {
    strictEqual(endingTable("weak").length, 4);
    strictEqual(endingTable("strong")[0].case, "Nominativ");
  });
});
