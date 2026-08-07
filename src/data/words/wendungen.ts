import type { Word } from "@/lib/types";
import { makers } from "../builders";

const { p } = makers("wendungen");

/**
 * Tournures toutes faites du quotidien professionnel : mails, téléphone,
 * réunions. Ce sont elles qui font passer d'un allemand compris à un allemand
 * parlé — on les apprend en bloc, pas mot à mot.
 */
const words: Word[] = [
  // — Mails : ouverture et clôture —
  p("Sehr geehrte Damen und Herren", "Madame, Monsieur (mail formel)"),
  p("Mit freundlichen Grüßen", "Cordialement (formule de fin standard)"),
  p("Vielen Dank im Voraus", "Merci d'avance"),
  p("Bei Rückfragen stehe ich gerne zur Verfügung", "Je reste à votre disposition pour toute question"),
  p("Ich melde mich bei Ihnen", "Je reviens vers vous"),
  p("Anbei finden Sie", "Veuillez trouver ci-joint"),
  p("Wie telefonisch besprochen", "Comme convenu par téléphone"),
  p("Wie bereits erwähnt", "Comme déjà mentionné"),
  p("Ich beziehe mich auf Ihre Anfrage", "Je fais suite à votre demande"),
  p("Leider müssen wir Ihnen mitteilen", "Nous avons le regret de vous informer"),
  p("Wir bitten um Verständnis", "Nous vous remercions de votre compréhension"),
  p("Um Rückmeldung wird gebeten", "Merci de bien vouloir répondre"),
  p("Bitte um kurze Bestätigung", "Merci de confirmer brièvement"),

  // — Délais et urgence —
  p("so schnell wie möglich", "dès que possible"),
  p("bis spätestens Freitag", "vendredi au plus tard"),
  p("Es eilt", "C'est urgent"),
  p("Das hat Priorität", "C'est prioritaire"),
  p("Der Termin steht", "La date est confirmée"),
  p("Wir liegen im Zeitplan", "Nous sommes dans les temps"),
  p("Wir sind im Verzug", "Nous sommes en retard"),
  p("Die Frist läuft ab", "Le délai expire"),
  p("Das dauert noch", "Ça va encore prendre du temps"),
  p("Ich kümmere mich darum", "Je m'en occupe"),
  p("Das geht heute noch raus", "Ça part encore aujourd'hui"),

  // — Réunions et discussions —
  p("Kurz zum Stand der Dinge", "Rapidement, l'état des lieux"),
  p("Fassen wir zusammen", "Résumons"),
  p("Ich sehe das anders", "Je ne suis pas du même avis"),
  p("Da bin ich ganz bei Ihnen", "Je suis entièrement d'accord avec vous"),
  p("Das müssen wir noch klären", "Il faut encore clarifier ça"),
  p("Das steht auf der Tagesordnung", "C'est à l'ordre du jour"),
  p("Wer übernimmt das", "Qui s'en charge ?"),
  p("Können Sie das bitte wiederholen", "Pouvez-vous répéter s'il vous plaît ?"),
  p("Ich habe eine Frage dazu", "J'ai une question là-dessus"),
  p("Darf ich kurz ergänzen", "Puis-je compléter brièvement ?"),
  p("Kommen wir zum nächsten Punkt", "Passons au point suivant"),
  p("Das sprengt den Rahmen", "Cela dépasse le cadre"),
  p("Lassen Sie uns das offline klären", "Réglons cela en dehors de la réunion"),

  // — Problèmes et solutions —
  p("Es gibt ein Problem mit", "Il y a un problème avec"),
  p("Das lässt sich lösen", "Ça peut se régler"),
  p("Da ist etwas schiefgelaufen", "Quelque chose a mal tourné"),
  p("Das darf nicht passieren", "Cela ne doit pas arriver"),
  p("Wir suchen nach einer Lösung", "Nous cherchons une solution"),
  p("Das ist nicht in unserem Sinne", "Cela ne nous convient pas"),
  p("Ich gebe das weiter", "Je transmets"),
  p("Das liegt nicht in meiner Zuständigkeit", "Ce n'est pas de mon ressort"),
  p("Dafür bin ich nicht zuständig", "Je ne suis pas responsable de cela"),
  p("Ich hake noch einmal nach", "Je relance encore une fois"),

  // — Négociation et accord —
  p("Wir sind uns einig", "Nous sommes d'accord"),
  p("Das kommt für uns nicht infrage", "C'est hors de question pour nous"),
  p("Wir müssen einen Kompromiss finden", "Nous devons trouver un compromis"),
  p("Unter diesen Bedingungen", "Dans ces conditions"),
  p("Das liegt über unserem Budget", "C'est au-dessus de notre budget"),
  p("Können Sie uns entgegenkommen", "Pouvez-vous faire un geste ?"),
  p("Vorbehaltlich der Freigabe", "Sous réserve de validation"),
  p("Das halten wir schriftlich fest", "Nous actons cela par écrit"),

  // — Logistique au quotidien —
  p("Die Ware ist unterwegs", "La marchandise est en route"),
  p("Die Sendung ist angekommen", "L'envoi est arrivé"),
  p("Der Lkw steht an der Rampe", "Le camion est au quai"),
  p("Die Lieferung ist unvollständig", "La livraison est incomplète"),
  p("Das Teil ist nicht auf Lager", "La pièce n'est pas en stock"),
  p("Wir haben einen Engpass", "Nous avons un goulot d'étranglement"),
  p("Das steht im System", "C'est dans le système"),
  p("Ich buche das ein", "Je l'enregistre (dans le système)"),
  p("Bitte quittieren Sie den Empfang", "Merci d'accuser réception"),
];

export default words;
