import type { Word } from "./types";

export type CaseName = "Nominativ" | "Akkusativ" | "Dativ" | "Genitiv";

export const CASES: CaseName[] = ["Nominativ", "Akkusativ", "Dativ", "Genitiv"];

export const CASE_INFO: Record<CaseName, { short: string; question: string; fr: string }> = {
  Nominativ: { short: "Nom.", question: "Wer / was?", fr: "sujet" },
  Akkusativ: { short: "Akk.", question: "Wen / was?", fr: "complément d'objet direct (COD)" },
  Dativ: { short: "Dat.", question: "Wem?", fr: "complément d'objet indirect (COI)" },
  Genitiv: { short: "Gen.", question: "Wessen?", fr: "complément du nom (possession)" },
};

// Formes de l'article défini : [genre-ou-pluriel][cas]
const DEFINITE: Record<"m" | "f" | "n" | "pl", Record<CaseName, string>> = {
  m: { Nominativ: "der", Akkusativ: "den", Dativ: "dem", Genitiv: "des" },
  f: { Nominativ: "die", Akkusativ: "die", Dativ: "der", Genitiv: "der" },
  n: { Nominativ: "das", Akkusativ: "das", Dativ: "dem", Genitiv: "des" },
  pl: { Nominativ: "die", Akkusativ: "die", Dativ: "den", Genitiv: "der" },
};

// Article indéfini "ein" (pas de pluriel)
const INDEFINITE: Record<"m" | "f" | "n", Record<CaseName, string>> = {
  m: { Nominativ: "ein", Akkusativ: "einen", Dativ: "einem", Genitiv: "eines" },
  f: { Nominativ: "eine", Akkusativ: "eine", Dativ: "einer", Genitiv: "einer" },
  n: { Nominativ: "ein", Akkusativ: "ein", Dativ: "einem", Genitiv: "eines" },
};

// "kein" sert d'illustration du pluriel (ein n'a pas de pluriel) — mêmes
// terminaisons que les possessifs (mein, dein, sein, ihr, unser, euer...)
const KEIN: Record<"m" | "f" | "n" | "pl", Record<CaseName, string>> = {
  m: { Nominativ: "kein", Akkusativ: "keinen", Dativ: "keinem", Genitiv: "keines" },
  f: { Nominativ: "keine", Akkusativ: "keine", Dativ: "keiner", Genitiv: "keiner" },
  n: { Nominativ: "kein", Akkusativ: "kein", Dativ: "keinem", Genitiv: "keines" },
  pl: { Nominativ: "keine", Akkusativ: "keine", Dativ: "keinen", Genitiv: "keiner" },
};

function genderKey(artikel: Word["artikel"]): "m" | "f" | "n" {
  return artikel === "der" ? "m" : artikel === "die" ? "f" : "n";
}

/** Un mot sans article (verbe, expression) n'a pas de tableau de déclinaison. */
export function hasDeclension(word: Word): boolean {
  return (word.kind ?? "noun") === "noun" && !!word.artikel;
}

/** Forme du nom en Akkusativ/Dativ Singular (identique au Nominativ sauf classe "weak") */
export function weakObliqueSg(word: Word): string {
  if (word.declClass !== "weak") return word.de;
  if (word.weakObliqueOverride) return word.weakObliqueOverride;
  return word.de.endsWith("e") ? word.de + "n" : word.de + "en";
}

/** Forme du nom en Genitiv Singular */
export function genitiveSg(word: Word): string {
  if (word.genitiveSgOverride) return word.genitiveSgOverride;
  if (word.declClass === "weak") return weakObliqueSg(word);
  if (word.artikel === "die") return word.de; // féminin : pas de désinence
  const last = word.de.slice(-1).toLowerCase();
  if (["s", "ß", "z", "x"].includes(last)) return word.de + "es";
  return word.de + "s";
}

/** Forme du nom en Dativ Plural (règle du -n final, sauf classe "weak" déjà en -n) */
export function dativePlural(word: Word): string | null {
  if (!word.plural) return null;
  if (word.plural.endsWith("n") || word.plural.endsWith("s")) return word.plural;
  return word.plural + "n";
}

/** Forme du nom pour un cas/nombre donné */
export function nounForm(word: Word, c: CaseName, plural: boolean): string | null {
  if (plural) {
    if (!word.plural) return null;
    return c === "Dativ" ? dativePlural(word) : word.plural;
  }
  switch (c) {
    case "Nominativ":
      return word.de;
    case "Akkusativ":
    case "Dativ":
      return word.declClass === "weak" ? weakObliqueSg(word) : word.de;
    case "Genitiv":
      return genitiveSg(word);
  }
}

export interface DeclensionRow {
  case: CaseName;
  plural: boolean;
  definiteArticle: string;
  indefiniteArticle: string | null; // null au pluriel (ein n'existe pas), on utilise "kein"
  noun: string | null;
}

/** Génère les 8 lignes (4 cas x singulier/pluriel) pour un mot */
export function getDeclensionTable(word: Word): DeclensionRow[] {
  const g = genderKey(word.artikel);
  const rows: DeclensionRow[] = [];
  for (const plural of [false, true]) {
    for (const c of CASES) {
      rows.push({
        case: c,
        plural,
        definiteArticle: plural ? DEFINITE.pl[c] : DEFINITE[g][c],
        indefiniteArticle: plural ? KEIN.pl[c] : INDEFINITE[g][c],
        noun: nounForm(word, c, plural),
      });
    }
  }
  return rows;
}

export function articleFor(gender: "m" | "f" | "n" | "pl", c: CaseName, type: "definite" | "indefinite"): string {
  if (type === "definite") return DEFINITE[gender][c];
  if (gender === "pl") return KEIN.pl[c];
  return INDEFINITE[gender][c];
}
