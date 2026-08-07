import type { Gender, Word } from "./types";
import { isNoun, displayForm } from "./types";
import { CASE_INFO, CASES, articleFor, nounForm, type CaseName } from "./declension";
import { ruleFor } from "./genderRules";

export type QuestionKind = "article" | "de-fr" | "fr-de" | "plural" | "declension";

export const KIND_LABELS: Record<QuestionKind, string> = {
  article: "Quel article ?",
  "de-fr": "Que signifie ce mot ?",
  "fr-de": "Comment le dit-on en allemand ?",
  plural: "Quel est le pluriel ?",
  declension: "Quelle forme de l'article ?",
};

export interface Question {
  kind: QuestionKind;
  word: Word;
  /** Texte principal affiché (le mot ou la phrase à trous) */
  prompt: string;
  /** Précision sous le prompt */
  sub?: string;
  choices: string[];
  correct: string;
  /** Explication montrée après la réponse */
  explanation: string;
  /** Texte à prononcer une fois la réponse donnée */
  speak?: string;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Distracteurs pris en priorité dans le même thème : plus exigeant et plus utile. */
function distractors(word: Word, all: Word[], value: (w: Word) => string | null, count = 3): string[] {
  const target = value(word);
  const sameCat = all.filter((w) => w.id !== word.id && w.category === word.category);
  const others = all.filter((w) => w.id !== word.id && w.category !== word.category);

  const out: string[] = [];
  const seen = new Set<string>([target ?? ""]);

  for (const candidate of [...shuffle(sameCat), ...shuffle(others)]) {
    if (out.length >= count) break;
    const v = value(candidate);
    if (!v || seen.has(v)) continue;
    seen.add(v);
    out.push(v);
  }
  return out;
}

const DEFINITE_POOL = ["der", "die", "das", "den", "dem", "des"];
const EIN_POOL = ["ein", "eine", "einen", "einem", "eines", "einer"];
const KEIN_POOL = ["kein", "keine", "keinen", "keinem", "keines", "keiner"];

const SENTENCES: Record<CaseName, { build: (art: string, noun: string) => string; hint: string }> = {
  Nominativ: {
    build: (a, n) => `${a.charAt(0).toUpperCase() + a.slice(1)} ${n} ist gerade sehr gefragt.`,
    hint: "sujet — répond à « qui / quoi ? »",
  },
  Akkusativ: {
    build: (a, n) => `Wir brauchen ${a} ${n} dringend.`,
    hint: "complément d'objet direct — après le verbe",
  },
  Dativ: {
    build: (a, n) => `Das Problem liegt bei ${a} ${n}.`,
    hint: "après « bei », qui gouverne le datif",
  },
  Genitiv: {
    build: (a, n) => `Wegen ${a} ${n} gibt es eine Verzögerung.`,
    hint: "après « wegen », qui gouverne le génitif",
  },
};

/** Types de questions possibles pour un mot donné. */
export function availableKinds(word: Word): QuestionKind[] {
  const kinds: QuestionKind[] = ["de-fr", "fr-de"];
  if (isNoun(word) && word.artikel) {
    kinds.push("article", "declension");
    if (word.plural) kinds.push("plural");
  }
  return kinds;
}

export function buildQuestion(word: Word, all: Word[], kind?: QuestionKind): Question {
  const kinds = availableKinds(word);
  const chosen = kind && kinds.includes(kind) ? kind : pick(kinds);

  switch (chosen) {
    case "article":
      return articleQuestion(word);
    case "plural":
      return pluralQuestion(word, all);
    case "declension":
      return declensionQuestion(word);
    case "fr-de":
      return frDeQuestion(word, all);
    case "de-fr":
    default:
      return deFrQuestion(word, all);
  }
}

function articleQuestion(word: Word): Question {
  return {
    kind: "article",
    word,
    prompt: word.de,
    sub: word.plural ? `Pluriel : die ${word.plural}` : undefined,
    choices: ["der", "die", "das"],
    correct: word.artikel as Gender,
    explanation: ruleFor(word),
    speak: displayForm(word),
  };
}

function pluralQuestion(word: Word, all: Word[]): Question {
  const correct = word.plural as string;
  const others = distractors(
    word,
    all.filter((w) => isNoun(w) && w.plural),
    (w) => w.plural ?? null
  );
  return {
    kind: "plural",
    word,
    prompt: `${word.artikel} ${word.de}`,
    sub: word.fr,
    choices: shuffle([correct, ...others]),
    correct,
    explanation: `Au pluriel, l'article devient **die** pour tous les genres : **die ${correct}**. Au datif pluriel, le nom prend en plus un **-n** s'il n'en a pas déjà.`,
    speak: `die ${correct}`,
  };
}

function deFrQuestion(word: Word, all: Word[]): Question {
  const others = distractors(word, all, (w) => w.fr);
  return {
    kind: "de-fr",
    word,
    prompt: displayForm(word),
    choices: shuffle([word.fr, ...others]),
    correct: word.fr,
    explanation: buildMeaningExplanation(word),
    speak: displayForm(word),
  };
}

function frDeQuestion(word: Word, all: Word[]): Question {
  const correct = displayForm(word);
  const others = distractors(word, all, (w) => displayForm(w));
  return {
    kind: "fr-de",
    word,
    prompt: word.fr,
    sub: isNoun(word) ? "Attention à l'article" : undefined,
    choices: shuffle([correct, ...others]),
    correct,
    explanation: buildMeaningExplanation(word),
    speak: correct,
  };
}

function buildMeaningExplanation(word: Word): string {
  const parts: string[] = [];
  if (isNoun(word)) {
    parts.push(
      `**${displayForm(word)}** — ${word.fr}${word.plural ? ` · pluriel : die ${word.plural}` : ""}.`
    );
    parts.push(ruleFor(word));
  } else {
    parts.push(`**${word.de}** — ${word.fr}.`);
    if (word.perfekt) parts.push(`Parfait : **${word.perfekt}**.`);
    if (word.governs) parts.push(`Se construit avec : **${word.governs}**.`);
  }
  if (word.example) parts.push(`_${word.example.de}_ — ${word.example.fr}`);
  return parts.join("\n\n");
}

function declensionQuestion(word: Word): Question {
  const plural = !!word.plural && Math.random() < 0.5;
  const caseName = pick(CASES);
  const definite = Math.random() < 0.5;

  const gender = plural ? "pl" : word.artikel === "der" ? "m" : word.artikel === "die" ? "f" : "n";
  const correct = articleFor(gender, caseName, definite ? "definite" : "indefinite");
  const noun = nounForm(word, caseName, plural) ?? word.de;

  const poolForKind = definite ? DEFINITE_POOL : plural ? KEIN_POOL : EIN_POOL;
  const others = shuffle(poolForKind.filter((x) => x !== correct)).slice(0, 3);

  const sentence = SENTENCES[caseName];
  const kindLabel = definite ? "article défini" : plural ? "« kein »" : "article indéfini « ein »";

  return {
    kind: "declension",
    word,
    prompt: sentence.build("＿＿＿", noun),
    sub: `${caseName} · ${sentence.hint} — ${kindLabel}, ${plural ? "pluriel" : `mot ${word.artikel}`}`,
    choices: shuffle([correct, ...others]),
    correct,
    explanation: `Au **${caseName}** (${CASE_INFO[caseName].fr}), ${
      plural ? "au pluriel" : `pour un mot **${word.artikel}**`
    }, l'${kindLabel} devient **${correct}**.\n\n${sentence.build(correct, noun)}`,
    speak: sentence.build(correct, noun),
  };
}
