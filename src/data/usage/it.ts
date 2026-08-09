import type { UsageMap } from "./types";

/** Informatique d'entreprise : systèmes, données, incidents et projets. */
const usage: UsageMap = {
  schnittstelle: {
    v: [
      ["eine Schnittstelle einrichten", "mettre en place une interface"],
      ["eine Schnittstelle anbinden", "raccorder une interface"],
      ["die Schnittstelle testen", "tester l'interface"],
    ],
    s: [
      ["Die Schnittstelle zum ERP läuft über EDI.", "L'interface avec l'ERP passe par l'EDI."],
      ["Die Schnittstelle hat heute Nacht Daten verloren.", "L'interface a perdu des données cette nuit."],
    ],
  },
  stammdaten: {
    v: [
      ["Stammdaten pflegen", "tenir à jour les données de base"],
      ["Stammdaten anlegen", "créer des données de base"],
      ["Stammdaten bereinigen", "nettoyer les données de base"],
    ],
    s: [
      ["Die Stammdaten werden im ERP gepflegt.", "Les données de base sont gérées dans l'ERP."],
      ["Fehlerhafte Stammdaten verursachen die meisten Probleme.", "Des données de base erronées causent la plupart des problèmes."],
    ],
  },
  buchung: {
    v: [
      ["eine Buchung erfassen", "saisir une écriture"],
      ["eine Buchung stornieren", "annuler une écriture"],
      ["eine Buchung nachvollziehen", "retracer une écriture"],
    ],
    s: [
      ["Jede Warenbewegung erzeugt eine Buchung.", "Chaque mouvement génère une écriture."],
      ["Die Buchung wurde auf den falschen Lagerplatz gemacht.", "L'écriture a été passée sur le mauvais emplacement."],
    ],
  },
  anforderung: {
    v: [
      ["eine Anforderung aufnehmen", "recueillir une exigence"],
      ["eine Anforderung umsetzen", "mettre en œuvre une exigence"],
      ["Anforderungen abstimmen", "valider les exigences"],
    ],
    s: [
      ["Die Anforderung ist noch nicht abgestimmt.", "L'exigence n'est pas encore validée."],
      ["Neue Anforderungen verschieben den Termin.", "De nouvelles exigences décalent l'échéance."],
    ],
  },
  ticket: {
    v: [
      ["ein Ticket eröffnen", "ouvrir un ticket"],
      ["ein Ticket schließen", "clore un ticket"],
      ["ein Ticket eskalieren", "escalader un ticket"],
      ["ein Ticket zuweisen", "affecter un ticket"],
    ],
    s: [
      ["Ich kümmere mich um das Ticket.", "Je m'occupe du ticket."],
      ["Das Ticket liegt seit drei Tagen offen.", "Le ticket est ouvert depuis trois jours."],
    ],
  },
  fehlermeldung: {
    v: [
      ["eine Fehlermeldung erhalten", "recevoir un message d'erreur"],
      ["die Fehlermeldung auswerten", "analyser le message d'erreur"],
    ],
    s: [
      ["Das System gibt eine Fehlermeldung aus.", "Le système affiche un message d'erreur."],
      ["Bitte schicken Sie mir einen Screenshot der Fehlermeldung.", "Merci de m'envoyer une capture du message d'erreur."],
    ],
  },
  ausfall: {
    v: [
      ["einen Ausfall melden", "signaler une panne"],
      ["den Ausfall beheben", "réparer la panne"],
    ],
    s: [
      ["Der Ausfall dauerte zwei Stunden.", "La panne a duré deux heures."],
      ["Nach dem Ausfall mussten die Daten nachgepflegt werden.", "Après la panne, les données ont dû être ressaisies."],
    ],
  },
  berechtigung: {
    v: [
      ["eine Berechtigung vergeben", "attribuer un droit"],
      ["eine Berechtigung entziehen", "retirer un droit"],
      ["Berechtigungen prüfen", "vérifier les droits"],
    ],
    s: [
      ["Die Berechtigung muss vom Admin vergeben werden.", "Le droit doit être attribué par l'administrateur."],
      ["Mir fehlt die Berechtigung für diesen Bereich.", "Je n'ai pas les droits pour cette zone."],
    ],
  },
  sicherungskopie: {
    v: [
      ["eine Sicherungskopie anlegen", "créer une sauvegarde"],
      ["die Sicherungskopie einspielen", "restaurer la sauvegarde"],
    ],
    s: [
      ["Die Sicherungskopie läuft jede Nacht um 2 Uhr.", "La sauvegarde s'exécute chaque nuit à 2h."],
      ["Ohne Sicherungskopie wären die Daten verloren gewesen.", "Sans sauvegarde, les données auraient été perdues."],
    ],
  },
  datenqualitaet: {
    v: [["die Datenqualität verbessern", "améliorer la qualité des données"]],
    s: [
      ["Die Datenqualität entscheidet über die Auswertung.", "La qualité des données conditionne l'analyse."],
      ["Die Datenqualität ist seit der Migration schlechter geworden.", "La qualité des données s'est dégradée depuis la migration."],
    ],
  },
  datenmigration: {
    v: [
      ["die Datenmigration vorbereiten", "préparer la migration"],
      ["die Datenmigration testen", "tester la migration"],
    ],
    s: [
      ["Die Datenmigration findet am Wochenende statt.", "La migration a lieu le week-end."],
      ["Nach der Datenmigration fehlten einige Datensätze.", "Après la migration, des enregistrements manquaient."],
    ],
  },
  abnahme: {
    v: [
      ["die Abnahme durchführen", "réaliser la recette"],
      ["die Abnahme verweigern", "refuser la recette"],
      ["die Abnahme erklären", "prononcer la réception"],
    ],
    s: [
      ["Die Abnahme ist für Freitag geplant.", "La recette est prévue vendredi."],
      ["Ohne erfolgreiche Abnahme gibt es keine Zahlung.", "Sans recette réussie, pas de paiement."],
    ],
  },
  lastenheft: {
    v: [
      ["das Lastenheft erstellen", "rédiger le cahier des charges"],
      ["das Lastenheft abstimmen", "valider le cahier des charges"],
    ],
    s: [
      ["Das Lastenheft beschreibt das Was.", "Le cahier des charges décrit le « quoi »."],
      ["Das Lastenheft wurde vom Fachbereich freigegeben.", "Le cahier des charges a été validé par le métier."],
    ],
  },
  testumgebung: {
    v: [["in der Testumgebung testen", "tester en environnement de test"]],
    s: [
      ["In der Testumgebung funktioniert alles.", "En environnement de test, tout fonctionne."],
      ["Die Testumgebung entspricht nicht der Produktion.", "L'environnement de test ne reflète pas la production."],
    ],
  },
  release: {
    v: [
      ["ein Release ausrollen", "déployer une version"],
      ["ein Release zurückrollen", "revenir à la version précédente"],
    ],
    s: [
      ["Das neue Release wird am Montag ausgerollt.", "La nouvelle version est déployée lundi."],
      ["Das Release enthält 14 Fehlerbehebungen.", "La version contient 14 corrections."],
    ],
  },
  sicherheitsluecke: {
    v: [
      ["eine Sicherheitslücke schließen", "corriger une faille"],
      ["eine Sicherheitslücke melden", "signaler une faille"],
    ],
    s: [
      ["Die Sicherheitslücke wurde sofort geschlossen.", "La faille a été corrigée immédiatement."],
      ["Über die Sicherheitslücke konnten Daten abgegriffen werden.", "La faille permettait d'exfiltrer des données."],
    ],
  },
  schwachstelle: {
    v: [["eine Schwachstelle beheben", "corriger un point faible"]],
    s: [
      ["Die Schwachstelle wurde im Audit gefunden.", "Le point faible a été trouvé lors de l'audit."],
      ["Die größte Schwachstelle bleibt der Mensch.", "Le point faible reste l'humain."],
    ],
  },
  quellcode: {
    v: [
      ["den Quellcode versionieren", "versionner le code source"],
      ["den Quellcode prüfen", "relire le code source"],
    ],
    s: [
      ["Der Quellcode liegt auf GitHub.", "Le code source est sur GitHub."],
      ["Der Quellcode ist schlecht dokumentiert.", "Le code source est mal documenté."],
    ],
  },
  datenbank: {
    v: [
      ["die Datenbank abfragen", "interroger la base"],
      ["die Datenbank sichern", "sauvegarder la base"],
    ],
    s: [
      ["Die Datenbank wird jede Nacht gesichert.", "La base est sauvegardée chaque nuit."],
      ["Die Datenbank ist zu langsam geworden.", "La base est devenue trop lente."],
    ],
  },
  verfuegbarkeit: {
    v: [["die Verfügbarkeit sicherstellen", "garantir la disponibilité"]],
    s: [
      ["Die Verfügbarkeit liegt bei 99,8 Prozent.", "La disponibilité est de 99,8 %."],
      ["Die Verfügbarkeit ist vertraglich zugesichert.", "La disponibilité est garantie par contrat."],
    ],
  },
  lagerverwaltungssystem: {
    v: [["das Lagerverwaltungssystem einführen", "déployer le WMS"]],
    s: [
      ["Das LVS steuert Plätze und Buchungen.", "Le WMS pilote les emplacements et les mouvements."],
      ["Ohne LVS läuft im Lager nichts mehr.", "Sans WMS, plus rien ne tourne dans l'entrepôt."],
    ],
  },
  mandant: {
    v: [["einen Mandanten anlegen", "créer une entité"]],
    s: [
      ["Jeder Mandant hat eigene Lagerorte.", "Chaque entité a ses propres emplacements."],
      ["Die Daten sind pro Mandant getrennt.", "Les données sont cloisonnées par entité."],
    ],
  },
};

export default usage;
