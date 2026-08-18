import { makers } from "../builders";

const { n, adv, p } = makers("zeit");

/**
 * Le temps — ce qu'on dit cent fois par jour et qui manquait entièrement.
 *
 * Le programme enseignait *Lieferfrist* et *Verzugszinsen* sans enseigner
 * *Montag*, *Uhrzeit* ni *spätestens*. Or dans l'express, une journée entière
 * tient dans quelques formules : à quelle heure, quel jour, avant quand, quelle
 * équipe. Sans elles, on connaît le vocabulaire du contrat mais pas celui du
 * quai.
 *
 * Deux pièges pour un francophone y sont signalés : l'écart entre *Termin* (le
 * rendez-vous) et *Frist* (le délai), et le fait que **morgen** (demain) et
 * **der Morgen** (le matin) s'écrivent pareil.
 */
const zeit = [
  // — Les unités —
  n("Uhrzeit", "die", "Uhrzeiten", "heure (indication horaire)", {
    example: { de: "Nennen Sie mir bitte die genaue Uhrzeit.", fr: "Donnez-moi l'heure exacte." },
  }),
  n("Stunde", "die", "Stunden", "heure (durée)", {
    note: "**Stunde** est la durée, **Uhrzeit** le moment. *Zwei Stunden* = deux heures de temps ; *um zwei Uhr* = à deux heures.",
    example: { de: "Der Lkw steht seit zwei Stunden an der Rampe.", fr: "Le camion est au quai depuis deux heures." },
  }),
  n("Minute", "die", "Minuten", "minute", {
    example: { de: "Wir sind in zehn Minuten da.", fr: "Nous sommes là dans dix minutes." },
  }),
  n("Tag", "der", "Tage", "jour", {
    example: { de: "Die Laufzeit beträgt zwei Tage.", fr: "Le délai d'acheminement est de deux jours." },
  }),
  n("Woche", "die", "Wochen", "semaine", {
    example: { de: "Nächste Woche ist Inventur.", fr: "La semaine prochaine, c'est l'inventaire." },
  }),
  n("Kalenderwoche", "die", "Kalenderwochen", "semaine calendaire (KW)", {
    definition:
      "L'Allemagne professionnelle date par numéro de semaine : *KW 12* plutôt que « mi-mars ». Les plannings, les commandes et les livraisons s'expriment ainsi — savoir lire « KW » est indispensable.",
    example: { de: "Die Lieferung ist für KW 12 geplant.", fr: "La livraison est prévue en semaine 12." },
  }),
  n("Monat", "der", "Monate", "mois", {
    example: { de: "Der Vertrag läuft noch drei Monate.", fr: "Le contrat court encore trois mois." },
  }),
  n("Quartal", "das", "Quartale", "trimestre", {
    example: { de: "Im letzten Quartal lag die Quote bei 98 Prozent.", fr: "Au dernier trimestre, le taux était de 98 %." },
  }),

  // — Les moments de la journée —
  n("Morgen", "der", "Morgen", "matin", {
    id: "morgen-nomen",
    note: "À ne pas confondre avec l'adverbe **morgen** (demain), qui s'écrit exactement pareil mais en minuscule. *Morgen früh* = demain matin.",
    example: { de: "Am Morgen läuft die erste Tour.", fr: "Le matin part la première tournée." },
  }),
  n("Vormittag", "der", "Vormittage", "matinée", {
    example: { de: "Die Zustellung erfolgt am Vormittag.", fr: "La livraison a lieu en matinée." },
  }),
  n("Mittag", "der", "Mittage", "midi", {
    example: { de: "Über Mittag ist das Büro nicht besetzt.", fr: "Sur le midi, le bureau n'est pas occupé." },
  }),
  n("Nachmittag", "der", "Nachmittage", "après-midi", {
    example: { de: "Am Nachmittag kommt der zweite Lkw.", fr: "L'après-midi arrive le deuxième camion." },
  }),
  n("Abend", "der", "Abende", "soir", {
    example: { de: "Die Abholung ist für den Abend geplant.", fr: "L'enlèvement est prévu pour le soir." },
  }),
  n("Nacht", "die", "Nächte", "nuit", {
    example: { de: "Über Nacht läuft der Fernverkehr.", fr: "La nuit, le trafic longue distance roule." },
  }),
  n("Feierabend", "der", "Feierabende", "fin de journée / débauche", {
    definition:
      "Le moment où la journée de travail s'arrête — mot du quotidien, sans équivalent français d'un seul tenant. *Feierabend machen* = débaucher ; *nach Feierabend* = après le travail.",
    example: { de: "Kurz vor Feierabend kam noch eine Eilsendung.", fr: "Juste avant la débauche, un envoi urgent est arrivé." },
  }),

  // — Les jours —
  n("Montag", "der", "Montage", "lundi", {
    example: { de: "Am Montag beginnt die neue Tourenplanung.", fr: "Lundi commence le nouveau plan de tournées." },
  }),
  n("Dienstag", "der", "Dienstage", "mardi", {
    example: { de: "Dienstag ist der stärkste Tag.", fr: "Le mardi est le jour le plus chargé." },
  }),
  n("Mittwoch", "der", "Mittwoche", "mercredi", {
    example: { de: "Bis Mittwoch brauchen wir die Freigabe.", fr: "Nous avons besoin de la validation pour mercredi." },
  }),
  n("Donnerstag", "der", "Donnerstage", "jeudi", {
    example: { de: "Am Donnerstag ist Inventur.", fr: "Jeudi, c'est inventaire." },
  }),
  n("Freitag", "der", "Freitage", "vendredi", {
    example: { de: "Freitags schließt das Lager früher.", fr: "Le vendredi, l'entrepôt ferme plus tôt." },
  }),
  n("Samstag", "der", "Samstage", "samedi", {
    example: { de: "Samstagszustellung kostet extra.", fr: "La livraison le samedi coûte un supplément." },
  }),
  n("Sonntag", "der", "Sonntage", "dimanche", {
    example: { de: "Am Sonntag gilt ein Fahrverbot für Lkw.", fr: "Le dimanche, les camions sont interdits de circulation." },
  }),
  n("Werktag", "der", "Werktage", "jour ouvrable", {
    note: "**Werktag** inclut le samedi ; **Arbeitstag** non. Une différence qui compte dans un délai contractuel.",
    example: { de: "Die Lieferung erfolgt binnen drei Werktagen.", fr: "La livraison intervient sous trois jours ouvrables." },
  }),
  n("Feiertag", "der", "Feiertage", "jour férié", {
    example: { de: "An Feiertagen wird nicht zugestellt.", fr: "Les jours fériés, on ne livre pas." },
  }),
  n("Wochenende", "das", "Wochenenden", "week-end", {
    example: { de: "Über das Wochenende bleibt die Ware im Depot.", fr: "Le week-end, la marchandise reste au dépôt." },
  }),

  // — Situer dans le temps —
  n("Anfang", "der", "Anfänge", "début", {
    example: { de: "Anfang nächster Woche kommt die Antwort.", fr: "Début de semaine prochaine, la réponse arrivera." },
  }),
  n("Mitte", "die", null, "milieu", {
    example: { de: "Mitte März läuft der Vertrag aus.", fr: "Mi-mars, le contrat expire." },
  }),
  n("Ende", "das", "Enden", "fin", {
    example: { de: "Ende des Monats wird abgerechnet.", fr: "En fin de mois, on facture." },
  }),
  n("Zeitraum", "der", "Zeiträume", "période", {
    example: { de: "In welchem Zeitraum ist die Anlieferung möglich?", fr: "Sur quelle période la livraison est-elle possible ?" },
  }),
  n("Zeitpunkt", "der", "Zeitpunkte", "moment / instant", {
    example: { de: "Zu diesem Zeitpunkt war die Ware schon unterwegs.", fr: "À ce moment-là, la marchandise était déjà en route." },
  }),
  n("Vorlauf", "der", "Vorläufe", "délai de prévenance / anticipation", {
    definition:
      "Le temps qu'il faut prévoir **avant** l'échéance pour que tout soit prêt. *Zwei Tage Vorlauf* = il faut s'y prendre deux jours à l'avance.",
    example: { de: "Für eine Sonderfahrt brauchen wir einen Tag Vorlauf.", fr: "Pour un affrètement spécial, il nous faut un jour d'anticipation." },
  }),

  // — Horaires de service —
  n("Annahmeschluss", "der", "Annahmeschlüsse", "heure limite de dépôt (cut-off)", {
    definition:
      "L'heure au-delà de laquelle un envoi ne part plus le jour même. C'est **l'heure structurante** de toute l'organisation d'un dépôt : tout est calé dessus, et une minute après, la journée du colis est perdue.",
    example: { de: "Der Annahmeschluss ist um 17:30 Uhr.", fr: "La clôture des dépôts est à 17h30." },
  }),
  n("Öffnungszeit", "die", "Öffnungszeiten", "horaire d'ouverture", {
    example: { de: "Die Öffnungszeiten stehen am Tor.", fr: "Les horaires d'ouverture sont affichés au portail." },
  }),
  n("Frühschicht", "die", "Frühschichten", "équipe du matin", {
    example: { de: "Die Frühschicht beginnt um 5:30 Uhr.", fr: "L'équipe du matin commence à 5h30." },
  }),
  n("Spätschicht", "die", "Spätschichten", "équipe d'après-midi", {
    example: { de: "In der Spätschicht wird verladen.", fr: "En équipe d'après-midi, on charge." },
  }),
  n("Nachtschicht", "die", "Nachtschichten", "équipe de nuit", {
    example: { de: "Die Sortierung läuft in der Nachtschicht.", fr: "Le tri se fait en équipe de nuit." },
  }),
  n("Einsatzplan", "der", "Einsatzpläne", "planning d'affectation", {
    example: { de: "Wer steht heute im Einsatzplan?", fr: "Qui figure au planning aujourd'hui ?" },
  }),
  n("Pause", "die", "Pausen", "pause", {
    example: { de: "Nach sechs Stunden ist eine Pause vorgeschrieben.", fr: "Après six heures, une pause est obligatoire." },
  }),

  // — Les adverbes qui reviennent sans arrêt —
  adv("heute", "aujourd'hui", {
    example: { de: "Heute geht nichts mehr raus.", fr: "Aujourd'hui, plus rien ne part." },
  }),
  adv("morgen", "demain", {
    note: "Attention : en majuscule, **der Morgen** veut dire « le matin ». *Morgen früh* = demain matin.",
    example: { de: "Morgen kommt die Ersatzlieferung.", fr: "Demain arrive la livraison de remplacement." },
  }),
  adv("gestern", "hier", {
    example: { de: "Gestern war der Scanner ausgefallen.", fr: "Hier, le scanner était en panne." },
  }),
  adv("übermorgen", "après-demain", {
    example: { de: "Übermorgen ist Feiertag.", fr: "Après-demain, c'est férié." },
  }),
  adv("vorgestern", "avant-hier", {
    example: { de: "Vorgestern kam die Reklamation herein.", fr: "Avant-hier, la réclamation est arrivée." },
  }),
  adv("spätestens", "au plus tard", {
    example: { de: "Wir brauchen die Freigabe spätestens Donnerstag.", fr: "Il nous faut la validation jeudi au plus tard." },
  }),
  adv("frühestens", "au plus tôt", {
    example: { de: "Frühestens Montag können wir liefern.", fr: "Au plus tôt lundi, nous pourrons livrer." },
  }),
  adv("rechtzeitig", "à temps", {
    example: { de: "Melden Sie sich bitte rechtzeitig.", fr: "Signalez-le à temps." },
  }),
  adv("täglich", "quotidiennement", {
    example: { de: "Der Bestand wird täglich abgeglichen.", fr: "Le stock est rapproché quotidiennement." },
  }),
  adv("wöchentlich", "hebdomadairement", {
    example: { de: "Die Auswertung kommt wöchentlich.", fr: "Le rapport arrive chaque semaine." },
  }),
  adv("monatlich", "mensuellement", {
    example: { de: "Der Dieselzuschlag wird monatlich angepasst.", fr: "La surcharge gazole est ajustée chaque mois." },
  }),

  // — Les tournures de date —
  p("am Montagmorgen", "lundi matin"),
  p("Anfang nächster Woche", "en début de semaine prochaine"),
  p("im Laufe des Tages", "dans le courant de la journée"),
  p("gegen 14 Uhr", "vers 14 heures", {
    note: "**gegen** + heure = « vers », approximatif. *Um 14 Uhr* serait précis.",
  }),
  p("Punkt acht Uhr", "à huit heures pile"),
  p("rund um die Uhr", "vingt-quatre heures sur vingt-quatre"),
  p("innerhalb von 24 Stunden", "sous 24 heures"),
  p("binnen drei Werktagen", "sous trois jours ouvrables"),
  p("bis Ende der Woche", "d'ici la fin de la semaine"),
  p("auf den letzten Drücker", "à la dernière minute", {
    note: "Familier mais très courant à l'oral, y compris au travail.",
  }),
];

export default zeit;
