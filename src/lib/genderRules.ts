import type { Gender, Word } from "./types";

/**
 * Déduit le genre d'un nom allemand depuis sa morphologie, et produit
 * l'explication pédagogique correspondante.
 *
 * Deux mécanismes, dans cet ordre de priorité :
 *  1. le mot composé prend le genre de son DERNIER élément (règle la plus rentable) ;
 *  2. à défaut, la terminaison (-ung, -tion, -heit…) donne le genre.
 *
 * Sert aussi de garde-fou : `npm run check:data` compare le genre déduit au
 * genre déclaré et signale toute incohérence dans la base de vocabulaire.
 */

export interface GenderExplanation {
  gender: Gender;
  text: string;
  /** "compound" | "suffix" — d'où vient la déduction */
  source: "compound" | "suffix";
}

interface SuffixRule {
  suffix: string;
  gender: Gender;
  /** Fiabilité : "absolute" = sans exception, "strong" = quasi systématique */
  strength: "absolute" | "strong";
  note: string;
  examples: string;
}

/** Terminaisons fiables, de la plus longue à la plus courte (l'ordre compte). */
const SUFFIX_RULES: SuffixRule[] = [
  { suffix: "ung", gender: "die", strength: "absolute", note: "sans aucune exception", examples: "die Lösung, die Buchung, die Bestellung" },
  { suffix: "heit", gender: "die", strength: "absolute", note: "sans exception", examples: "die Sicherheit, die Freiheit" },
  { suffix: "keit", gender: "die", strength: "absolute", note: "sans exception", examples: "die Möglichkeit, die Pünktlichkeit" },
  { suffix: "schaft", gender: "die", strength: "absolute", note: "sans exception", examples: "die Mannschaft, die Partnerschaft" },
  { suffix: "tion", gender: "die", strength: "absolute", note: "sans exception", examples: "die Funktion, die Reklamation" },
  { suffix: "sion", gender: "die", strength: "absolute", note: "sans exception", examples: "die Version, die Provision" },
  { suffix: "tät", gender: "die", strength: "absolute", note: "sans exception", examples: "die Qualität, die Kapazität" },
  { suffix: "ität", gender: "die", strength: "absolute", note: "sans exception", examples: "die Qualität, die Priorität" },
  { suffix: "ik", gender: "die", strength: "strong", note: "presque toujours", examples: "die Logistik, die Technik, die Statistik" },
  { suffix: "ie", gender: "die", strength: "strong", note: "presque toujours", examples: "die Kategorie, die Energie, die Garantie" },
  { suffix: "enz", gender: "die", strength: "absolute", note: "sans exception", examples: "die Kompetenz, die Differenz" },
  { suffix: "anz", gender: "die", strength: "absolute", note: "sans exception", examples: "die Distanz, die Toleranz" },
  { suffix: "ur", gender: "die", strength: "strong", note: "quasi systématique", examples: "die Struktur, die Reparatur, die Inventur" },
  { suffix: "age", gender: "die", strength: "strong", note: "emprunts au français", examples: "die Kartonage, die Montage" },
  { suffix: "chen", gender: "das", strength: "absolute", note: "diminutif : neutre quel que soit le genre du mot de base", examples: "das Päckchen (← die Packung), das Mädchen" },
  { suffix: "lein", gender: "das", strength: "absolute", note: "diminutif : toujours neutre", examples: "das Büchlein" },
  { suffix: "ment", gender: "das", strength: "strong", note: "emprunts, presque toujours neutres", examples: "das Dokument, das Sortiment" },
  { suffix: "tum", gender: "das", strength: "strong", note: "presque toujours (sauf der Reichtum, der Irrtum)", examples: "das Eigentum, das Wachstum" },
  { suffix: "nis", gender: "das", strength: "strong", note: "majoritairement neutre", examples: "das Ergebnis, das Verhältnis" },
  { suffix: "ismus", gender: "der", strength: "absolute", note: "sans exception", examples: "der Mechanismus, der Kapitalismus" },
  { suffix: "eur", gender: "der", strength: "strong", note: "noms de métier empruntés au français", examples: "der Spediteur, der Ingenieur" },
  // -ant / -ent volontairement absents : masculins seulement quand ils désignent
  // une personne (der Lieferant), mais neutres sinon (das Kontingent, das Patent).
  // La morphologie seule ne permet pas de trancher — ces mots portent leur règle à la main.
  { suffix: "or", gender: "der", strength: "strong", note: "presque toujours", examples: "der Motor, der Sensor, der Faktor" },
  { suffix: "ling", gender: "der", strength: "absolute", note: "sans exception", examples: "der Lehrling, der Prüfling" },
];

/**
 * Lexique des mots simples servant de dernier élément dans les composés.
 * C'est ce qui permet d'expliquer « Wareneingang → der Eingang ».
 */
export const BASE_WORDS: Record<string, { gender: Gender; fr: string }> = {
  // — der —
  Abruf: { gender: "der", fr: "appel / retrait" },
  Antrag: { gender: "der", fr: "demande" },
  Anteil: { gender: "der", fr: "part" },
  Artikel: { gender: "der", fr: "article" },
  Auftrag: { gender: "der", fr: "ordre / commande" },
  Ausgang: { gender: "der", fr: "sortie" },
  Aufwand: { gender: "der", fr: "effort / charge" },
  Bedarf: { gender: "der", fr: "besoin" },
  Befehl: { gender: "der", fr: "ordre / commande" },
  Begriff: { gender: "der", fr: "notion" },
  Beleg: { gender: "der", fr: "justificatif" },
  Bereich: { gender: "der", fr: "domaine / zone" },
  Bericht: { gender: "der", fr: "rapport" },
  Bestand: { gender: "der", fr: "stock" },
  Betrag: { gender: "der", fr: "montant" },
  Betrieb: { gender: "der", fr: "exploitation / entreprise" },
  Brief: { gender: "der", fr: "lettre" },
  Code: { gender: "der", fr: "code" },
  Dienst: { gender: "der", fr: "service" },
  Druck: { gender: "der", fr: "pression / impression" },
  Eingang: { gender: "der", fr: "entrée" },
  Engpass: { gender: "der", fr: "goulot d'étranglement" },
  Fall: { gender: "der", fr: "cas" },
  Fehler: { gender: "der", fr: "erreur" },
  Fluss: { gender: "der", fr: "flux" },
  Grad: { gender: "der", fr: "degré" },
  Grund: { gender: "der", fr: "raison / fond" },
  Handel: { gender: "der", fr: "commerce" },
  Kanal: { gender: "der", fr: "canal" },
  Kauf: { gender: "der", fr: "achat" },
  Kreis: { gender: "der", fr: "cercle" },
  Kunde: { gender: "der", fr: "client" },
  Lauf: { gender: "der", fr: "cours / marche" },
  Markt: { gender: "der", fr: "marché" },
  Ort: { gender: "der", fr: "lieu" },
  Pass: { gender: "der", fr: "passage" },
  Plan: { gender: "der", fr: "plan" },
  Platz: { gender: "der", fr: "place / emplacement" },
  Preis: { gender: "der", fr: "prix" },
  Prozess: { gender: "der", fr: "processus" },
  Punkt: { gender: "der", fr: "point" },
  Rat: { gender: "der", fr: "conseil" },
  Raum: { gender: "der", fr: "espace" },
  Rabatt: { gender: "der", fr: "remise" },
  Satz: { gender: "der", fr: "taux / phrase / jeu (ensemble)" },
  Schaden: { gender: "der", fr: "dommage" },
  Schein: { gender: "der", fr: "bon / certificat" },
  Schlag: { gender: "der", fr: "coup" },
  Schluss: { gender: "der", fr: "conclusion / fin" },
  Schritt: { gender: "der", fr: "étape" },
  Schutz: { gender: "der", fr: "protection" },
  Server: { gender: "der", fr: "serveur" },
  Stand: { gender: "der", fr: "état / niveau" },
  Stamm: { gender: "der", fr: "souche / référentiel" },
  Stoff: { gender: "der", fr: "matière" },
  Strom: { gender: "der", fr: "courant / flux" },
  Tarif: { gender: "der", fr: "tarif" },
  Termin: { gender: "der", fr: "rendez-vous / échéance" },
  Test: { gender: "der", fr: "test" },
  Träger: { gender: "der", fr: "support / porteur" },
  Umsatz: { gender: "der", fr: "chiffre d'affaires" },
  Umschlag: { gender: "der", fr: "manutention" },
  Übergang: { gender: "der", fr: "transition / transfert" },
  Ursprung: { gender: "der", fr: "origine" },
  Verband: { gender: "der", fr: "fédération" },
  Verkehr: { gender: "der", fr: "trafic" },
  Verlust: { gender: "der", fr: "perte" },
  Versand: { gender: "der", fr: "expédition" },
  Vertrag: { gender: "der", fr: "contrat" },
  Vorgang: { gender: "der", fr: "opération / processus" },
  Vorrat: { gender: "der", fr: "réserve" },
  Wagen: { gender: "der", fr: "véhicule / chariot" },
  Weg: { gender: "der", fr: "chemin" },
  Wert: { gender: "der", fr: "valeur" },
  Zettel: { gender: "der", fr: "billet / fiche" },
  Zoll: { gender: "der", fr: "douane" },
  Zug: { gender: "der", fr: "train / traction" },
  Zugang: { gender: "der", fr: "accès" },
  Zustand: { gender: "der", fr: "état" },

  // — die —
  Abwicklung: { gender: "die", fr: "traitement / exécution" },
  Analyse: { gender: "die", fr: "analyse" },
  Angabe: { gender: "die", fr: "indication" },
  Anlage: { gender: "die", fr: "installation" },
  Annahme: { gender: "die", fr: "réception / hypothèse" },
  Anzahl: { gender: "die", fr: "nombre" },
  Arbeit: { gender: "die", fr: "travail" },
  Art: { gender: "die", fr: "type / manière" },
  Aufgabe: { gender: "die", fr: "tâche" },
  Bank: { gender: "die", fr: "banque" },
  Basis: { gender: "die", fr: "base" },
  Box: { gender: "die", fr: "caisse / boîte" },
  Brücke: { gender: "die", fr: "pont" },
  Datei: { gender: "die", fr: "fichier" },
  Dauer: { gender: "die", fr: "durée" },
  Einheit: { gender: "die", fr: "unité" },
  Fahrt: { gender: "die", fr: "trajet" },
  Firma: { gender: "die", fr: "entreprise" },
  Folie: { gender: "die", fr: "film / feuille" },
  Fracht: { gender: "die", fr: "fret" },
  Frist: { gender: "die", fr: "délai" },
  Führung: { gender: "die", fr: "conduite / direction" },
  Gebühr: { gender: "die", fr: "redevance" },
  Größe: { gender: "die", fr: "taille" },
  Grenze: { gender: "die", fr: "frontière / limite" },
  Halle: { gender: "die", fr: "halle" },
  Karte: { gender: "die", fr: "carte" },
  Kette: { gender: "die", fr: "chaîne" },
  Kiste: { gender: "die", fr: "caisse" },
  Klasse: { gender: "die", fr: "classe" },
  Kontrolle: { gender: "die", fr: "contrôle" },
  Kopie: { gender: "die", fr: "copie" },
  Lage: { gender: "die", fr: "situation / position" },
  Leistung: { gender: "die", fr: "prestation / performance" },
  Liste: { gender: "die", fr: "liste" },
  Lücke: { gender: "die", fr: "lacune / faille" },
  Marke: { gender: "die", fr: "marque" },
  Maßnahme: { gender: "die", fr: "mesure" },
  Menge: { gender: "die", fr: "quantité" },
  Nummer: { gender: "die", fr: "numéro" },
  Oberfläche: { gender: "die", fr: "surface / interface" },
  Ordnung: { gender: "die", fr: "ordre" },
  Palette: { gender: "die", fr: "palette" },
  Pflicht: { gender: "die", fr: "obligation" },
  Prüfung: { gender: "die", fr: "contrôle / examen" },
  Quelle: { gender: "die", fr: "source" },
  Quote: { gender: "die", fr: "taux / quota" },
  Rate: { gender: "die", fr: "taux / échéance" },
  Rechnung: { gender: "die", fr: "facture" },
  Reihe: { gender: "die", fr: "série / rangée" },
  Schicht: { gender: "die", fr: "équipe / couche" },
  Schlange: { gender: "die", fr: "file" },
  Schrift: { gender: "die", fr: "écrit" },
  Sicherung: { gender: "die", fr: "sécurisation / sauvegarde" },
  Software: { gender: "die", fr: "logiciel" },
  Sperre: { gender: "die", fr: "blocage" },
  Spur: { gender: "die", fr: "trace / voie" },
  Stelle: { gender: "die", fr: "endroit / poste" },
  Steuer: { gender: "die", fr: "impôt / taxe" },
  Straße: { gender: "die", fr: "route" },
  Strafe: { gender: "die", fr: "pénalité" },
  Struktur: { gender: "die", fr: "structure" },
  Stufe: { gender: "die", fr: "niveau / palier" },
  Tabelle: { gender: "die", fr: "tableau" },
  Ware: { gender: "die", fr: "marchandise" },
  Weise: { gender: "die", fr: "manière" },
  Zahl: { gender: "die", fr: "nombre / chiffre" },
  Zeit: { gender: "die", fr: "temps" },

  // — das —
  Abkommen: { gender: "das", fr: "accord" },
  Amt: { gender: "das", fr: "administration / office" },
  Band: { gender: "das", fr: "bande / convoyeur" },
  Blatt: { gender: "das", fr: "feuille" },
  Buch: { gender: "das", fr: "livre" },
  Datum: { gender: "das", fr: "date" },
  Ergebnis: { gender: "das", fr: "résultat" },
  Fach: { gender: "das", fr: "casier / spécialité" },
  Feld: { gender: "das", fr: "champ" },
  Fenster: { gender: "das", fr: "fenêtre" },
  Formular: { gender: "das", fr: "formulaire" },
  Gerät: { gender: "das", fr: "appareil" },
  Geschäft: { gender: "das", fr: "affaire / commerce" },
  Gesetz: { gender: "das", fr: "loi" },
  Gewicht: { gender: "das", fr: "poids" },
  Gut: { gender: "das", fr: "bien / marchandise" },
  Heft: { gender: "das", fr: "cahier" },
  Jahr: { gender: "das", fr: "année" },
  Konto: { gender: "das", fr: "compte" },
  Lager: { gender: "das", fr: "entrepôt / stock" },
  Land: { gender: "das", fr: "pays" },
  Management: { gender: "das", fr: "gestion" },
  Maß: { gender: "das", fr: "mesure" },
  Material: { gender: "das", fr: "matériel" },
  Mittel: { gender: "das", fr: "moyen" },
  Netz: { gender: "das", fr: "réseau" },
  Niveau: { gender: "das", fr: "niveau" },
  Papier: { gender: "das", fr: "papier" },
  Personal: { gender: "das", fr: "personnel" },
  Produkt: { gender: "das", fr: "produit" },
  Programm: { gender: "das", fr: "programme" },
  Projekt: { gender: "das", fr: "projet" },
  Protokoll: { gender: "das", fr: "procès-verbal / protocole" },
  Recht: { gender: "das", fr: "droit" },
  Regal: { gender: "das", fr: "rayonnage" },
  Register: { gender: "das", fr: "registre" },
  Risiko: { gender: "das", fr: "risque" },
  Schiff: { gender: "das", fr: "navire" },
  Stück: { gender: "das", fr: "pièce" },
  System: { gender: "das", fr: "système" },
  Teil: { gender: "das", fr: "pièce / partie" },
  Tor: { gender: "das", fr: "portail / quai" },
  Verfahren: { gender: "das", fr: "procédure" },
  Werk: { gender: "das", fr: "usine / ouvrage" },
  Wesen: { gender: "das", fr: "nature / entité" },
  Wort: { gender: "das", fr: "mot" },
  Ziel: { gender: "das", fr: "objectif" },
  Zeichen: { gender: "das", fr: "signe" },
  Zeugnis: { gender: "das", fr: "certificat" },
  Zimmer: { gender: "das", fr: "pièce / chambre" },
};

/** Bases triées par longueur décroissante : on cherche le plus long suffixe possible. */
const SORTED_BASES = Object.keys(BASE_WORDS).sort((a, b) => b.length - a.length);
const SORTED_SUFFIXES = [...SUFFIX_RULES].sort((a, b) => b.suffix.length - a.suffix.length);

/**
 * Longueur minimale du premier élément d'un composé. Sans ce garde-fou,
 * « Skonto » passerait pour un composé de « Konto » (alors que c'est der Skonto).
 */
const MIN_PREFIX = 2;

/** Longueur minimale du radical devant une terminaison, même raison : « Tor » n'est pas un mot en -or. */
const MIN_STEM = 2;

/** Trouve le dernier élément d'un mot composé, s'il est connu du lexique. */
export function findCompoundBase(word: string): { base: string; gender: Gender; fr: string } | null {
  const lower = word.toLowerCase();
  for (const base of SORTED_BASES) {
    const b = base.toLowerCase();
    // Composé : le mot se termine par la base, précédée d'un premier élément réel.
    if (lower.length >= b.length + MIN_PREFIX && lower.endsWith(b)) {
      return { base, ...BASE_WORDS[base] };
    }
  }
  return null;
}

function findSuffix(word: string): SuffixRule | null {
  const lower = word.toLowerCase();
  for (const rule of SORTED_SUFFIXES) {
    if (lower.length >= rule.suffix.length + MIN_STEM && lower.endsWith(rule.suffix)) {
      return rule;
    }
  }
  return null;
}

/** Genre déduit de la morphologie, ou null si le mot ne suit aucune règle connue. */
export function inferGender(word: string): Gender | null {
  const compound = findCompoundBase(word);
  if (compound) return compound.gender;
  const suffix = findSuffix(word);
  if (suffix) return suffix.gender;
  return null;
}

/** Explication pédagogique déduite, ou null s'il n'y a pas de règle applicable. */
export function explainGender(word: string): GenderExplanation | null {
  const compound = findCompoundBase(word);
  if (compound) {
    return {
      gender: compound.gender,
      source: "compound",
      text: `Mot composé : le genre est celui du dernier élément → **${compound.gender} ${compound.base}** (${compound.fr}).`,
    };
  }
  const suffix = findSuffix(word);
  if (suffix) {
    return {
      gender: suffix.gender,
      source: "suffix",
      text: `Terminaison **-${suffix.suffix}** → **${suffix.gender}** (${suffix.note}). Ex. : ${suffix.examples}.`,
    };
  }
  return null;
}

const MEMORIZE =
  "Pas de terminaison ni de composition qui trahisse le genre : celui-ci s'apprend avec le mot. Répète-le toujours article compris.";

/** Règle affichée pour un mot : la règle écrite à la main si elle existe, sinon la règle déduite. */
export function ruleFor(word: Word): string {
  if (word.rule) return word.rule;
  const explained = explainGender(word.de);
  // On n'affiche la règle déduite que si elle tombe juste : sinon le mot est une exception.
  if (explained && explained.gender === word.artikel) return explained.text;
  return MEMORIZE;
}
