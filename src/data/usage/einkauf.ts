import type { UsageMap } from "./types";

/** Achats et fournisseurs : le vocabulaire de la commande, du contrat et de la négociation. */
const usage: UsageMap = {
  bestellung: {
    v: [
      ["eine Bestellung auslösen", "déclencher une commande"],
      ["eine Bestellung aufgeben", "passer une commande"],
      ["eine Bestellung bestätigen", "confirmer une commande"],
      ["eine Bestellung stornieren", "annuler une commande"],
    ],
    s: [
      ["Die Bestellung wurde soeben ausgelöst.", "La commande vient d'être déclenchée."],
      ["Die Bestellung ist noch nicht bestätigt.", "La commande n'est pas encore confirmée."],
    ],
  },
  lieferant: {
    v: [
      ["einen Lieferanten auswählen", "sélectionner un fournisseur"],
      ["einen Lieferanten sperren", "bloquer un fournisseur"],
      ["einen Lieferanten bewerten", "évaluer un fournisseur"],
      ["beim Lieferanten nachfassen", "relancer le fournisseur"],
    ],
    s: [
      ["Der Lieferant bestätigt den Liefertermin.", "Le fournisseur confirme la date de livraison."],
      ["Wir arbeiten mit diesem Lieferanten seit zehn Jahren.", "Nous travaillons avec ce fournisseur depuis dix ans."],
    ],
  },
  angebot: {
    v: [
      ["ein Angebot einholen", "demander une offre"],
      ["ein Angebot abgeben", "remettre une offre"],
      ["ein Angebot annehmen", "accepter une offre"],
      ["ein Angebot ablehnen", "refuser une offre"],
    ],
    s: [
      ["Das Angebot ist bis Ende des Monats gültig.", "L'offre est valable jusqu'à la fin du mois."],
      ["Wir haben drei Angebote verglichen.", "Nous avons comparé trois offres."],
    ],
  },
  ausschreibung: {
    v: [
      ["eine Ausschreibung starten", "lancer un appel d'offres"],
      ["an einer Ausschreibung teilnehmen", "participer à un appel d'offres"],
      ["die Ausschreibung auswerten", "dépouiller l'appel d'offres"],
    ],
    s: [
      ["Die Ausschreibung endet in zwei Wochen.", "L'appel d'offres se termine dans deux semaines."],
      ["An der Ausschreibung haben fünf Anbieter teilgenommen.", "Cinq prestataires ont participé à l'appel d'offres."],
    ],
  },
  vertrag: {
    v: [
      ["einen Vertrag abschließen", "conclure un contrat"],
      ["einen Vertrag kündigen", "résilier un contrat"],
      ["einen Vertrag verlängern", "prolonger un contrat"],
      ["gegen den Vertrag verstoßen", "enfreindre le contrat"],
    ],
    s: [
      ["Der Vertrag läuft Ende des Jahres aus.", "Le contrat expire à la fin de l'année."],
      ["Der Vertrag wurde um zwei Jahre verlängert.", "Le contrat a été prolongé de deux ans."],
    ],
  },
  rahmenvertrag: {
    v: [["einen Rahmenvertrag schließen", "conclure un contrat-cadre"]],
    s: [
      ["Der Rahmenvertrag gilt für zwei Jahre.", "Le contrat-cadre est valable deux ans."],
      ["Aus dem Rahmenvertrag werden Einzelaufträge abgerufen.", "Des commandes individuelles sont appelées sur le contrat-cadre."],
    ],
  },
  preisverhandlung: {
    v: [
      ["in die Preisverhandlung gehen", "entrer en négociation de prix"],
      ["die Preise nachverhandeln", "renégocier les prix"],
      ["einen Preisnachlass durchsetzen", "obtenir une remise"],
    ],
    s: [
      ["Die Preisverhandlung dauerte drei Stunden.", "La négociation a duré trois heures."],
      ["In der Preisverhandlung haben wir fünf Prozent erreicht.", "Nous avons obtenu cinq pour cent en négociation."],
    ],
  },
  liefertermin: {
    v: [
      ["den Liefertermin bestätigen", "confirmer la date de livraison"],
      ["den Liefertermin verschieben", "reporter la date de livraison"],
      ["den Liefertermin einhalten", "respecter la date de livraison"],
    ],
    s: [
      ["Der Liefertermin wurde verschoben.", "La date de livraison a été reportée."],
      ["Der Liefertermin ist verbindlich zugesagt.", "La date de livraison est confirmée fermement."],
    ],
  },
  rechnung: {
    v: [
      ["eine Rechnung stellen", "établir une facture"],
      ["eine Rechnung begleichen", "régler une facture"],
      ["eine Rechnung prüfen", "contrôler une facture"],
      ["eine Rechnung reklamieren", "contester une facture"],
    ],
    s: [
      ["Die Rechnung ist noch offen.", "La facture est encore en attente."],
      ["Die Rechnung stimmt nicht mit der Bestellung überein.", "La facture ne correspond pas à la commande."],
    ],
  },
  reklamation: {
    v: [
      ["eine Reklamation einreichen", "déposer une réclamation"],
      ["eine Reklamation bearbeiten", "traiter une réclamation"],
      ["eine Reklamation anerkennen", "reconnaître une réclamation"],
      ["eine Reklamation zurückweisen", "rejeter une réclamation"],
    ],
    s: [
      ["Die Reklamation betrifft nur eine Position.", "La réclamation ne concerne qu'une seule ligne."],
      ["Ihre Reklamation wurde anerkannt.", "Votre réclamation a été acceptée."],
    ],
  },
  gutschrift: {
    v: [
      ["eine Gutschrift ausstellen", "établir un avoir"],
      ["eine Gutschrift verrechnen", "compenser un avoir"],
    ],
    s: [
      ["Wir stellen eine Gutschrift aus.", "Nous établissons un avoir."],
      ["Die Gutschrift wird mit der nächsten Rechnung verrechnet.", "L'avoir sera déduit de la prochaine facture."],
    ],
  },
  rahmenbestellung: {
    v: [["aus der Rahmenbestellung abrufen", "appeler sur la commande ouverte"]],
    s: [
      ["Die Rahmenbestellung deckt den Jahresbedarf ab.", "La commande ouverte couvre le besoin annuel."],
      ["Wir rufen monatlich aus der Rahmenbestellung ab.", "Nous effectuons des appels mensuels sur la commande ouverte."],
    ],
  },
  einsparung: {
    v: [
      ["Einsparungen erzielen", "réaliser des économies"],
      ["Einsparpotenziale heben", "exploiter des gisements d'économies"],
    ],
    s: [
      ["Die Einsparung beträgt 12 Prozent gegenüber dem Vorjahr.", "L'économie est de 12 % par rapport à l'an dernier."],
      ["Die Einsparungen wurden im Budget berücksichtigt.", "Les économies ont été prises en compte au budget."],
    ],
  },
  zahlungsbedingung: {
    v: [["die Zahlungsbedingungen vereinbaren", "convenir des conditions de paiement"]],
    s: [
      ["Die Zahlungsbedingungen lauten 30 Tage netto.", "Les conditions de paiement sont de 30 jours net."],
      ["Wir konnten bessere Zahlungsbedingungen durchsetzen.", "Nous avons obtenu de meilleures conditions de paiement."],
    ],
  },
  lieferkette: {
    v: [
      ["die Lieferkette absichern", "sécuriser la chaîne d'approvisionnement"],
      ["die Lieferkette überwachen", "surveiller la chaîne d'approvisionnement"],
    ],
    s: [
      ["Die Lieferkette wurde durch den Streik gestört.", "La chaîne d'approvisionnement a été perturbée par la grève."],
      ["Wir prüfen die gesamte Lieferkette auf Risiken.", "Nous examinons les risques sur toute la chaîne."],
    ],
  },
};

export default usage;
