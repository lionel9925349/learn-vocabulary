import type { UsageMap } from "./types";

/** Production, atelier et indicateurs de performance. */
const usage: UsageMap = {
  fertigung: {
    v: [
      ["die Fertigung anfahren", "démarrer la production"],
      ["die Fertigung stoppen", "arrêter la production"],
      ["in Fertigung gehen", "passer en production"],
    ],
    s: [
      ["Die Fertigung läuft im Dreischichtbetrieb.", "La production tourne en trois-huit."],
      ["Der Auftrag ist bereits in der Fertigung.", "La commande est déjà en production."],
    ],
  },
  fertigungsauftrag: {
    v: [
      ["einen Fertigungsauftrag anlegen", "créer un ordre de fabrication"],
      ["einen Fertigungsauftrag freigeben", "lancer un ordre de fabrication"],
      ["einen Fertigungsauftrag abschließen", "clôturer un ordre de fabrication"],
    ],
    s: [
      ["Der Fertigungsauftrag wurde freigegeben.", "L'ordre de fabrication a été lancé."],
      ["Zu diesem Fertigungsauftrag fehlt noch Material.", "Il manque encore du matériel sur cet ordre."],
    ],
  },
  stueckliste: {
    v: [
      ["die Stückliste pflegen", "tenir à jour la nomenclature"],
      ["die Stückliste auflösen", "éclater la nomenclature"],
    ],
    s: [
      ["Die Stückliste zeigt alle benötigten Bauteile.", "La nomenclature indique tous les composants."],
      ["Die Stückliste ist nicht mehr aktuell.", "La nomenclature n'est plus à jour."],
    ],
  },
  ruestzeit: {
    v: [
      ["die Rüstzeit verkürzen", "réduire le temps de changement"],
      ["die Rüstzeit erfassen", "mesurer le temps de changement"],
    ],
    s: [
      ["Die Rüstzeit wurde durch SMED verkürzt.", "Le temps de changement a été réduit grâce au SMED."],
      ["Lange Rüstzeiten machen kleine Lose teuer.", "Des changements longs rendent les petits lots coûteux."],
    ],
  },
  durchlaufzeit: {
    v: [
      ["die Durchlaufzeit senken", "réduire le délai"],
      ["die Durchlaufzeit messen", "mesurer le délai"],
    ],
    s: [
      ["Die Durchlaufzeit wurde um 20 Prozent gesenkt.", "Le délai a été réduit de 20 %."],
      ["Die Durchlaufzeit beträgt im Schnitt drei Tage.", "Le délai moyen est de trois jours."],
    ],
  },
  ausschuss: {
    v: [
      ["Ausschuss produzieren", "produire du rebut"],
      ["den Ausschuss reduzieren", "réduire le rebut"],
      ["Ausschuss aussortieren", "trier le rebut"],
    ],
    s: [
      ["Der Ausschuss liegt unter zwei Prozent.", "Le rebut est inférieur à deux pour cent."],
      ["Der Ausschuss wird separat verbucht.", "Le rebut est comptabilisé séparément."],
    ],
  },
  nacharbeit: {
    v: [["Nacharbeit erforderlich machen", "nécessiter une retouche"]],
    s: [
      ["Die Nacharbeit kostet zusätzliche Zeit.", "La retouche demande du temps supplémentaire."],
      ["Zwanzig Teile gehen in die Nacharbeit.", "Vingt pièces partent en retouche."],
    ],
  },
  stillstand: {
    v: [
      ["einen Stillstand verursachen", "provoquer un arrêt"],
      ["Stillstände vermeiden", "éviter les arrêts"],
    ],
    s: [
      ["Der Stillstand dauerte zwei Stunden.", "L'arrêt a duré deux heures."],
      ["Jeder Stillstand kostet 4000 Euro pro Stunde.", "Chaque arrêt coûte 4000 euros de l'heure."],
    ],
  },
  instandhaltung: {
    v: [
      ["die Instandhaltung planen", "planifier la maintenance"],
      ["die Instandhaltung durchführen", "effectuer la maintenance"],
    ],
    s: [
      ["Die Instandhaltung erfolgt vorbeugend.", "La maintenance est préventive."],
      ["Die Instandhaltung ist für Samstag angesetzt.", "La maintenance est programmée samedi."],
    ],
  },
  engpass: {
    v: [
      ["einen Engpass beseitigen", "supprimer un goulot d'étranglement"],
      ["einen Engpass identifizieren", "identifier un goulot"],
    ],
    s: [
      ["Der Engpass liegt bei der Lackieranlage.", "Le goulot se situe à la cabine de peinture."],
      ["Wir haben derzeit einen Engpass bei Halbleitern.", "Nous avons actuellement une tension sur les semi-conducteurs."],
    ],
  },
  losgroesse: {
    v: [["die Losgröße anpassen", "ajuster la taille de lot"]],
    s: [
      ["Die Losgröße wird an die Nachfrage angepasst.", "La taille de lot est ajustée à la demande."],
      ["Kleine Losgrößen erhöhen die Flexibilität.", "Les petits lots augmentent la flexibilité."],
    ],
  },
  rohstoff: {
    v: [
      ["Rohstoffe beschaffen", "approvisionner des matières premières"],
      ["Rohstoffe einsetzen", "utiliser des matières premières"],
    ],
    s: [
      ["Die Rohstoffpreise sind stark gestiegen.", "Les prix des matières premières ont fortement augmenté."],
      ["Der Rohstoff wird aus Asien bezogen.", "La matière première vient d'Asie."],
    ],
  },
  schichtuebergabe: {
    v: [["die Schichtübergabe dokumentieren", "documenter la passation d'équipe"]],
    s: [
      ["Bei der Schichtübergabe werden offene Punkte besprochen.", "À la passation, les points ouverts sont discutés."],
      ["Die Schichtübergabe dauert fünfzehn Minuten.", "La passation dure quinze minutes."],
    ],
  },
  arbeitssicherheit: {
    v: [["die Arbeitssicherheit gewährleisten", "assurer la sécurité au travail"]],
    s: [
      ["Arbeitssicherheit geht vor Produktivität.", "La sécurité passe avant la productivité."],
      ["Die Arbeitssicherheit wird regelmäßig geschult.", "La sécurité au travail fait l'objet de formations régulières."],
    ],
  },

  // — Indicateurs —
  liefertreue: {
    v: [["die Liefertreue verbessern", "améliorer le taux de service"]],
    s: [
      ["Die Liefertreue liegt bei 96 Prozent.", "Le taux de service est de 96 %."],
      ["Die Liefertreue ist unser wichtigster Kennwert.", "Le taux de service est notre indicateur clé."],
    ],
  },
  kennzahl: {
    v: [
      ["eine Kennzahl erheben", "relever un indicateur"],
      ["Kennzahlen auswerten", "analyser les indicateurs"],
    ],
    s: [
      ["Diese Kennzahl wird monatlich berichtet.", "Cet indicateur est reporté chaque mois."],
      ["Welche Kennzahl ist hier entscheidend?", "Quel indicateur est déterminant ici ?"],
    ],
  },
  prognose: {
    v: [
      ["eine Prognose erstellen", "établir une prévision"],
      ["die Prognose anpassen", "ajuster la prévision"],
    ],
    s: [
      ["Die Prognose liegt deutlich über dem Vorjahr.", "La prévision dépasse nettement l'an dernier."],
      ["Die Prognose hat sich nicht bestätigt.", "La prévision ne s'est pas confirmée."],
    ],
  },
  abweichungsanalyse: {
    v: [["eine Abweichungsanalyse durchführen", "réaliser une analyse des écarts"]],
    s: [
      ["Die Abweichungsanalyse zeigt drei Hauptursachen.", "L'analyse des écarts révèle trois causes principales."],
      ["Die Abweichungsanalyse gehört zum Monatsabschluss.", "L'analyse des écarts fait partie de la clôture mensuelle."],
    ],
  },
  auslastung: {
    v: [
      ["die Auslastung erhöhen", "augmenter le taux de charge"],
      ["die Auslastung überwachen", "surveiller le taux de charge"],
    ],
    s: [
      ["Die Auslastung des Lkw liegt bei 95 Prozent.", "Le remplissage du camion est de 95 %."],
      ["Die Auslastung schwankt saisonal stark.", "Le taux de charge varie fortement selon la saison."],
    ],
  },
};

export default usage;
