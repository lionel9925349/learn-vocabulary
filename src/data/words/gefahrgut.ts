import type { Word } from "@/lib/types";
import { makers } from "../builders";

const { n, v, adj } = makers("gefahrgut");

/**
 * Marchandises dangereuses (ADR/GGVSEB) : réglementation, classes, étiquetage,
 * documents et acteurs. Vocabulaire à part entière en logistique, avec ses
 * propres obligations et son propre jargon.
 */
const words: Word[] = [
  // — Notions de base —
  n("Gefahrgut", "das", "Gefahrgüter", "marchandise dangereuse"),
  n("Gefahrgutklasse", "die", "Gefahrgutklassen", "classe de danger (ADR)"),
  n("Gefahrgutbeauftragte", "der", "Gefahrgutbeauftragten", "conseiller à la sécurité", { declClass: "weak" }),
  n("Gefahrgutrecht", "das", null, "réglementation des matières dangereuses"),
  n("Gefahrgutvorschrift", "die", "Gefahrgutvorschriften", "prescription matières dangereuses"),
  n("Gefahrnummer", "die", "Gefahrnummern", "code de danger (Kemler)"),
  n("UN-Nummer", "die", "UN-Nummern", "numéro ONU"),
  n("Stoffnummer", "die", "Stoffnummern", "numéro de matière"),
  n("Verpackungsgruppe", "die", "Verpackungsgruppen", "groupe d'emballage"),
  n("Freigrenze", "die", "Freigrenzen", "seuil d'exemption"),
  n("Freistellung", "die", "Freistellungen", "exemption"),
  n("Beförderungskategorie", "die", "Beförderungskategorien", "catégorie de transport"),

  // — Types de danger —
  n("Explosivstoff", "der", "Explosivstoffe", "matière explosible (classe 1)"),
  n("Druckgas", "das", "Druckgase", "gaz comprimé (classe 2)"),
  n("Flüssigkeit", "die", "Flüssigkeiten", "liquide"),
  n("Entzündbarkeit", "die", null, "inflammabilité"),
  n("Selbstentzündung", "die", "Selbstentzündungen", "auto-inflammation"),
  n("Giftstoff", "der", "Giftstoffe", "matière toxique (classe 6.1)"),
  n("Ätzstoff", "der", "Ätzstoffe", "matière corrosive (classe 8)"),
  n("Radioaktivität", "die", null, "radioactivité (classe 7)"),
  n("Umweltgefährdung", "die", "Umweltgefährdungen", "danger pour l'environnement"),
  n("Wassergefährdungsklasse", "die", "Wassergefährdungsklassen", "classe de danger pour l'eau"),

  // — Étiquetage et signalisation —
  n("Gefahrzettel", "der", "Gefahrzettel", "étiquette de danger (losange)"),
  n("Warntafel", "die", "Warntafeln", "panneau orange"),
  n("Kennzeichnungspflicht", "die", "Kennzeichnungspflichten", "obligation d'étiquetage"),
  n("Gefahrensymbol", "das", "Gefahrensymbole", "pictogramme de danger"),
  n("Gefahrenhinweis", "der", "Gefahrenhinweise", "mention de danger (phrase H)"),
  n("Sicherheitshinweis", "der", "Sicherheitshinweise", "conseil de prudence (phrase P)"),
  n("Sicherheitsdatenblatt", "das", "Sicherheitsdatenblätter", "fiche de données de sécurité"),
  n("Beförderungspapier", "das", "Beförderungspapiere", "document de transport ADR"),
  n("Unfallmerkblatt", "das", "Unfallmerkblätter", "consignes écrites de sécurité"),

  // — Emballage et chargement —
  n("Gefahrgutverpackung", "die", "Gefahrgutverpackungen", "emballage homologué"),
  n("Bauartzulassung", "die", "Bauartzulassungen", "agrément de type"),
  n("Höchstmenge", "die", "Höchstmengen", "quantité maximale"),
  n("Zusammenladeverbot", "das", "Zusammenladeverbote", "interdiction de chargement en commun"),
  n("Trennvorschrift", "die", "Trennvorschriften", "règle de ségrégation"),
  n("Ladungssicherungspflicht", "die", null, "obligation d'arrimage"),
  n("Auffangwanne", "die", "Auffangwannen", "bac de rétention"),
  n("Leckage", "die", "Leckagen", "fuite"),
  n("Austritt", "der", "Austritte", "échappement / fuite (de produit)"),

  // — Sécurité et incidents —
  n("Schutzausrüstung", "die", "Schutzausrüstungen", "équipement de protection"),
  n("Atemschutz", "der", null, "protection respiratoire"),
  n("Feuerlöscher", "der", "Feuerlöscher", "extincteur"),
  n("Notfallnummer", "die", "Notfallnummern", "numéro d'urgence"),
  n("Gefahrenbereich", "der", "Gefahrenbereiche", "zone dangereuse"),
  n("Unterweisung", "die", "Unterweisungen", "formation obligatoire"),
  n("ADR-Bescheinigung", "die", "ADR-Bescheinigungen", "certificat ADR du conducteur"),
  n("Kontrolle", "die", "Kontrollen", "contrôle"),
  n("Verstoß", "der", "Verstöße", "infraction"),

  // — Verbes et adjectifs du domaine —
  v("kennzeichnen", "hat gekennzeichnet", "étiqueter / signaliser"),
  v("einstufen", "hat eingestuft", "classer (une matière)", { separable: true }),
  v("absichern", "hat abgesichert", "sécuriser", { separable: true }),
  v("evakuieren", "hat evakuiert", "évacuer"),
  v("auslaufen", "ist ausgelaufen", "fuir / s'écouler", { separable: true }),
  v("entsorgen", "hat entsorgt", "éliminer (un déchet)"),
  adj("gefährlich", "dangereux"),
  adj("entzündbar", "inflammable"),
  adj("ätzend", "corrosif"),
  adj("giftig", "toxique"),
  adj("umweltgefährdend", "dangereux pour l'environnement"),
  adj("kennzeichnungspflichtig", "soumis à étiquetage"),
];

export default words;
