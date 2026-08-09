import type { UsageMap } from "./types";

/** Entrepôt et gestion des stocks : verbes usuels et phrases de terrain. */
const usage: UsageMap = {
  wareneingang: {
    v: [
      ["den Wareneingang buchen", "enregistrer la réception"],
      ["den Wareneingang avisieren", "annoncer la réception"],
      ["den Wareneingang prüfen", "contrôler la réception"],
      ["den Wareneingang quittieren", "accuser réception"],
    ],
    s: [
      ["Der Wareneingang ist für 7:30 Uhr avisiert.", "La réception est annoncée pour 7h30."],
      ["Die Ware wurde im Wareneingang beschädigt gemeldet.", "La marchandise a été signalée endommagée à la réception."],
    ],
  },
  warenausgang: {
    v: [
      ["den Warenausgang buchen", "enregistrer l'expédition"],
      ["den Warenausgang freigeben", "valider l'expédition"],
      ["den Warenausgang vorbereiten", "préparer l'expédition"],
    ],
    s: [
      ["Der Warenausgang läuft über Tor 4.", "L'expédition passe par le quai 4."],
      ["Nach dem Warenausgang wird die Sendung im System abgeschlossen.", "Après l'expédition, l'envoi est clôturé dans le système."],
    ],
  },
  einlagerung: {
    v: [
      ["die Einlagerung vornehmen", "procéder à la mise en stock"],
      ["die Einlagerung buchen", "enregistrer la mise en stock"],
      ["die Einlagerung veranlassen", "faire procéder à la mise en stock"],
    ],
    s: [
      ["Die Einlagerung erfolgt heute Nacht.", "La mise en stock a lieu cette nuit."],
      ["Vor der Einlagerung wird die Palette gewogen.", "Avant la mise en stock, la palette est pesée."],
    ],
  },
  auslagerung: {
    v: [
      ["die Auslagerung anstoßen", "déclencher la sortie de stock"],
      ["die Auslagerung buchen", "enregistrer la sortie de stock"],
    ],
    s: [
      ["Die Auslagerung wird automatisch gesteuert.", "La sortie de stock est pilotée automatiquement."],
      ["Ohne Freigabe ist keine Auslagerung möglich.", "Sans validation, aucune sortie de stock n'est possible."],
    ],
  },
  lagerplatz: {
    v: [
      ["einen Lagerplatz zuweisen", "attribuer un emplacement"],
      ["einen Lagerplatz belegen", "occuper un emplacement"],
      ["einen Lagerplatz freigeben", "libérer un emplacement"],
      ["den Lagerplatz sperren", "bloquer l'emplacement"],
    ],
    s: [
      ["Jeder Artikel hat einen festen Lagerplatz.", "Chaque article a un emplacement fixe."],
      ["Das System weist den Lagerplatz automatisch zu.", "Le système attribue l'emplacement automatiquement."],
    ],
  },
  bestand: {
    v: [
      ["den Bestand führen", "tenir le stock"],
      ["den Bestand aufnehmen", "faire l'inventaire du stock"],
      ["den Bestand korrigieren", "régulariser le stock"],
      ["den Bestand abbauen", "réduire le stock"],
    ],
    s: [
      ["Der Bestand weicht um zwei Stück ab.", "Le stock présente un écart de deux pièces."],
      ["Der Bestand reicht noch für zwei Wochen.", "Le stock suffit encore pour deux semaines."],
    ],
  },
  inventur: {
    v: [
      ["eine Inventur durchführen", "réaliser un inventaire"],
      ["die Inventur ansetzen", "programmer l'inventaire"],
      ["die Inventur abschließen", "clôturer l'inventaire"],
    ],
    s: [
      ["Die Inventur findet Ende Dezember statt.", "L'inventaire a lieu fin décembre."],
      ["Während der Inventur ruht der Warenverkehr.", "Pendant l'inventaire, les mouvements de marchandises sont suspendus."],
    ],
  },
  kommissionierung: {
    v: [
      ["die Kommissionierung starten", "lancer la préparation"],
      ["die Kommissionierung abschließen", "terminer la préparation"],
      ["nach Auftrag kommissionieren", "préparer par commande"],
    ],
    s: [
      ["Die Kommissionierung läuft über den Scanner.", "Le picking se fait avec le scanner."],
      ["Die Kommissionierung dauert im Schnitt 20 Minuten pro Auftrag.", "La préparation dure 20 minutes en moyenne par commande."],
    ],
  },
  palette: {
    v: [
      ["eine Palette wickeln", "filmer une palette"],
      ["eine Palette stapeln", "gerber une palette"],
      ["eine Palette tauschen", "échanger une palette"],
      ["eine Palette abstellen", "déposer une palette"],
    ],
    s: [
      ["Eine Europalette misst 120 × 80 cm.", "Une palette Europe mesure 120 × 80 cm."],
      ["Die Palette ist zu hoch beladen.", "La palette est chargée trop haut."],
    ],
  },
  regal: {
    v: [
      ["das Regal bestücken", "garnir le rayonnage"],
      ["das Regal einräumen", "ranger le rayonnage"],
      ["das Regal sperren", "condamner le rayonnage"],
    ],
    s: [
      ["Das Regal ist bis Ebene 6 belegt.", "Le rayonnage est occupé jusqu'au niveau 6."],
      ["Das Regal muss jährlich geprüft werden.", "Le rayonnage doit être contrôlé chaque année."],
    ],
  },
  fehlbestand: {
    v: [
      ["einen Fehlbestand melden", "signaler une rupture"],
      ["einen Fehlbestand ausgleichen", "combler un manquant"],
    ],
    s: [
      ["Ein Fehlbestand wurde im System gemeldet.", "Une rupture a été signalée dans le système."],
      ["Der Fehlbestand betrifft nur eine Charge.", "Le manquant ne concerne qu'un seul lot."],
    ],
  },
  sperrware: {
    v: [
      ["Ware sperren", "bloquer de la marchandise"],
      ["die Sperrung aufheben", "lever le blocage"],
    ],
    s: [
      ["Die Sperrware steht im gesperrten Bereich.", "La marchandise bloquée est dans la zone de blocage."],
      ["Sperrware darf nicht ausgeliefert werden.", "La marchandise bloquée ne doit pas être expédiée."],
    ],
  },
  mindestbestand: {
    v: [
      ["den Mindestbestand unterschreiten", "passer sous le stock minimum"],
      ["den Mindestbestand festlegen", "définir le stock minimum"],
    ],
    s: [
      ["Der Mindestbestand liegt bei 50 Stück.", "Le stock minimum est de 50 pièces."],
      ["Bei Unterschreitung des Mindestbestands wird automatisch nachbestellt.", "En dessous du stock minimum, un réapprovisionnement est déclenché."],
    ],
  },
  chargennummer: {
    v: [
      ["die Chargennummer erfassen", "saisir le numéro de lot"],
      ["die Chargennummer zurückverfolgen", "tracer le numéro de lot"],
    ],
    s: [
      ["Bitte die Chargennummer scannen.", "Merci de scanner le numéro de lot."],
      ["Über die Chargennummer lässt sich die Lieferung zurückverfolgen.", "Le numéro de lot permet de tracer la livraison."],
    ],
  },
  hochregallager: {
    v: [["ins Hochregallager einlagern", "stocker en magasin grande hauteur"]],
    s: [
      ["Das Hochregallager ist 30 Meter hoch.", "L'entrepôt à hauts rayonnages fait 30 mètres."],
      ["Im Hochregallager arbeiten Regalbediengeräte vollautomatisch.", "Dans ce magasin, les transstockeurs travaillent en automatique."],
    ],
  },
  kuehllager: {
    v: [["im Kühllager lagern", "stocker en froid"]],
    s: [
      ["Das Kühllager hält konstant 4 Grad.", "L'entrepôt frigorifique maintient 4 degrés."],
      ["Die Temperatur im Kühllager wird lückenlos aufgezeichnet.", "La température du frigorifique est enregistrée en continu."],
    ],
  },
  bestandsabweichung: {
    v: [
      ["eine Bestandsabweichung klären", "élucider un écart de stock"],
      ["eine Bestandsabweichung buchen", "enregistrer un écart de stock"],
    ],
    s: [
      ["Die Bestandsabweichung wird geprüft.", "L'écart de stock est vérifié."],
      ["Jede Bestandsabweichung muss begründet werden.", "Tout écart de stock doit être justifié."],
    ],
  },
  gefahrstoff: {
    v: [
      ["Gefahrstoffe getrennt lagern", "stocker les produits dangereux séparément"],
      ["Gefahrstoffe kennzeichnen", "étiqueter les produits dangereux"],
    ],
    s: [
      ["Gefahrstoffe werden getrennt gelagert.", "Les produits dangereux sont stockés séparément."],
      ["Für Gefahrstoffe gilt eine besondere Unterweisungspflicht.", "Les produits dangereux imposent une formation spécifique."],
    ],
  },
  gabelstapler: {
    v: [
      ["den Gabelstapler fahren", "conduire le chariot élévateur"],
      ["den Gabelstapler abstellen", "garer le chariot"],
      ["den Gabelstapler laden", "recharger le chariot"],
    ],
    s: [
      ["Für den Stapler brauchst du einen Staplerschein.", "Pour le chariot, il te faut un permis cariste."],
      ["Der Gabelstapler muss täglich geprüft werden.", "Le chariot doit être vérifié quotidiennement."],
    ],
  },
  leergut: {
    v: [
      ["Leergut zurücknehmen", "reprendre les emballages consignés"],
      ["Leergut verbuchen", "comptabiliser les vides"],
    ],
    s: [
      ["Das Leergut wird separat verbucht.", "Les vides sont comptabilisés séparément."],
      ["Das Leergut geht mit derselben Tour zurück.", "Les vides repartent avec la même tournée."],
    ],
  },
};

export default usage;
