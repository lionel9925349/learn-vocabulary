import type { Word } from "@/lib/types";
import { RULE_UNG, RULE_E_FEM, RULE_MEMORIZE, ruleCompound } from "../ruleHelpers";

const cat = "arbeit";

const words: Word[] = [
  { id: "schicht", de: "Schicht", artikel: "die", plural: "Schichten", fr: "équipe / poste (horaire)", category: cat, rule: RULE_MEMORIZE, example: { de: "Ich arbeite diese Woche in der Frühschicht.", fr: "Cette semaine je suis en équipe du matin." } },
  { id: "termin", de: "Termin", artikel: "der", plural: "Termine", fr: "rendez-vous / échéance", category: cat, rule: RULE_MEMORIZE, example: { de: "Ich habe einen Termin um 14 Uhr.", fr: "J'ai un rendez-vous à 14h." } },
  { id: "frist", de: "Frist", artikel: "die", plural: "Fristen", fr: "délai", category: cat, rule: RULE_MEMORIZE, example: { de: "Die Frist läuft am Freitag ab.", fr: "Le délai expire vendredi." } },
  { id: "aufwand", de: "Aufwand", artikel: "der", plural: null, fr: "effort / charge de travail", category: cat, rule: RULE_MEMORIZE, example: { de: "Der Aufwand wurde unterschätzt.", fr: "L'effort a été sous-estimé." } },
  { id: "freigabe", de: "Freigabe", artikel: "die", plural: "Freigaben", fr: "validation / autorisation", category: cat, rule: RULE_E_FEM, example: { de: "Ohne Freigabe geht nichts in Produktion.", fr: "Rien ne part en production sans validation." } },
  { id: "abstimmung", de: "Abstimmung", artikel: "die", plural: "Abstimmungen", fr: "concertation / accord", category: cat, rule: RULE_UNG, example: { de: "Wir brauchen eine kurze Abstimmung.", fr: "Nous avons besoin d'une brève concertation." } },
  { id: "zuschlag", de: "Zuschlag", artikel: "der", plural: "Zuschläge", fr: "prime / supplément", category: cat, rule: RULE_MEMORIZE, example: { de: "Für Nachtarbeit gibt es einen Zuschlag.", fr: "Il y a une prime pour le travail de nuit." } },
  { id: "betriebsrat", de: "Betriebsrat", artikel: "der", plural: "Betriebsräte", fr: "comité d'entreprise", category: cat, rule: ruleCompound("der", "Rat"), example: { de: "Der Betriebsrat wurde beteiligt.", fr: "Le comité d'entreprise a été consulté." } },
  { id: "arbeitszeit", de: "Arbeitszeit", artikel: "die", plural: "Arbeitszeiten", fr: "temps de travail", category: cat, rule: ruleCompound("die", "Zeit"), example: { de: "Die Arbeitszeit beträgt 38 Stunden pro Woche.", fr: "Le temps de travail est de 38 heures par semaine." } },
  { id: "urlaubsantrag", de: "Urlaubsantrag", artikel: "der", plural: "Urlaubsanträge", fr: "demande de congé", category: cat, rule: ruleCompound("der", "Antrag"), example: { de: "Der Urlaubsantrag muss zwei Wochen vorher gestellt werden.", fr: "La demande de congé doit être faite deux semaines à l'avance." } },
  { id: "sicherheitsunterweisung", de: "Sicherheitsunterweisung", artikel: "die", plural: "Sicherheitsunterweisungen", fr: "formation sécurité", category: cat, rule: ruleCompound("die", "Unterweisung"), example: { de: "Die Sicherheitsunterweisung findet jährlich statt.", fr: "La formation sécurité a lieu chaque année." } },
  { id: "arbeitsschutz", de: "Arbeitsschutz", artikel: "der", plural: null, fr: "sécurité au travail", category: cat, rule: ruleCompound("der", "Schutz"), example: { de: "Der Arbeitsschutz schreibt Sicherheitsschuhe vor.", fr: "La sécurité au travail impose des chaussures de sécurité." } },
  { id: "staplerschein", de: "Staplerschein", artikel: "der", plural: "Staplerscheine", fr: "permis cariste", category: cat, rule: ruleCompound("der", "Schein"), example: { de: "Für den Stapler brauchst du einen Staplerschein.", fr: "Pour le chariot élévateur il faut un permis cariste." } },
  { id: "einarbeitung", de: "Einarbeitung", artikel: "die", plural: null, fr: "intégration / formation initiale", category: cat, rule: RULE_UNG, example: { de: "Die Einarbeitung dauert zwei Wochen.", fr: "L'intégration dure deux semaines." } },
  { id: "leitstand", de: "Leitstand", artikel: "der", plural: "Leitstände", fr: "poste de pilotage / supervision", category: cat, rule: RULE_MEMORIZE, example: { de: "Der Leitstand überwacht alle Prozesse in Echtzeit.", fr: "Le poste de pilotage supervise tous les process en temps réel." } },
  { id: "arbeitsanweisung", de: "Arbeitsanweisung", artikel: "die", plural: "Arbeitsanweisungen", fr: "instruction de travail", category: cat, rule: ruleCompound("die", "Anweisung"), example: { de: "Die Arbeitsanweisung liegt am Arbeitsplatz aus.", fr: "L'instruction de travail est affichée au poste." } },
  { id: "teamleiter", de: "Teamleiter", artikel: "der", plural: "Teamleiter", fr: "chef d'équipe", category: cat, rule: ruleCompound("der", "Leiter"), example: { de: "Der Teamleiter verteilt die Aufgaben.", fr: "Le chef d'équipe répartit les tâches." } },
];

export default words;
