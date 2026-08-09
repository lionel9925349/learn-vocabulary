import type { UsageMap } from "./types";

/** Douane et commerce extérieur : formulations très codifiées, à apprendre en bloc. */
const usage: UsageMap = {
  zoll: {
    v: [
      ["den Zoll anmelden", "déclarer en douane"],
      ["durch den Zoll gehen", "passer la douane"],
      ["Zoll entrichten", "acquitter les droits de douane"],
    ],
    s: [
      ["Der Zoll kontrolliert die Sendung stichprobenartig.", "La douane contrôle l'envoi par sondage."],
      ["Die Ware hängt beim Zoll fest.", "La marchandise est bloquée en douane."],
    ],
  },
  zollanmeldung: {
    v: [
      ["eine Zollanmeldung abgeben", "déposer une déclaration en douane"],
      ["die Zollanmeldung elektronisch übermitteln", "transmettre la déclaration par voie électronique"],
      ["die Zollanmeldung berichtigen", "rectifier la déclaration"],
    ],
    s: [
      ["Die Zollanmeldung wurde elektronisch übermittelt.", "La déclaration a été transmise électroniquement."],
      ["Ohne vollständige Zollanmeldung erfolgt keine Abfertigung.", "Sans déclaration complète, pas de dédouanement."],
    ],
  },
  zollabfertigung: {
    v: [
      ["die Zollabfertigung veranlassen", "faire procéder au dédouanement"],
      ["die Zollabfertigung beschleunigen", "accélérer le dédouanement"],
    ],
    s: [
      ["Die Zollabfertigung dauert meist einen Tag.", "Le dédouanement prend en général une journée."],
      ["Nach der Zollabfertigung wird die Ware freigegeben.", "Après dédouanement, la marchandise est libérée."],
    ],
  },
  warennummer: {
    v: [
      ["die Warennummer ermitteln", "déterminer le code marchandise"],
      ["die Warennummer angeben", "indiquer le code marchandise"],
    ],
    s: [
      ["Die Warennummer bestimmt den Zollsatz.", "Le code marchandise détermine le taux de douane."],
      ["Eine falsche Warennummer kann teuer werden.", "Un mauvais code marchandise peut coûter cher."],
    ],
  },
  zollsatz: {
    v: [["den Zollsatz anwenden", "appliquer le taux de douane"]],
    s: [
      ["Der Zollsatz hängt von der Warennummer ab.", "Le taux dépend du code marchandise."],
      ["Für dieses Land gilt ein reduzierter Zollsatz.", "Un taux réduit s'applique à ce pays."],
    ],
  },
  einfuhr: {
    v: [
      ["die Einfuhr genehmigen", "autoriser l'importation"],
      ["die Einfuhr beschränken", "restreindre l'importation"],
    ],
    s: [
      ["Die Einfuhr unterliegt der Genehmigungspflicht.", "L'importation est soumise à autorisation."],
      ["Die Einfuhr aus Drittländern ist zollpflichtig.", "L'importation depuis les pays tiers est soumise à droits."],
    ],
  },
  ausfuhr: {
    v: [
      ["die Ausfuhr anmelden", "déclarer l'exportation"],
      ["die Ausfuhr genehmigen lassen", "faire autoriser l'exportation"],
    ],
    s: [
      ["Die Ausfuhr in Drittländer erfordert eine Zollanmeldung.", "L'exportation vers les pays tiers nécessite une déclaration."],
      ["Die Ausfuhr wurde von der Behörde gestoppt.", "L'exportation a été bloquée par l'administration."],
    ],
  },
  incoterm: {
    v: [
      ["den Incoterm vereinbaren", "convenir de l'incoterm"],
      ["den Incoterm im Vertrag festhalten", "fixer l'incoterm dans le contrat"],
    ],
    s: [
      ["Der Incoterm FCA verlagert das Risiko früh auf den Käufer.", "L'incoterm FCA transfère tôt le risque à l'acheteur."],
      ["Welcher Incoterm ist vereinbart?", "Quel incoterm a été convenu ?"],
    ],
  },
  gefahrenuebergang: {
    v: [["den Gefahrenübergang festlegen", "définir le transfert de risque"]],
    s: [
      ["Der Gefahrenübergang erfolgt bei Übergabe an den Frachtführer.", "Le transfert de risque a lieu à la remise au transporteur."],
      ["Nach dem Gefahrenübergang trägt der Käufer das Risiko.", "Après le transfert, l'acheteur supporte le risque."],
    ],
  },
  ursprungszeugnis: {
    v: [
      ["ein Ursprungszeugnis beantragen", "demander un certificat d'origine"],
      ["ein Ursprungszeugnis vorlegen", "présenter un certificat d'origine"],
    ],
    s: [
      ["Das Ursprungszeugnis wird von der IHK ausgestellt.", "Le certificat d'origine est délivré par la chambre de commerce."],
      ["Ohne Ursprungszeugnis gibt es keine Präferenz.", "Sans certificat d'origine, pas de préférence tarifaire."],
    ],
  },
  packliste: {
    v: [
      ["die Packliste beifügen", "joindre la liste de colisage"],
      ["die Packliste erstellen", "établir la liste de colisage"],
    ],
    s: [
      ["Die Packliste liegt der Sendung bei.", "La liste de colisage accompagne l'envoi."],
      ["Die Packliste stimmt nicht mit der Ladung überein.", "La liste ne correspond pas au chargement."],
    ],
  },
  handelsrechnung: {
    v: [["die Handelsrechnung ausstellen", "établir la facture commerciale"]],
    s: [
      ["Die Handelsrechnung muss den Warenwert ausweisen.", "La facture commerciale doit indiquer la valeur des biens."],
      ["Die Handelsrechnung wird dreifach beigelegt.", "La facture commerciale est jointe en trois exemplaires."],
    ],
  },
  zolllager: {
    v: [["Ware im Zolllager einlagern", "placer la marchandise en entrepôt douanier"]],
    s: [
      ["Die Ware bleibt im Zolllager, bis die Abgaben bezahlt sind.", "La marchandise reste sous douane jusqu'au paiement des taxes."],
      ["Im Zolllager fallen noch keine Einfuhrabgaben an.", "En entrepôt douanier, aucun droit d'importation n'est encore dû."],
    ],
  },
  exportkontrolle: {
    v: [
      ["die Exportkontrolle durchführen", "effectuer le contrôle export"],
      ["gegen die Exportkontrolle verstoßen", "enfreindre le contrôle export"],
    ],
    s: [
      ["Die Exportkontrolle prüft Dual-Use-Güter besonders streng.", "Le contrôle export est strict sur les biens à double usage."],
      ["Jeder Kunde wird gegen die Sanktionsliste geprüft.", "Chaque client est vérifié contre la liste de sanctions."],
    ],
  },
  embargo: {
    v: [["ein Embargo verhängen", "décréter un embargo"]],
    s: [
      ["Ein Embargo verbietet die Ausfuhr in dieses Land.", "Un embargo interdit l'exportation vers ce pays."],
      ["Das Embargo wurde vergangene Woche verschärft.", "L'embargo a été renforcé la semaine dernière."],
    ],
  },
  zollwert: {
    v: [["den Zollwert ermitteln", "déterminer la valeur en douane"]],
    s: [
      ["Der Zollwert umfasst auch die Frachtkosten.", "La valeur en douane inclut aussi les frais de transport."],
      ["Der Zollwert wird auf Basis des Rechnungspreises berechnet.", "La valeur en douane est calculée sur le prix facturé."],
    ],
  },
  drittland: {
    v: [["ins Drittland liefern", "livrer vers un pays tiers"]],
    s: [
      ["Lieferungen ins Drittland sind zollpflichtig.", "Les livraisons vers les pays tiers sont soumises à droits."],
      ["Die Schweiz ist zolltechnisch ein Drittland.", "La Suisse est un pays tiers du point de vue douanier."],
    ],
  },
  verzollung: {
    v: [
      ["die Verzollung beauftragen", "confier le dédouanement"],
      ["die Verzollung übernehmen", "prendre en charge le dédouanement"],
    ],
    s: [
      ["Die Verzollung übernimmt unser Zollagent.", "Le dédouanement est assuré par notre agent en douane."],
      ["Die Verzollung erfolgt am Bestimmungsort.", "Le dédouanement a lieu au lieu de destination."],
    ],
  },
  praeferenznachweis: {
    v: [["den Präferenznachweis beilegen", "joindre la preuve d'origine préférentielle"]],
    s: [
      ["Der Präferenznachweis muss beigelegt werden.", "La preuve d'origine doit être jointe."],
      ["Ohne Präferenznachweis zahlt der Kunde den vollen Zoll.", "Sans preuve d'origine, le client paie le plein tarif."],
    ],
  },
  intrastat: {
    v: [["die Intrastat-Meldung abgeben", "déposer la déclaration Intrastat"]],
    s: [
      ["Die Intrastat-Meldung muss monatlich erfolgen.", "La déclaration Intrastat est mensuelle."],
      ["Intrastat erfasst den Warenverkehr innerhalb der EU.", "Intrastat recense les échanges de biens dans l'UE."],
    ],
  },
};

export default usage;
