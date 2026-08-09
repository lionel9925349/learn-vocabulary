import type { UsageMap } from "./types";

/**
 * Verbes : ici l'usage ne se joue pas sur le sens mais sur la **construction**.
 * Le champ `v` donne les compléments typiques (avec leur cas), `s` montre la
 * phrase complète — c'est ce qui manque quand on ne connaît que la traduction.
 */
const usage: UsageMap = {
  bestellen: {
    v: [
      ["Ware bei einem Lieferanten bestellen", "commander de la marchandise chez un fournisseur"],
      ["telefonisch bestellen", "commander par téléphone"],
      ["auf Rechnung bestellen", "commander sur facture"],
    ],
    s: [
      ["Wir haben die Ersatzteile gestern bestellt.", "Nous avons commandé les pièces hier."],
      ["Bestellen Sie bitte vor Freitag.", "Merci de commander avant vendredi."],
    ],
  },
  liefern: {
    v: [
      ["frei Haus liefern", "livrer franco de port"],
      ["pünktlich liefern", "livrer dans les temps"],
      ["direkt an den Kunden liefern", "livrer directement au client"],
    ],
    s: [
      ["Wir liefern innerhalb von 48 Stunden.", "Nous livrons sous 48 heures."],
      ["Der Lieferant kann diese Woche nicht liefern.", "Le fournisseur ne peut pas livrer cette semaine."],
    ],
  },
  "sich-kuemmern": {
    v: [
      ["sich um eine Reklamation kümmern", "s'occuper d'une réclamation"],
      ["sich um den Kunden kümmern", "s'occuper du client"],
    ],
    s: [
      ["Ich kümmere mich darum.", "Je m'en occupe."],
      ["Wer kümmert sich um die Retoure?", "Qui s'occupe du retour ?"],
    ],
  },
  informieren: {
    v: [
      ["jemanden über etwas informieren", "informer quelqu'un de quelque chose"],
      ["rechtzeitig informieren", "informer en temps utile"],
    ],
    s: [
      ["Wir informieren Sie über den neuen Termin.", "Nous vous informons de la nouvelle date."],
      ["Bitte informieren Sie mich, sobald die Ware da ist.", "Merci de m'informer dès que la marchandise arrive."],
    ],
  },
  "sich-beschweren": {
    v: [
      ["sich über die Qualität beschweren", "se plaindre de la qualité"],
      ["sich beim Lieferanten beschweren", "se plaindre auprès du fournisseur"],
    ],
    s: [
      ["Der Kunde hat sich über die Verspätung beschwert.", "Le client s'est plaint du retard."],
      ["Darüber beschweren sich viele.", "Beaucoup s'en plaignent."],
    ],
  },
  verhandeln: {
    v: [
      ["über den Preis verhandeln", "négocier le prix"],
      ["hart verhandeln", "négocier durement"],
      ["mit dem Lieferanten verhandeln", "négocier avec le fournisseur"],
    ],
    s: [
      ["Wir verhandeln noch über die Konditionen.", "Nous négocions encore les conditions."],
      ["Darüber lässt sich verhandeln.", "C'est négociable."],
    ],
  },
  teilnehmen: {
    v: [
      ["an einer Besprechung teilnehmen", "participer à une réunion"],
      ["an einer Ausschreibung teilnehmen", "participer à un appel d'offres"],
    ],
    s: [
      ["Ich nehme an der Sitzung teil.", "Je participe à la réunion."],
      ["Wer nimmt morgen teil?", "Qui participe demain ?"],
    ],
  },
  einhalten: {
    v: [
      ["einen Termin einhalten", "respecter une échéance"],
      ["Vorschriften einhalten", "respecter les prescriptions"],
      ["die Frist einhalten", "respecter le délai"],
    ],
    s: [
      ["Wir halten den Liefertermin ein.", "Nous respectons la date de livraison."],
      ["Der Lieferant hält die Frist nicht ein.", "Le fournisseur ne respecte pas le délai."],
    ],
  },
  freigeben: {
    v: [
      ["eine Bestellung freigeben", "valider une commande"],
      ["ein Budget freigeben", "débloquer un budget"],
      ["Ware freigeben", "libérer de la marchandise"],
    ],
    s: [
      ["Der Teamleiter gibt die Bestellung frei.", "Le chef d'équipe valide la commande."],
      ["Die Ware wurde noch nicht freigegeben.", "La marchandise n'a pas encore été libérée."],
    ],
  },
  abholen: {
    v: [
      ["die Ware abholen", "enlever la marchandise"],
      ["einen Container abholen", "venir chercher un conteneur"],
    ],
    s: [
      ["Der Fahrer holt die Palette um 14 Uhr ab.", "Le chauffeur enlève la palette à 14h."],
      ["Wann können wir die Sendung abholen?", "Quand pouvons-nous enlever l'envoi ?"],
    ],
  },
  annehmen: {
    v: [
      ["eine Lieferung annehmen", "réceptionner une livraison"],
      ["ein Angebot annehmen", "accepter une offre"],
      ["die Annahme verweigern", "refuser la réception"],
    ],
    s: [
      ["Wir nehmen die Ware nur mit Lieferschein an.", "Nous ne réceptionnons qu'avec bon de livraison."],
      ["Der Empfänger hat die Sendung nicht angenommen.", "Le destinataire n'a pas accepté l'envoi."],
    ],
  },
  beauftragen: {
    v: [
      ["einen Spediteur beauftragen", "mandater un transitaire"],
      ["jemanden mit etwas beauftragen", "charger quelqu'un de quelque chose"],
    ],
    s: [
      ["Wir haben eine externe Firma beauftragt.", "Nous avons mandaté une entreprise externe."],
      ["Wer wurde damit beauftragt?", "Qui en a été chargé ?"],
    ],
  },
  haften: {
    v: [
      ["für den Schaden haften", "être responsable du dommage"],
      ["persönlich haften", "être personnellement responsable"],
    ],
    s: [
      ["Der Frachtführer haftet für den Verlust.", "Le transporteur répond de la perte."],
      ["Dafür haften wir nicht.", "Nous n'en sommes pas responsables."],
    ],
  },
  zugreifen: {
    v: [
      ["auf das System zugreifen", "accéder au système"],
      ["auf Daten zugreifen", "accéder aux données"],
    ],
    s: [
      ["Ich kann auf den Ordner nicht zugreifen.", "Je n'arrive pas à accéder au dossier."],
      ["Wer greift auf diese Daten zu?", "Qui accède à ces données ?"],
    ],
  },
  hinweisen: {
    v: [
      ["auf ein Problem hinweisen", "signaler un problème"],
      ["auf die Frist hinweisen", "rappeler le délai"],
    ],
    s: [
      ["Ich möchte auf einen Fehler hinweisen.", "Je souhaite signaler une erreur."],
      ["Darauf hatte ich bereits hingewiesen.", "Je l'avais déjà signalé."],
    ],
  },
  "sich-einigen": {
    v: [["sich auf einen Preis einigen", "s'accorder sur un prix"]],
    s: [
      ["Wir haben uns auf einen Kompromiss geeinigt.", "Nous nous sommes accordés sur un compromis."],
      ["Konnten Sie sich einigen?", "Avez-vous trouvé un accord ?"],
    ],
  },
  abstimmen: {
    v: [
      ["sich mit dem Kollegen abstimmen", "se concerter avec le collègue"],
      ["etwas intern abstimmen", "valider quelque chose en interne"],
    ],
    s: [
      ["Ich stimme mich kurz mit dem Einkauf ab.", "Je me concerte rapidement avec les achats."],
      ["Das muss noch abgestimmt werden.", "Cela doit encore être validé."],
    ],
  },
  eskalieren: {
    v: [["ein Problem eskalieren", "faire remonter un problème"]],
    s: [
      ["Wir müssen den Fall eskalieren.", "Nous devons faire remonter le dossier."],
      ["Die Sache wurde an die Geschäftsführung eskaliert.", "L'affaire a été remontée à la direction."],
    ],
  },
  verschieben: {
    v: [
      ["einen Termin verschieben", "reporter un rendez-vous"],
      ["die Lieferung verschieben", "décaler la livraison"],
    ],
    s: [
      ["Wir müssen den Termin verschieben.", "Nous devons reporter le rendez-vous."],
      ["Der Liefertermin wurde um eine Woche verschoben.", "La livraison a été décalée d'une semaine."],
    ],
  },
  stornieren: {
    v: [
      ["eine Bestellung stornieren", "annuler une commande"],
      ["eine Buchung stornieren", "annuler une écriture"],
    ],
    s: [
      ["Wir stornieren die Bestellung.", "Nous annulons la commande."],
      ["Eine Stornierung ist bis Freitag kostenlos möglich.", "L'annulation est gratuite jusqu'à vendredi."],
    ],
  },
  reklamieren: {
    v: [
      ["die Ware reklamieren", "réclamer sur la marchandise"],
      ["eine Rechnung reklamieren", "contester une facture"],
    ],
    s: [
      ["Wir reklamieren die beschädigte Lieferung.", "Nous réclamons sur la livraison endommagée."],
      ["Der Kunde hat die Menge reklamiert.", "Le client a contesté la quantité."],
    ],
  },
  kuendigen: {
    v: [
      ["einen Vertrag kündigen", "résilier un contrat"],
      ["fristgerecht kündigen", "résilier dans les délais"],
    ],
    s: [
      ["Wir kündigen den Vertrag zum Jahresende.", "Nous résilions le contrat à la fin de l'année."],
      ["Er hat gekündigt.", "Il a démissionné."],
    ],
  },
  erfassen: {
    v: [
      ["Daten erfassen", "saisir des données"],
      ["einen Auftrag erfassen", "enregistrer une commande"],
    ],
    s: [
      ["Die Retoure wurde im System erfasst.", "Le retour a été enregistré dans le système."],
      ["Bitte erfassen Sie die Menge korrekt.", "Merci de saisir la quantité correctement."],
    ],
  },
  beheben: {
    v: [
      ["einen Fehler beheben", "corriger une erreur"],
      ["eine Störung beheben", "réparer une panne"],
    ],
    s: [
      ["Der Fehler wurde behoben.", "L'erreur a été corrigée."],
      ["Wir beheben das bis morgen.", "Nous corrigeons cela d'ici demain."],
    ],
  },
  bereitstellen: {
    v: [
      ["Ware bereitstellen", "mettre la marchandise à disposition"],
      ["Unterlagen bereitstellen", "fournir les documents"],
    ],
    s: [
      ["Die Ware steht ab 8 Uhr bereit.", "La marchandise est prête dès 8h."],
      ["Wir stellen Ihnen die Daten bereit.", "Nous mettons les données à votre disposition."],
    ],
  },
};

export default usage;
