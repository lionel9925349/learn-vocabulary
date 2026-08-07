import type { Word } from "@/lib/types";
import { makers } from "../builders";

const zoll = makers("zoll");
const finanzen = makers("finanzen");
const komm = makers("kommunikation");

/** Douane, finance et communication — lot complémentaire. */
const words: Word[] = [
  // — Douane & commerce extérieur —
  zoll.n("Zollwert", "der", "Zollwerte", "valeur en douane"),
  zoll.n("Zollschuld", "die", "Zollschulden", "dette douanière"),
  zoll.n("Zollverfahren", "das", "Zollverfahren", "régime douanier"),
  zoll.n("Zollbeamte", "der", "Zollbeamten", "agent des douanes", { declClass: "weak" }),
  zoll.n("Zollstelle", "die", "Zollstellen", "bureau de douane"),
  zoll.n("Zollfreigabe", "die", "Zollfreigaben", "mainlevée douanière"),
  zoll.n("Zollbegleitpapier", "das", "Zollbegleitpapiere", "document de transit douanier"),
  zoll.n("Ausfuhranmeldung", "die", "Ausfuhranmeldungen", "déclaration d'exportation"),
  zoll.n("Einfuhrabgabe", "die", "Einfuhrabgaben", "droit à l'importation"),
  zoll.n("Warenverkehrsbescheinigung", "die", "Warenverkehrsbescheinigungen", "certificat de circulation (EUR.1)"),
  zoll.n("Lieferantenerklärung", "die", "Lieferantenerklärungen", "déclaration du fournisseur"),
  zoll.n("Freihandelsabkommen", "das", "Freihandelsabkommen", "accord de libre-échange"),
  zoll.n("Drittland", "das", "Drittländer", "pays tiers"),
  zoll.n("Binnenmarkt", "der", "Binnenmärkte", "marché intérieur"),
  zoll.n("Handelshemmnis", "das", "Handelshemmnisse", "barrière commerciale"),
  zoll.n("Sanktionsliste", "die", "Sanktionslisten", "liste de sanctions"),
  zoll.n("Endverbleibserklärung", "die", "Endverbleibserklärungen", "certificat de destination finale"),
  zoll.n("Zollagentur", "die", "Zollagenturen", "agence en douane"),
  zoll.n("Verzollungsauftrag", "der", "Verzollungsaufträge", "ordre de dédouanement"),
  zoll.n("Warenursprung", "der", "Warenursprünge", "origine de la marchandise"),

  // — Finance —
  finanzen.n("Zahlungseingang", "der", "Zahlungseingänge", "encaissement"),
  finanzen.n("Zahlungsausgang", "der", "Zahlungsausgänge", "décaissement"),
  finanzen.n("Zahlungsfrist", "die", "Zahlungsfristen", "délai de paiement"),
  finanzen.n("Rechnungsbetrag", "der", "Rechnungsbeträge", "montant de la facture"),
  finanzen.n("Rechnungsnummer", "die", "Rechnungsnummern", "numéro de facture"),
  finanzen.n("Rechnungsstellung", "die", "Rechnungsstellungen", "facturation"),
  finanzen.n("Teilrechnung", "die", "Teilrechnungen", "facture partielle"),
  finanzen.n("Schlussrechnung", "die", "Schlussrechnungen", "facture finale"),
  finanzen.n("Mehrwertsteuer", "die", "Mehrwertsteuern", "TVA"),
  finanzen.n("Steuersatz", "der", "Steuersätze", "taux d'imposition"),
  finanzen.n("Buchhaltung", "die", null, "comptabilité"),
  finanzen.n("Kostenstelle", "die", "Kostenstellen", "centre de coûts"),
  finanzen.n("Kostenvoranschlag", "der", "Kostenvoranschläge", "devis estimatif"),
  finanzen.n("Nachkalkulation", "die", "Nachkalkulationen", "calcul a posteriori"),
  finanzen.n("Deckungsbeitrag", "der", "Deckungsbeiträge", "marge sur coûts variables"),
  finanzen.n("Gewinnmarge", "die", "Gewinnmargen", "marge bénéficiaire"),
  finanzen.n("Liquidität", "die", null, "liquidité / trésorerie"),
  finanzen.n("Zahlungsfähigkeit", "die", null, "solvabilité"),
  finanzen.n("Forderung", "die", "Forderungen", "créance"),
  finanzen.n("Verbindlichkeit", "die", "Verbindlichkeiten", "dette / engagement"),
  finanzen.n("Rückstellung", "die", "Rückstellungen", "provision comptable"),
  finanzen.n("Jahresabschluss", "der", "Jahresabschlüsse", "clôture annuelle"),
  finanzen.n("Geschäftsjahr", "das", "Geschäftsjahre", "exercice comptable"),
  finanzen.n("Investition", "die", "Investitionen", "investissement"),
  finanzen.n("Finanzierung", "die", "Finanzierungen", "financement"),

  // — Communication —
  komm.n("Rückfrage", "die", "Rückfragen", "question de clarification"),
  komm.n("Stellungnahme", "die", "Stellungnahmen", "prise de position"),
  komm.n("Zusage", "die", "Zusagen", "accord / engagement"),
  komm.n("Ankündigung", "die", "Ankündigungen", "annonce"),
  komm.n("Bekanntgabe", "die", "Bekanntgaben", "communication officielle"),
  komm.n("Klärung", "die", "Klärungen", "clarification"),
  komm.n("Erläuterung", "die", "Erläuterungen", "explication"),
  komm.n("Zusammenfassung", "die", "Zusammenfassungen", "résumé"),
  komm.n("Vereinbarung", "die", "Vereinbarungen", "accord"),
  komm.n("Verständigung", "die", null, "entente / compréhension mutuelle"),
  komm.n("Nachricht", "die", "Nachrichten", "message"),
  komm.n("Weiterleitung", "die", "Weiterleitungen", "transfert (de message)"),
  komm.n("Gesprächsnotiz", "die", "Gesprächsnotizen", "compte rendu d'entretien"),
  komm.n("Telefonkonferenz", "die", "Telefonkonferenzen", "conférence téléphonique"),
  komm.n("Ansprache", "die", "Ansprachen", "allocution"),
];

export default words;
