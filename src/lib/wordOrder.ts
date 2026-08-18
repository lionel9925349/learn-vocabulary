import type { Word } from "./types";
import { articleFor, nounForm } from "./declension";
import { conjugatePresent, splitVerb } from "./conjugation";
import { parsePerfect } from "./verbForms";

/**
 * L'ordre des mots — ce qui distingue une phrase allemande d'une phrase
 * française traduite mot à mot.
 *
 * Deux règles portent presque tout :
 *
 *  - **la parenthèse verbale** (Satzklammer) : le verbe conjugué occupe la
 *    deuxième position, et tout le reste du groupe verbal — participe,
 *    infinitif, particule séparable — part à la toute fin. Entre les deux,
 *    le Mittelfeld ;
 *  - **la subordonnée** : le verbe conjugué y va en dernier, derrière ce qui
 *    finissait la principale.
 *
 * Un francophone qui les ignore reste compréhensible mais s'entend
 * immédiatement. On les apprend mieux en reconstruisant des phrases qu'en
 * lisant la règle : on les sent avant de savoir les énoncer.
 */

export type OrderPattern = "perfekt" | "separable" | "modal" | "weil" | "inversion" | "dass";

export const ORDER_PATTERNS: OrderPattern[] = [
  "perfekt",
  "separable",
  "modal",
  "inversion",
  "weil",
  "dass",
];

export interface OrderExercise {
  pattern: OrderPattern;
  /** Nom de la structure, affiché comme consigne. */
  label: string;
  /** La phrase attendue, mot à mot. */
  solution: string[];
  /** Autres ordres également corrects, s'il y en a. */
  accepted: string[][];
  /** La règle, montrée après la réponse. */
  rule: string;
  /** Ce que la phrase veut dire, en français. */
  fr: string;
  /** Amorce affichée avant les mots à placer (pour les subordonnées). */
  lead?: string;
}

const MODALS: { form: string; fr: string }[] = [
  { form: "müssen", fr: "devoir" },
  { form: "können", fr: "pouvoir" },
  { form: "sollen", fr: "être censé" },
  { form: "dürfen", fr: "avoir le droit de" },
];

const ADVERBS: { de: string; fr: string }[] = [
  { de: "Heute", fr: "Aujourd'hui" },
  { de: "Morgen", fr: "Demain" },
  { de: "Diese Woche", fr: "Cette semaine" },
];

/** Groupe nominal à l'accusatif, article défini compris : « die Ware », « den Auftrag ». */
export function accusativePhrase(noun: Word): string | null {
  if (!noun.artikel) return null;
  const gender = noun.artikel === "der" ? "m" : noun.artikel === "die" ? "f" : "n";
  const article = articleFor(gender, "Akkusativ", "definite");
  const form = nounForm(noun, "Akkusativ", false) ?? noun.de;
  return `${article} ${form}`;
}

/** Quelles structures ce verbe permet-il d'illustrer ? */
export function orderPatternsFor(verb: Word): OrderPattern[] {
  const perfect = parsePerfect(verb);
  if (!perfect) return [];
  const { prefix, base, reflexive } = splitVerb(verb);
  // Locutions et pronominaux : le Mittelfeld y accueille d'autres éléments, et
  // plusieurs ordres deviennent corrects. On les laisse de côté.
  if (base.includes(" ") || reflexive) return [];

  return prefix ? ORDER_PATTERNS : ORDER_PATTERNS.filter((p) => p !== "separable");
}

export interface BuildInput {
  verb: Word;
  noun: Word;
  /** Indices tirés par l'appelant, pour que la construction reste déterministe. */
  modalIndex?: number;
  adverbIndex?: number;
}

/**
 * Construit l'exercice.
 *
 * Le Mittelfeld ne contient volontairement **qu'un seul** groupe. Avec un
 * complément *et* un adverbe, *Wir haben die Ware gestern geliefert* et *Wir
 * haben gestern die Ware geliefert* seraient tous deux corrects, et l'exercice
 * sanctionnerait une phrase juste. Un seul groupe, un seul ordre possible.
 */
export function buildOrderExercise(pattern: OrderPattern, input: BuildInput): OrderExercise | null {
  const { verb, noun } = input;
  const perfect = parsePerfect(verb);
  const object = accusativePhrase(noun);
  if (!perfect || !object) return null;

  const { prefix } = splitVerb(verb);
  const rows = conjugatePresent(verb);
  /** Radical conjugué, particule non comprise — c'est ce que renvoie le conjugueur. */
  const wirStem = rows[3].verb;
  const erStem = rows[2].verb;
  /**
   * En subordonnée, la particule **recolle** au verbe : *dass er die Ware
   * abholt*, et non *dass er die Ware holt ab*. C'est le seul endroit où la
   * parenthèse se referme.
   */
  const erFinite = prefix ? `${prefix}${erStem}` : erStem;
  const auxPlural = perfect.auxiliary === "hat" ? "haben" : "sind";
  const meaning = verb.fr.split(" / ")[0];

  const modal = MODALS[(input.modalIndex ?? 0) % MODALS.length];
  const adverb = ADVERBS[(input.adverbIndex ?? 0) % ADVERBS.length];

  switch (pattern) {
    case "perfekt":
      return {
        pattern,
        label: "Parfait — la parenthèse verbale",
        solution: ["Wir", auxPlural, object, perfect.bare],
        accepted: [],
        rule: `L'auxiliaire **${auxPlural}** occupe la deuxième position, le participe **${perfect.bare}** part à la toute fin. Entre les deux, le complément. C'est la **Satzklammer** : le groupe verbal encadre la phrase au lieu de rester d'un bloc comme en français.`,
        fr: `« ${meaning} » au passé — complément : « ${noun.fr} ».`,
      };

    case "separable": {
      if (!prefix) return null;
      return {
        pattern,
        label: "Particule séparable",
        solution: ["Wir", wirStem, object, prefix],
        accepted: [],
        rule: `**${verb.de}** se coupe en deux : le radical se conjugue en deuxième position, la particule **${prefix}** est rejetée en fin de proposition. C'est la même parenthèse qu'au parfait.`,
        fr: `« ${meaning} » au présent — complément : « ${noun.fr} ».`,
      };
    }

    case "modal":
      return {
        pattern,
        label: "Verbe de modalité",
        solution: ["Wir", modal.form, object, verb.de],
        accepted: [],
        rule: `Le verbe de modalité **${modal.form}** (${modal.fr}) se conjugue en deuxième position ; le verbe qui porte le sens reste à l'**infinitif**, tout à la fin — particule comprise s'il en a une.`,
        fr: `« ${modal.fr} » + « ${meaning} » — complément : « ${noun.fr} ».`,
      };

    case "inversion": {
      // Phrase à la fois : l'adverbe prend la première place, donc le sujet
      // passe derrière le verbe. La particule reste, elle, en fin de phrase.
      const solution = [adverb.de, wirStem, "wir", object];
      if (prefix) solution.push(prefix);
      return {
        pattern,
        label: "Le verbe reste en deuxième position",
        solution,
        accepted: [],
        rule: `Quand la phrase commence par autre chose que le sujet — ici **${adverb.de}** — le verbe conjugué **ne bouge pas** : il reste le deuxième élément, et c'est le sujet qui passe derrière lui. Le français dit « ${adverb.fr}, nous… » ; l'allemand ne le permet jamais.`,
        fr: `« ${adverb.fr} » en tête, puis « ${meaning} » — complément : « ${noun.fr} ».`,
      };
    }

    case "weil":
      return {
        pattern,
        label: "Subordonnée en « weil »",
        lead: "Wir sind im Verzug,",
        solution: ["weil", "wir", object, perfect.bare, auxPlural],
        accepted: [],
        rule: `Après **weil**, le verbe conjugué **${auxPlural}** passe tout à la fin, **derrière** le participe. La subordonnée renverse donc l'ordre de la principale : ce qui la terminait se retrouve avant-dernier.`,
        fr: `« Nous sommes en retard, parce que… » + « ${meaning} » au passé.`,
      };

    case "dass":
      return {
        pattern,
        label: "Subordonnée en « dass »",
        lead: "Der Kunde hat bestätigt,",
        solution: ["dass", "der Lieferant", object, erFinite],
        accepted: [],
        rule: `Après **dass**, le verbe conjugué **${erFinite}** va en dernier${
          prefix ? ` — et la particule **${prefix}** lui revient : on écrit *${erFinite}*, jamais *${erStem} … ${prefix}*` : ""
        }. La règle vaut pour *dass*, *weil*, *ob*, *wenn*, *obwohl* : tous renvoient le verbe en fin de proposition.`,
        fr: `« Le client a confirmé que le fournisseur… » + « ${meaning} » au présent.`,
      };
  }
}

/** Vrai si la suite proposée est un ordre correct. */
export function isCorrectOrder(exercise: OrderExercise, answer: readonly string[]): boolean {
  const same = (a: readonly string[], b: readonly string[]) =>
    a.length === b.length && a.every((t, i) => t === b[i]);
  return same(answer, exercise.solution) || exercise.accepted.some((alt) => same(answer, alt));
}

/** La phrase reconstituée, amorce et ponctuation comprises. */
export function sentenceOf(
  exercise: OrderExercise,
  tokens: readonly string[] = exercise.solution
): string {
  const body = tokens.join(" ");
  return exercise.lead ? `${exercise.lead} ${body}.` : `${body}.`;
}
