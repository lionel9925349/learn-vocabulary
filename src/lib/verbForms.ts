import type { Word } from "./types";
import { splitVerb } from "./conjugation";

/**
 * Parfait et passif — les deux formes composées qu'on entend toute la journée
 * dans un entrepôt, et que le vocabulaire portait déjà sans jamais les
 * interroger.
 *
 * Le champ `perfekt` du vocabulaire note la forme complète (« hat geliefert »,
 * « ist gefahren »). Tout se déduit d'elle : l'auxiliaire, le participe, et la
 * possibilité même du passif.
 */

export interface PerfectForm {
  /** « hat » ou « ist » */
  auxiliary: "hat" | "ist";
  /** Participe passé, pronom réfléchi compris s'il y en a un. */
  participle: string;
  /** Participe seul, sans le « sich ». */
  bare: string;
  reflexive: boolean;
}

export function parsePerfect(word: Word): PerfectForm | null {
  const raw = word.perfekt?.trim();
  if (!raw) return null;

  const parts = raw.split(/\s+/);
  const auxiliary = parts[0];
  if (auxiliary !== "hat" && auxiliary !== "ist") return null;
  if (parts.length < 2) return null;

  const rest = parts.slice(1);
  const reflexive = rest[0] === "sich";
  const bare = (reflexive ? rest.slice(1) : rest).join(" ");
  if (!bare) return null;

  return { auxiliary, participle: rest.join(" "), bare, reflexive };
}

export function hasPerfect(word: Word): boolean {
  return word.kind === "verb" && parsePerfect(word) !== null;
}

/**
 * Fabrique un participe faux, mais faux d'une façon qui arrive vraiment.
 *
 * Trois fautes, et trois seulement, expliquent la quasi-totalité des erreurs
 * de participe :
 *
 *  1. **ge- ajouté là où il n'a pas lieu d'être.** Les verbes en -ieren et les
 *     verbes à préfixe inséparable n'en prennent pas : *hat reklamiert*, *hat
 *     bestellt* — jamais *gereklamiert*, jamais *gebestellt*.
 *  2. **ge- placé devant au lieu d'être inséré.** Sur un verbe à particule
 *     séparable, le ge- se glisse entre la particule et le radical :
 *     *abgeholt*, et non *geabholt*.
 *  3. **ge- oublié** sur un verbe qui en demande un.
 */
export function wrongParticiple(bare: string): string | null {
  // Participe d'un verbe à particule séparable : ge- au milieu.
  const inner = bare.match(/^(.+?)ge(.+)$/);

  if (bare.startsWith("ge")) {
    // 3. Le ge- initial est correct : la faute consiste à l'omettre.
    return bare.slice(2);
  }
  if (inner) {
    // 2. Le ge- est au milieu : la faute consiste à le remonter devant.
    return `ge${inner[1]}${inner[2]}`;
  }
  // 1. Pas de ge- du tout : la faute consiste à en ajouter un.
  return `ge${bare}`;
}

/** Réunit auxiliaire et participe, comme le vocabulaire les note. */
export function perfectLabel(aux: string, participle: string): string {
  return `${aux} ${participle}`;
}

/**
 * Le verbe se met-il au passif ?
 *
 * Le passif d'action suppose un complément d'objet direct à promouvoir en
 * sujet. Les verbes qui forment leur parfait avec **sein** sont intransitifs
 * (*ist gefahren*, *ist angekommen*) : ils n'en ont pas. Les pronominaux non
 * plus — *sich kümmern* ne se passive pas.
 */
export function canPassivize(word: Word): boolean {
  const perfect = parsePerfect(word);
  if (!perfect) return false;
  if (perfect.auxiliary !== "hat") return false;
  if (perfect.reflexive) return false;
  // Une locution (« zuständig sein ») sort du champ de ce générateur.
  return !splitVerb(word).base.includes(" ");
}

export type PassiveTense = "praesens" | "praeteritum" | "perfekt";

export const PASSIVE_LABELS: Record<PassiveTense, string> = {
  praesens: "Passif présent",
  praeteritum: "Passif prétérit",
  perfekt: "Passif parfait",
};

/** L'auxiliaire attendu au passif, à la 3ᵉ personne. */
export function passiveAuxiliary(tense: PassiveTense, plural = false): string {
  switch (tense) {
    case "praesens":
      return plural ? "werden" : "wird";
    case "praeteritum":
      return plural ? "wurden" : "wurde";
    case "perfekt":
      return plural ? "sind" : "ist";
  }
}

/**
 * Distracteurs du passif.
 *
 * La confusion à travailler n'est pas entre deux temps, c'est entre le
 * **Vorgangspassiv** et le **Zustandspassiv** : *die Sendung wird verpackt*
 * décrit l'opération en cours, *die Sendung ist verpackt* décrit le résultat.
 * Les deux sont corrects en allemand mais ne disent pas la même chose, et un
 * francophone les confond parce que le français emploie « est » dans les deux
 * cas.
 */
export function passiveDistractors(tense: PassiveTense, plural = false): string[] {
  const all = plural
    ? ["werden", "wurden", "sind", "haben"]
    : ["wird", "wurde", "ist", "hat"];
  return all.filter((a) => a !== passiveAuxiliary(tense, plural));
}

export const PASSIVE_NOTES: Record<PassiveTense, string> = {
  praesens:
    "**werden** + participe : c'est l'opération qui se déroule (Vorgangspassiv). Avec **sein**, on décrirait un résultat déjà acquis : _die Sendung ist verpackt_ = elle est emballée, c'est fini.",
  praeteritum:
    "**wurde** + participe : l'opération, située dans le passé. C'est la forme des comptes rendus et des rapports d'incident.",
  perfekt:
    "Passif parfait : **ist** + participe + **worden**. Le « worden » sans ge- est la marque du passif — _ist geliefert **worden**_, jamais _geworden_ ici.",
};
