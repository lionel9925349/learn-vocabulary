import type { Word } from "@/lib/types";
import { RULE_UNG, RULE_TION, RULE_MEMORIZE, ruleCompound } from "../ruleHelpers";

const cat = "finanzen";

const words: Word[] = [
  { id: "rechnung", de: "Rechnung", artikel: "die", plural: "Rechnungen", fr: "facture", category: cat, rule: RULE_UNG, example: { de: "Die Rechnung ist noch offen.", fr: "La facture est encore en attente." } },
  { id: "zahlung", de: "Zahlung", artikel: "die", plural: "Zahlungen", fr: "paiement", category: cat, rule: RULE_UNG, example: { de: "Die Zahlung erfolgt binnen 30 Tagen.", fr: "Le paiement est effectué sous 30 jours." } },
  { id: "kosten", de: "Kosten", artikel: "die", plural: "Kosten", fr: "coûts / frais", category: cat, rule: "S'emploie uniquement au pluriel : die Kosten.", example: { de: "Die Kosten wurden um zehn Prozent gesenkt.", fr: "Les coûts ont été réduits de dix pour cent." } },
  { id: "budget", de: "Budget", artikel: "das", plural: "Budgets", fr: "budget", category: cat, rule: RULE_MEMORIZE, example: { de: "Das Budget für dieses Projekt ist begrenzt.", fr: "Le budget de ce projet est limité." } },
  { id: "gewinn", de: "Gewinn", artikel: "der", plural: "Gewinne", fr: "bénéfice", category: cat, rule: RULE_MEMORIZE, example: { de: "Der Gewinn stieg im letzten Quartal.", fr: "Le bénéfice a augmenté au dernier trimestre." } },
  { id: "verlust", de: "Verlust", artikel: "der", plural: "Verluste", fr: "perte", category: cat, rule: RULE_MEMORIZE, example: { de: "Der Verlust wurde versichert.", fr: "La perte était assurée." } },
  { id: "umsatz", de: "Umsatz", artikel: "der", plural: "Umsätze", fr: "chiffre d'affaires", category: cat, rule: RULE_MEMORIZE, example: { de: "Der Umsatz ist im Vergleich zum Vorjahr gestiegen.", fr: "Le chiffre d'affaires a augmenté par rapport à l'an dernier." } },
  { id: "versicherung", de: "Versicherung", artikel: "die", plural: "Versicherungen", fr: "assurance", category: cat, rule: RULE_UNG, example: { de: "Die Versicherung deckt Transportschäden ab.", fr: "L'assurance couvre les avaries de transport." } },
  { id: "kalkulation", de: "Kalkulation", artikel: "die", plural: "Kalkulationen", fr: "calcul de coûts / devis", category: cat, rule: RULE_TION, example: { de: "Die Kalkulation berücksichtigt die Frachtkosten.", fr: "Le calcul de coûts tient compte des frais de transport." } },
  { id: "wertschoepfung", de: "Wertschöpfung", artikel: "die", plural: null, fr: "création de valeur", category: cat, rule: ruleCompound("die", "Schöpfung", "(-ung)"), example: { de: "Die Wertschöpfung entsteht entlang der ganzen Kette.", fr: "La création de valeur se fait tout au long de la chaîne." } },
  { id: "abschreibung", de: "Abschreibung", artikel: "die", plural: "Abschreibungen", fr: "amortissement", category: cat, rule: RULE_UNG, example: { de: "Die Abschreibung erfolgt linear über fünf Jahre.", fr: "L'amortissement se fait linéairement sur cinq ans." } },
  { id: "zahlungsziel", de: "Zahlungsziel", artikel: "das", plural: "Zahlungsziele", fr: "délai de paiement", category: cat, rule: ruleCompound("das", "Ziel"), example: { de: "Das Zahlungsziel beträgt 60 Tage.", fr: "Le délai de paiement est de 60 jours." } },
  { id: "mahnung", de: "Mahnung", artikel: "die", plural: "Mahnungen", fr: "relance / mise en demeure", category: cat, rule: RULE_UNG, example: { de: "Die Mahnung wurde automatisch verschickt.", fr: "La relance a été envoyée automatiquement." } },
  { id: "bilanz", de: "Bilanz", artikel: "die", plural: "Bilanzen", fr: "bilan", category: cat, rule: RULE_MEMORIZE, example: { de: "Die Bilanz wird jährlich veröffentlicht.", fr: "Le bilan est publié chaque année." } },
];

export default words;
