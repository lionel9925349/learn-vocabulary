import type { Word } from "./types";
import { isNoun } from "./types";
import { canConjugate } from "./conjugation";
import { hasCloze } from "./cloze";
import { hasRektion } from "./rektion";
import { canPassivize, hasPerfect } from "./verbForms";
import { orderPatternsFor } from "./wordOrder";

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
  | "cloze"
  | "declension"
  | "type-de"
  | "preposition"
  | "perfect"
  | "governs"
  | "passive"
  | "adjective"
  | "conjugation"
  | "word-order"
  | "politeness";

export const KIND_LABELS: Record<QuestionKind, string> = {
  article: "Quel article ?",
  "de-fr": "Que signifie ce mot ?",
  "fr-de": "Comment le dit-on en allemand ?",
  plural: "Quel est le pluriel ?",
  cloze: "Quel mot manque ?",
  declension: "Quelle forme de l'article ?",
  "type-de": "Écris-le en allemand",
  preposition: "Accusatif ou datif ?",
  perfect: "Quel parfait ?",
  governs: "Quelle préposition, et quel cas ?",
  passive: "Quelle forme du passif ?",
  adjective: "Quelle terminaison d'adjectif ?",
  conjugation: "Conjugue au présent",
  "word-order": "Remets la phrase dans l'ordre",
  politeness: "Comment le dit-on poliment ?",
};

/** Noms courts, pour les tableaux de progression où la question ne tient pas. */
export const KIND_SHORT: Record<QuestionKind, string> = {
  article: "Article",
  "de-fr": "Sens DE→FR",
  "fr-de": "Sens FR→DE",
  plural: "Pluriel",
  cloze: "En contexte",
  declension: "Déclinaison",
  "type-de": "Écriture",
  preposition: "Wechselpräposition",
  perfect: "Parfait",
  governs: "Rection",
  passive: "Passif",
  adjective: "Adjectif",
  conjugation: "Conjugaison",
  "word-order": "Ordre des mots",
  politeness: "Registre poli",
};

/**
 * Ordre d'affichage stable, du plus élémentaire au plus exigeant.
 *
 * Il commande aussi la découverte : la session introduit toujours la première
 * facette non vue de cette liste, donc on rencontre un mot par son sens avant
 * qu'on ne l'interroge sur sa rection.
 */
export const KIND_ORDER: QuestionKind[] = [
  "de-fr",
  "fr-de",
  "cloze",
  "article",
  "plural",
  "type-de",
  "declension",
  "preposition",
  "perfect",
  "governs",
  "passive",
  "adjective",
  "conjugation",
  "word-order",
  "politeness",
];

/** Types de questions possibles pour un mot donné, dans l'ordre d'affichage. */
export function availableKinds(word: Word): QuestionKind[] {
  const kinds = new Set<QuestionKind>(["de-fr", "fr-de"]);

  // Les expressions entières sont trop longues à taper sur un téléphone.
  if (word.kind !== "phrase") kinds.add("type-de");
  // Le mot doit figurer littéralement dans une de ses phrases.
  if (hasCloze(word)) kinds.add("cloze");

  if (isNoun(word) && word.artikel) {
    kinds.add("article");
    kinds.add("declension");
    // La règle wohin/wo se travaille sur un nom qu'on place dans un lieu.
    kinds.add("preposition");
    if (word.plural) kinds.add("plural");
  }

  if (word.kind === "adjective" && word.attributive) kinds.add("adjective");

  if (word.kind === "verb") {
    if (canConjugate(word)) kinds.add("conjugation");
    if (hasPerfect(word)) kinds.add("perfect");
    if (hasRektion(word)) kinds.add("governs");
    if (isTransitive(word)) {
      if (canPassivize(word)) kinds.add("passive");
      if (orderPatternsFor(word).length > 0) kinds.add("word-order");
    }
  }

  if (word.direct) kinds.add("politeness");

  return KIND_ORDER.filter((k) => kinds.has(k));
}

/**
 * Le verbe prend-il un complément d'objet direct ?
 *
 * Sans cela on fabriquerait des phrases absurdes : *Wir haben die Ware
 * zusammengearbeitet*. Un verbe qui régit une préposition a son complément
 * ailleurs, et un verbe explicitement marqué `intransitive` n'en a pas du tout.
 */
export function isTransitive(word: Word): boolean {
  return word.kind === "verb" && !word.intransitive && !hasRektion(word);
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
