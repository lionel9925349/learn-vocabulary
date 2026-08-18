import { makers } from "../builders";

const { n, v, adj, p } = makers("kep");

/**
 * Kurier-, Express- und Paketdienst — le vocabulaire de l'express.
 *
 * Le programme couvrait bien l'entrepôt et le transport de charges, mais la
 * messagerie express est un métier à part, avec son propre lexique : on n'y
 * parle pas de palettes et de camions complets, on y parle de tournées, de
 * tentatives de livraison, de lieux de dépôt et de suppléments carburant.
 *
 * Ce lot suit le trajet réel d'un colis : ce qu'on expédie, par où ça passe,
 * qui le livre, ce qu'on facture en plus, et ce qui se passe quand ça se
 * passe mal — c'est cette dernière partie qui occupe le plus les journées.
 */
const kep = [
  // — Le service vendu —
  n("Kurier", "der", "Kuriere", "coursier", {
    example: { de: "Der Kurier holt die Sendung um 16 Uhr ab.", fr: "Le coursier enlève l'envoi à 16 heures." },
  }),
  n("Kurierdienst", "der", "Kurierdienste", "service de coursier", {
    example: { de: "Für Dokumente nehmen wir einen Kurierdienst.", fr: "Pour les documents, nous prenons un service de coursier." },
  }),
  n("Paketdienst", "der", "Paketdienste", "service de messagerie colis", {
    example: { de: "Welcher Paketdienst beliefert diese Region?", fr: "Quel messager dessert cette région ?" },
  }),
  n("Paket", "das", "Pakete", "colis", {
    example: { de: "Das Paket wiegt 12 Kilo.", fr: "Le colis pèse 12 kilos." },
  }),
  n("Eilsendung", "die", "Eilsendungen", "envoi urgent", {
    example: { de: "Eilsendungen werden zuerst verladen.", fr: "Les envois urgents sont chargés en premier." },
  }),
  n("Termingut", "das", null, "envoi à date garantie", {
    definition:
      "Marchandise dont la date — parfois l'heure — de livraison est **contractuellement garantie**. Rater le créneau n'est pas un retard : c'est une prestation non fournie, souvent assortie d'un remboursement.",
    example: { de: "Termingut hat Vorrang vor Standardsendungen.", fr: "Les envois à date garantie priment sur les envois standard." },
  }),
  n("Laufzeitgarantie", "die", "Laufzeitgarantien", "garantie de délai", {
    example: { de: "Mit Laufzeitgarantie kostet der Versand doppelt.", fr: "Avec garantie de délai, l'expédition coûte le double." },
  }),
  n("Zustellzeitfenster", "das", "Zustellzeitfenster", "créneau de livraison", {
    example: { de: "Der Kunde hat ein Zustellzeitfenster von 8 bis 12 Uhr gewählt.", fr: "Le client a choisi un créneau de livraison de 8 à 12 heures." },
  }),
  n("Nachnahme", "die", "Nachnahmen", "contre-remboursement", {
    definition:
      "Le destinataire **paie au moment de la remise**, et le transporteur reverse la somme à l'expéditeur. Le livreur devient encaisseur : sans le montant exact, le colis repart.",
    example: { de: "Die Sendung geht per Nachnahme, 240 Euro.", fr: "L'envoi part en contre-remboursement, 240 euros." },
  }),
  n("Sendungsart", "die", "Sendungsarten", "type d'envoi", {
    example: { de: "Welche Sendungsart hat der Kunde gebucht?", fr: "Quel type d'envoi le client a-t-il réservé ?" },
  }),

  // — Le réseau —
  n("Depot", "das", "Depots", "dépôt / agence", {
    example: { de: "Die Sendung liegt noch im Depot Frankfurt.", fr: "L'envoi est encore au dépôt de Francfort." },
  }),
  n("Umschlagbasis", "die", "Umschlagbasen", "plateforme de transit (hub)", {
    definition:
      "Le site où les envois changent de véhicule sans être stockés : ils arrivent la nuit, sont triés par destination et repartent au petit matin. On y **transborde**, on n'y entrepose pas.",
    example: { de: "Nachts läuft alles über die Umschlagbasis.", fr: "La nuit, tout transite par la plateforme." },
  }),
  n("Sortieranlage", "die", "Sortieranlagen", "trieur / machine de tri", {
    example: { de: "Die Sortieranlage schafft 12 000 Pakete pro Stunde.", fr: "Le trieur traite 12 000 colis à l'heure." },
  }),
  n("Zustellbezirk", "der", "Zustellbezirke", "secteur de distribution", {
    example: { de: "Jeder Zusteller hat einen festen Zustellbezirk.", fr: "Chaque livreur a un secteur fixe." },
  }),
  n("Nahverkehr", "der", null, "distribution locale (ramasse et livraison)", {
    definition:
      "Le tronçon court : la collecte chez l'expéditeur le soir et la livraison chez le destinataire le matin. Par opposition au *Fernverkehr*, le trajet longue distance de nuit entre les plateformes.",
    example: { de: "Im Nahverkehr fahren wir mit Transportern.", fr: "En distribution locale, nous roulons en fourgons." },
  }),
  n("Fernverkehr", "der", null, "trafic longue distance", {
    example: { de: "Der Fernverkehr läuft über Nacht.", fr: "La longue distance roule de nuit." },
  }),
  n("Anlieferung", "die", "Anlieferungen", "livraison (arrivée sur site)", {
    example: { de: "Die Anlieferung ist für 7 Uhr avisiert.", fr: "La livraison est annoncée pour 7 heures." },
  }),
  n("Abladestelle", "die", "Abladestellen", "point de déchargement", {
    example: { de: "Die Abladestelle liegt auf der Rückseite des Gebäudes.", fr: "Le point de déchargement est à l'arrière du bâtiment." },
  }),

  // — La livraison —
  n("Zusteller", "der", "Zusteller", "livreur", {
    example: { de: "Der Zusteller ist schon unterwegs.", fr: "Le livreur est déjà en route." },
  }),
  n("Benachrichtigungskarte", "die", "Benachrichtigungskarten", "avis de passage", {
    example: { de: "Wir haben eine Benachrichtigungskarte hinterlassen.", fr: "Nous avons laissé un avis de passage." },
  }),
  n("Ablageort", "der", "Ablageorte", "lieu de dépôt convenu", {
    definition:
      "L'endroit où le destinataire autorise à laisser le colis en son absence — terrasse, abri de jardin, cabane. L'autorisation transfère le risque au destinataire : sans elle, déposer le colis engage le transporteur.",
    example: { de: "Als Ablageort ist die Garage hinterlegt.", fr: "Le lieu de dépôt enregistré est le garage." },
  }),
  n("Abstellgenehmigung", "die", "Abstellgenehmigungen", "autorisation de dépôt", {
    example: { de: "Ohne Abstellgenehmigung dürfen wir nichts hinterlegen.", fr: "Sans autorisation de dépôt, nous ne pouvons rien laisser." },
  }),
  n("Nachbarschaftsabgabe", "die", "Nachbarschaftsabgaben", "remise au voisin", {
    example: { de: "Die Nachbarschaftsabgabe steht auf der Karte.", fr: "La remise au voisin figure sur l'avis." },
  }),
  n("Paketshop", "der", "Paketshops", "point relais", {
    example: { de: "Das Paket liegt im Paketshop um die Ecke.", fr: "Le colis est au point relais du coin." },
  }),
  n("Packstation", "die", "Packstationen", "consigne automatique", {
    example: { de: "Der Empfänger holt es an der Packstation ab.", fr: "Le destinataire le retire à la consigne automatique." },
  }),
  n("Empfangsberechtigung", "die", "Empfangsberechtigungen", "habilitation à réceptionner", {
    example: { de: "Wer hat hier Empfangsberechtigung?", fr: "Qui est habilité à réceptionner ici ?" },
  }),
  n("Quittung", "die", "Quittungen", "reçu", {
    example: { de: "Der Fahrer braucht eine Quittung für die Nachnahme.", fr: "Le chauffeur a besoin d'un reçu pour le contre-remboursement." },
  }),

  // — Documents et identification —
  n("Sendungsnummer", "die", "Sendungsnummern", "numéro d'envoi", {
    example: { de: "Nennen Sie mir bitte die Sendungsnummer.", fr: "Donnez-moi le numéro d'envoi." },
  }),
  n("Paketschein", "der", "Paketscheine", "bordereau de colis", {
    example: { de: "Der Paketschein klebt auf der Oberseite.", fr: "Le bordereau est collé sur le dessus." },
  }),
  n("Sendungsstatus", "der", null, "statut de l'envoi", {
    example: { de: "Der Sendungsstatus steht auf «in Zustellung».", fr: "Le statut de l'envoi est « en cours de livraison »." },
  }),
  n("Handscanner", "der", "Handscanner", "scanner portable", {
    example: { de: "Bitte scannen Sie jedes Packstück mit dem Handscanner.", fr: "Scannez chaque colis avec le scanner portable." },
  }),
  n("Luftfrachtbrief", "der", "Luftfrachtbriefe", "lettre de transport aérien (LTA)", {
    example: { de: "Der Luftfrachtbrief fehlt in der Mappe.", fr: "La lettre de transport aérien manque dans la pochette." },
  }),
  n("Zollinhaltserklärung", "die", "Zollinhaltserklärungen", "déclaration douanière de contenu", {
    example: { de: "Ohne Zollinhaltserklärung bleibt das Paket am Zoll.", fr: "Sans déclaration de contenu, le colis reste en douane." },
  }),
  n("Wiegeschein", "der", "Wiegescheine", "bon de pesée", {
    example: { de: "Der Wiegeschein weist 780 Kilo aus.", fr: "Le bon de pesée indique 780 kilos." },
  }),

  // — Ce qui se facture en plus —
  n("Dieselzuschlag", "der", "Dieselzuschläge", "surcharge gazole", {
    definition:
      "Pourcentage ajouté au prix du transport, indexé sur le cours du gazole et **révisé chaque mois**. Il permet au transporteur de ne pas renégocier tout son tarif à chaque variation du carburant.",
    example: { de: "Der Dieselzuschlag liegt diesen Monat bei 18 Prozent.", fr: "La surcharge gazole est à 18 % ce mois-ci." },
  }),
  n("Mautzuschlag", "der", "Mautzuschläge", "surcharge péage", {
    example: { de: "Der Mautzuschlag gilt nur für Deutschland.", fr: "La surcharge péage ne s'applique qu'à l'Allemagne." },
  }),
  n("Maut", "die", "Mauten", "péage", {
    example: { de: "Die Maut wird nach Achsen und Schadstoffklasse berechnet.", fr: "Le péage se calcule selon les essieux et la classe d'émission." },
  }),
  n("Sperrgut", "das", null, "marchandise hors gabarit", {
    definition:
      "Envoi que la machine de tri ne peut pas traiter — trop long, trop lourd, non palettisable, forme irrégulière. Il passe en manuel, d'où un supplément systématique.",
    example: { de: "Skier gelten als Sperrgut.", fr: "Les skis comptent comme marchandise hors gabarit." },
  }),
  n("Übergröße", "die", "Übergrößen", "hors format", {
    example: { de: "Bei Übergröße fällt ein Aufpreis an.", fr: "En hors format, un surcoût s'applique." },
  }),
  n("Volumengewicht", "das", "Volumengewichte", "poids volumétrique", {
    definition:
      "Poids **fictif** calculé à partir de l'encombrement (longueur × largeur × hauteur ÷ un diviseur). Un carton de polystyrène ne pèse rien mais occupe une place : on facture le plus élevé des deux poids, réel ou volumétrique.",
    example: { de: "Abgerechnet wird das höhere von Real- und Volumengewicht.", fr: "On facture le plus élevé du poids réel et du poids volumétrique." },
  }),
  n("Nachnahmegebühr", "die", "Nachnahmegebühren", "frais de contre-remboursement", {
    example: { de: "Die Nachnahmegebühr trägt der Empfänger.", fr: "Les frais de contre-remboursement sont à la charge du destinataire." },
  }),

  // — Quand ça se passe mal —
  n("Fehlleitung", "die", "Fehlleitungen", "erreur d'acheminement", {
    example: { de: "Eine Fehlleitung kostet uns einen ganzen Tag.", fr: "Une erreur d'acheminement nous coûte une journée entière." },
  }),
  n("Falschzustellung", "die", "Falschzustellungen", "livraison à la mauvaise adresse", {
    example: { de: "Der Kunde meldet eine Falschzustellung.", fr: "Le client signale une livraison à la mauvaise adresse." },
  }),
  n("Nachforschungsauftrag", "der", "Nachforschungsaufträge", "demande de recherche", {
    definition:
      "Procédure déclenchée quand un envoi ne réapparaît nulle part : on remonte tous les scans jusqu'au dernier point connu. Au bout d'un délai, l'envoi est déclaré perdu et l'indemnisation démarre.",
    example: { de: "Wir haben einen Nachforschungsauftrag gestellt.", fr: "Nous avons déposé une demande de recherche." },
  }),
  n("Schadensmeldung", "die", "Schadensmeldungen", "déclaration de dommage", {
    example: { de: "Die Schadensmeldung muss binnen sieben Tagen eingehen.", fr: "La déclaration de dommage doit parvenir sous sept jours." },
  }),
  n("Rücksendung", "die", "Rücksendungen", "retour", {
    example: { de: "Nach drei Zustellversuchen erfolgt die Rücksendung.", fr: "Après trois tentatives, l'envoi est retourné." },
  }),
  n("Pünktlichkeitsquote", "die", "Pünktlichkeitsquoten", "taux de ponctualité", {
    example: { de: "Die Pünktlichkeitsquote lag im März bei 97 Prozent.", fr: "Le taux de ponctualité était de 97 % en mars." },
  }),
  n("Servicegrad", "der", "Servicegrade", "niveau de service", {
    example: { de: "Der Servicegrad ist vertraglich festgelegt.", fr: "Le niveau de service est fixé contractuellement." },
  }),

  // — Véhicules et matériel de tournée —
  n("Transporter", "der", "Transporter", "fourgon utilitaire", {
    example: { de: "Der Transporter ist bis 3,5 Tonnen zugelassen.", fr: "Le fourgon est homologué jusqu'à 3,5 tonnes." },
  }),
  n("Lieferwagen", "der", "Lieferwagen", "camionnette de livraison", {
    example: { de: "Der Lieferwagen steht in zweiter Reihe.", fr: "La camionnette est en double file." },
  }),
  n("Fahrzeug", "das", "Fahrzeuge", "véhicule", {
    example: { de: "Das Fahrzeug muss abends betankt werden.", fr: "Le véhicule doit être fait le plein le soir." },
  }),
  n("Beifahrer", "der", "Beifahrer", "convoyeur / passager", {
    example: { de: "Bei schweren Möbeln fährt ein Beifahrer mit.", fr: "Pour les meubles lourds, un convoyeur accompagne." },
  }),
  n("Führerschein", "der", "Führerscheine", "permis de conduire", {
    example: { de: "Für den Lkw brauchen Sie den Führerschein Klasse C.", fr: "Pour le camion, il faut le permis C." },
  }),
  n("Fahrerkarte", "die", "Fahrerkarten", "carte conducteur", {
    example: { de: "Ohne Fahrerkarte darf niemand losfahren.", fr: "Sans carte conducteur, personne ne part." },
  }),
  n("Rollbehälter", "der", "Rollbehälter", "roll (conteneur roulant)", {
    example: { de: "Die Pakete kommen im Rollbehälter an die Rampe.", fr: "Les colis arrivent au quai en rolls." },
  }),
  n("Sackkarre", "die", "Sackkarren", "diable", {
    example: { de: "Nimm die Sackkarre für die schweren Kartons.", fr: "Prends le diable pour les cartons lourds." },
  }),
  n("Spanngurt", "der", "Spanngurte", "sangle d'arrimage", {
    example: { de: "Jede Palette wird mit zwei Spanngurten gesichert.", fr: "Chaque palette est sanglée par deux sangles." },
  }),
  n("Palettentausch", "der", null, "échange de palettes", {
    definition:
      "Le destinataire rend autant de palettes vides qu'il en reçoit de pleines. En cas de refus, les palettes sont facturées — d'où les discussions au quai.",
    example: { de: "Der Kunde verweigert den Palettentausch.", fr: "Le client refuse l'échange de palettes." },
  }),

  // — Verbes du métier —
  v("avisieren", "hat avisiert", "annoncer (une livraison)", {
    example: { de: "Bitte avisieren Sie die Anlieferung telefonisch.", fr: "Annoncez la livraison par téléphone." },
  }),
  v("hinterlegen", "hat hinterlegt", "déposer (au relais, chez le voisin)", {
    example: { de: "Wir haben das Paket beim Nachbarn hinterlegt.", fr: "Nous avons déposé le colis chez le voisin." },
  }),
  v("quittieren", "hat quittiert", "signer pour réception", {
    example: { de: "Bitte quittieren Sie den Empfang.", fr: "Veuillez signer la réception." },
  }),
  v("umschlagen", "hat umgeschlagen", "transborder", {
    separable: true,
    example: { de: "Die Sendung wird in Hannover umgeschlagen.", fr: "L'envoi est transbordé à Hanovre." },
  }),
  v("sortieren", "hat sortiert", "trier", {
    example: { de: "Nachts wird nach Postleitzahl sortiert.", fr: "La nuit, on trie par code postal." },
  }),
  v("nachverfolgen", "hat nachverfolgt", "suivre (une expédition)", {
    separable: true,
    example: { de: "Der Kunde kann die Sendung online nachverfolgen.", fr: "Le client peut suivre l'envoi en ligne." },
  }),
  v("verzollen", "hat verzollt", "dédouaner", {
    example: { de: "Die Sendung muss noch verzollt werden.", fr: "L'envoi doit encore être dédouané." },
  }),

  // — Adjectifs du quotidien —
  adj("zustellbar", "livrable", {
    example: { de: "Die Adresse ist nicht zustellbar.", fr: "L'adresse n'est pas livrable." },
  }),
  adj("unzustellbar", "non distribuable", {
    example: { de: "Unzustellbare Sendungen gehen zurück ans Depot.", fr: "Les envois non distribuables repartent au dépôt." },
  }),
  adj("abholbereit", "prêt à être enlevé", {
    example: { de: "Die Ware ist ab 14 Uhr abholbereit.", fr: "La marchandise est prête à l'enlèvement à partir de 14 heures." },
  }),
  adj("nachnahmepflichtig", "en contre-remboursement", {
    example: { de: "Die Sendung ist nachnahmepflichtig.", fr: "L'envoi est en contre-remboursement." },
  }),

  // — Ce qu'on dit sur le terrain —
  p("Die Sendung ist unterwegs", "L'envoi est en route", {
    example: { de: "Die Sendung ist unterwegs und kommt morgen an.", fr: "L'envoi est en route et arrive demain." },
  }),
  p("Ich habe niemanden angetroffen", "Je n'ai trouvé personne", {
    example: { de: "Ich habe niemanden angetroffen und eine Karte hinterlassen.", fr: "Je n'ai trouvé personne et j'ai laissé un avis." },
  }),
  p("Bitte quittieren Sie hier", "Signez ici, s'il vous plaît"),
  p("Der Empfänger verweigert die Annahme", "Le destinataire refuse la réception"),
  p("Die Ware ist beschädigt angekommen", "La marchandise est arrivée endommagée"),
  p("Wir nehmen das unter Vorbehalt an", "Nous acceptons sous réserve", {
    note: "La formule à connaître au quai : accepter la livraison **sans renoncer** à réclamer ensuite. Sans cette réserve écrite sur le bon, la réclamation devient très difficile.",
  }),
  p("Können Sie das bitte avisieren?", "Pouvez-vous l'annoncer, s'il vous plaît ?"),
  p("Wann ist der Annahmeschluss?", "À quelle heure est la clôture des dépôts ?"),
  p("Das Paket ist nicht auffindbar", "Le colis est introuvable"),
  p("Ich stelle es beim Nachbarn ab", "Je le dépose chez le voisin"),
];

export default kep;
