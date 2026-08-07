import type { Category } from "@/lib/types";

const categories: Category[] = [
  // — Logistique —
  { key: "lager", label: "Lager & Bestand", description: "Entrepôt, stockage, inventaire", group: "Logistik" },
  { key: "transport", label: "Transport & Versand", description: "Transport, expédition, fret", group: "Logistik" },
  { key: "zoll", label: "Zoll & Außenhandel", description: "Douane, import/export, incoterms", group: "Logistik" },
  { key: "verpackung", label: "Verpackung", description: "Emballage, étiquetage", group: "Logistik" },
  { key: "produktion", label: "Produktion", description: "Production, fabrication, atelier", group: "Logistik" },
  { key: "kennzahlen", label: "Kennzahlen", description: "Indicateurs, mesure de performance", group: "Logistik" },

  // — Achats —
  { key: "einkauf", label: "Einkauf & Beschaffung", description: "Achats, fournisseurs, négociation", group: "Einkauf" },
  { key: "qualitaet", label: "Qualität & Reklamation", description: "Qualité, réclamations, litiges", group: "Einkauf" },
  { key: "finanzen", label: "Finanzen", description: "Facturation, paiement, coûts", group: "Einkauf" },
  { key: "recht", label: "Recht & Verträge", description: "Droit des contrats, conformité", group: "Einkauf" },

  // — IT —
  { key: "it", label: "IT & Systeme", description: "Systèmes d'entreprise, données, sécurité", group: "IT" },
  { key: "software", label: "Software & ERP", description: "ERP, WMS, TMS, logiciels métier", group: "IT" },
  { key: "programmierung", label: "Programmierung", description: "Développement logiciel, code", group: "IT" },
  { key: "netzwerk", label: "Netzwerk & Sicherheit", description: "Réseau, infrastructure, cybersécurité", group: "IT" },

  // — Langue générale —
  { key: "verben", label: "Verben", description: "Verbes du quotidien professionnel", group: "Sprache" },
  { key: "wendungen", label: "Wendungen", description: "Expressions toutes faites (mails, réunions)", group: "Sprache" },
  { key: "adjektive", label: "Adjektive & Adverbien", description: "Adjectifs et mots de liaison", group: "Sprache" },
  { key: "buero", label: "Büro & Organisation", description: "Bureau, RH, administration", group: "Sprache" },
  { key: "arbeit", label: "Arbeitsplatz", description: "Travail, équipes, sécurité", group: "Sprache" },
  { key: "kommunikation", label: "Kommunikation", description: "Communication, réunions", group: "Sprache" },
  { key: "personen", label: "Personen & Rollen", description: "Métiers et rôles", group: "Sprache" },
];

export default categories;
