import type { Category } from "@/lib/types";

const categories: Category[] = [
  { key: "lager", label: "Lager & Bestand", description: "Entrepôt, stockage, inventaire" },
  { key: "transport", label: "Transport & Versand", description: "Transport, expédition, camions, fret" },
  { key: "zoll", label: "Zoll & Außenhandel", description: "Douane, import/export, incoterms" },
  { key: "einkauf", label: "Einkauf & Beschaffung", description: "Achats, fournisseurs, contrats" },
  { key: "produktion", label: "Produktion & Fertigung", description: "Production, fabrication, atelier" },
  { key: "verpackung", label: "Verpackung & Kennzeichnung", description: "Emballage, étiquetage" },
  { key: "qualitaet", label: "Qualität & Reklamation", description: "Qualité, réclamations, litiges" },
  { key: "software", label: "Software & IT-Systeme", description: "ERP, WMS, TMS, systèmes métier" },
  { key: "programmierung", label: "Programmierung & Entwicklung", description: "Développement logiciel, code" },
  { key: "netzwerk", label: "Netzwerk & Sicherheit", description: "Réseau, IT, cybersécurité" },
  { key: "finanzen", label: "Finanzen & Verträge", description: "Finance, facturation, contrats" },
  { key: "arbeit", label: "Arbeitsplatz & Organisation", description: "Travail, équipes, organisation" },
  { key: "kommunikation", label: "Kommunikation & Meetings", description: "Communication, réunions" },
  { key: "personen", label: "Personen & Rollen", description: "Métiers et rôles en logistique" },
];

export default categories;
