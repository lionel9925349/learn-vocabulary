import type { Question } from "./quiz";
import type { Word } from "./types";
import { displayForm, isNoun } from "./types";
import { articleFor, nounForm, type CaseName } from "./declension";
import { pick, shuffle } from "./shuffle";
import { buildCloze, clozeCandidates } from "./cloze";
import { parseRektion, rektionDistractors, slotLabel } from "./rektion";
import {
  PASSIVE_LABELS,
  PASSIVE_NOTES,
  parsePerfect,
  passiveAuxiliary,
  passiveDistractors,
  wrongParticiple,
  type PassiveTense,
} from "./verbForms";
import { TWO_WAY_FRAMES } from "./prepositions";
import {
  buildOrderExercise,
  orderPatternsFor,
  sentenceOf,
  type OrderPattern,
} from "./wordOrder";

/**
 * Les questions de grammaire.
 *
 * Elles sont regroupées ici parce qu'elles partagent une logique que les
 * questions de vocabulaire n'ont pas : elles ne portent pas sur un mot, mais
 * sur ce que le mot **oblige** à faire — une préposition à choisir, un
 * auxiliaire, une place dans la phrase. Le mot n'est que le support.
 */

/**
 * Noms servant de complément d'objet dans les phrases fabriquées.
 *
 * La liste est courte et volontairement passe-partout : « die Reklamation wird
 * geliefert » est grammaticalement irréprochable et sémantiquement absurde, et
 * une phrase absurde décrédibilise la règle qu'elle est censée illustrer. Ces
 * six-là se combinent avec pratiquement tous les verbes du domaine, et
 * couvrent les trois genres pour que l'accusatif varie.
 */
const OBJECT_IDS = ["ware", "auftrag", "sendung", "material", "produkt", "karton"];

function lookup(pool: Word[], ids: string[]): Word[] {
  return ids.map((id) => pool.find((w) => w.id === id)).filter((w): w is Word => !!w);
}

function objectNoun(pool: Word[]): Word | null {
  const candidates = lookup(pool, OBJECT_IDS);
  return candidates.length ? pick(candidates) : null;
}

function genderKey(word: Word): "m" | "f" | "n" {
  return word.artikel === "der" ? "m" : word.artikel === "die" ? "f" : "n";
}

// ————————————————————————————————————————————————————————————————
// Le mot en contexte
// ————————————————————————————————————————————————————————————————

/**
 * Le mot manque dans sa propre phrase.
 *
 * On ne montre **pas** la traduction : la donner reviendrait à poser une
 * question de traduction déguisée. Ici on veut que ce soit la phrase — sa
 * construction, son article, son verbe — qui désigne le mot. La traduction
 * arrive après, dans l'explication.
 */
export function clozeQuestion(word: Word, all: Word[]): Question | null {
  const cloze = buildCloze(word);
  if (!cloze) return null;

  // Le vocabulaire contient des homographes assumés — *Container* le conteneur
  // et *Container* de Docker, *Protokoll* le journal et *Protokoll* le compte
  // rendu. Deux propositions identiques rendraient la question insoluble : on
  // dédoublonne donc sur la **forme écrite**, pas sur l'identifiant.
  const seen = new Set<string>([word.de]);
  const others: string[] = [];
  for (const candidate of shuffle(clozeCandidates(word, all))) {
    if (others.length >= 3) break;
    if (seen.has(candidate.de)) continue;
    seen.add(candidate.de);
    others.push(candidate.de);
  }
  if (others.length === 0) return null;

  return {
    kind: "cloze",
    word,
    prompt: cloze.masked,
    sub: "Un seul mot convient à cette phrase",
    choices: shuffle([word.de, ...others]),
    correct: word.de,
    explanation: `**${cloze.full}**\n\n${cloze.fr}\n\n_${displayForm(word)}_ — ${word.fr}`,
    speak: cloze.full,
  };
}

// ————————————————————————————————————————————————————————————————
// Parfait
// ————————————————————————————————————————————————————————————————

export function perfectQuestion(word: Word): Question | null {
  const perfect = parsePerfect(word);
  if (!perfect) return null;

  const otherAux = perfect.auxiliary === "hat" ? "ist" : "hat";
  const wrong = wrongParticiple(perfect.bare);
  const reflexive = perfect.reflexive ? "sich " : "";

  const choices = new Set<string>([`${perfect.auxiliary} ${perfect.participle}`]);
  choices.add(`${otherAux} ${perfect.participle}`);
  if (wrong) {
    choices.add(`${perfect.auxiliary} ${reflexive}${wrong}`);
    choices.add(`${otherAux} ${reflexive}${wrong}`);
  }

  const auxNote =
    perfect.auxiliary === "ist"
      ? "Auxiliaire **sein** : le verbe décrit un déplacement ou un changement d'état, et n'a pas de complément d'objet direct."
      : "Auxiliaire **haben**, comme la grande majorité des verbes.";

  const geNote = perfect.bare.startsWith("ge")
    ? "Le participe prend **ge-** en tête."
    : /ge/.test(perfect.bare)
      ? "Verbe à particule séparable : le **ge-** se glisse **entre** la particule et le radical."
      : "Pas de **ge-** : les verbes en *-ieren* et ceux à préfixe inséparable (be-, ver-, ent-, er-…) n'en prennent jamais.";

  return {
    kind: "perfect",
    word,
    prompt: word.de,
    meaning: word.fr,
    sub: "Auxiliaire et participe passé",
    choices: shuffle([...choices]).slice(0, 4),
    correct: `${perfect.auxiliary} ${perfect.participle}`,
    explanation: `**${word.de} → ${perfect.auxiliary} ${perfect.participle}**\n\n${auxNote}\n\n${geNote}`,
    speak: `er ${perfect.auxiliary} ${perfect.participle}`,
  };
}

// ————————————————————————————————————————————————————————————————
// Rection du verbe
// ————————————————————————————————————————————————————————————————

export function governsQuestion(word: Word): Question | null {
  const rektion = parseRektion(word.governs);
  if (!rektion) return null;

  const slot = pick(rektion.slots);
  const correct = slotLabel(slot);
  const others = rektionDistractors(slot);

  const example = word.example ? `\n\n_${word.example.de}_ — ${word.example.fr}` : "";
  const extra =
    rektion.slots.length > 1
      ? `\n\nCe verbe en régit deux : **${rektion.slots.map(slotLabel).join("** et **")}**.`
      : "";

  return {
    kind: "governs",
    word,
    prompt: `${word.de} + ＿＿＿`,
    meaning: word.fr,
    sub: "La préposition et le cas qu'elle impose",
    choices: shuffle([correct, ...others]),
    correct,
    explanation: `**${rektion.pattern}**\n\nLa préposition ne se traduit pas depuis le français : elle fait partie du verbe et s'apprend avec lui.${extra}${example}`,
    speak: word.example?.de ?? word.de,
  };
}

// ————————————————————————————————————————————————————————————————
// Prépositions mixtes : wohin ? / wo ?
// ————————————————————————————————————————————————————————————————

/**
 * La règle la plus rentable de la grammaire allemande des cas.
 *
 * Neuf prépositions se partagent entre accusatif et datif selon **le verbe** :
 * déplacement vers un lieu → accusatif ; position dans un lieu → datif. On
 * masque donc l'article, pas la préposition : c'est en lisant le verbe qu'on
 * doit trancher.
 */
export function prepositionQuestion(word: Word): Question | null {
  if (!isNoun(word) || !word.artikel) return null;

  const frame = pick(TWO_WAY_FRAMES);
  const gender = genderKey(word);
  const correct = articleFor(gender, frame.caseName, "definite");
  const form = nounForm(word, frame.caseName, false) ?? word.de;

  // Le paradigme du genre : les seules formes qui pourraient tenir ici.
  const paradigm = (["Nominativ", "Akkusativ", "Dativ", "Genitiv"] as CaseName[]).map((c) =>
    articleFor(gender, c, "definite")
  );
  const choices = [...new Set(paradigm)];
  if (choices.length < 2) return null;

  const other = frame.caseName === "Akkusativ" ? "Dativ" : "Akkusativ";
  const question = frame.caseName === "Akkusativ" ? "wohin ?" : "wo ?";

  return {
    kind: "preposition",
    word,
    prompt: frame.sentence.replace("%", `＿＿＿ ${form}`),
    meaning: `${word.artikel} ${word.de} — ${word.fr}`,
    sub: `« ${frame.prep} » est une Wechselpräposition : c'est le verbe qui décide`,
    choices: shuffle(choices),
    correct,
    explanation: `${frame.why}\n\nOn se demande **${question}** → **${frame.caseName}**, donc **${correct} ${form}**. Avec un verbe de l'autre sorte, ce serait le ${other}.\n\n_${frame.sentence.replace("%", `${correct} ${form}`)}_`,
    speak: frame.sentence.replace("%", `${correct} ${form}`),
  };
}

// ————————————————————————————————————————————————————————————————
// Passif
// ————————————————————————————————————————————————————————————————

const PASSIVE_TENSES: PassiveTense[] = ["praesens", "praeteritum", "perfekt"];

export function passiveQuestion(word: Word, all: Word[]): Question | null {
  const perfect = parsePerfect(word);
  const subject = objectNoun(all);
  if (!perfect || !subject || !subject.artikel) return null;

  const tense = pick(PASSIVE_TENSES);
  const correct = passiveAuxiliary(tense);
  const tail = tense === "perfekt" ? `${perfect.bare} worden` : perfect.bare;
  // Le groupe est en tête de phrase : l'article prend la majuscule.
  const article = subject.artikel;
  const nominative = `${article.charAt(0).toUpperCase()}${article.slice(1)} ${subject.de}`;

  return {
    kind: "passive",
    word,
    prompt: `${nominative} ＿＿＿ ${tail}.`,
    meaning: `${word.de} — ${word.fr}`,
    sub: PASSIVE_LABELS[tense],
    choices: shuffle([correct, ...passiveDistractors(tense)]),
    correct,
    explanation: `${PASSIVE_NOTES[tense]}\n\n_${nominative} **${correct}** ${tail}._`,
    speak: `${nominative} ${correct} ${tail}`,
  };
}

// ————————————————————————————————————————————————————————————————
// Ordre des mots
// ————————————————————————————————————————————————————————————————

export function wordOrderQuestion(word: Word, all: Word[]): Question | null {
  const patterns = orderPatternsFor(word);
  const noun = objectNoun(all);
  if (patterns.length === 0 || !noun) return null;

  const pattern = pick<OrderPattern>(patterns);
  const exercise = buildOrderExercise(pattern, {
    verb: word,
    noun,
    modalIndex: Math.floor(Math.random() * 4),
    adverbIndex: Math.floor(Math.random() * 3),
  });
  if (!exercise) return null;

  // Un mélange qui retombe sur la solution rendrait l'exercice vide.
  let tokens = shuffle(exercise.solution);
  for (let i = 0; i < 5 && tokens.join(" ") === exercise.solution.join(" "); i++) {
    tokens = shuffle(exercise.solution);
  }

  return {
    kind: "word-order",
    word,
    prompt: exercise.lead ?? "",
    meaning: exercise.fr,
    sub: exercise.label,
    choices: [],
    correct: exercise.solution.join(" "),
    tokens,
    builder: true,
    explanation: `**${sentenceOf(exercise)}**\n\n${exercise.rule}`,
    speak: sentenceOf(exercise),
  };
}

// ————————————————————————————————————————————————————————————————
// Registre professionnel
// ————————————————————————————————————————————————————————————————

export function politenessQuestion(word: Word, all: Word[]): Question | null {
  if (!word.direct) return null;

  const seen = new Set<string>([word.de]);
  const others: string[] = [];
  for (const candidate of shuffle(all.filter((w) => w.direct && w.id !== word.id))) {
    if (others.length >= 3) break;
    if (seen.has(candidate.de)) continue;
    seen.add(candidate.de);
    others.push(candidate.de);
  }
  if (others.length === 0) return null;

  return {
    kind: "politeness",
    word,
    prompt: word.direct,
    meaning: word.fr,
    sub: "Correct, mais brutal — comment le dirait-on au bureau ?",
    choices: shuffle([word.de, ...others]),
    correct: word.de,
    explanation: `**${word.de}**\n\n${
      word.note ??
      "L'allemand professionnel atténue systématiquement la demande, le refus et la relance. Le Konjunktiv II — *könnten*, *hätte*, *wäre*, *würde* — est l'outil de cette atténuation."
    }\n\nDirect : _${word.direct}_`,
    speak: word.de,
  };
}
