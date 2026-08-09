import type { UsageMap } from "./types";

/** Achats, indicateurs et matières dangereuses — lot de complétion. */
const usage: UsageMap = {
  // — Achats —
  beschaffung: {
    v: [["die Beschaffung sicherstellen", "sécuriser l'approvisionnement"]],
    s: [
      ["Wie ist die Beschaffung organisiert?", "Comment l'approvisionnement est-il organisé ?"],
      ["Die Beschaffung läuft über einen zentralen Einkauf.", "L'approvisionnement passe par un service achats central."],
    ],
  },
  einkaeufer: {
    v: [["mit dem Einkäufer sprechen", "parler à l'acheteur"]],
    s: [
      ["Wer ist der zuständige Einkäufer?", "Qui est l'acheteur en charge ?"],
      ["Der Einkäufer verhandelt die Konditionen.", "L'acheteur négocie les conditions."],
    ],
  },
  lieferzeit: {
    v: [["die Lieferzeit verkürzen", "raccourcir le délai de livraison"]],
    s: [
      ["Wie lang ist die Lieferzeit?", "Quel est le délai de livraison ?"],
      ["Die Lieferzeit hat sich auf acht Wochen verlängert.", "Le délai est passé à huit semaines."],
    ],
  },
  bedarf: {
    v: [["den Bedarf melden", "signaler le besoin"], ["den Bedarf decken", "couvrir le besoin"]],
    s: [
      ["Wie hoch ist der Bedarf im nächsten Quartal?", "Quel est le besoin au prochain trimestre ?"],
      ["Der Bedarf wird über das ERP gemeldet.", "Le besoin est déclaré via l'ERP."],
    ],
  },
  einkaufspreis: {
    v: [["den Einkaufspreis verhandeln", "négocier le prix d'achat"]],
    s: [
      ["Der Einkaufspreis ist um sechs Prozent gestiegen.", "Le prix d'achat a augmenté de 6 %."],
      ["Können wir beim Einkaufspreis noch etwas machen?", "Peut-on encore agir sur le prix d'achat ?"],
    ],
  },
  mindestbestellmenge: {
    v: [["die Mindestbestellmenge senken", "réduire la quantité minimale"]],
    s: [
      ["Gibt es eine Mindestbestellmenge?", "Y a-t-il une quantité minimale ?"],
      ["Die Mindestbestellmenge liegt bei 500 Stück.", "La quantité minimale est de 500 pièces."],
    ],
  },
  lieferantenbewertung: {
    v: [["eine Lieferantenbewertung durchführen", "réaliser une évaluation fournisseur"]],
    s: [
      ["Wie fiel die Lieferantenbewertung aus?", "Quel a été le résultat de l'évaluation fournisseur ?"],
      ["Die Lieferantenbewertung erfolgt jährlich.", "L'évaluation fournisseur a lieu chaque année."],
    ],
  },
  bestellanforderung: {
    v: [["eine Bestellanforderung erstellen", "créer une demande d'achat"]],
    s: [
      ["Haben Sie schon eine Bestellanforderung angelegt?", "Avez-vous déjà créé une demande d'achat ?"],
      ["Die Bestellanforderung muss vom Teamleiter freigegeben werden.", "La demande d'achat doit être validée par le chef d'équipe."],
    ],
  },
  bestellbestaetigung: {
    v: [["auf die Bestellbestätigung warten", "attendre la confirmation de commande"]],
    s: [
      ["Ist die Bestellbestätigung schon da?", "La confirmation de commande est-elle arrivée ?"],
      ["Ohne Bestellbestätigung produzieren wir nicht.", "Sans confirmation, nous ne produisons pas."],
    ],
  },
  skonto: {
    v: [["Skonto ziehen", "déduire l'escompte"], ["Skonto gewähren", "accorder un escompte"]],
    s: [
      ["Gewähren Sie Skonto?", "Accordez-vous un escompte ?"],
      ["Bei Zahlung binnen zehn Tagen gibt es zwei Prozent Skonto.", "Paiement sous dix jours : 2 % d'escompte."],
    ],
  },
  rabatt: {
    v: [["einen Rabatt aushandeln", "négocier une remise"], ["Rabatt gewähren", "accorder une remise"]],
    s: [
      ["Wie viel Rabatt ist möglich?", "Quelle remise est possible ?"],
      ["Ab 1000 Stück gewähren wir einen Rabatt.", "À partir de 1000 pièces, nous accordons une remise."],
    ],
  },
  rueckstand: {
    v: [["den Rückstand abbauen", "résorber le retard"]],
    s: [
      ["Wie groß ist der Rückstand?", "Quelle est l'ampleur du retard ?"],
      ["Der Lieferant meldet einen Rückstand von zwei Wochen.", "Le fournisseur signale deux semaines de retard."],
    ],
  },
  abrufauftrag: {
    v: [["einen Abrufauftrag anlegen", "créer une commande ouverte"]],
    s: [
      ["Der Abrufauftrag deckt den Jahresbedarf ab.", "La commande ouverte couvre le besoin annuel."],
      ["Wie viel ist aus dem Abrufauftrag noch offen?", "Que reste-t-il à appeler sur la commande ouverte ?"],
    ],
  },
  warengruppe: {
    v: [["nach Warengruppen bündeln", "regrouper par famille d'achats"]],
    s: [
      ["Zu welcher Warengruppe gehört der Artikel?", "À quelle famille appartient l'article ?"],
      ["Die Warengruppe wird zentral verhandelt.", "Cette famille est négociée au niveau central."],
    ],
  },
  angebotsvergleich: {
    v: [["einen Angebotsvergleich erstellen", "établir un comparatif d'offres"]],
    s: [
      ["Der Angebotsvergleich liegt bei.", "Le comparatif d'offres est joint."],
      ["Was zeigt der Angebotsvergleich?", "Que montre le comparatif d'offres ?"],
    ],
  },
  angebotsfrist: {
    v: [["die Angebotsfrist verlängern", "prolonger le délai de remise des offres"]],
    s: [
      ["Wann läuft die Angebotsfrist ab?", "Quand expire le délai de remise des offres ?"],
      ["Nach Ablauf der Angebotsfrist werden keine Angebote mehr angenommen.", "Passé le délai, aucune offre n'est plus acceptée."],
    ],
  },
  absage: {
    v: [["eine Absage erteilen", "notifier un refus"], ["eine Absage erhalten", "recevoir un refus"]],
    s: [
      ["Wir haben leider eine Absage bekommen.", "Nous avons malheureusement reçu un refus."],
      ["Die Absage kam ohne Begründung.", "Le refus est arrivé sans justification."],
    ],
  },
  verhandlungsspielraum: {
    s: [
      ["Wie viel Verhandlungsspielraum haben wir?", "Quelle marge de négociation avons-nous ?"],
      ["Beim Preis gibt es keinen Verhandlungsspielraum mehr.", "Il n'y a plus de marge sur le prix."],
    ],
  },
  lieferbedingung: {
    v: [["die Lieferbedingungen festlegen", "définir les conditions de livraison"]],
    s: [
      ["Welche Lieferbedingungen gelten?", "Quelles conditions de livraison s'appliquent ?"],
      ["Die Lieferbedingungen stehen in den AGB.", "Les conditions de livraison figurent dans les CGV."],
    ],
  },
  preisanfrage: {
    v: [["eine Preisanfrage verschicken", "envoyer une demande de prix"]],
    s: [
      ["Wir haben drei Preisanfragen verschickt.", "Nous avons envoyé trois demandes de prix."],
      ["Auf die Preisanfrage kam noch keine Antwort.", "La demande de prix est restée sans réponse."],
    ],
  },
  kostentreiber: {
    v: [["die Kostentreiber identifizieren", "identifier les inducteurs de coûts"]],
    s: [
      ["Was ist hier der größte Kostentreiber?", "Quel est ici le principal inducteur de coûts ?"],
      ["Die Transportkosten sind der wichtigste Kostentreiber.", "Le transport est le principal inducteur de coûts."],
    ],
  },
  buendelung: {
    v: [["Bedarfe bündeln", "massifier les besoins"]],
    s: [
      ["Durch Bündelung sparen wir zwölf Prozent.", "La massification nous fait économiser 12 %."],
      ["Ist eine Bündelung mit anderen Standorten möglich?", "Une massification avec d'autres sites est-elle possible ?"],
    ],
  },
  rechnungspruefung: {
    v: [["die Rechnungsprüfung durchführen", "effectuer le contrôle facture"]],
    s: [
      ["Die Rechnungsprüfung hat eine Abweichung ergeben.", "Le contrôle facture a révélé un écart."],
      ["Wer macht bei Ihnen die Rechnungsprüfung?", "Qui fait le contrôle facture chez vous ?"],
    ],
  },
  vertragslaufzeit: {
    v: [["die Vertragslaufzeit vereinbaren", "convenir de la durée du contrat"]],
    s: [
      ["Wie lang ist die Vertragslaufzeit?", "Quelle est la durée du contrat ?"],
      ["Die Vertragslaufzeit beträgt 24 Monate.", "La durée du contrat est de 24 mois."],
    ],
  },
  vertragspartner: {
    s: [
      ["Wer ist unser Vertragspartner?", "Qui est notre cocontractant ?"],
      ["Beide Vertragspartner haben unterschrieben.", "Les deux parties ont signé."],
    ],
  },
  beschaffungsrisiko: {
    v: [["Beschaffungsrisiken bewerten", "évaluer les risques d'approvisionnement"]],
    s: [
      ["Wo sehen Sie das größte Beschaffungsrisiko?", "Où voyez-vous le plus grand risque d'approvisionnement ?"],
      ["Das Beschaffungsrisiko ist bei Einzelquellen am höchsten.", "Le risque est maximal en source unique."],
    ],
  },
  versorgungssicherheit: {
    v: [["die Versorgungssicherheit gewährleisten", "garantir la sécurité d'approvisionnement"]],
    s: [
      ["Die Versorgungssicherheit hat oberste Priorität.", "La sécurité d'approvisionnement est prioritaire."],
      ["Zwei Lieferanten erhöhen die Versorgungssicherheit.", "Deux fournisseurs augmentent la sécurité d'approvisionnement."],
    ],
  },
  werkvertrag: {
    s: [
      ["Ist das ein Werkvertrag oder ein Dienstvertrag?", "Est-ce un contrat de résultat ou de moyens ?"],
      ["Beim Werkvertrag schuldet der Auftragnehmer ein Ergebnis.", "Dans un contrat d'entreprise, le prestataire doit un résultat."],
    ],
  },
  verhaltenskodex: {
    v: [["den Verhaltenskodex unterzeichnen", "signer le code de conduite"]],
    s: [
      ["Jeder Lieferant unterschreibt unseren Verhaltenskodex.", "Chaque fournisseur signe notre code de conduite."],
      ["Ein Verstoß gegen den Verhaltenskodex führt zur Sperrung.", "Une violation du code entraîne le blocage."],
    ],
  },
  lieferkettengesetz: {
    s: [
      ["Was verlangt das Lieferkettengesetz?", "Qu'exige la loi sur le devoir de vigilance ?"],
      ["Das Lieferkettengesetz gilt ab einer bestimmten Betriebsgröße.", "La loi s'applique à partir d'une certaine taille d'entreprise."],
    ],
  },
  zahlungsverzug: {
    v: [["in Zahlungsverzug geraten", "se retrouver en retard de paiement"]],
    s: [
      ["Der Kunde ist seit 40 Tagen in Zahlungsverzug.", "Le client est en retard de paiement depuis 40 jours."],
      ["Bei Zahlungsverzug fallen Verzugszinsen an.", "En cas de retard, des intérêts sont dus."],
    ],
  },
  anzahlung: {
    v: [["eine Anzahlung leisten", "verser un acompte"]],
    s: [
      ["Wie hoch ist die Anzahlung?", "À combien s'élève l'acompte ?"],
      ["Wir bitten um eine Anzahlung von 30 Prozent.", "Nous demandons un acompte de 30 %."],
    ],
  },
  bonitaetspruefung: {
    v: [["eine Bonitätsprüfung durchführen", "faire une vérification de solvabilité"]],
    s: [
      ["Die Bonitätsprüfung war negativ.", "La vérification de solvabilité est négative."],
      ["Neukunden durchlaufen immer eine Bonitätsprüfung.", "Les nouveaux clients passent toujours une vérification."],
    ],
  },
  gesamtkosten: {
    v: [["die Gesamtkosten betrachten", "raisonner en coût total"]],
    s: [
      ["Was sind die Gesamtkosten über fünf Jahre?", "Quel est le coût total sur cinq ans ?"],
      ["Der günstigste Preis heißt nicht die niedrigsten Gesamtkosten.", "Le prix le plus bas n'est pas le coût total le plus bas."],
    ],
  },

  // — Indicateurs —
  termintreue: {
    v: [["die Termintreue messen", "mesurer la ponctualité"]],
    s: [
      ["Wie steht es um die Termintreue?", "Où en est la ponctualité de livraison ?"],
      ["Die Termintreue hat sich verschlechtert.", "La ponctualité s'est dégradée."],
    ],
  },
  fehlerrate: {
    v: [["die Fehlerrate senken", "réduire le taux d'erreur"]],
    s: [
      ["Wie hoch ist die Fehlerrate?", "Quel est le taux d'erreur ?"],
      ["Die Fehlerrate hat sich halbiert.", "Le taux d'erreur a été divisé par deux."],
    ],
  },
  zielwert: {
    v: [["den Zielwert festlegen", "fixer la valeur cible"], ["den Zielwert erreichen", "atteindre la cible"]],
    s: [
      ["Wir liegen unter dem Zielwert.", "Nous sommes en dessous de la cible."],
      ["Welcher Zielwert ist vereinbart?", "Quelle valeur cible a été convenue ?"],
    ],
  },
  istwert: {
    s: [
      ["Der Istwert weicht vom Sollwert ab.", "La valeur réelle s'écarte de la consigne."],
      ["Wie hoch ist der aktuelle Istwert?", "Quelle est la valeur réelle actuelle ?"],
    ],
  },
  schwankung: {
    v: [["Schwankungen ausgleichen", "lisser les fluctuations"]],
    s: [
      ["Die Nachfrage unterliegt starken Schwankungen.", "La demande connaît de fortes fluctuations."],
      ["Woher kommen diese Schwankungen?", "D'où viennent ces fluctuations ?"],
    ],
  },
  durchschnitt: {
    s: [
      ["Im Durchschnitt dauert es drei Tage.", "En moyenne, cela prend trois jours."],
      ["Das liegt über dem Durchschnitt.", "C'est au-dessus de la moyenne."],
    ],
  },
  rueckgang: {
    v: [["einen Rückgang verzeichnen", "enregistrer une baisse"]],
    s: [
      ["Wir verzeichnen einen Rückgang von acht Prozent.", "Nous enregistrons une baisse de 8 %."],
      ["Womit erklären Sie den Rückgang?", "Comment expliquez-vous cette baisse ?"],
    ],
  },
  berichtswesen: {
    s: [
      ["Das Berichtswesen läuft über das BI-System.", "Le reporting passe par le système décisionnel."],
      ["Wir bauen das Berichtswesen gerade um.", "Nous refondons actuellement le reporting."],
    ],
  },

  // — Gefahrgut, complément —
  gefahrgutvorschrift: {
    v: [["die Gefahrgutvorschriften einhalten", "respecter les prescriptions ADR"]],
    s: [
      ["Welche Gefahrgutvorschrift gilt hier?", "Quelle prescription s'applique ici ?"],
      ["Die Gefahrgutvorschriften werden alle zwei Jahre angepasst.", "Les prescriptions ADR sont révisées tous les deux ans."],
    ],
  },
  giftstoff: {
    v: [["Giftstoffe sicher lagern", "stocker les matières toxiques en sécurité"]],
    s: [
      ["Giftstoffe gehören in den verschlossenen Schrank.", "Les matières toxiques vont dans l'armoire fermée."],
      ["Wer darf mit Giftstoffen umgehen?", "Qui est habilité à manipuler des matières toxiques ?"],
    ],
  },
  aetzstoff: {
    v: [["Ätzstoffe getrennt lagern", "stocker les corrosifs séparément"]],
    s: [
      ["Ätzstoffe niemals ohne Handschuhe anfassen!", "Ne jamais manipuler de corrosifs sans gants !"],
      ["Ätzstoffe der Klasse 8 tragen ein schwarz-weißes Etikett.", "Les corrosifs de classe 8 portent une étiquette noir et blanc."],
    ],
  },
  explosivstoff: {
    s: [
      ["Explosivstoffe fallen unter Klasse 1.", "Les matières explosibles relèvent de la classe 1."],
      ["Für Explosivstoffe brauchen wir eine Sondergenehmigung.", "Les explosifs exigent une autorisation spéciale."],
    ],
  },
  druckgas: {
    v: [["Druckgasflaschen sichern", "arrimer les bouteilles de gaz"]],
    s: [
      ["Druckgasflaschen müssen stehend transportiert werden.", "Les bouteilles de gaz se transportent debout."],
      ["Wie viele Druckgasflaschen sind an Bord?", "Combien de bouteilles de gaz sont à bord ?"],
    ],
  },
  unfallmerkblatt: {
    v: [["das Unfallmerkblatt mitführen", "avoir les consignes écrites à bord"]],
    s: [
      ["Das Unfallmerkblatt muss im Führerhaus liegen.", "Les consignes écrites doivent être en cabine."],
      ["Haben Sie das Unfallmerkblatt dabei?", "Avez-vous les consignes écrites sur vous ?"],
    ],
  },
  hoechstmenge: {
    v: [["die Höchstmenge überschreiten", "dépasser la quantité maximale"]],
    s: [
      ["Wie hoch ist die Höchstmenge je Fahrzeug?", "Quelle est la quantité maximale par véhicule ?"],
      ["Wir bleiben unter der Höchstmenge.", "Nous restons sous la quantité maximale."],
    ],
  },
  "adr-bescheinigung": {
    v: [["die ADR-Bescheinigung vorlegen", "présenter le certificat ADR"]],
    s: [
      ["Ist Ihre ADR-Bescheinigung noch gültig?", "Votre certificat ADR est-il encore valable ?"],
      ["Die ADR-Bescheinigung gilt fünf Jahre.", "Le certificat ADR est valable cinq ans."],
    ],
  },
};

export default usage;
