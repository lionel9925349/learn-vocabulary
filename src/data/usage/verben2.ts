import type { UsageMap } from "./types";

/** Verbes, second lot. Tournures variées : questions, passif, impératif, négation. */
const usage: UsageMap = {
  // — Entrepôt et manutention —
  einlagern: {
    v: [["Ware einlagern", "mettre de la marchandise en stock"]],
    s: [
      ["Wo sollen wir die Paletten einlagern?", "Où devons-nous stocker les palettes ?"],
      ["Die Ware wurde gestern eingelagert.", "La marchandise a été mise en stock hier."],
    ],
  },
  auslagern: {
    v: [
      ["Ware auslagern", "sortir de la marchandise du stock"],
      ["Prozesse auslagern", "externaliser des processus"],
    ],
    s: [
      ["Lagern Sie bitte 20 Kartons aus.", "Sortez 20 cartons du stock, s'il vous plaît."],
      ["Wir haben die Logistik ausgelagert.", "Nous avons externalisé la logistique."],
    ],
  },
  kommissionieren: {
    v: [["nach Liste kommissionieren", "préparer selon la liste"]],
    s: [
      ["Wie viele Aufträge hast du heute kommissioniert?", "Combien de commandes as-tu préparées aujourd'hui ?"],
      ["Es wird mit dem Scanner kommissioniert.", "La préparation se fait au scanner."],
    ],
  },
  verpacken: {
    v: [["transportsicher verpacken", "emballer pour le transport"]],
    s: [
      ["Bitte gut verpacken!", "Merci de bien emballer !"],
      ["Die Ware war schlecht verpackt.", "La marchandise était mal emballée."],
    ],
  },
  beladen: {
    v: [["einen Lkw beladen", "charger un camion"]],
    s: [
      ["Der Lkw wird gerade beladen.", "Le camion est en cours de chargement."],
      ["Wer belädt heute Tor 3?", "Qui charge au quai 3 aujourd'hui ?"],
    ],
  },
  entladen: {
    v: [["einen Container entladen", "décharger un conteneur"]],
    s: [
      ["Wann wird entladen?", "Quand décharge-t-on ?"],
      ["Der Container muss bis 12 Uhr entladen sein.", "Le conteneur doit être déchargé avant midi."],
    ],
  },
  sichern: {
    v: [["die Ladung sichern", "arrimer le chargement"], ["Daten sichern", "sauvegarder des données"]],
    s: [
      ["Ist die Ladung richtig gesichert?", "Le chargement est-il correctement arrimé ?"],
      ["Ohne gesicherte Ladung fährt niemand los.", "Personne ne part sans chargement arrimé."],
    ],
  },
  wiegen: {
    v: [["die Palette wiegen", "peser la palette"]],
    s: [
      ["Wie viel wiegt die Sendung?", "Combien pèse l'envoi ?"],
      ["Das Packstück wiegt 32 Kilo.", "Le colis pèse 32 kilos."],
    ],
  },
  scannen: {
    v: [["den Barcode scannen", "scanner le code-barres"]],
    s: [
      ["Bitte jedes Packstück scannen.", "Merci de scanner chaque colis."],
      ["Das Etikett lässt sich nicht scannen.", "L'étiquette ne se scanne pas."],
    ],
  },
  zaehlen: {
    v: [["den Bestand zählen", "compter le stock"]],
    s: [
      ["Haben Sie schon gezählt?", "Avez-vous déjà compté ?"],
      ["Wir zählen bei der Inventur alles doppelt.", "À l'inventaire, nous comptons tout deux fois."],
    ],
  },

  // — Livraison —
  versenden: {
    v: [["per Spedition versenden", "expédier par transitaire"]],
    s: [
      ["Wann wird die Sendung versendet?", "Quand l'envoi part-il ?"],
      ["Die Ware wurde heute Morgen versendet.", "La marchandise a été expédiée ce matin."],
    ],
  },
  zustellen: {
    v: [["die Sendung zustellen", "livrer l'envoi"]],
    s: [
      ["Wir stellen bis 18 Uhr zu.", "Nous livrons jusqu'à 18h."],
      ["Die Sendung konnte nicht zugestellt werden.", "L'envoi n'a pas pu être livré."],
    ],
  },
  ablehnen: {
    v: [["ein Angebot ablehnen", "refuser une offre"], ["die Annahme ablehnen", "refuser la réception"]],
    s: [
      ["Warum wurde die Lieferung abgelehnt?", "Pourquoi la livraison a-t-elle été refusée ?"],
      ["Wir lehnen diese Bedingungen ab.", "Nous refusons ces conditions."],
    ],
  },
  nachbestellen: {
    v: [["Material nachbestellen", "réapprovisionner du matériel"]],
    s: [
      ["Soll ich nachbestellen?", "Dois-je recommander ?"],
      ["Es wurde automatisch nachbestellt.", "Un réapprovisionnement a été déclenché automatiquement."],
    ],
  },

  // — Organisation —
  planen: {
    v: [["die Tour planen", "planifier la tournée"], ["langfristig planen", "planifier à long terme"]],
    s: [
      ["Wie ist die Woche geplant?", "Comment la semaine est-elle planifiée ?"],
      ["Das war so nicht geplant.", "Ce n'était pas prévu ainsi."],
    ],
  },
  disponieren: {
    v: [["Touren disponieren", "affréter des tournées"]],
    s: [
      ["Wer disponiert heute?", "Qui affrète aujourd'hui ?"],
      ["Die Fahrzeuge sind für morgen disponiert.", "Les véhicules sont affectés pour demain."],
    ],
  },
  verzoegern: {
    v: [["die Lieferung verzögern", "retarder la livraison"]],
    s: [
      ["Was hat die Lieferung verzögert?", "Qu'est-ce qui a retardé la livraison ?"],
      ["Der Zoll verzögert alles um zwei Tage.", "La douane retarde tout de deux jours."],
    ],
  },
  koordinieren: {
    v: [["die Abläufe koordinieren", "coordonner les processus"]],
    s: [
      ["Wer koordiniert das Projekt?", "Qui coordonne le projet ?"],
      ["Die Bereiche müssen sich besser koordinieren.", "Les services doivent mieux se coordonner."],
    ],
  },
  ueberwachen: {
    v: [["die Temperatur überwachen", "surveiller la température"]],
    s: [
      ["Wird die Kühlkette überwacht?", "La chaîne du froid est-elle surveillée ?"],
      ["Alle Prozesse werden lückenlos überwacht.", "Tous les processus sont surveillés en continu."],
    ],
  },
  pruefen: {
    v: [["die Ware prüfen", "contrôler la marchandise"], ["die Rechnung prüfen", "vérifier la facture"]],
    s: [
      ["Haben Sie das schon geprüft?", "L'avez-vous déjà vérifié ?"],
      ["Das muss noch geprüft werden.", "Cela doit encore être vérifié."],
    ],
  },
  genehmigen: {
    v: [["den Urlaub genehmigen", "approuver le congé"]],
    s: [
      ["Wer genehmigt die Bestellung?", "Qui approuve la commande ?"],
      ["Der Antrag wurde nicht genehmigt.", "La demande n'a pas été approuvée."],
    ],
  },
  sperren: {
    v: [["einen Artikel sperren", "bloquer un article"], ["ein Konto sperren", "bloquer un compte"]],
    s: [
      ["Warum ist der Artikel gesperrt?", "Pourquoi l'article est-il bloqué ?"],
      ["Die Charge wurde vorsorglich gesperrt.", "Le lot a été bloqué par précaution."],
    ],
  },

  // — Communication —
  mitteilen: {
    v: [["jemandem etwas mitteilen", "communiquer quelque chose à quelqu'un"]],
    s: [
      ["Teilen Sie uns bitte den neuen Termin mit.", "Merci de nous communiquer la nouvelle date."],
      ["Das wurde uns nicht mitgeteilt.", "Cela ne nous a pas été communiqué."],
    ],
  },
  melden: {
    v: [["einen Schaden melden", "déclarer un dommage"]],
    s: [
      ["Wem soll ich das melden?", "À qui dois-je le signaler ?"],
      ["Bitte melden Sie sich, sobald die Ware da ist.", "Merci de me prévenir dès l'arrivée de la marchandise."],
    ],
  },
  nachfragen: {
    v: [["beim Lieferanten nachfragen", "se renseigner auprès du fournisseur"]],
    s: [
      ["Ich frage noch einmal nach.", "Je relance encore une fois."],
      ["Haben Sie schon nachgefragt?", "Vous êtes-vous déjà renseigné ?"],
    ],
  },
  bestaetigen: {
    v: [["einen Termin bestätigen", "confirmer une date"]],
    s: [
      ["Können Sie das bitte kurz bestätigen?", "Pouvez-vous le confirmer brièvement ?"],
      ["Die Bestellung wurde noch nicht bestätigt.", "La commande n'a pas encore été confirmée."],
    ],
  },
  absagen: {
    v: [["einen Termin absagen", "annuler un rendez-vous"]],
    s: [
      ["Der Termin wurde kurzfristig abgesagt.", "Le rendez-vous a été annulé au dernier moment."],
      ["Müssen wir absagen?", "Devons-nous annuler ?"],
    ],
  },
  vereinbaren: {
    v: [["einen Preis vereinbaren", "convenir d'un prix"]],
    s: [
      ["Was wurde vereinbart?", "Qu'est-ce qui a été convenu ?"],
      ["Wie vereinbart, liefern wir am Freitag.", "Comme convenu, nous livrons vendredi."],
    ],
  },
  erklaeren: {
    v: [["den Ablauf erklären", "expliquer la procédure"]],
    s: [
      ["Können Sie mir das erklären?", "Pouvez-vous m'expliquer cela ?"],
      ["Das erklärt die Abweichung.", "Cela explique l'écart."],
    ],
  },
  begruenden: {
    v: [["eine Entscheidung begründen", "justifier une décision"]],
    s: [
      ["Bitte begründen Sie die Abweichung.", "Merci de justifier l'écart."],
      ["Die Ablehnung wurde nicht begründet.", "Le refus n'a pas été motivé."],
    ],
  },
  "sich-entschuldigen": {
    v: [["sich für die Verspätung entschuldigen", "s'excuser du retard"]],
    s: [
      ["Wir entschuldigen uns für die Unannehmlichkeiten.", "Nous nous excusons pour la gêne occasionnée."],
      ["Dafür muss man sich nicht entschuldigen.", "Il n'y a pas à s'excuser pour cela."],
    ],
  },

  // — Achats et finances —
  anbieten: {
    v: [["eine Lösung anbieten", "proposer une solution"]],
    s: [
      ["Was können Sie uns anbieten?", "Que pouvez-vous nous proposer ?"],
      ["Uns wurde ein besserer Preis angeboten.", "On nous a proposé un meilleur prix."],
    ],
  },
  vergleichen: {
    v: [["Angebote vergleichen", "comparer les offres"]],
    s: [
      ["Haben Sie die Preise verglichen?", "Avez-vous comparé les prix ?"],
      ["Verglichen mit dem Vorjahr ist das günstig.", "Comparé à l'an dernier, c'est avantageux."],
    ],
  },
  berechnen: {
    v: [["Kosten berechnen", "calculer des coûts"], ["etwas in Rechnung stellen", "facturer quelque chose"]],
    s: [
      ["Wie berechnen Sie den Preis?", "Comment calculez-vous le prix ?"],
      ["Standzeit wird ab zwei Stunden berechnet.", "Le temps d'attente est facturé au-delà de deux heures."],
    ],
  },
  senken: {
    v: [["die Kosten senken", "réduire les coûts"]],
    s: [
      ["Wo können wir noch senken?", "Où pouvons-nous encore réduire ?"],
      ["Die Fehlerquote konnte deutlich gesenkt werden.", "Le taux d'erreur a pu être nettement réduit."],
    ],
  },
  erhoehen: {
    v: [["die Menge erhöhen", "augmenter la quantité"]],
    s: [
      ["Können wir die Bestellmenge erhöhen?", "Pouvons-nous augmenter la quantité commandée ?"],
      ["Die Preise wurden zum Jahreswechsel erhöht.", "Les prix ont été augmentés au changement d'année."],
    ],
  },
  abschliessen: {
    v: [["einen Vertrag abschließen", "conclure un contrat"]],
    s: [
      ["Wann schließen wir den Vertrag ab?", "Quand concluons-nous le contrat ?"],
      ["Der Vorgang ist abgeschlossen.", "L'opération est clôturée."],
    ],
  },
  bezahlen: {
    v: [["die Rechnung bezahlen", "payer la facture"]],
    s: [
      ["Ist die Rechnung schon bezahlt?", "La facture est-elle déjà payée ?"],
      ["Wir bezahlen erst nach Wareneingang.", "Nous payons seulement après réception."],
    ],
  },
  erstatten: {
    v: [["die Kosten erstatten", "rembourser les frais"]],
    s: [
      ["Werden die Kosten erstattet?", "Les frais sont-ils remboursés ?"],
      ["Der Betrag wird Ihnen erstattet.", "Le montant vous sera remboursé."],
    ],
  },
  mahnen: {
    v: [["den Kunden mahnen", "relancer le client"]],
    s: [
      ["Wurde schon gemahnt?", "A-t-on déjà relancé ?"],
      ["Nach 30 Tagen wird automatisch gemahnt.", "Après 30 jours, une relance part automatiquement."],
    ],
  },

  // — Problèmes —
  loesen: {
    v: [["ein Problem lösen", "résoudre un problème"]],
    s: [
      ["Wie lösen wir das?", "Comment résolvons-nous cela ?"],
      ["Das Problem ist gelöst.", "Le problème est résolu."],
    ],
  },
  verursachen: {
    v: [["Kosten verursachen", "engendrer des coûts"], ["einen Schaden verursachen", "causer un dommage"]],
    s: [
      ["Was hat den Ausfall verursacht?", "Qu'est-ce qui a causé la panne ?"],
      ["Der Fehler hat erhebliche Kosten verursacht.", "L'erreur a engendré des coûts considérables."],
    ],
  },
  fehlen: {
    v: [["es fehlt an etwas", "il manque quelque chose"]],
    s: [
      ["Was fehlt noch?", "Que manque-t-il encore ?"],
      ["Uns fehlen zwei Paletten.", "Il nous manque deux palettes."],
    ],
  },
  ersetzen: {
    v: [["ein Teil ersetzen", "remplacer une pièce"]],
    s: [
      ["Wird das kostenlos ersetzt?", "Est-ce remplacé gratuitement ?"],
      ["Die beschädigte Ware wird ersetzt.", "La marchandise endommagée sera remplacée."],
    ],
  },
  zurueckschicken: {
    v: [["die Ware zurückschicken", "renvoyer la marchandise"]],
    s: [
      ["Soll ich das zurückschicken?", "Dois-je le renvoyer ?"],
      ["Bitte schicken Sie die Palette zurück.", "Merci de renvoyer la palette."],
    ],
  },

  // — Informatique —
  eingeben: {
    v: [["Daten eingeben", "saisir des données"]],
    s: [
      ["Wo gebe ich die Menge ein?", "Où saisis-je la quantité ?"],
      ["Die Nummer wurde falsch eingegeben.", "Le numéro a été mal saisi."],
    ],
  },
  aendern: {
    v: [["eine Bestellung ändern", "modifier une commande"]],
    s: [
      ["Kann man das noch ändern?", "Peut-on encore le modifier ?"],
      ["Am Verfahren hat sich nichts geändert.", "Rien n'a changé dans la procédure."],
    ],
  },
  aktualisieren: {
    v: [["die Daten aktualisieren", "mettre à jour les données"]],
    s: [
      ["Wann wurde das zuletzt aktualisiert?", "Quand cela a-t-il été mis à jour ?"],
      ["Die Liste wird täglich aktualisiert.", "La liste est mise à jour quotidiennement."],
    ],
  },
  verbuchen: {
    v: [["den Wareneingang verbuchen", "comptabiliser la réception"]],
    s: [
      ["Ist das schon verbucht?", "Est-ce déjà enregistré ?"],
      ["Ich verbuche das gleich.", "Je l'enregistre tout de suite."],
    ],
  },
  einrichten: {
    v: [["einen Zugang einrichten", "créer un accès"]],
    s: [
      ["Können Sie mir einen Zugang einrichten?", "Pouvez-vous me créer un accès ?"],
      ["Das System wurde neu eingerichtet.", "Le système a été reconfiguré."],
    ],
  },
  testen: {
    v: [["eine Funktion testen", "tester une fonction"]],
    s: [
      ["Haben Sie das schon getestet?", "L'avez-vous déjà testé ?"],
      ["In der Testumgebung läuft alles.", "Tout fonctionne en environnement de test."],
    ],
  },
  "sich-anmelden": {
    v: [["sich am System anmelden", "se connecter au système"]],
    s: [
      ["Ich kann mich nicht anmelden.", "Je n'arrive pas à me connecter."],
      ["Melden Sie sich bitte mit Ihrem Konto an.", "Merci de vous connecter avec votre compte."],
    ],
  },
};

export default usage;
