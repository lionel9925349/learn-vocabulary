import type { Word } from "./types";
import { isNoun } from "./types";

/**
 * Le mot dans sa phrase.
 *
 * Le vocabulaire porte déjà plus de deux mille phrases authentiques, qui
 * n'étaient jusqu'ici que **montrées**. Or lire une phrase et devoir la
 * compléter ne mobilisent pas la même mémoire : dans le premier cas on
 * reconnaît, dans le second on produit. C'est le second qui fait tenir un mot.
 *
 * Le trou remplace le mot exactement tel qu'il apparaît, sans le fabriquer :
 * si le mot n'est pas présent littéralement dans sa phrase — parce qu'il y est
 * fléchi, ou parce qu'une particule séparable l'a coupé en deux — on renonce.
 * Un exercice bâti sur une forme approximative apprendrait une faute.
 */

export const BLANK = "＿＿＿＿";

export interface Cloze {
  /** La phrase avec le trou. */
  masked: string;
  /** Ce qu'il faut y replacer. */
  answer: string;
  /** La phrase entière, pour l'explication. */
  full: string;
  fr: string;
}

/** Toutes les phrases attachées à un mot, l'exemple principal d'abord. */
export function sentencesOf(word: Word): { de: string; fr: string }[] {
  const all = word.example ? [word.example, ...(word.sentences ?? [])] : (word.sentences ?? []);
  // Une même phrase peut figurer comme exemple *et* dans la liste d'usages.
  const seen = new Set<string>();
  return all.filter((s) => (seen.has(s.de) ? false : (seen.add(s.de), true)));
}

/**
 * Le mot apparaît-il tel quel dans la phrase, comme mot entier ?
 *
 * On exige une frontière de part et d'autre — sans quoi *Ware* serait « trouvé »
 * à l'intérieur de *Warenausgang*, et le trou emporterait la moitié d'un autre
 * mot.
 */
function findWholeWord(sentence: string, target: string): number {
  let from = 0;
  for (;;) {
    const at = sentence.indexOf(target, from);
    if (at === -1) return -1;
    const before = at === 0 ? " " : sentence[at - 1];
    const after = at + target.length >= sentence.length ? " " : sentence[at + target.length];
    const isLetter = (c: string) => /[a-zA-ZäöüÄÖÜß]/.test(c);
    if (!isLetter(before) && !isLetter(after)) return at;
    from = at + 1;
  }
}

/** Fabrique le texte à trou pour un mot, ou null si sa phrase ne s'y prête pas. */
export function buildCloze(word: Word): Cloze | null {
  for (const sentence of sentencesOf(word)) {
    const at = findWholeWord(sentence.de, word.de);
    if (at === -1) continue;

    const before = sentence.de.slice(0, at);
    const after = sentence.de.slice(at + word.de.length);
    const masked = `${before}${BLANK}${after}`;

    /**
     * La réponse ne doit plus être lisible nulle part.
     *
     * *Die Ware steht im Wareneingang* : masquer « Ware » laisse
     * « Wareneingang », où la réponse se lit encore en toutes lettres. La
     * question ne teste alors plus rien. On passe à la phrase suivante.
     */
    if (masked.includes(word.de)) continue;

    return {
      masked,
      answer: word.de,
      full: sentence.de,
      fr: sentence.fr,
    };
  }
  return null;
}

export function hasCloze(word: Word): boolean {
  return buildCloze(word) !== null;
}

/**
 * Un distracteur n'est utile que s'il **pourrait** tenir dans le trou.
 *
 * On les prend donc de même nature et, pour les noms, de même genre : sur
 * *Wir prüfen den ＿＿＿*, une réponse féminine se disqualifierait toute seule
 * par l'article, et la question ne testerait plus rien.
 */
export function clozeCandidates(word: Word, pool: Word[]): Word[] {
  const sameKind = pool.filter((w) => w.id !== word.id && (w.kind ?? "noun") === (word.kind ?? "noun"));
  if (!isNoun(word) || !word.artikel) return sameKind;
  return sameKind.filter((w) => w.artikel === word.artikel);
}
