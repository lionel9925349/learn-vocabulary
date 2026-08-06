import type { Word } from "@/lib/types";
import { RULE_UNG, RULE_MEMORIZE, RULE_ANGLICISM_DER_ER, ruleCompound } from "../ruleHelpers";

const cat = "netzwerk";

const words: Word[] = [
  { id: "netzwerk", de: "Netzwerk", artikel: "das", plural: "Netzwerke", fr: "réseau", category: cat, rule: RULE_MEMORIZE, example: { de: "Das Netzwerk ist heute sehr langsam.", fr: "Le réseau est très lent aujourd'hui." } },
  { id: "verbindung", de: "Verbindung", artikel: "die", plural: "Verbindungen", fr: "connexion", category: cat, rule: RULE_UNG, example: { de: "Die Verbindung wurde unterbrochen.", fr: "La connexion a été coupée." } },
  { id: "router", de: "Router", artikel: "der", plural: "Router", fr: "routeur", category: cat, rule: RULE_ANGLICISM_DER_ER, example: { de: "Der Router muss neu gestartet werden.", fr: "Le routeur doit être redémarré." } },
  { id: "firewall", de: "Firewall", artikel: "die", plural: "Firewalls", fr: "pare-feu", category: cat, rule: "Anglicisme composé de « wall » (die Wand/Mauer, féminin) → féminin établi (die Firewall).", example: { de: "Die Firewall blockiert den Zugriff.", fr: "Le pare-feu bloque l'accès." } },
  { id: "passwort", de: "Passwort", artikel: "das", plural: "Passwörter", fr: "mot de passe", category: cat, rule: ruleCompound("das", "Wort"), example: { de: "Das Passwort muss alle 90 Tage geändert werden.", fr: "Le mot de passe doit être changé tous les 90 jours." } },
  { id: "verschluesselung", de: "Verschlüsselung", artikel: "die", plural: "Verschlüsselungen", fr: "chiffrement", category: cat, rule: RULE_UNG, example: { de: "Die Verschlüsselung schützt die Kundendaten.", fr: "Le chiffrement protège les données clients." } },
  { id: "sicherheitskopie", de: "Sicherheitskopie", artikel: "die", plural: "Sicherheitskopien", fr: "sauvegarde", category: cat, rule: ruleCompound("die", "Kopie"), example: { de: "Die Sicherheitskopie läuft jede Nacht um 2 Uhr.", fr: "La sauvegarde s'exécute chaque nuit à 2h." } },
  { id: "cloud", de: "Cloud", artikel: "die", plural: null, fr: "cloud", category: cat, rule: "Anglicisme : féminin par analogie avec « die Wolke » (nuage), sens propre du mot.", example: { de: "Die Daten liegen in der Cloud.", fr: "Les données sont dans le cloud." } },
  { id: "zugriffsrecht", de: "Zugriffsrecht", artikel: "das", plural: "Zugriffsrechte", fr: "droit d'accès", category: cat, rule: ruleCompound("das", "Recht"), example: { de: "Das Zugriffsrecht wurde entzogen.", fr: "Le droit d'accès a été retiré." } },
  { id: "ausfallzeit", de: "Ausfallzeit", artikel: "die", plural: "Ausfallzeiten", fr: "temps d'indisponibilité", category: cat, rule: ruleCompound("die", "Zeit"), example: { de: "Die Ausfallzeit betrug nur fünf Minuten.", fr: "Le temps d'indisponibilité n'a été que de cinq minutes." } },
];

export default words;
