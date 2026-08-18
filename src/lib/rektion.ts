import type { CaseName } from "./declension";
import type { Word } from "./types";

/**
 * Rection du verbe : quelle préposition, et quel cas derrière elle.
 *
 * C'est l'endroit où le français induit le plus sûrement en erreur, parce
 * qu'il a ses propres prépositions et qu'elles ne correspondent pas :
 * *participer **à** une réunion* mais *teilnehmen **an** einer Besprechung* ;
 * *s'occuper **de*** mais *sich kümmern **um***. Traduire la préposition mot à
 * mot donne à peu près toujours une faute, et c'est une faute qui s'entend.
 *
 * La donnée existe déjà dans le vocabulaire, sous forme de patron lisible
 * (« an etwas (Dat.) teilnehmen »). Ce module le relit pour en tirer des
 * questions.
 */

export interface RektionSlot {
  /** La préposition régie : an, auf, über, mit… */
  prep: string;
  caseName: CaseName;
  /** Ce qu'elle introduit, tel qu'écrit dans le patron : « etwas », « jemandem »… */
  object: string;
}

export interface Rektion {
  /** Verbe pronominal : sich kümmern, sich einigen… */
  reflexive: boolean;
  slots: RektionSlot[];
  /** Le patron d'origine, réaffiché tel quel dans l'explication. */
  pattern: string;
}

const CASE_OF: Record<string, CaseName> = {
  Nom: "Nominativ",
  Akk: "Akkusativ",
  Dat: "Dativ",
  Gen: "Genitiv",
};

export const CASE_SHORT: Record<CaseName, string> = {
  Nominativ: "Nom.",
  Akkusativ: "Akk.",
  Dativ: "Dat.",
  Genitiv: "Gen.",
};

/**
 * Prépositions susceptibles d'être régies par un verbe.
 *
 * Volontairement plus large que l'inventaire de `prepositions.ts` : dans une
 * rection, la préposition perd son sens spatial d'origine (*warten **auf*** ne
 * veut pas dire « attendre sur »). C'est justement ce qui la rend arbitraire,
 * donc à apprendre par cœur.
 */
const REKTION_PREPOSITIONS: Record<string, CaseName | "two-way"> = {
  an: "two-way",
  auf: "two-way",
  aus: "Dativ",
  bei: "Dativ",
  für: "Akkusativ",
  gegen: "Akkusativ",
  in: "two-way",
  mit: "Dativ",
  nach: "Dativ",
  über: "two-way",
  um: "Akkusativ",
  unter: "two-way",
  von: "Dativ",
  vor: "two-way",
  zu: "Dativ",
  zwischen: "two-way",
};

/**
 * Prépositions les plus souvent confondues entre elles dans une rection.
 * Ce sont celles que le français pousse à employer à la place les unes des
 * autres — ce qui en fait de bons pièges, à la différence d'une préposition
 * qui ne viendrait à l'idée de personne.
 */
const CONFUSABLE = ["an", "auf", "über", "um", "für", "mit", "bei", "von", "nach", "zu"];

/**
 * Relit un patron de rection.
 *
 * Un patron est une suite de groupes « préposition + objet + (Cas.) », par
 * exemple *sich bei jemandem (Dat.) für etwas (Akk.) bedanken* — deux
 * prépositions, deux cas différents, sur un seul verbe.
 */
export function parseRektion(governs: string | undefined): Rektion | null {
  if (!governs) return null;

  const reflexive = /\bsich\b/.test(governs);
  const slots: RektionSlot[] = [];

  // « préposition objet (Cas.) » — l'objet est un mot indéfini du patron.
  // Pas de `\b` en tête : en JavaScript la limite de mot est définie sur
  // l'ASCII, si bien que « über » — qui commence par une lettre accentuée —
  // n'était jamais reconnu, et trois rections passaient à la trappe.
  const re = /(?:^|[\s(])([a-zäöüß]+)\s+(etwas|jemandem|jemanden|jemand)\s*\((Nom|Akk|Dat|Gen)\.?\)/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(governs)) !== null) {
    const [, prep, object, caseTag] = match;
    if (!(prep in REKTION_PREPOSITIONS)) continue;
    slots.push({ prep, caseName: CASE_OF[caseTag], object });
  }

  if (slots.length === 0) return null;
  return { reflexive, slots, pattern: governs };
}

/** Le verbe impose-t-il une préposition ? C'est la condition pour l'interroger dessus. */
export function hasRektion(word: Word): boolean {
  return word.kind === "verb" && parseRektion(word.governs) !== null;
}

/** Étiquette d'une réponse : « an + Dativ ». */
export function slotLabel(slot: RektionSlot): string {
  return `${slot.prep} + ${slot.caseName}`;
}

/**
 * Fabrique des réponses fausses plausibles.
 *
 * Le piège doit porter sur ce qui se confond réellement : la même préposition
 * avec l'autre cas (*an + Akk.* contre *an + Dat.*), et les prépositions
 * concurrentes que le français suggère. Un distracteur absurde n'apprend rien.
 */
export function rektionDistractors(slot: RektionSlot, count = 3): string[] {
  const out: string[] = [];
  const correct = slotLabel(slot);

  // 1. Même préposition, cas opposé : la confusion la plus fréquente.
  const otherCase: CaseName = slot.caseName === "Dativ" ? "Akkusativ" : "Dativ";
  out.push(`${slot.prep} + ${otherCase}`);

  // 2. Prépositions concurrentes, avec un cas qu'elles peuvent réellement
  //    régir : proposer « aus + Akkusativ » n'apprendrait rien, puisque « aus »
  //    ne régit jamais l'accusatif.
  for (const prep of CONFUSABLE) {
    if (out.length >= count) break;
    if (prep === slot.prep) continue;
    const group = REKTION_PREPOSITIONS[prep];
    const c: CaseName = group === "two-way" ? slot.caseName : group;
    const label = `${prep} + ${c}`;
    if (label !== correct && !out.includes(label)) out.push(label);
  }

  return out.slice(0, count);
}
