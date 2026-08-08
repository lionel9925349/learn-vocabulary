import type { Gender } from "./types";
import type { CaseName } from "./declension";
import { CASES } from "./declension";

/**
 * Déclinaison de l'adjectif épithète — le vrai point dur de l'allemand.
 *
 * L'idée centrale : **l'information de genre et de cas ne doit être portée
 * qu'une fois**. Si le déterminant la porte déjà (der, die, das…), l'adjectif
 * se contente de -e ou -en (déclinaison faible). S'il n'y a pas de déterminant,
 * c'est l'adjectif qui doit la porter, et il prend alors les terminaisons de
 * l'article défini (déclinaison forte). « ein » est entre les deux : il ne
 * marque pas le masculin ni le neutre au nominatif, donc l'adjectif s'en charge
 * (déclinaison mixte).
 */

/** Type de déterminant, qui détermine la déclinaison de l'adjectif. */
export type DeterminerType = "definite" | "indefinite" | "none";

export type AdjectiveDeclension = "weak" | "mixed" | "strong";

export const DECLENSION_LABELS: Record<AdjectiveDeclension, string> = {
  weak: "faible (schwach)",
  mixed: "mixte (gemischt)",
  strong: "forte (stark)",
};

export const DECLENSION_TRIGGER: Record<AdjectiveDeclension, string> = {
  weak: "après der, die, das, dieser, jeder, welcher…",
  mixed: "après ein, kein, mein, dein, sein, ihr…",
  strong: "sans déterminant",
};

export type NumberGender = "m" | "f" | "n" | "pl";

export const GENDER_LABELS: Record<NumberGender, string> = {
  m: "masculin",
  f: "féminin",
  n: "neutre",
  pl: "pluriel",
};

export function declensionFor(determiner: DeterminerType): AdjectiveDeclension {
  if (determiner === "definite") return "weak";
  if (determiner === "indefinite") return "mixed";
  return "strong";
}

/** Terminaisons, par déclinaison → cas → genre/nombre. */
const ENDINGS: Record<AdjectiveDeclension, Record<CaseName, Record<NumberGender, string>>> = {
  // Le déterminant porte déjà tout : l'adjectif ne fait que -e ou -en.
  weak: {
    Nominativ: { m: "e", f: "e", n: "e", pl: "en" },
    Akkusativ: { m: "en", f: "e", n: "e", pl: "en" },
    Dativ: { m: "en", f: "en", n: "en", pl: "en" },
    Genitiv: { m: "en", f: "en", n: "en", pl: "en" },
  },
  // « ein » ne marque ni le masculin ni le neutre au nominatif : l'adjectif compense.
  mixed: {
    Nominativ: { m: "er", f: "e", n: "es", pl: "en" },
    Akkusativ: { m: "en", f: "e", n: "es", pl: "en" },
    Dativ: { m: "en", f: "en", n: "en", pl: "en" },
    Genitiv: { m: "en", f: "en", n: "en", pl: "en" },
  },
  // Sans déterminant, l'adjectif reprend les terminaisons de l'article défini.
  strong: {
    Nominativ: { m: "er", f: "e", n: "es", pl: "e" },
    Akkusativ: { m: "en", f: "e", n: "es", pl: "e" },
    // Exception à connaître : au génitif masculin et neutre, c'est -en et non -es,
    // parce que le nom porte déjà la marque du génitif (-s).
    Dativ: { m: "em", f: "er", n: "em", pl: "en" },
    Genitiv: { m: "en", f: "er", n: "en", pl: "er" },
  },
};

/** Toutes les terminaisons possibles, pour construire des distracteurs plausibles. */
export const ALL_ENDINGS = ["e", "en", "er", "es", "em"];

export function adjectiveEnding(
  declension: AdjectiveDeclension,
  caseName: CaseName,
  gender: NumberGender
): string {
  return ENDINGS[declension][caseName][gender];
}

/**
 * Radical de l'adjectif avant terminaison.
 * Quelques adjectifs perdent une voyelle : teuer → teure, dunkel → dunkle.
 */
export function adjectiveStem(adjective: string): string {
  const a = adjective.trim();
  if (a === "hoch") return "hoh"; // hoch → das hohe Regal
  if (/[aeiouäöü]uer$/.test(a)) return a.slice(0, -2) + "r"; // teuer → teur
  if (/el$/.test(a)) return a.slice(0, -2) + "l"; // dunkel → dunkl
  if (/e$/.test(a)) return a.slice(0, -1); // leise → leis
  return a;
}

export function declineAdjective(
  adjective: string,
  declension: AdjectiveDeclension,
  caseName: CaseName,
  gender: NumberGender
): string {
  return adjectiveStem(adjective) + adjectiveEnding(declension, caseName, gender);
}

export function genderKeyOf(artikel: Gender): "m" | "f" | "n" {
  return artikel === "der" ? "m" : artikel === "die" ? "f" : "n";
}

/** Tableau complet d'une déclinaison, pour la page de référence. */
export function endingTable(declension: AdjectiveDeclension) {
  return CASES.map((c) => ({
    case: c,
    m: ENDINGS[declension][c].m,
    f: ENDINGS[declension][c].f,
    n: ENDINGS[declension][c].n,
    pl: ENDINGS[declension][c].pl,
  }));
}
