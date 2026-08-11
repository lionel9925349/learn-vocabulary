import { BASE_WORDS, inferGender } from "./genderRules";
import WORDS from "@/data";
import { isNoun, type Gender, type Word } from "./types";

/**
 * Décomposition des mots composés — le « dictionnaire » de l'application.
 *
 * Un mot comme *Wareneingangskontrolle* n'a pas d'équivalent français d'un seul
 * tenant : la traduction (« contrôle à la réception ») ne dit pas de quoi le mot
 * est fait. Le sens, lui, est entièrement contenu dans ses éléments —
 * Ware + Eingang + Kontrolle. Les montrer rend le mot lisible une fois pour
 * toutes, et rend lisibles du même coup tous les composés voisins.
 *
 * On ne découpe que si **chaque** élément est un mot connu : mieux vaut ne rien
 * proposer qu'un découpage fantaisiste (« Skonto » n'est pas *S + Konto*).
 */

export interface CompoundPart {
  /** L'élément tel qu'il apparaît dans le mot : « Waren » dans Wareneingang */
  surface: string;
  /** L'élément tel qu'on l'écrit seul : Waren → Ware */
  de: string;
  fr: string;
}

/**
 * Éléments qui ne s'emploient qu'en composition : ils n'existent pas comme
 * entrée de vocabulaire, mais reviennent dans des dizaines de mots.
 */
const MODIFIERS: Record<string, string> = {
  Dauer: "permanent",
  Durch: "à travers / de bout en bout",
  Eigen: "propre",
  Einzel: "unitaire / individuel",
  End: "final",
  Erst: "premier",
  Ersatz: "de remplacement",
  Fein: "fin / de détail",
  Fern: "à distance",
  Fertig: "fini / terminé",
  Fremd: "extérieur / tiers",
  Gegen: "contre / en retour",
  Gesamt: "total / global",
  Grob: "grossier",
  Groß: "grand / en gros",
  Grund: "de base / fondamental",
  Halb: "demi",
  Haupt: "principal",
  Höchst: "maximal",
  Ist: "réel (constaté)",
  Jahres: "annuel",
  Kern: "central / noyau",
  Klein: "petit",
  Kurz: "court",
  Lang: "long",
  Leer: "vide / à vide",
  Mehr: "multiple / pluri-",
  Mindest: "minimal",
  Nach: "après / postérieur",
  Neben: "secondaire / annexe",
  Nicht: "non-",
  Not: "d'urgence / de secours",
  Ober: "supérieur",
  Roh: "brut",
  Rück: "retour / rétro-",
  Sammel: "collectif / groupé",
  Schnell: "rapide / express",
  Selbst: "auto- / soi-même",
  Soll: "théorique (visé)",
  Sonder: "spécial / exceptionnel",
  Stamm: "de référence / maître",
  Tages: "journalier",
  Über: "sur- / au-dessus",
  Unter: "sous- / inférieur",
  Vor: "préalable / avant",
  Voll: "complet / plein",
  Weiter: "ultérieur / de suite",
  Wieder: "re- / de nouveau",
  Zeit: "temps / horaire",
  Zentral: "central",
  Zusatz: "supplémentaire",
  Zwischen: "intermédiaire",
};

/**
 * Mots qui reviennent sans cesse comme dernier élément mais qui ne sont pas au
 * programme pour eux-mêmes : sans eux, les composés les plus longs — ceux qui
 * font justement peur — resteraient des blocs opaques.
 */
const EXTRA_BASES: Record<string, string> = {
  Abgabe: "taxe / redevance",
  Abrechnung: "décompte / facturation",
  Abfertigung: "traitement / expédition (formalités)",
  Abschluss: "clôture / conclusion",
  Anwalt: "avocat",
  Auswahl: "sélection",
  Ausrüstung: "équipement",
  Ausschluss: "exclusion",
  Bearbeitung: "traitement (d'un dossier)",
  Beauftragte: "délégué / responsable désigné",
  Bedienung: "utilisation / commande",
  Bediener: "opérateur",
  Bedingung: "condition",
  Beitrag: "contribution / cotisation",
  Beobachtung: "observation / veille",
  Bereitschaft: "disponibilité / capacité à",
  Berechtigte: "personne habilitée",
  Beschränkung: "limitation",
  Beschreibung: "description",
  Bestätigung: "confirmation",
  Besserung: "amélioration",
  Bewertung: "évaluation",
  Daten: "données",
  Erhöhung: "augmentation",
  Erklärung: "déclaration / explication",
  Erzeugnis: "produit",
  Erweiterung: "extension",
  Fabrikat: "produit fabriqué",
  Fähigkeit: "capacité / aptitude",
  Fläche: "surface / aire",
  Flotte: "flotte / parc",
  Folge: "suite / conséquence",
  Führer: "conducteur / responsable",
  Gefahr: "danger",
  Gespräch: "entretien / conversation",
  Häufigkeit: "fréquence",
  Hemmnis: "obstacle / entrave",
  Hinweis: "indication / consigne",
  Kalender: "calendrier / agenda",
  Kodex: "code (de conduite)",
  Kriterium: "critère",
  Kurs: "cours / taux",
  Leiter: "chef / responsable",
  Löscher: "extincteur",
  Meldung: "message / déclaration",
  Merkblatt: "notice / fiche mémo",
  Nachweis: "preuve / justificatif",
  Notiz: "note",
  Park: "parc (d'équipements)",
  Pflege: "entretien / mise à jour",
  Planung: "planification",
  Potenzial: "potentiel",
  Quittung: "reçu / quittance",
  Reihenfolge: "ordre / séquence",
  Richtlinie: "directive",
  Rüge: "réclamation formelle / mise en demeure",
  Schnitt: "coupe / section",
  Schreiber: "enregistreur",
  Sicherheit: "sécurité / sûreté",
  Sprache: "langue",
  Strategie: "stratégie",
  Streit: "litige",
  Tiefe: "profondeur",
  Treue: "fiabilité / respect (des engagements)",
  Umgebung: "environnement",
  Unterweisung: "formation / instruction",
  Ursache: "cause",
  Verarbeitung: "traitement (informatique / industriel)",
  Verfolgung: "suivi / poursuite",
  Vereinbarung: "accord / convention",
  Verhandlung: "négociation",
  Verlängerung: "prolongation",
  Versicherung: "assurance",
  Versuch: "tentative / essai",
  Verwalter: "gestionnaire",
  Verwaltung: "gestion / administration",
  Verzug: "retard / défaillance",
  Vorbehalt: "réserve / clause de réserve",
  Vorfall: "incident",
  Vorschlag: "proposition",
  Wartung: "maintenance",
  Zentrum: "centre",
  Zone: "zone",
};

/** Lettres de liaison possibles entre deux éléments (Fugenelemente). */
const LINKS = ["", "s", "n", "en", "es", "er", "e"];

/** En dessous, un « élément » n'est qu'une coïncidence de lettres. */
const MIN_PART = 3;

type Entry = { de: string; fr: string };

/** Lexique consultable : mots du vocabulaire + bases de composition + éléments liés. */
const LEXICON = new Map<string, Entry>();

function add(de: string, fr: string) {
  addAs(de, de, fr);
}

/** Indexé sur `key`, affiché sous `de` : le radical *liefer* renvoie à *liefern*. */
function addAs(key: string, de: string, fr: string) {
  const k = key.toLowerCase();
  // Le premier inscrit gagne : le vocabulaire de l'app prime sur les listes internes.
  if (key.length >= MIN_PART && !LEXICON.has(k)) LEXICON.set(k, { de, fr });
}

/** Les noms d'abord : « Lager » est l'entrepôt avant d'être le radical de lagern. */
for (const w of WORDS) {
  if (isNoun(w) && !w.de.includes(" ")) add(w.de, w.fr);
}
// Puis les bases de composition : *Arbeitsplan* contient le nom Plan, pas le verbe planen.
for (const [base, info] of Object.entries(BASE_WORDS)) add(base, info.fr);
for (const [base, fr] of Object.entries(EXTRA_BASES)) add(base, fr);

for (const w of WORDS) {
  if (w.de.includes(" ")) continue;
  // Le radical du verbe sert d'élément de composition : liefern → Liefer(schein).
  // On l'indexe sur le radical mais on l'affiche à l'infinitif.
  if (w.kind === "verb") addAs(w.de.replace(/e?n$/, ""), w.de, w.fr);
  else if (w.kind === "adjective") add(w.de, w.fr);
}

for (const [mod, fr] of Object.entries(MODIFIERS)) add(mod, fr);

function lookup(fragment: string): Entry | null {
  return LEXICON.get(fragment.toLowerCase()) ?? null;
}

/**
 * Découpe récursive par la droite : on cherche le dernier élément le plus long
 * possible, puis on redécoupe ce qui reste devant.
 */
function split(word: string, depth = 0): CompoundPart[] | null {
  if (depth > 3 || word.length < MIN_PART * 2) return null;

  const cuts: { head: string; tail: string }[] = [];
  for (let at = MIN_PART; at <= word.length - MIN_PART; at++) {
    cuts.push({ head: word.slice(0, at), tail: word.slice(at) });
  }
  // Dernier élément le plus long d'abord : Waren|eingang plutôt que Warenein|gang.
  cuts.sort((a, b) => b.tail.length - a.tail.length);

  for (const { head, tail } of cuts) {
    const last = lookup(tail);
    if (!last) continue;
    const lastPart: CompoundPart = { surface: tail, de: last.de, fr: last.fr };

    for (const link of LINKS) {
      if (link && !head.toLowerCase().endsWith(link)) continue;
      const stem = head.slice(0, head.length - link.length);
      if (stem.length < MIN_PART) continue;

      const first = lookup(stem);
      if (first) return [{ surface: head, de: first.de, fr: first.fr }, lastPart];

      // Le radical se découpe encore : la lettre de liaison reste collée au
      // dernier de ses éléments, pour que les surfaces recomposent le mot.
      const deeper = split(stem, depth + 1);
      if (deeper) {
        const inner = deeper[deeper.length - 1];
        const joined = [...deeper.slice(0, -1), { ...inner, surface: inner.surface + link }];
        return [...joined, lastPart];
      }
    }
  }

  return null;
}

const cache = new Map<string, CompoundPart[] | null>();

/**
 * Éléments d'un mot composé, du premier au dernier — ou `null` si le mot est
 * simple, inconnu, ou trop incertain pour être découpé.
 */
export function decompose(de: string): CompoundPart[] | null {
  if (/[\s-]/.test(de) || de.length < MIN_PART * 2) return null;
  const cached = cache.get(de);
  if (cached !== undefined) return cached;

  const parts = split(de);
  const result = parts && parts.length >= 2 ? parts : null;
  cache.set(de, result);
  return result;
}

/** Le mot réécrit avec ses coupures : Waren·eingangs·kontrolle */
export function segmented(parts: CompoundPart[]): string {
  return parts.map((p) => p.surface).join("·");
}

const ARTICLES = new Map<string, Gender>();
const IDS = new Map<string, string>();
for (const w of WORDS) {
  if (isNoun(w) && w.artikel && !ARTICLES.has(w.de)) ARTICLES.set(w.de, w.artikel);
  if (!IDS.has(w.de)) IDS.set(w.de, w.id);
}

/**
 * Fiche correspondant à un élément de composition, s'il est lui-même au
 * programme : de proche en proche, on remonte ainsi tout un composé.
 */
export function wordIdOf(de: string): string | null {
  return IDS.get(de) ?? null;
}
for (const [base, info] of Object.entries(BASE_WORDS)) {
  if (!ARTICLES.has(base)) ARTICLES.set(base, info.gender);
}

/**
 * Article d'un élément de composition, quand on peut le connaître : du
 * vocabulaire, du lexique des bases, ou à défaut de sa terminaison.
 * C'est ce qui permet de dire « le genre vient de **die Kontrolle** ».
 */
export function articleOf(de: string): Gender | null {
  return ARTICLES.get(de) ?? inferGender(de);
}

/**
 * La décomposition montre-t-elle déjà d'où vient le genre ? Si oui, inutile de
 * réafficher la règle du mot composé : le mot l'explique de lui-même.
 */
export function explainsGender(word: Word): boolean {
  if (!isNoun(word) || !word.artikel) return false;
  const parts = decompose(word.de);
  if (!parts) return false;
  return articleOf(parts[parts.length - 1].de) === word.artikel;
}
