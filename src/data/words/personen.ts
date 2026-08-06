import type { Word } from "@/lib/types";
import { RULE_ANT_ENT, ruleCompound } from "../ruleHelpers";

const cat = "personen";

const words: Word[] = [
  { id: "lagerleiter", de: "Lagerleiter", artikel: "der", plural: "Lagerleiter", fr: "responsable d'entrepôt", category: cat, rule: ruleCompound("der", "Leiter"), example: { de: "Der Lagerleiter genehmigt Überstunden.", fr: "Le responsable d'entrepôt valide les heures supplémentaires." } },
  { id: "schichtleiter", de: "Schichtleiter", artikel: "der", plural: "Schichtleiter", fr: "chef d'équipe (poste)", category: cat, rule: ruleCompound("der", "Leiter"), example: { de: "Der Schichtleiter verteilt die Aufgaben.", fr: "Le chef de poste répartit les tâches." } },
  { id: "logistikleiter", de: "Logistikleiter", artikel: "der", plural: "Logistikleiter", fr: "directeur logistique", category: cat, rule: ruleCompound("der", "Leiter"), example: { de: "Der Logistikleiter berichtet direkt an die Geschäftsführung.", fr: "Le directeur logistique rend compte directement à la direction." } },
  { id: "kunde", de: "Kunde", artikel: "der", plural: "Kunden", declClass: "weak", fr: "client", category: cat, rule: "Nom simple en **-e** désignant une personne → souvent masculin faible (n-Déklination) : den/dem/des Kund**en**.", example: { de: "Der Kunde erwartet die Lieferung morgen.", fr: "Le client attend la livraison demain." } },
  { id: "kollege", de: "Kollege", artikel: "der", plural: "Kollegen", declClass: "weak", fr: "collègue", category: cat, rule: "Nom en **-e** (personne) → masculin faible : den/dem/des Kolleg**en**.", example: { de: "Mein Kollege übernimmt die Nachtschicht.", fr: "Mon collègue prend l'équipe de nuit." } },
  { id: "mitarbeiter", de: "Mitarbeiter", artikel: "der", plural: "Mitarbeiter", fr: "collaborateur / employé", category: cat, rule: ruleCompound("der", "Arbeiter"), example: { de: "Der Mitarbeiter meldet sich beim Pförtner an.", fr: "L'employé se signale au gardien." } },
  { id: "praktikant", de: "Praktikant", artikel: "der", plural: "Praktikanten", declClass: "weak", fr: "stagiaire", category: cat, rule: RULE_ANT_ENT, example: { de: "Der Praktikant lernt das WMS kennen.", fr: "Le stagiaire découvre le WMS." } },
  { id: "vorgesetzter", de: "Vorgesetzter", artikel: "der", plural: "Vorgesetzte", fr: "supérieur hiérarchique", category: cat, rule: "Adjectif substantivé (« vorgesetzt » = placé au-dessus) → décline comme un adjectif, genre selon la personne désignée.", example: { de: "Der Vorgesetzte hat den Urlaub genehmigt.", fr: "Le supérieur a validé le congé." } },
  { id: "projektleiter", de: "Projektleiter", artikel: "der", plural: "Projektleiter", fr: "chef de projet", category: cat, rule: ruleCompound("der", "Leiter"), example: { de: "Der Projektleiter koordiniert alle Beteiligten.", fr: "Le chef de projet coordonne toutes les parties prenantes." } },
  { id: "ansprechpartner", de: "Ansprechpartner", artikel: "der", plural: "Ansprechpartner", fr: "interlocuteur", category: cat, rule: ruleCompound("der", "Partner"), example: { de: "Ihr Ansprechpartner ist ab Montag verfügbar.", fr: "Votre interlocuteur est disponible à partir de lundi." } },
  { id: "gabelstaplerfahrer", de: "Gabelstaplerfahrer", artikel: "der", plural: "Gabelstaplerfahrer", fr: "cariste", category: cat, rule: ruleCompound("der", "Fahrer"), example: { de: "Der Gabelstaplerfahrer braucht einen gültigen Schein.", fr: "Le cariste doit avoir un permis valide." } },
];

export default words;
