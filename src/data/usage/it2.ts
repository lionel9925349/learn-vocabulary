import type { UsageMap } from "./types";

/** Informatique et bureau, second lot. */
const usage: UsageMap = {
  // — Développement et projet —
  anwendungsfall: {
    v: [["einen Anwendungsfall beschreiben", "décrire un cas d'usage"]],
    s: [
      ["Welcher Anwendungsfall ist am häufigsten?", "Quel cas d'usage est le plus fréquent ?"],
      ["Dieser Anwendungsfall wurde nicht bedacht.", "Ce cas d'usage n'avait pas été prévu."],
    ],
  },
  aufwandsschaetzung: {
    v: [["eine Aufwandsschätzung abgeben", "remettre une estimation de charge"]],
    s: [
      ["Wie hoch ist Ihre Aufwandsschätzung?", "À combien estimez-vous la charge ?"],
      ["Die Aufwandsschätzung lag deutlich zu niedrig.", "L'estimation était nettement trop basse."],
    ],
  },
  inbetriebnahme: {
    v: [["die Inbetriebnahme vorbereiten", "préparer la mise en service"]],
    s: [
      ["Wann ist die Inbetriebnahme geplant?", "Quand la mise en service est-elle prévue ?"],
      ["Nach der Inbetriebnahme folgt eine Stabilisierungsphase.", "Après la mise en service vient une phase de stabilisation."],
    ],
  },
  fehlerbehebung: {
    v: [["die Fehlerbehebung dokumentieren", "documenter la correction"]],
    s: [
      ["Wie lange dauert die Fehlerbehebung?", "Combien de temps prend la correction ?"],
      ["Die Fehlerbehebung kommt mit dem nächsten Release.", "La correction arrive avec la prochaine version."],
    ],
  },
  fehlerursache: {
    v: [["die Fehlerursache finden", "trouver la cause de l'erreur"]],
    s: [
      ["Kennen wir die Fehlerursache?", "Connaissons-nous la cause de l'erreur ?"],
      ["Die Fehlerursache lag in den Stammdaten.", "La cause se trouvait dans les données de base."],
    ],
  },
  produktivumgebung: {
    v: [["in die Produktivumgebung übernehmen", "basculer en production"]],
    s: [
      ["In der Produktivumgebung wird nicht getestet.", "On ne teste pas en production."],
      ["Der Fehler tritt nur in der Produktivumgebung auf.", "L'erreur n'apparaît qu'en production."],
    ],
  },
  fachbereich: {
    v: [["den Fachbereich einbinden", "impliquer le métier"]],
    s: [
      ["Was sagt der Fachbereich dazu?", "Qu'en dit le métier ?"],
      ["Der Fachbereich hat die Anforderung gestellt.", "Le métier a formulé l'exigence."],
    ],
  },
  datenpflege: {
    v: [["die Datenpflege übernehmen", "assurer la tenue des données"]],
    s: [
      ["Wer macht die Datenpflege?", "Qui assure la tenue des données ?"],
      ["Ohne saubere Datenpflege funktioniert kein System.", "Sans données bien tenues, aucun système ne fonctionne."],
    ],
  },
  zugriff: {
    v: [["Zugriff beantragen", "demander un accès"], ["den Zugriff sperren", "bloquer l'accès"]],
    s: [
      ["Haben Sie Zugriff auf den Ordner?", "Avez-vous accès au dossier ?"],
      ["Mir wurde der Zugriff verweigert.", "L'accès m'a été refusé."],
    ],
  },
  rechteverwaltung: {
    v: [["die Rechteverwaltung anpassen", "ajuster la gestion des droits"]],
    s: [
      ["Die Rechteverwaltung läuft über die IT.", "La gestion des droits passe par l'informatique."],
      ["In der Rechteverwaltung fehlt noch Ihre Rolle.", "Votre rôle manque encore dans la gestion des droits."],
    ],
  },
  notfallplan: {
    v: [["den Notfallplan auslösen", "déclencher le plan de secours"]],
    s: [
      ["Gibt es einen Notfallplan?", "Existe-t-il un plan de secours ?"],
      ["Der Notfallplan wird jährlich geübt.", "Le plan de secours fait l'objet d'un exercice annuel."],
    ],
  },
  lizenz: {
    v: [["eine Lizenz erwerben", "acquérir une licence"], ["Lizenzen verwalten", "gérer les licences"]],
    s: [
      ["Wie viele Lizenzen brauchen wir?", "Combien de licences nous faut-il ?"],
      ["Die Lizenz läuft im Dezember aus.", "La licence expire en décembre."],
    ],
  },
  anwender: {
    v: [["die Anwender schulen", "former les utilisateurs"]],
    s: [
      ["Was sagen die Anwender dazu?", "Qu'en disent les utilisateurs ?"],
      ["Die Anwender kommen mit der Oberfläche nicht zurecht.", "Les utilisateurs ne s'y retrouvent pas dans l'interface."],
    ],
  },
  benutzeroberflaeche: {
    v: [["die Benutzeroberfläche überarbeiten", "refondre l'interface"]],
    s: [
      ["Die Benutzeroberfläche ist unübersichtlich.", "L'interface manque de clarté."],
      ["Die neue Benutzeroberfläche kommt gut an.", "La nouvelle interface est bien accueillie."],
    ],
  },
  stapelverarbeitung: {
    v: [["die Stapelverarbeitung starten", "lancer le traitement par lots"]],
    s: [
      ["Die Stapelverarbeitung läuft nachts.", "Le traitement par lots tourne la nuit."],
      ["Die Stapelverarbeitung ist heute Nacht abgebrochen.", "Le traitement par lots s'est interrompu cette nuit."],
    ],
  },
  nachtlauf: {
    v: [["den Nachtlauf überwachen", "surveiller le traitement de nuit"]],
    s: [
      ["Ist der Nachtlauf durchgelaufen?", "Le traitement de nuit est-il passé ?"],
      ["Der Nachtlauf ist bei Schritt 4 stehen geblieben.", "Le traitement de nuit s'est arrêté à l'étape 4."],
    ],
  },
  dokumentation: {
    v: [["die Dokumentation pflegen", "tenir la documentation à jour"]],
    s: [
      ["Wo finde ich die Dokumentation?", "Où trouver la documentation ?"],
      ["Die Dokumentation ist veraltet.", "La documentation est obsolète."],
    ],
  },
  dienstleister: {
    v: [["einen Dienstleister beauftragen", "mandater un prestataire"]],
    s: [
      ["Welcher Dienstleister betreut das System?", "Quel prestataire gère le système ?"],
      ["Der Dienstleister reagiert zu langsam.", "Le prestataire réagit trop lentement."],
    ],
  },
  netzwerk: {
    v: [["das Netzwerk absichern", "sécuriser le réseau"]],
    s: [
      ["Das Netzwerk ist heute sehr langsam.", "Le réseau est très lent aujourd'hui."],
      ["Sind Sie mit dem Netzwerk verbunden?", "Êtes-vous connecté au réseau ?"],
    ],
  },
  verbindung: {
    v: [["die Verbindung aufbauen", "établir la connexion"], ["die Verbindung trennen", "couper la connexion"]],
    s: [
      ["Die Verbindung wurde unterbrochen.", "La connexion a été coupée."],
      ["Haben Sie eine stabile Verbindung?", "Avez-vous une connexion stable ?"],
    ],
  },
  passwort: {
    v: [["das Passwort ändern", "changer le mot de passe"], ["das Passwort zurücksetzen", "réinitialiser le mot de passe"]],
    s: [
      ["Ich habe mein Passwort vergessen.", "J'ai oublié mon mot de passe."],
      ["Das Passwort muss alle 90 Tage geändert werden.", "Le mot de passe doit être changé tous les 90 jours."],
    ],
  },
  cloud: {
    v: [["in die Cloud verlagern", "migrer vers le cloud"]],
    s: [
      ["Liegen die Daten in der Cloud?", "Les données sont-elles dans le cloud ?"],
      ["Wir haben das Archiv in die Cloud verlagert.", "Nous avons migré l'archive dans le cloud."],
    ],
  },
  ausfallzeit: {
    v: [["die Ausfallzeit minimieren", "minimiser l'indisponibilité"]],
    s: [
      ["Wie lang war die Ausfallzeit?", "Combien de temps a duré l'indisponibilité ?"],
      ["Die Ausfallzeit betrug nur fünf Minuten.", "L'indisponibilité n'a duré que cinq minutes."],
    ],
  },
  entwickler: {
    v: [["mit den Entwicklern sprechen", "parler aux développeurs"]],
    s: [
      ["Der Entwickler behebt den Fehler noch heute.", "Le développeur corrige le bug aujourd'hui."],
      ["Wir suchen einen erfahrenen Entwickler.", "Nous cherchons un développeur expérimenté."],
    ],
  },
  testfall: {
    v: [["einen Testfall schreiben", "écrire un cas de test"]],
    s: [
      ["Wie viele Testfälle gibt es?", "Combien de cas de test y a-t-il ?"],
      ["Dieser Testfall schlägt seit gestern fehl.", "Ce cas de test échoue depuis hier."],
    ],
  },
  abhaengigkeit: {
    v: [["Abhängigkeiten prüfen", "vérifier les dépendances"]],
    s: [
      ["Welche Abhängigkeiten gibt es?", "Quelles dépendances existe-t-il ?"],
      ["Eine veraltete Abhängigkeit verursacht den Konflikt.", "Une dépendance obsolète cause le conflit."],
    ],
  },

  // — Bureau, suite —
  sitzung: {
    v: [["eine Sitzung einberufen", "convoquer une séance"]],
    s: [
      ["Wann ist die nächste Sitzung?", "Quand a lieu la prochaine séance ?"],
      ["Die Sitzung wurde auf Montag verlegt.", "La séance a été déplacée à lundi."],
    ],
  },
  dienstreise: {
    v: [["eine Dienstreise beantragen", "demander un déplacement professionnel"]],
    s: [
      ["Wie oft sind Sie auf Dienstreise?", "À quelle fréquence êtes-vous en déplacement ?"],
      ["Die Dienstreise muss vorher genehmigt werden.", "Le déplacement doit être approuvé au préalable."],
    ],
  },
  homeoffice: {
    v: [["im Homeoffice arbeiten", "travailler en télétravail"]],
    s: [
      ["Wie viele Tage Homeoffice sind möglich?", "Combien de jours de télétravail sont possibles ?"],
      ["Morgen bin ich im Homeoffice.", "Demain je suis en télétravail."],
    ],
  },
  arbeitsvertrag: {
    v: [["einen Arbeitsvertrag unterschreiben", "signer un contrat de travail"]],
    s: [
      ["Was steht im Arbeitsvertrag?", "Que dit le contrat de travail ?"],
      ["Der Arbeitsvertrag ist unbefristet.", "Le contrat de travail est à durée indéterminée."],
    ],
  },
  abteilung: {
    v: [["die Abteilung leiten", "diriger le service"]],
    s: [
      ["In welcher Abteilung arbeiten Sie?", "Dans quel service travaillez-vous ?"],
      ["Die Abteilung wurde umstrukturiert.", "Le service a été réorganisé."],
    ],
  },
  vorgesetzte: {
    v: [["mit dem Vorgesetzten sprechen", "parler au supérieur"]],
    s: [
      ["Haben Sie das mit Ihrem Vorgesetzten geklärt?", "Avez-vous vu cela avec votre supérieur ?"],
      ["Die Vorgesetzte hat den Urlaub genehmigt.", "La supérieure a validé le congé."],
    ],
  },
  nachweis: {
    v: [["einen Nachweis erbringen", "apporter un justificatif"]],
    s: [
      ["Welchen Nachweis brauchen Sie?", "Quel justificatif vous faut-il ?"],
      ["Ohne Nachweis können wir nichts erstatten.", "Sans justificatif, nous ne pouvons rien rembourser."],
    ],
  },
  betreff: {
    s: [
      ["Schreiben Sie bitte die Auftragsnummer in den Betreff.", "Merci d'indiquer le numéro de commande dans l'objet."],
      ["Der Betreff war leer.", "L'objet du message était vide."],
    ],
  },
  erinnerung: {
    v: [["eine Erinnerung schicken", "envoyer un rappel"]],
    s: [
      ["Das ist nur eine freundliche Erinnerung.", "Ceci n'est qu'un rappel amical."],
      ["Ich stelle mir eine Erinnerung.", "Je me mets un rappel."],
    ],
  },
  rueckmeldung: {
    v: [["um Rückmeldung bitten", "demander un retour"]],
    s: [
      ["Ich warte noch auf Ihre Rückmeldung.", "J'attends encore votre retour."],
      ["Danke für die schnelle Rückmeldung.", "Merci pour ce retour rapide."],
    ],
  },
  anfrage: {
    v: [["eine Anfrage stellen", "faire une demande"], ["eine Anfrage beantworten", "répondre à une demande"]],
    s: [
      ["Ihre Anfrage haben wir erhalten.", "Nous avons bien reçu votre demande."],
      ["Auf meine Anfrage kam keine Antwort.", "Ma demande est restée sans réponse."],
    ],
  },
  klaerung: {
    v: [["etwas zur Klärung bringen", "tirer quelque chose au clair"]],
    s: [
      ["Das bedarf noch der Klärung.", "Cela demande encore clarification."],
      ["Zur Klärung: Wir sprechen von Position 3.", "Pour clarifier : nous parlons de la ligne 3."],
    ],
  },
};

export default usage;
