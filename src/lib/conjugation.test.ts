import { strictEqual } from "node:assert/strict";
import { describe, it } from "node:test";
import { canConjugate, conjugatePresent, splitVerb } from "./conjugation";
import type { Word } from "./types";

const verb = (de: string, extra: Partial<Word> = {}): Word => ({
  id: de.toLowerCase().replace(/\s+/g, "-"),
  de,
  fr: "",
  category: "verben",
  kind: "verb",
  ...extra,
});

/** Les six formes fléchies, dans l'ordre ich / du / er / wir / ihr / sie. */
function forms(word: Word): string[] {
  return conjugatePresent(word).map((r) => r.verb);
}

describe("verbe régulier", () => {
  it("liefern : radical en -ern, le -e- est conservé au « ich »", () => {
    strictEqual(
      forms(verb("liefern")).join(" "),
      "liefere lieferst liefert liefern liefert liefern"
    );
  });

  it("prüfen : conjugaison de base", () => {
    strictEqual(forms(verb("prüfen")).join(" "), "prüfe prüfst prüft prüfen prüft prüfen");
  });
});

describe("le -e- de liaison", () => {
  it("arbeiten : radical en -t → du arbeitest, er arbeitet", () => {
    strictEqual(
      forms(verb("arbeiten")).join(" "),
      "arbeite arbeitest arbeitet arbeiten arbeitet arbeiten"
    );
  });

  it("öffnen : groupe consonantique devant -n → du öffnest", () => {
    strictEqual(forms(verb("öffnen")).join(" "), "öffne öffnest öffnet öffnen öffnet öffnen");
  });

  /**
   * Un -h- allongeant ne demande pas de -e- : c'est « ihr nehmt », pas
   * « ihr nehmet ». La règle porte sur -d/-t et sur les groupes imprononçables.
   */
  it("nehmen : pas de -e- de liaison malgré le -h-", () => {
    strictEqual(conjugatePresent(verb("nehmen", { praesens: "nimmt" }))[4].verb, "nehmt");
  });
});

describe("radical en sifflante — le -s- du « du » est absorbé", () => {
  it("heißen : du heißt, et non « du heißst »", () => {
    strictEqual(forms(verb("heißen"))[1], "heißt");
  });

  it("lesen (fort) : du liest, forme identique à er liest", () => {
    const rows = conjugatePresent(verb("lesen", { praesens: "liest" }));
    strictEqual(rows[1].verb, "liest");
    strictEqual(rows[2].verb, "liest");
    strictEqual(rows[4].verb, "lest");
  });
});

describe("verbes forts — la voyelle change au singulier", () => {
  it("nehmen : er nimmt, du nimmst, mais wir nehmen", () => {
    const rows = conjugatePresent(verb("nehmen", { praesens: "nimmt" }));
    strictEqual(rows[1].verb, "nimmst");
    strictEqual(rows[2].verb, "nimmt");
    strictEqual(rows[3].verb, "nehmen");
  });

  it("signale l'irrégularité aux personnes concernées seulement", () => {
    const rows = conjugatePresent(verb("nehmen", { praesens: "nimmt" }));
    strictEqual(rows.map((r) => r.irregular).join(","), "false,true,true,false,false,false");
  });

  it("halten : le -t du radical absorbe celui du « du » (praesensDu explicite)", () => {
    const rows = conjugatePresent(verb("halten", { praesens: "hält", praesensDu: "hältst" }));
    strictEqual(rows[1].verb, "hältst");
    strictEqual(rows[2].verb, "hält");
  });
});

describe("particules séparables", () => {
  const abholen = verb("abholen", { separable: true, praesens: "holt ab" });

  it("isole la particule de son verbe", () => {
    const split = splitVerb(abholen);
    strictEqual(split.prefix, "ab");
    strictEqual(split.base, "holen");
  });

  it("conjugue le verbe seul et rejette la particule en fin de proposition", () => {
    const rows = conjugatePresent(abholen);
    strictEqual(rows[0].verb, "hole");
    strictEqual(rows[0].prefix, "ab");
    strictEqual(rows[0].form, "ich hole … ab");
  });

  it("retire la particule de la forme forte notée dans le vocabulaire", () => {
    // Le vocabulaire écrit « nimmt an » : le verbe fléchi est « nimmt ».
    const rows = conjugatePresent(
      verb("annehmen", { separable: true, praesens: "nimmt an" })
    );
    strictEqual(rows[2].verb, "nimmt");
    strictEqual(rows[2].form, "er nimmt … an");
  });

  it("ne détache pas un préfixe inséparable", () => {
    strictEqual(splitVerb(verb("verhandeln")).prefix, null);
    strictEqual(splitVerb(verb("bestellen")).prefix, null);
    strictEqual(splitVerb(verb("entladen")).prefix, null);
  });

  it("respecte separable: false quand la forme est ambiguë", () => {
    // über-, unter-, um-, durch- peuvent être les deux : le mot tranche.
    strictEqual(splitVerb(verb("überweisen", { separable: false })).prefix, null);
  });
});

describe("verbes en -eln et -ern", () => {
  it("-eln perd le -e- du radical au « ich » : verhandeln → ich verhandle", () => {
    const rows = conjugatePresent(verb("verhandeln"));
    strictEqual(rows[0].verb, "verhandle");
    strictEqual(rows[3].verb, "verhandeln");
  });

  it("stapeln → ich staple", () => {
    strictEqual(conjugatePresent(verb("stapeln"))[0].verb, "staple");
  });

  it("-ern garde le -e- : liefern → ich liefere", () => {
    strictEqual(conjugatePresent(verb("liefern"))[0].verb, "liefere");
  });
});

describe("verbes pronominaux", () => {
  it("place le pronom réfléchi accordé à la personne", () => {
    const rows = conjugatePresent(verb("sich kümmern"));
    strictEqual(rows[0].form, "ich kümmere mich");
    strictEqual(rows[1].form, "du kümmerst dich");
    strictEqual(rows[4].form, "ihr kümmert euch");
    strictEqual(rows[5].form, "sie kümmern sich");
  });
});

describe("canConjugate", () => {
  it("accepte un verbe simple", () => {
    strictEqual(canConjugate(verb("liefern")), true);
  });

  it("accepte un verbe pronominal", () => {
    strictEqual(canConjugate(verb("sich kümmern")), true);
  });

  it("refuse une locution verbale, qui ne se génère pas de façon fiable", () => {
    strictEqual(canConjugate(verb("zuständig sein")), false);
  });

  it("refuse ce qui n'est pas un verbe", () => {
    const noun: Word = {
      id: "auftrag",
      de: "Auftrag",
      fr: "",
      category: "lager",
      kind: "noun",
      artikel: "der",
    };
    strictEqual(canConjugate(noun), false);
  });
});
