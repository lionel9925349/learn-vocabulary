import type { UsageMap } from "./types";

/** Transport et expédition : les tournures qu'on entend au quai et au téléphone. */
const usage: UsageMap = {
  sendung: {
    v: [
      ["eine Sendung avisieren", "annoncer un envoi"],
      ["eine Sendung verfolgen", "suivre un envoi"],
      ["eine Sendung zustellen", "livrer un envoi"],
      ["eine Sendung aufteilen", "fractionner un envoi"],
    ],
    s: [
      ["Die Sendung ist seit gestern unterwegs.", "L'envoi est en transit depuis hier."],
      ["Die Sendung besteht aus drei Packstücken.", "L'envoi se compose de trois colis."],
    ],
  },
  frachtbrief: {
    v: [
      ["den Frachtbrief ausstellen", "établir la lettre de voiture"],
      ["den Frachtbrief unterschreiben", "signer la lettre de voiture"],
      ["einen Vorbehalt im Frachtbrief eintragen", "porter une réserve sur la lettre de voiture"],
    ],
    s: [
      ["Ich habe den Schaden auf dem Frachtbrief vermerkt.", "J'ai noté le dommage sur la lettre de voiture."],
      ["Ohne Frachtbrief wird die Ware nicht übernommen.", "Sans lettre de voiture, la marchandise n'est pas prise en charge."],
    ],
  },
  rampe: {
    v: [
      ["an die Rampe fahren", "se mettre à quai"],
      ["die Rampe anfahren", "accoster le quai"],
      ["die Rampe belegen", "occuper le quai"],
    ],
    s: [
      ["An Rampe 2 steht schon ein Lkw.", "Un camion attend déjà au quai 2."],
      ["Die Rampe ist bis 14 Uhr belegt.", "Le quai est occupé jusqu'à 14h."],
    ],
  },
  lkw: {
    v: [
      ["den Lkw beladen", "charger le camion"],
      ["den Lkw entladen", "décharger le camion"],
      ["den Lkw abfertigen", "traiter le camion"],
    ],
    s: [
      ["Der Lkw wartet seit einer Stunde im Hof.", "Le camion attend depuis une heure dans la cour."],
      ["Der Lkw ist voll ausgelastet.", "Le camion est chargé au maximum."],
    ],
  },
  container: {
    v: [
      ["einen Container stellen", "positionner un conteneur"],
      ["einen Container packen", "empoter un conteneur"],
      ["einen Container plombieren", "plomber un conteneur"],
    ],
    s: [
      ["Der Container kommt Mitte Oktober an.", "Le conteneur arrive mi-octobre."],
      ["Der Container wurde im Hafen umgeschlagen.", "Le conteneur a été transbordé au port."],
    ],
  },
  verspaetung: {
    v: [
      ["eine Verspätung melden", "signaler un retard"],
      ["die Verspätung aufholen", "rattraper le retard"],
      ["mit Verspätung eintreffen", "arriver avec du retard"],
    ],
    s: [
      ["Wegen eines Staus kommt es zu einer Verspätung.", "Un embouteillage cause un retard."],
      ["Die Verspätung beträgt voraussichtlich zwei Stunden.", "Le retard est estimé à deux heures."],
    ],
  },
  ladungssicherung: {
    v: [
      ["die Ladung sichern", "arrimer le chargement"],
      ["die Ladungssicherung prüfen", "contrôler l'arrimage"],
      ["Zurrgurte anlegen", "poser des sangles"],
    ],
    s: [
      ["Ohne Ladungssicherung darf der Lkw nicht losfahren.", "Sans arrimage, le camion ne peut pas partir."],
      ["Für die Ladungssicherung haftet der Verlader.", "Le chargeur est responsable de l'arrimage."],
    ],
  },
  zeitfenster: {
    v: [
      ["ein Zeitfenster buchen", "réserver un créneau"],
      ["das Zeitfenster verpassen", "manquer le créneau"],
      ["das Zeitfenster einhalten", "respecter le créneau"],
    ],
    s: [
      ["Wir haben ein Zeitfenster von 8 bis 10 Uhr.", "Nous avons un créneau de 8h à 10h."],
      ["Wer sein Zeitfenster verpasst, muss warten.", "Qui manque son créneau doit attendre."],
    ],
  },
  spediteur: {
    v: [
      ["den Spediteur beauftragen", "mandater le transitaire"],
      ["beim Spediteur nachfragen", "relancer le transitaire"],
    ],
    s: [
      ["Der Spediteur hat die Sendung avisiert.", "Le transitaire a annoncé l'envoi."],
      ["Der Spediteur organisiert den Transport, führt ihn aber nicht selbst aus.", "Le transitaire organise le transport sans l'exécuter lui-même."],
    ],
  },
  frachtfuehrer: {
    v: [["den Frachtführer beauftragen", "mandater le transporteur"]],
    s: [
      ["Der Frachtführer haftet für den Verlust.", "Le transporteur est responsable de la perte."],
      ["Der Frachtführer übernimmt die Ware an der Rampe.", "Le transporteur prend la marchandise en charge au quai."],
    ],
  },
  tour: {
    v: [
      ["eine Tour planen", "planifier une tournée"],
      ["eine Tour fahren", "effectuer une tournée"],
      ["eine Tour absagen", "annuler une tournée"],
    ],
    s: [
      ["Die Tour beginnt um 5 Uhr morgens.", "La tournée commence à 5h du matin."],
      ["Auf der Tour sind zwölf Stopps geplant.", "Douze arrêts sont prévus sur la tournée."],
    ],
  },
  standzeit: {
    v: [
      ["Standzeit berechnen", "facturer le temps d'attente"],
      ["Standzeit vermeiden", "éviter les temps d'attente"],
    ],
    s: [
      ["Ab zwei Stunden wird Standzeit berechnet.", "Au-delà de deux heures, le temps d'attente est facturé."],
      ["Die Standzeit an der Rampe war zu lang.", "Le temps d'attente au quai a été trop long."],
    ],
  },
  ablieferbeleg: {
    v: [["den Ablieferbeleg anfordern", "demander la preuve de livraison"]],
    s: [
      ["Der Ablieferbeleg wurde vom Empfänger unterschrieben.", "La preuve de livraison a été signée par le destinataire."],
      ["Ohne Ablieferbeleg können wir nicht abrechnen.", "Sans preuve de livraison, nous ne pouvons pas facturer."],
    ],
  },
  transportschaden: {
    v: [
      ["einen Transportschaden melden", "déclarer une avarie"],
      ["einen Transportschaden dokumentieren", "documenter une avarie"],
      ["einen Transportschaden regulieren", "indemniser une avarie"],
    ],
    s: [
      ["Der Transportschaden wurde fotografisch dokumentiert.", "L'avarie a été documentée par photo."],
      ["Transportschäden sind binnen sieben Tagen zu melden.", "Les avaries doivent être déclarées sous sept jours."],
    ],
  },
  leerfahrt: {
    v: [["Leerfahrten vermeiden", "éviter les trajets à vide"]],
    s: [
      ["Leerfahrten sollen vermieden werden.", "Les trajets à vide doivent être évités."],
      ["Jede Leerfahrt kostet Geld und CO₂.", "Chaque trajet à vide coûte de l'argent et du CO₂."],
    ],
  },
};

export default usage;
