import type { UsageMap } from "./types";

/** Bureau, organisation du travail et finances : le quotidien administratif. */
const usage: UsageMap = {
  // — Réunions et organisation —
  besprechung: {
    v: [
      ["eine Besprechung ansetzen", "fixer une réunion"],
      ["eine Besprechung absagen", "annuler une réunion"],
      ["an einer Besprechung teilnehmen", "participer à une réunion"],
    ],
    s: [
      ["Die Besprechung beginnt um 9 Uhr.", "La réunion commence à 9h."],
      ["Die Besprechung hat nichts gebracht.", "La réunion n'a rien donné."],
    ],
  },
  tagesordnung: {
    v: [
      ["etwas auf die Tagesordnung setzen", "mettre un point à l'ordre du jour"],
      ["die Tagesordnung verschicken", "envoyer l'ordre du jour"],
    ],
    s: [
      ["Das steht nicht auf der Tagesordnung.", "Ce n'est pas à l'ordre du jour."],
      ["Die Tagesordnung umfasst fünf Punkte.", "L'ordre du jour comporte cinq points."],
    ],
  },
  termin: {
    v: [
      ["einen Termin vereinbaren", "fixer un rendez-vous"],
      ["einen Termin absagen", "annuler un rendez-vous"],
      ["einen Termin einhalten", "respecter un rendez-vous"],
      ["einen Termin verschieben", "reporter un rendez-vous"],
    ],
    s: [
      ["Ich habe einen Termin um 14 Uhr.", "J'ai un rendez-vous à 14h."],
      ["Der Termin steht.", "Le rendez-vous est confirmé."],
    ],
  },
  frist: {
    v: [
      ["eine Frist setzen", "fixer un délai"],
      ["eine Frist verlängern", "prolonger un délai"],
      ["eine Frist versäumen", "laisser passer un délai"],
    ],
    s: [
      ["Die Frist läuft am Freitag ab.", "Le délai expire vendredi."],
      ["Wir haben die Frist um eine Woche verlängert.", "Nous avons prolongé le délai d'une semaine."],
    ],
  },
  freigabe: {
    v: [
      ["die Freigabe erteilen", "donner la validation"],
      ["auf die Freigabe warten", "attendre la validation"],
    ],
    s: [
      ["Ohne Freigabe geht nichts in Produktion.", "Rien ne part en production sans validation."],
      ["Die Freigabe kam gestern Abend.", "La validation est arrivée hier soir."],
    ],
  },
  vertretung: {
    v: [
      ["die Vertretung übernehmen", "assurer le remplacement"],
      ["eine Vertretung organisieren", "organiser un remplacement"],
    ],
    s: [
      ["Während meines Urlaubs übernimmt Herr Meyer die Vertretung.", "Pendant mes congés, M. Meyer assure le remplacement."],
      ["Wer ist Ihre Vertretung?", "Qui vous remplace ?"],
    ],
  },
  urlaub: {
    v: [
      ["Urlaub beantragen", "demander un congé"],
      ["Urlaub nehmen", "prendre des congés"],
      ["im Urlaub sein", "être en congé"],
    ],
    s: [
      ["Ich bin nächste Woche im Urlaub.", "Je suis en congé la semaine prochaine."],
      ["Der Urlaub muss zwei Wochen vorher beantragt werden.", "Le congé doit être demandé deux semaines à l'avance."],
    ],
  },
  ueberstunde: {
    v: [
      ["Überstunden machen", "faire des heures supplémentaires"],
      ["Überstunden abbauen", "récupérer des heures supplémentaires"],
    ],
    s: [
      ["Ich habe diese Woche zehn Überstunden.", "J'ai dix heures supplémentaires cette semaine."],
      ["Überstunden müssen genehmigt werden.", "Les heures supplémentaires doivent être approuvées."],
    ],
  },
  abwesenheit: {
    v: [["die Abwesenheit melden", "signaler une absence"]],
    s: [
      ["Bitte tragen Sie Ihre Abwesenheit im Kalender ein.", "Merci d'indiquer votre absence dans l'agenda."],
      ["Während meiner Abwesenheit wenden Sie sich bitte an das Team.", "Pendant mon absence, adressez-vous à l'équipe."],
    ],
  },
  schicht: {
    v: [
      ["Schicht arbeiten", "travailler en équipe"],
      ["die Schicht übernehmen", "prendre le poste"],
      ["die Schicht tauschen", "échanger son poste"],
    ],
    s: [
      ["Ich arbeite diese Woche in der Frühschicht.", "Cette semaine je suis en équipe du matin."],
      ["Die Schicht endet um 22 Uhr.", "Le poste se termine à 22h."],
    ],
  },
  einladung: {
    v: [
      ["eine Einladung verschicken", "envoyer une invitation"],
      ["eine Einladung annehmen", "accepter une invitation"],
    ],
    s: [
      ["Die Einladung geht heute raus.", "L'invitation part aujourd'hui."],
      ["Ich habe die Einladung noch nicht bekommen.", "Je n'ai pas encore reçu l'invitation."],
    ],
  },
  unterlage: {
    v: [
      ["Unterlagen zusammenstellen", "réunir les documents"],
      ["Unterlagen nachreichen", "fournir les documents manquants"],
    ],
    s: [
      ["Die Unterlagen liegen der Mail bei.", "Les documents sont joints au mail."],
      ["Bitte reichen Sie die fehlenden Unterlagen nach.", "Merci de fournir les documents manquants."],
    ],
  },
  unterschrift: {
    v: [
      ["eine Unterschrift leisten", "apposer une signature"],
      ["etwas zur Unterschrift vorlegen", "présenter à la signature"],
    ],
    s: [
      ["Hier fehlt noch die Unterschrift.", "Il manque encore la signature ici."],
      ["Der Vertrag liegt zur Unterschrift bereit.", "Le contrat est prêt à signer."],
    ],
  },
  weiterbildung: {
    v: [
      ["an einer Weiterbildung teilnehmen", "suivre une formation"],
      ["eine Weiterbildung anbieten", "proposer une formation"],
    ],
    s: [
      ["Die Weiterbildung dauert drei Tage.", "La formation dure trois jours."],
      ["Der Betrieb übernimmt die Kosten der Weiterbildung.", "L'entreprise prend en charge les frais de formation."],
    ],
  },
  entscheidung: {
    v: [
      ["eine Entscheidung treffen", "prendre une décision"],
      ["eine Entscheidung vertagen", "ajourner une décision"],
      ["eine Entscheidung revidieren", "revenir sur une décision"],
    ],
    s: [
      ["Die Entscheidung fällt nächste Woche.", "La décision tombe la semaine prochaine."],
      ["Das ist nicht meine Entscheidung.", "Ce n'est pas ma décision."],
    ],
  },
  zustaendigkeit: {
    v: [["die Zuständigkeit klären", "clarifier les responsabilités"]],
    s: [
      ["Das fällt nicht in meine Zuständigkeit.", "Cela ne relève pas de mon domaine."],
      ["Die Zuständigkeiten sind klar verteilt.", "Les responsabilités sont clairement réparties."],
    ],
  },
  bewerbung: {
    v: [
      ["eine Bewerbung einreichen", "déposer une candidature"],
      ["eine Bewerbung prüfen", "examiner une candidature"],
    ],
    s: [
      ["Ihre Bewerbung haben wir erhalten.", "Nous avons bien reçu votre candidature."],
      ["Die Bewerbung wurde abgelehnt.", "La candidature a été rejetée."],
    ],
  },

  // — Finances —
  zahlung: {
    v: [
      ["eine Zahlung leisten", "effectuer un paiement"],
      ["eine Zahlung anweisen", "ordonner un paiement"],
      ["eine Zahlung zurückhalten", "retenir un paiement"],
    ],
    s: [
      ["Die Zahlung erfolgt binnen 30 Tagen.", "Le paiement intervient sous 30 jours."],
      ["Die Zahlung ist noch nicht eingegangen.", "Le paiement n'est pas encore arrivé."],
    ],
  },
  mahnung: {
    v: [
      ["eine Mahnung verschicken", "envoyer une relance"],
      ["eine Mahnung erhalten", "recevoir une relance"],
    ],
    s: [
      ["Die Mahnung wurde automatisch verschickt.", "La relance a été envoyée automatiquement."],
      ["Nach der dritten Mahnung geht der Fall ans Inkasso.", "Après la troisième relance, le dossier part au recouvrement."],
    ],
  },
  budget: {
    v: [
      ["ein Budget einplanen", "prévoir un budget"],
      ["das Budget überschreiten", "dépasser le budget"],
      ["das Budget freigeben", "débloquer le budget"],
    ],
    s: [
      ["Das Budget für dieses Projekt ist begrenzt.", "Le budget de ce projet est limité."],
      ["Wir liegen über dem Budget.", "Nous sommes au-dessus du budget."],
    ],
  },
  kosten: {
    v: [
      ["Kosten senken", "réduire les coûts"],
      ["Kosten verursachen", "engendrer des coûts"],
      ["Kosten weiterberechnen", "refacturer des coûts"],
    ],
    s: [
      ["Die Kosten wurden um zehn Prozent gesenkt.", "Les coûts ont été réduits de dix pour cent."],
      ["Wer trägt die Kosten?", "Qui supporte les coûts ?"],
    ],
  },
  forderung: {
    v: [
      ["eine Forderung geltend machen", "faire valoir une créance"],
      ["eine Forderung abschreiben", "passer une créance en perte"],
    ],
    s: [
      ["Die Forderung ist seit 60 Tagen offen.", "La créance est ouverte depuis 60 jours."],
      ["Die Forderung wurde vollständig beglichen.", "La créance a été intégralement réglée."],
    ],
  },
  kostenstelle: {
    v: [["auf eine Kostenstelle buchen", "imputer à un centre de coûts"]],
    s: [
      ["Auf welche Kostenstelle soll das gebucht werden?", "Sur quel centre de coûts faut-il imputer cela ?"],
      ["Die Kostenstelle steht auf der Bestellung.", "Le centre de coûts figure sur la commande."],
    ],
  },
  umsatz: {
    v: [
      ["Umsatz machen", "réaliser du chiffre d'affaires"],
      ["den Umsatz steigern", "augmenter le chiffre d'affaires"],
    ],
    s: [
      ["Der Umsatz ist im Vergleich zum Vorjahr gestiegen.", "Le chiffre d'affaires a augmenté par rapport à l'an dernier."],
      ["Der Umsatz stagniert seit zwei Quartalen.", "Le chiffre d'affaires stagne depuis deux trimestres."],
    ],
  },
};

export default usage;
