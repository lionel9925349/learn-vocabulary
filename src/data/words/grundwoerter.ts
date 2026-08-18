import { makers } from "../builders";

const { n } = makers("grundwortschatz");

/**
 * Les mots de base — la couche qui manquait.
 *
 * Le programme enseignait *Wareneingang*, *Warenausgang* et *Warenträger* sans
 * jamais enseigner **die Ware**. C'était un trou étrange : l'allemand
 * professionnel est presque entièrement fait de composés, et un composé ne
 * s'apprend pas, il se **lit** — à condition de connaître ses éléments. Celui
 * qui sait *der Auftrag*, *der Eingang* et *die Kontrolle* déchiffre
 * *Auftragseingangskontrolle* sans l'avoir jamais vu.
 *
 * Ces mots étaient déjà connus du moteur de décomposition (`BASE_WORDS`), qui
 * s'en servait pour expliquer le genre des composés. Ils sont maintenant des
 * entrées à part entière : la rubrique « Mot à mot » d'une fiche peut donc
 * renvoyer vers eux, et de composé en composé le vocabulaire se relit tout
 * seul.
 *
 * Le genre est laissé au moteur d'inférence quand il tombe juste ; les rares
 * exceptions portent leur `rule` écrite à la main.
 */
const grundwoerter = [
  // — Commande, document, transaction —
  n("Auftrag", "der", "Aufträge", "ordre / commande"),
  n("Antrag", "der", "Anträge", "demande (formelle)"),
  n("Abruf", "der", "Abrufe", "appel / retrait sur contrat"),
  n("Abkommen", "das", "Abkommen", "accord"),
  n("Angabe", "die", "Angaben", "indication / mention"),
  n("Annahme", "die", "Annahmen", "réception / hypothèse"),
  n("Beleg", "der", "Belege", "justificatif"),
  n("Brief", "der", "Briefe", "lettre"),
  n("Schein", "der", "Scheine", "bon / certificat"),
  n("Zettel", "der", "Zettel", "billet / fiche"),
  n("Blatt", "das", "Blätter", "feuille"),
  n("Heft", "das", "Hefte", "cahier / fascicule"),
  n("Buch", "das", "Bücher", "livre / registre"),
  n("Papier", "das", "Papiere", "papier / document"),
  n("Register", "das", "Register", "registre"),
  n("Kopie", "die", "Kopien", "copie"),
  n("Liste", "die", "Listen", "liste"),
  n("Tabelle", "die", "Tabellen", "tableau"),
  n("Schrift", "die", "Schriften", "écrit"),
  n("Zeugnis", "das", "Zeugnisse", "certificat / attestation"),
  n("Gesetz", "das", "Gesetze", "loi"),
  n("Recht", "das", "Rechte", "droit"),
  n("Vertragsart", "die", "Vertragsarten", "type de contrat"),

  // — Marchandise, quantité, mesure —
  n("Ware", "die", "Waren", "marchandise"),
  n("Gut", "das", "Güter", "bien / marchandise"),
  n("Stück", "das", "Stücke", "pièce / unité"),
  n("Teil", "das", "Teile", "pièce / partie"),
  n("Menge", "die", "Mengen", "quantité"),
  n("Anzahl", "die", null, "nombre (d'unités)"),
  n("Zahl", "die", "Zahlen", "nombre / chiffre"),
  n("Nummer", "die", "Nummern", "numéro"),
  n("Größe", "die", "Größen", "taille / grandeur"),
  n("Maß", "das", "Maße", "mesure / dimension"),
  n("Gewicht", "das", "Gewichte", "poids"),
  n("Einheit", "die", "Einheiten", "unité"),
  n("Wert", "der", "Werte", "valeur"),
  n("Stoff", "der", "Stoffe", "matière / substance"),
  n("Material", "das", "Materialien", "matériel / matière"),
  n("Produkt", "das", "Produkte", "produit"),
  n("Artikel", "der", "Artikel", "article"),
  n("Marke", "die", "Marken", "marque"),

  // — Lieu, espace, mouvement —
  n("Lager", "das", "Lager", "entrepôt / stock"),
  n("Halle", "die", "Hallen", "halle"),
  n("Platz", "der", "Plätze", "place / emplacement"),
  n("Stelle", "die", "Stellen", "endroit / poste"),
  n("Raum", "der", "Räume", "espace / local"),
  n("Bereich", "der", "Bereiche", "domaine / zone"),
  n("Fach", "das", "Fächer", "casier / spécialité"),
  n("Tor", "das", "Tore", "portail / quai"),
  n("Eingang", "der", "Eingänge", "entrée"),
  n("Ausgang", "der", "Ausgänge", "sortie"),
  n("Zugang", "der", "Zugänge", "accès"),
  n("Übergang", "der", "Übergänge", "transition / transfert"),
  n("Weg", "der", "Wege", "chemin / voie"),
  n("Straße", "die", "Straßen", "route / rue"),
  n("Brücke", "die", "Brücken", "pont"),
  n("Spur", "die", "Spuren", "trace / voie"),
  n("Grenze", "die", "Grenzen", "frontière / limite"),
  n("Ort", "der", "Orte", "lieu"),
  n("Land", "das", "Länder", "pays"),
  n("Kanal", "der", "Kanäle", "canal"),
  n("Netz", "das", "Netze", "réseau"),
  n("Zimmer", "das", "Zimmer", "pièce / bureau"),
  n("Fenster", "das", "Fenster", "fenêtre"),

  // — Transport et véhicules —
  n("Wagen", "der", "Wagen", "véhicule / chariot"),
  n("Zug", "der", "Züge", "train / traction"),
  n("Schiff", "das", "Schiffe", "navire"),
  n("Fahrt", "die", "Fahrten", "trajet"),
  n("Verkehr", "der", null, "trafic / circulation"),
  n("Versand", "der", null, "expédition"),
  n("Fracht", "die", "Frachten", "fret"),
  n("Band", "das", "Bänder", "bande / convoyeur"),
  n("Kette", "die", "Ketten", "chaîne"),
  n("Träger", "der", "Träger", "support / porteur"),
  n("Box", "die", "Boxen", "caisse / bac"),

  // — Temps et échéances —
  n("Zeit", "die", "Zeiten", "temps"),
  n("Dauer", "die", null, "durée"),
  n("Jahr", "das", "Jahre", "année"),
  n("Datum", "das", "Daten", "date", {
    note: "Le pluriel *Daten* sert aussi à « les données » — c'est le même mot.",
  }),
  n("Stufe", "die", "Stufen", "niveau / palier"),
  n("Schritt", "der", "Schritte", "étape"),
  n("Reihe", "die", "Reihen", "série / rangée"),
  n("Schlange", "die", "Schlangen", "file d'attente"),

  // — Argent et commerce —
  n("Preis", "der", "Preise", "prix"),
  n("Betrag", "der", "Beträge", "montant"),
  n("Rate", "die", "Raten", "échéance / tranche"),
  n("Quote", "die", "Quoten", "taux / quota"),
  n("Satz", "der", "Sätze", "taux / jeu (ensemble)"),
  n("Grad", "der", "Grade", "degré"),
  n("Gebühr", "die", "Gebühren", "redevance / frais"),
  n("Steuer", "die", "Steuern", "impôt / taxe", {
    note: "Attention : **das** Steuer, c'est le volant. La taxe est **die** Steuer.",
  }),
  n("Konto", "das", "Konten", "compte"),
  n("Bank", "die", "Banken", "banque"),
  n("Kauf", "der", "Käufe", "achat"),
  n("Handel", "der", null, "commerce"),
  n("Markt", "der", "Märkte", "marché"),
  n("Geschäft", "das", "Geschäfte", "affaire / commerce"),
  n("Firma", "die", "Firmen", "entreprise"),
  n("Verband", "der", "Verbände", "fédération / association", {
    rule: "Exception : la morphologie ferait attendre **das** (comme *das Band*), mais c'est **der Verband**. Le préfixe *ver-* change le mot au point d'en changer le genre.",
  }),
  n("Strafe", "die", "Strafen", "pénalité / amende"),
  n("Tarif", "der", "Tarife", "tarif"),
  n("Anteil", "der", "Anteile", "part / quote-part", {
    rule: "Exception : la fin en *-teil* ferait attendre **das** (comme *das Teil*, la pièce), mais on dit **der Anteil**. Le mot suit *der Teil* — la partie d'un tout — et non *das Teil* — l'objet.",
  }),
  n("Leistung", "die", "Leistungen", "prestation / performance"),

  // — Organisation et travail —
  n("Arbeit", "die", "Arbeiten", "travail"),
  n("Aufgabe", "die", "Aufgaben", "tâche"),
  n("Dienst", "der", "Dienste", "service"),
  n("Betrieb", "der", "Betriebe", "exploitation / entreprise"),
  n("Werk", "das", "Werke", "usine / ouvrage"),
  n("Amt", "das", "Ämter", "administration / office"),
  n("Personal", "das", null, "personnel"),
  n("Führung", "die", "Führungen", "conduite / direction"),
  n("Management", "das", null, "management"),
  n("Ordnung", "die", "Ordnungen", "ordre / règlement"),
  n("Pflicht", "die", "Pflichten", "obligation"),
  n("Befehl", "der", "Befehle", "ordre / commande"),
  n("Rat", "der", "Ratschläge", "conseil", {
    note: "Pluriel irrégulier : *Ratschläge*. La forme *Räte* existe mais désigne des conseils d'administration.",
  }),
  n("Projekt", "das", "Projekte", "projet"),
  n("Programm", "das", "Programme", "programme"),
  n("Verfahren", "das", "Verfahren", "procédure / procédé"),
  n("Vorgang", "der", "Vorgänge", "opération / dossier"),
  n("Abwicklung", "die", "Abwicklungen", "traitement / exécution"),
  n("Maßnahme", "die", "Maßnahmen", "mesure (action)"),
  n("Mittel", "das", "Mittel", "moyen"),
  n("Ziel", "das", "Ziele", "objectif"),
  n("Ergebnis", "das", "Ergebnisse", "résultat"),
  n("Analyse", "die", "Analysen", "analyse"),

  // — État, situation, incident —
  n("Stand", "der", "Stände", "état / niveau"),
  n("Zustand", "der", "Zustände", "état (condition)"),
  n("Lage", "die", "Lagen", "situation / position"),
  n("Fall", "der", "Fälle", "cas"),
  n("Grund", "der", "Gründe", "raison / motif"),
  n("Ursprung", "der", "Ursprünge", "origine", {
    rule: "Piège : ce n'est pas un nom en *-ung*. Le mot se lit **Ur·sprung**, « le saut originel » — de *der Sprung*. D'où **der**, et non *die*.",
  }),
  n("Quelle", "die", "Quellen", "source"),
  n("Lücke", "die", "Lücken", "lacune / faille"),
  n("Schaden", "der", "Schäden", "dommage"),
  n("Risiko", "das", "Risiken", "risque"),
  n("Schutz", "der", null, "protection"),
  n("Sicherung", "die", "Sicherungen", "sécurisation / sauvegarde"),
  n("Sperre", "die", "Sperren", "blocage"),
  n("Druck", "der", "Drucke", "pression / impression"),
  n("Schlag", "der", "Schläge", "coup"),
  n("Schluss", "der", "Schlüsse", "conclusion / fin"),
  n("Fluss", "der", "Flüsse", "flux / cours d'eau"),
  n("Lauf", "der", "Läufe", "cours / marche"),
  n("Strom", "der", "Ströme", "courant / flux"),
  n("Vorrat", "der", "Vorräte", "réserve"),
  n("Pass", "der", "Pässe", "passage / passeport"),
  n("Kreis", "der", "Kreise", "cercle"),
  n("Punkt", "der", "Punkte", "point"),
  n("Art", "die", "Arten", "type / manière"),
  n("Weise", "die", "Weisen", "manière / façon"),
  n("Begriff", "der", "Begriffe", "notion / terme"),
  n("Wort", "das", "Wörter", "mot", {
    note: "Deux pluriels : *Wörter* pour les mots isolés, *Worte* pour des propos suivis.",
  }),
  n("Zeichen", "das", "Zeichen", "signe / caractère"),
  n("Wesen", "das", "Wesen", "nature / entité"),
  n("Basis", "die", "Basen", "base"),
  n("Struktur", "die", "Strukturen", "structure"),
  n("Niveau", "das", "Niveaus", "niveau"),
  n("Prozess", "der", "Prozesse", "processus / procès"),
  n("Stamm", "der", "Stämme", "souche / référentiel"),

  // — Informatique —
  n("Datei", "die", "Dateien", "fichier"),
  n("Software", "die", null, "logiciel"),
  n("Gerät", "das", "Geräte", "appareil"),
  n("System", "das", "Systeme", "système"),
  n("Karte", "die", "Karten", "carte"),
  n("Feld", "das", "Felder", "champ (de saisie)"),
  n("Oberfläche", "die", "Oberflächen", "surface / interface"),
  n("Test", "der", "Tests", "test"),
];

export default grundwoerter;
