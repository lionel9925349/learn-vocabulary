/**
 * Comparaison des réponses tapées au clavier.
 *
 * On veut sanctionner les vraies fautes d'allemand, pas les accidents de
 * clavier : un clavier français n'a ni ä, ni ö, ni ü, ni ß, et l'usage admet
 * de les écrire ae/oe/ue/ss. En revanche la majuscule des noms communs est une
 * règle d'orthographe à part entière — on la signale sans compter la réponse
 * comme fausse.
 */

import { foldGerman, normalize } from "./text";

export type AnswerVerdict = "correct" | "almost" | "wrong";

export interface AnswerCheck {
  verdict: AnswerVerdict;
  /** Précision affichée quand la réponse est acceptée malgré une imperfection. */
  note?: string;
}

/** Comparaison stricte au sens de l'allemand (accents et casse compris). */
function exact(a: string, b: string): boolean {
  return a.trim().replace(/\s+/g, " ") === b.trim().replace(/\s+/g, " ");
}

/** Distance de Levenshtein, pour distinguer la faute de frappe de la réponse fausse. */
function editDistance(a: string, b: string): number {
  if (a === b) return 0;
  const prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  const cur = new Array<number>(b.length + 1);

  for (let i = 1; i <= a.length; i++) {
    cur[0] = i;
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(
        prev[j] + 1,
        cur[j - 1] + 1,
        prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
    for (let j = 0; j <= b.length; j++) prev[j] = cur[j];
  }
  return prev[b.length];
}

/** Variante acceptée, avec le rappel pédagogique qui l'accompagne. */
export interface AcceptedForm {
  form: string;
  note: string;
}

/**
 * Compare une saisie à la réponse attendue.
 *
 * `accepted` tolère d'autres formulations correctes — typiquement le nom sans
 * son article — tout en rappelant la forme complète attendue.
 */
export function checkAnswer(
  input: string,
  expected: string,
  accepted: AcceptedForm[] = []
): AnswerCheck {
  if (exact(input, expected)) return { verdict: "correct" };

  for (const alt of accepted) {
    if (exact(input, alt.form) || normalize(input) === normalize(alt.form)) {
      return { verdict: "correct", note: alt.note };
    }
  }

  // Bon mot, mais casse ou caractères allemands approchés.
  if (normalize(input) === normalize(expected)) {
    return {
      verdict: "correct",
      note: `En allemand on écrit **${expected}** — attention à la majuscule.`,
    };
  }
  if (foldGerman(normalize(input)) === foldGerman(normalize(expected))) {
    return {
      verdict: "correct",
      note: `Accepté, mais l'orthographe exacte est **${expected}**.`,
    };
  }
  for (const alt of accepted) {
    if (foldGerman(normalize(input)) === foldGerman(normalize(alt.form))) {
      return { verdict: "correct", note: alt.note };
    }
  }

  // Faute de frappe : une lettre d'écart sur un mot d'une certaine longueur.
  const target = foldGerman(normalize(expected));
  const typed = foldGerman(normalize(input));
  const tolerance = target.length >= 8 ? 2 : 1;
  if (typed.length > 0 && editDistance(typed, target) <= tolerance) {
    return { verdict: "almost", note: `Presque : la forme exacte est **${expected}**.` };
  }

  return { verdict: "wrong" };
}
