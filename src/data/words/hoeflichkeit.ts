import { makers } from "../builders";

const { p } = makers("hoeflichkeit");

/**
 * Le registre professionnel.
 *
 * C'est le dernier écart qui trahit un francophone même quand sa grammaire est
 * juste. *Schicken Sie mir den Lieferschein* est parfaitement correct — et
 * parfaitement brutal. L'allemand de bureau atténue systématiquement, et il le
 * fait avec un outil que le français n'a pas au même endroit : le
 * **Konjunktiv II**. *Könnten Sie…*, *Ich hätte gerne…*, *Wir würden
 * vorschlagen…* : la forme dit « je sais que je vous demande quelque chose ».
 *
 * Chaque entrée porte la formulation directe dans `direct` et la formulation
 * d'usage dans `de`. Les deux sont grammaticalement correctes ; c'est le
 * registre qui les sépare, et c'est lui qu'on travaille ici.
 */
const hoeflichkeit = [
  // — Demander —
  p("Könnten Sie mir bitte den Lieferschein schicken?", "Pourriez-vous m'envoyer le bon de livraison ?", {
    direct: "Schicken Sie mir den Lieferschein.",
    note: "**könnten** est le Konjunktiv II de *können*. C'est la demande standard : *können Sie* passe pour un constat de capacité, presque un ordre.",
  }),
  p("Wären Sie so freundlich, das noch heute zu prüfen?", "Auriez-vous l'amabilité de vérifier cela aujourd'hui ?", {
    direct: "Prüfen Sie das noch heute.",
    note: "Le degré au-dessus de *könnten Sie*, pour une demande qui dérange.",
  }),
  p("Ich hätte gerne eine Bestätigung per Mail.", "Je voudrais une confirmation par courriel.", {
    direct: "Ich will eine Bestätigung per Mail.",
    note: "*hätte gerne* est l'équivalent exact de « je voudrais ». *Ich will* sonne comme un caprice.",
  }),
  p("Dürfte ich Sie um eine kurze Rückmeldung bitten?", "Pourrais-je vous demander un bref retour ?", {
    direct: "Melden Sie sich kurz.",
    note: "*dürfte* demande la permission de demander — le maximum de précaution.",
  }),
  p("Wir würden Sie bitten, den Termin zu bestätigen.", "Nous vous saurions gré de confirmer la date.", {
    direct: "Bestätigen Sie den Termin.",
    note: "*würden* + infinitif : la formule passe-partout du courrier professionnel.",
  }),
  p("Wäre es möglich, die Lieferung vorzuziehen?", "Serait-il possible d'avancer la livraison ?", {
    direct: "Ziehen Sie die Lieferung vor.",
    note: "*Wäre es möglich* laisse une porte de sortie : c'est ce qui la rend acceptable.",
  }),
  p("Hätten Sie kurz Zeit für eine Rückfrage?", "Auriez-vous un instant pour une question ?", {
    direct: "Ich habe eine Frage.",
  }),

  // — Proposer —
  p("Wir würden vorschlagen, den Auftrag zu splitten.", "Nous proposerions de scinder la commande.", {
    direct: "Wir splitten den Auftrag.",
    note: "Au Konjunktiv II, la proposition reste ouverte à la discussion. À l'indicatif, c'est une décision annoncée.",
  }),
  p("Vielleicht sollten wir das noch einmal besprechen.", "Peut-être devrions-nous en reparler.", {
    direct: "Wir besprechen das noch einmal.",
    note: "*sollten* atténue l'obligation : « il faudrait » plutôt que « il faut ».",
  }),
  p("Ich würde vorschlagen, dass wir bis Freitag warten.", "Je proposerais d'attendre jusqu'à vendredi.", {
    direct: "Wir warten bis Freitag.",
  }),
  p("An Ihrer Stelle würde ich den Lieferanten anrufen.", "À votre place, j'appellerais le fournisseur.", {
    direct: "Rufen Sie den Lieferanten an.",
    note: "Le conseil déguisé en hypothèse : la façon la moins intrusive de dire à quelqu'un quoi faire.",
  }),

  // — Refuser, objecter —
  p("Das wäre für uns leider nicht machbar.", "Cela ne nous serait malheureusement pas réalisable.", {
    direct: "Das geht nicht.",
    note: "*wäre* + *leider* : le refus allemand se pose presque toujours au conditionnel.",
  }),
  p("Da müsste ich zunächst Rücksprache halten.", "Il faudrait d'abord que j'en réfère.", {
    direct: "Ich entscheide das nicht.",
    note: "La façon usuelle de gagner du temps sans dire non.",
  }),
  p("Ich fürchte, das lässt sich so nicht umsetzen.", "Je crains que cela ne puisse être mis en œuvre ainsi.", {
    direct: "Das setzen wir nicht um.",
  }),
  p("Wir hätten uns hier eine andere Lösung gewünscht.", "Nous aurions souhaité une autre solution.", {
    direct: "Die Lösung gefällt uns nicht.",
    note: "Le reproche au Konjunktiv II passé : il constate sans accuser.",
  }),
  p("Das sehe ich etwas anders.", "Je vois les choses un peu autrement.", {
    direct: "Das stimmt nicht.",
    note: "*etwas anders* est l'atténuateur le plus employé en réunion.",
  }),

  // — Relancer —
  p("Dürfte ich an meine Anfrage von Montag erinnern?", "Puis-je me permettre de rappeler ma demande de lundi ?", {
    direct: "Sie haben nicht geantwortet.",
    note: "La relance allemande rappelle le fait sans nommer le manquement.",
  }),
  p("Ich wollte nur kurz nachfragen, wie der Stand ist.", "Je voulais simplement savoir où cela en est.", {
    direct: "Wo bleibt die Antwort?",
    note: "*Ich wollte nur kurz* désamorce complètement la relance. Formule à connaître par cœur.",
  }),
  p("Es wäre schön, wenn wir das bis Freitag klären könnten.", "Ce serait bien si nous pouvions régler cela d'ici vendredi.", {
    direct: "Klären Sie das bis Freitag.",
  }),

  // — S'excuser, reconnaître —
  p("Wir bitten den Fehler zu entschuldigen.", "Nous vous prions d'excuser cette erreur.", {
    direct: "Wir haben einen Fehler gemacht.",
    note: "Formule figée du courrier : l'infinitif après *bitten … zu*.",
  }),
  p("Das tut mir leid, da haben wir uns vertan.", "Je suis désolé, nous nous sommes trompés.", {
    direct: "Wir haben uns vertan.",
  }),
  p("Vielen Dank für Ihre Geduld in dieser Sache.", "Merci de votre patience dans cette affaire.", {
    direct: "Danke fürs Warten.",
  }),

  // — Confirmer, clore —
  p("Ich komme gerne auf Ihr Angebot zurück.", "Je reviendrai volontiers vers vous sur votre offre.", {
    direct: "Ich melde mich wegen des Angebots.",
  }),
  p("Sollten Sie Rückfragen haben, melden Sie sich gerne.", "Si vous aviez des questions, n'hésitez pas.", {
    direct: "Bei Fragen anrufen.",
    note: "*Sollten Sie…* remplace *Wenn Sie…* : la subordonnée sans *wenn*, verbe en tête, marque le registre écrit.",
  }),
  p("Wir sehen der Lieferung mit Interesse entgegen.", "Nous attendons la livraison avec intérêt.", {
    direct: "Wir warten auf die Lieferung.",
    note: "Tournure de clôture des courriers commerciaux.",
  }),
  p("Über eine kurze Bestätigung würden wir uns freuen.", "Une brève confirmation serait appréciée.", {
    direct: "Bestätigen Sie bitte.",
  }),
];

export default hoeflichkeit;
