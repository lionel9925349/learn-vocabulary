import type { Word } from "@/lib/types";
import { CASES, articleFor, nounForm, type CaseName } from "@/lib/declension";

export type ArticleType = "definite" | "indefinite";

export const DEFINITE_POOL = ["der", "die", "das", "den", "dem", "des"];
export const EIN_POOL = ["ein", "eine", "einen", "einem", "eines", "einer"];
export const KEIN_POOL = ["kein", "keine", "keinen", "keinem", "keines", "keiner"];

export interface Round {
  word: Word;
  caseName: CaseName;
  plural: boolean;
  type: ArticleType;
  correct: string;
  choices: string[];
  noun: string;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function genderKey(w: Word): "m" | "f" | "n" {
  return w.artikel === "der" ? "m" : w.artikel === "die" ? "f" : "n";
}

export function buildRound(pool: Word[]): Round | null {
  if (pool.length === 0) return null;
  const word = pool[Math.floor(Math.random() * pool.length)];
  const canPlural = !!word.plural;
  const plural = canPlural && Math.random() < 0.5;
  const caseName = CASES[Math.floor(Math.random() * CASES.length)];
  const type: ArticleType = Math.random() < 0.5 ? "definite" : "indefinite";

  const gender = plural ? "pl" : genderKey(word);
  const correct = articleFor(gender, caseName, type);
  const noun = nounForm(word, caseName, plural) ?? word.de;

  const distractPool = type === "definite" ? DEFINITE_POOL : plural ? KEIN_POOL : EIN_POOL;
  const others = shuffle(distractPool.filter((x) => x !== correct)).slice(0, 3);
  const choices = shuffle([correct, ...others]);

  return { word, caseName, plural, type, correct, choices, noun };
}
