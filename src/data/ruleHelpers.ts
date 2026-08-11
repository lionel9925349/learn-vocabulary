import type { Gender } from "@/lib/types";

/** Règles de genre réutilisables (référence pédagogique, en français). */
export const RULE_UNG =
  "Suffixe **-ung** → toujours féminin (die), sans exception. Ex : die Lösung, die Buchung.";
export const RULE_TION =
  "Suffixe **-tion/-sion** → toujours féminin (die). Ex : die Funktion, die Version.";
export const RULE_HEIT =
  "Suffixe **-heit** → toujours féminin (die). Ex : die Sicherheit.";
export const RULE_KEIT =
  "Suffixe **-keit** → toujours féminin (die). Ex : die Möglichkeit.";
export const RULE_SCHAFT =
  "Suffixe **-schaft** → toujours féminin (die). Ex : die Mannschaft.";
export const RULE_IE =
  "Suffixe **-ie** → toujours féminin (die). Ex : die Kategorie, die Energie.";
export const RULE_UR =
  "Suffixe **-ur** → féminin dans la quasi-totalité des cas (die). Ex : die Struktur.";
export const RULE_ANZ =
  "Suffixe **-anz** → toujours féminin (die). Ex : die Distanz.";
export const RULE_ENZ =
  "Suffixe **-enz** → toujours féminin (die). Ex : die Kompetenz.";
export const RULE_TAT =
  "Suffixe **-tät** → toujours féminin (die). Ex : die Qualität, die Kapazität.";
export const RULE_IK =
  "Suffixe **-ik** → généralement féminin (die). Ex : die Logistik, die Technik.";
export const RULE_E_FEM =
  "Nom simple en **-e** → féminin dans ~90 % des cas (die). Ex : die Palette, die Rampe.";
export const RULE_ER_AGENT =
  "Suffixe **-er** désignant une personne ou un outil/agent → masculin (der). Ex : der Fahrer, der Stapler.";
export const RULE_EUR =
  "Suffixe **-eur** (métier, souvent d'origine française) → masculin (der). Ex : der Spediteur.";
export const RULE_ANT_ENT =
  "Suffixe **-ant/-ent** (personne) → masculin (der), et suit la n-Déclinaison (dem/den/des Mandant**en**).";
export const RULE_CHEN_LEIN =
  "Suffixe diminutif **-chen/-lein** → toujours neutre (das), quel que soit le genre du mot de base. Ex : das Päckchen.";
export const RULE_MENT =
  "Suffixe **-ment** (emprunt au français) → généralement neutre (das). Ex : das Dokument.";
export const RULE_ISMUS =
  "Suffixe **-ismus** → toujours masculin (der).";
export const RULE_OR =
  "Suffixe **-or** → généralement masculin (der). Ex : der Motor, der Sensor.";
export const RULE_ISCH_SUBST =
  "Nom substantivé en **-ion/-tik/-ie** → féminin, comme la plupart des emprunts savants.";
export const RULE_ANGLICISM_DAS =
  "Anglicisme récent, sans terminaison allemande reconnaissable → par défaut neutre (das) en cas de doute (règle du \"genre par défaut\").";
export const RULE_ANGLICISM_DER_ER =
  "Anglicisme se terminant en **-er** (agent/outil) → masculin (der), comme les noms d'agent allemands.";
export const RULE_INFINITIV =
  "Infinitif substantivé (verbe utilisé comme nom) → toujours neutre (das). Ex : das Buchen, das Lagern.";
export const RULE_NUR_PLURAL =
  "Ce mot s'emploie surtout, voire uniquement, au pluriel.";
export const RULE_MEMORIZE =
  "Pas de terminaison indicatrice ici : ce genre s'apprend par cœur, avec le mot lui-même.";

/**
 * Mot composé : le genre suit toujours le dernier élément du mot.
 *
 * Formulation volontairement brève : cette règle revient sur des centaines de
 * mots, et une fois qu'elle est acquise, la répéter en trois lignes à chaque
 * fiche ne fait qu'enterrer le reste. Le détail des éléments est montré à part,
 * par la décomposition du mot.
 */
export function ruleCompound(baseArtikel: Gender, baseWord: string, extra?: string): string {
  const base = `Mot composé : le genre est celui du dernier élément → **${baseArtikel} ${baseWord}**.`;
  return extra ? `${base} ${extra}` : base;
}
