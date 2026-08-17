import type { Word } from "./types";
import { isNoun } from "./types";
import { canConjugate } from "./conjugation";

/**
 * L'unité de révision.
 *
 * Un mot n'est pas un bloc : savoir traduire *der Wareneingang* et savoir son
 * pluriel ou sa forme au génitif sont trois acquis distincts, qui s'oublient à
 * des rythmes différents. La répétition espacée porte donc sur le couple
 * **(mot, type de question)** et non sur le mot seul — sans quoi une bonne
 * réponse en traduction repousserait à deux mois une déclinaison jamais vue.
 */

export type QuestionKind =
  | "article"
  | "de-fr"
  | "fr-de"
  | "plural"
  | "declension"
  | "type-de"
  | "adjective"
  | "conjugation";

export const KIND_LABELS: Record<QuestionKind, string> = {
  article: "Quel article ?",
  "de-fr": "Que signifie ce mot ?",
  "fr-de": "Comment le dit-on en allemand ?",
  plural: "Quel est le pluriel ?",
  declension: "Quelle forme de l'article ?",
  "type-de": "Écris-le en allemand",
  adjective: "Quelle terminaison d'adjectif ?",
  conjugation: "Conjugue au présent",
};

/** Noms courts, pour les tableaux de progression où la question ne tient pas. */
export const KIND_SHORT: Record<QuestionKind, string> = {
  article: "Article",
  "de-fr": "Sens DE→FR",
  "fr-de": "Sens FR→DE",
  plural: "Pluriel",
  declension: "Déclinaison",
  "type-de": "Écriture",
  adjective: "Adjectif",
  conjugation: "Conjugaison",
};

/** Ordre d'affichage stable, du plus élémentaire au plus exigeant. */
export const KIND_ORDER: QuestionKind[] = [
  "de-fr",
  "fr-de",
  "article",
  "plural",
  "type-de",
  "declension",
  "adjective",
  "conjugation",
];

/** Types de questions possibles pour un mot donné, dans l'ordre d'affichage. */
export function availableKinds(word: Word): QuestionKind[] {
  const kinds = new Set<QuestionKind>(["de-fr", "fr-de"]);
  // Les expressions entières sont trop longues à taper sur un téléphone.
  if (word.kind !== "phrase") kinds.add("type-de");
  if (isNoun(word) && word.artikel) {
    kinds.add("article");
    kinds.add("declension");
    if (word.plural) kinds.add("plural");
  }
  if (word.kind === "adjective" && word.attributive) kinds.add("adjective");
  if (canConjugate(word)) kinds.add("conjugation");
  return KIND_ORDER.filter((k) => kinds.has(k));
}

/** Une unité de révision : un mot vu sous un angle précis. */
export interface Unit {
  word: Word;
  kind: QuestionKind;
}

/** Clé de stockage d'une unité. Le « | » n'apparaît dans aucun identifiant de mot. */
export function cardKey(wordId: string, kind: QuestionKind): string {
  return `${wordId}|${kind}`;
}

/** Toutes les unités de révision d'un mot. */
export function unitsOf(word: Word): Unit[] {
  return availableKinds(word).map((kind) => ({ word, kind }));
}
