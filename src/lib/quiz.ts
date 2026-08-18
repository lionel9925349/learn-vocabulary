import type { Gender, Word } from "./types";
import { isNoun, displayForm } from "./types";
import { CASE_INFO, CASES, articleFor, nounForm, type CaseName } from "./declension";
import { ruleFor } from "./genderRules";
import { checkAnswer, type AcceptedForm } from "./answerCheck";
import { conjugatePresent } from "./conjugation";
import { shuffle, pick } from "./shuffle";
import { KIND_LABELS, availableKinds, type QuestionKind } from "./units";
import {
  clozeQuestion,
  governsQuestion,
  passiveQuestion,
  perfectQuestion,
  politenessQuestion,
  prepositionQuestion,
  wordOrderQuestion,
} from "./quizGrammar";
import {
  ALL_ENDINGS,
  DECLENSION_LABELS,
  GENDER_LABELS,
  adjectiveEnding,
  adjectiveStem,
  declensionFor,
  declineAdjective,
  genderKeyOf,
  type DeterminerType,
  type NumberGender,
} from "./adjectiveDeclension";

// Le type de question et la liste des facettes d'un mot vivent dans `units.ts` :
// la répétition espacée en a besoin sans rien connaître de la fabrication des
// questions. On les réexporte ici pour les appelants historiques.
export { KIND_LABELS, availableKinds };
export type { QuestionKind };

export interface Question {
  kind: QuestionKind;
  word: Word;
  /** Texte principal affiché (le mot ou la phrase à trous) */
  prompt: string;
  /**
   * Sens du mot, affiché en permanence à côté de la question.
   * Absent uniquement quand la traduction est justement la réponse attendue :
   * on n'apprend pas un article sur un mot dont on ignore le sens.
   */
  meaning?: string;
  /** Précision sous le prompt (pluriel, cas, construction…) */
  sub?: string;
  choices: string[];
  correct: string;
  /** Réponse tapée au clavier plutôt que choisie dans une liste */
  typed?: boolean;
  /**
   * Mots à remettre dans l'ordre. La réponse est alors la phrase reconstituée,
   * mots séparés par une espace — voir `word-order`.
   */
  tokens?: string[];
  builder?: boolean;
  /** Autres formulations acceptées, avec le rappel qui les accompagne */
  accepted?: AcceptedForm[];
  /** Explication montrée après la réponse */
  explanation: string;
  /** Texte à prononcer une fois la réponse donnée */
  speak?: string;
}

export interface Evaluation {
  correct: boolean;
  /** Précision affichée quand la réponse est juste mais imparfaite */
  note?: string;
}

/**
 * Juge une réponse, qu'elle ait été choisie ou tapée.
 *
 * Une faute de frappe compte comme une réussite : le mot a bien été retrouvé
 * en mémoire, c'est ce que l'exercice mesure. La forme exacte est rappelée.
 */
export function evaluate(question: Question, answer: string): Evaluation {
  if (!question.typed) return { correct: answer === question.correct };

  const result = checkAnswer(answer, question.correct, question.accepted);
  return {
    correct: result.verdict === "correct" || result.verdict === "almost",
    note: result.note,
  };
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

function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

type Frame = { build: (art: string, noun: string) => string; hint: string };

/**
 * Plusieurs tournures par cas, tirées au hasard.
 *
 * Avec un seul modèle par cas, on finissait par reconnaître la phrase plutôt
 * que le cas — « Das Problem liegt bei… » à chaque datif. La variété force à
 * relire la préposition et le verbe, qui sont justement ce qui commande le cas.
 */
const SENTENCES: Record<CaseName, Frame[]> = {
  Nominativ: [
    { build: (a, n) => `${cap(a)} ${n} ist gerade sehr gefragt.`, hint: "sujet — répond à « qui / quoi ? »" },
    { build: (a, n) => `${cap(a)} ${n} fehlt im Lager.`, hint: "sujet du verbe fehlen" },
    { build: (a, n) => `${cap(a)} ${n} wurde heute geliefert.`, hint: "sujet d'une phrase au passif" },
    { build: (a, n) => `Hier steht ${a} ${n}.`, hint: "sujet inversé, après l'adverbe" },
    { build: (a, n) => `${cap(a)} ${n} kostet zu viel.`, hint: "sujet du verbe kosten" },
  ],
  Akkusativ: [
    { build: (a, n) => `Wir brauchen ${a} ${n} dringend.`, hint: "complément d'objet direct de brauchen" },
    { build: (a, n) => `Ich habe ${a} ${n} bestellt.`, hint: "complément d'objet direct de bestellen" },
    { build: (a, n) => `Bitte prüfen Sie ${a} ${n}.`, hint: "complément d'objet direct de prüfen" },
    { build: (a, n) => `Wir suchen ${a} ${n} seit gestern.`, hint: "complément d'objet direct de suchen" },
    { build: (a, n) => `Der Kunde hat ${a} ${n} reklamiert.`, hint: "complément d'objet direct de reklamieren" },
    { build: (a, n) => `Ohne ${a} ${n} geht es nicht.`, hint: "après « ohne », qui gouverne l'accusatif" },
    { build: (a, n) => `Für ${a} ${n} zahlen wir extra.`, hint: "après « für », qui gouverne l'accusatif" },
  ],
  Dativ: [
    { build: (a, n) => `Das Problem liegt bei ${a} ${n}.`, hint: "après « bei », qui gouverne le datif" },
    { build: (a, n) => `Wir arbeiten mit ${a} ${n}.`, hint: "après « mit », qui gouverne le datif" },
    { build: (a, n) => `Nach ${a} ${n} ist Schluss.`, hint: "après « nach », qui gouverne le datif" },
    { build: (a, n) => `Die Ware kommt von ${a} ${n}.`, hint: "après « von », qui gouverne le datif" },
    { build: (a, n) => `Wir sprechen von ${a} ${n}.`, hint: "après « von », qui gouverne le datif" },
    { build: (a, n) => `Zu ${a} ${n} habe ich eine Frage.`, hint: "après « zu », qui gouverne le datif" },
    { build: (a, n) => `Seit ${a} ${n} läuft alles besser.`, hint: "après « seit », qui gouverne le datif" },
  ],
  Genitiv: [
    { build: (a, n) => `Wegen ${a} ${n} gibt es eine Verzögerung.`, hint: "après « wegen », qui gouverne le génitif" },
    { build: (a, n) => `Trotz ${a} ${n} liefern wir pünktlich.`, hint: "après « trotz », qui gouverne le génitif" },
    { build: (a, n) => `Während ${a} ${n} bleibt das Lager zu.`, hint: "après « während », qui gouverne le génitif" },
    { build: (a, n) => `Aufgrund ${a} ${n} wurde der Auftrag gestoppt.`, hint: "après « aufgrund », qui gouverne le génitif" },
    { build: (a, n) => `Innerhalb ${a} ${n} muss geliefert werden.`, hint: "après « innerhalb », qui gouverne le génitif" },
  ],
};

/** Conjugaison : une personne est demandée, les autres servent de distracteurs. */
function conjugationQuestion(word: Word): Question {
  const rows = conjugatePresent(word);
  const row = pick(rows);

  const otherForms = Array.from(new Set(rows.map((r) => r.verb))).filter((v) => v !== row.verb);
  const distractorForms = shuffle(otherForms).slice(0, 3);

  const subject = row.person === "er/sie/es" ? "er" : row.person === "sie/Sie" ? "sie" : row.person;
  const tail = row.prefix ? ` … ${row.prefix}` : "";

  const irregularNote = row.irregular
    ? `\n\nVerbe **fort** : la voyelle du radical change au singulier (${word.de} → er ${rows[2].verb}).`
    : "";
  const prefixNote = row.prefix
    ? `\n\nParticule **séparable** : elle se détache et part en fin de proposition — _${subject} ${row.verb} die Ware ${row.prefix}_.`
    : "";

  return {
    kind: "conjugation",
    word,
    prompt: `${subject} ＿＿＿${tail}`,
    meaning: `${word.de} — ${word.fr}`,
    sub: `Présent · ${row.person}`,
    choices: shuffle([row.verb, ...distractorForms]),
    correct: row.verb,
    explanation: `**${row.form}**${irregularNote}${prefixNote}${
      word.perfekt ? `\n\nParfait : **${word.perfekt}**.` : ""
    }`,
    speak: `${subject} ${row.verb}${row.prefix ? ` ${row.prefix}` : ""}`,
  };
}

/**
 * Le quatrième argument dit si le groupe nominal est au pluriel.
 *
 * Il n'est utile qu'au nominatif, mais il y est indispensable : le groupe y est
 * **sujet**, donc le verbe s'accorde avec lui. Sans cela on produisait « Hier
 * steht keine pünktlichen Sachbearbeiter » — une phrase que l'exercice
 * présentait comme le modèle à suivre.
 */
type AdjFrame = (det: string, blank: string, noun: string, plural: boolean) => string;

/** Là aussi plusieurs tournures, pour ne pas apprendre la phrase à la place de la règle. */
const ADJ_FRAMES: Record<CaseName, AdjFrame[]> = {
  Nominativ: [
    (d, b, n, pl) => `${d} ${b} ${n} ${pl ? "sind" : "ist"} wichtig.`,
    (d, b, n, pl) => `${d} ${b} ${n} ${pl ? "fehlen" : "fehlt"} noch.`,
    (d, b, n, pl) => `Hier ${pl ? "stehen" : "steht"} ${d} ${b} ${n}.`,
    (d, b, n, pl) => `${d} ${b} ${n} ${pl ? "wurden" : "wurde"} geliefert.`,
  ],
  Akkusativ: [
    (d, b, n) => `Wir brauchen ${d} ${b} ${n}.`,
    (d, b, n) => `Ich habe ${d} ${b} ${n} bestellt.`,
    (d, b, n) => `Bitte prüfen Sie ${d} ${b} ${n}.`,
    (d, b, n) => `Ohne ${d} ${b} ${n} geht es nicht.`,
  ],
  Dativ: [
    (d, b, n) => `Wir arbeiten mit ${d} ${b} ${n}.`,
    (d, b, n) => `Nach ${d} ${b} ${n} wird geprüft.`,
    (d, b, n) => `Die Ware kommt von ${d} ${b} ${n}.`,
    (d, b, n) => `Bei ${d} ${b} ${n} gibt es Probleme.`,
  ],
  Genitiv: [
    (d, b, n) => `Wegen ${d} ${b} ${n} gibt es Probleme.`,
    (d, b, n) => `Trotz ${d} ${b} ${n} liefern wir.`,
    (d, b, n) => `Während ${d} ${b} ${n} ruht die Arbeit.`,
  ],
};

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * Déclinaison de l'adjectif : on montre le déterminant et on demande la
 * terminaison, pour faire sentir que c'est lui qui commande.
 */
function adjectiveQuestion(word: Word, all: Word[]): Question {
  const nouns = all.filter((w) => isNoun(w) && w.artikel);
  const noun = pick(nouns);

  const plural = !!noun.plural && Math.random() < 0.35;
  const caseName = pick(CASES);
  const determiner: DeterminerType = pick<DeterminerType>(["definite", "indefinite", "none"]);
  const declension = declensionFor(determiner);

  const gender: NumberGender = plural ? "pl" : genderKeyOf(noun.artikel as Gender);
  const correct = declineAdjective(word.de, declension, caseName, gender);

  // « ein » n'a pas de pluriel : on illustre le mixte au pluriel avec « kein ».
  const detWord =
    determiner === "none"
      ? ""
      : determiner === "definite"
        ? articleFor(gender, caseName, "definite")
        : articleFor(gender, caseName, "indefinite");

  const nounForm_ = nounForm(noun, caseName, plural) ?? noun.de;
  const stem = adjectiveStem(word.de);

  const choices = Array.from(new Set(ALL_ENDINGS.map((e) => stem + e)));
  const distractorForms = shuffle(choices.filter((c) => c !== correct)).slice(0, 3);

  // Sans déterminant, la phrase garderait une double espace là où il manque.
  const frame = pick(ADJ_FRAMES[caseName]);
  const tidy = (s: string) => s.replace(/\s{2,}/g, " ").trim();
  const prompt = capitalize(tidy(frame(detWord, "＿＿＿", nounForm_, plural)));
  const solved = capitalize(tidy(frame(detWord, correct, nounForm_, plural)));

  const why =
    declension === "weak"
      ? `**${detWord}** porte déjà le genre et le cas, donc l'adjectif se contente de **-e** ou **-en** (déclinaison **faible**).`
      : declension === "mixed"
        ? `**${detWord}** ne marque pas toujours le genre, l'adjectif complète l'information (déclinaison **mixte**).`
        : `Sans déterminant, c'est l'adjectif qui doit porter le genre et le cas : il prend les terminaisons de l'article défini (déclinaison **forte**).`;

  return {
    kind: "adjective",
    word,
    prompt,
    meaning: `${word.de} — ${word.fr}`,
    sub: `${caseName} · ${DECLENSION_LABELS[declension]} · ${plural ? "pluriel" : GENDER_LABELS[gender]}`,
    choices: shuffle([correct, ...distractorForms]),
    correct,
    explanation: `${why}\n\nAu **${caseName}** ${plural ? "pluriel" : GENDER_LABELS[gender]}, la terminaison est **-${adjectiveEnding(declension, caseName, gender)}**.\n\n_${solved}_`,
    speak: solved,
  };
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
    case "type-de":
      return typedQuestion(word);
    case "adjective":
      return adjectiveQuestion(word, all);
    case "conjugation":
      return conjugationQuestion(word);
    // Les questions de grammaire dépendent de données qui peuvent manquer
    // (une phrase exploitable, un nom complément). Elles renvoient null dans
    // ce cas, et l'on retombe sur le sens plutôt que d'échouer.
    case "cloze":
      return clozeQuestion(word, all) ?? deFrQuestion(word, all);
    case "perfect":
      return perfectQuestion(word) ?? deFrQuestion(word, all);
    case "governs":
      return governsQuestion(word) ?? deFrQuestion(word, all);
    case "preposition":
      return prepositionQuestion(word) ?? deFrQuestion(word, all);
    case "passive":
      return passiveQuestion(word, all) ?? deFrQuestion(word, all);
    case "word-order":
      return wordOrderQuestion(word, all) ?? deFrQuestion(word, all);
    case "politeness":
      return politenessQuestion(word, all) ?? deFrQuestion(word, all);
    case "de-fr":
    default:
      return deFrQuestion(word, all);
  }
}

/** Rappel actif : le mot doit sortir de la mémoire, pas d'une liste de choix. */
function typedQuestion(word: Word): Question {
  const expected = displayForm(word);
  const accepted: AcceptedForm[] =
    isNoun(word) && word.artikel
      ? [
          {
            form: word.de,
            note: `Juste, mais un nom s'apprend toujours avec son article : **${expected}**.`,
          },
        ]
      : [];

  return {
    kind: "type-de",
    word,
    prompt: word.fr,
    sub: isNoun(word) ? "Avec son article" : word.kind === "verb" ? "À l'infinitif" : undefined,
    choices: [],
    correct: expected,
    typed: true,
    accepted,
    explanation: buildMeaningExplanation(word),
    speak: expected,
  };
}

function articleQuestion(word: Word): Question {
  return {
    kind: "article",
    word,
    prompt: word.de,
    meaning: word.fr,
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
    meaning: word.fr,
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

/**
 * Explication d'une question de sens.
 *
 * Volontairement sans règle de genre : la question portait sur la traduction,
 * et l'article est déjà sous les yeux dans la forme complète. La règle du mot
 * composé, elle, est montrée par la décomposition affichée sous la carte.
 */
function buildMeaningExplanation(word: Word): string {
  const parts: string[] = [];
  if (isNoun(word)) {
    parts.push(
      `**${displayForm(word)}** — ${word.fr}${word.plural ? ` · pluriel : die ${word.plural}` : ""}.`
    );
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

  const sentence = pick(SENTENCES[caseName]);
  const kindLabel = definite ? "article défini" : plural ? "« kein »" : "article indéfini « ein »";

  return {
    kind: "declension",
    word,
    prompt: sentence.build("＿＿＿", noun),
    meaning: `${word.artikel} ${word.de} — ${word.fr}`,
    sub: `${caseName} · ${sentence.hint} — ${kindLabel}, ${plural ? "pluriel" : `mot ${word.artikel}`}`,
    choices: shuffle([correct, ...others]),
    correct,
    explanation: `Au **${caseName}** (${CASE_INFO[caseName].fr}), ${
      plural ? "au pluriel" : `pour un mot **${word.artikel}**`
    }, l'${kindLabel} devient **${correct}**.\n\n${sentence.build(correct, noun)}`,
    speak: sentence.build(correct, noun),
  };
}
