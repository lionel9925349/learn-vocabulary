import type { UsageMap } from "./types";

/** Droit des contrats : formulations figées, à reprendre telles quelles. */
const usage: UsageMap = {
  klausel: {
    v: [
      ["eine Klausel aufnehmen", "insérer une clause"],
      ["eine Klausel streichen", "supprimer une clause"],
      ["sich auf eine Klausel berufen", "invoquer une clause"],
    ],
    s: [
      ["Diese Klausel ist unwirksam.", "Cette clause est nulle."],
      ["Die Klausel regelt die Haftungsbegrenzung.", "La clause régit la limitation de responsabilité."],
    ],
  },
  vertragsstrafe: {
    v: [
      ["eine Vertragsstrafe vereinbaren", "convenir d'une pénalité"],
      ["eine Vertragsstrafe geltend machen", "faire valoir une pénalité"],
    ],
    s: [
      ["Bei Verzug wird eine Vertragsstrafe fällig.", "En cas de retard, une pénalité est due."],
      ["Die Vertragsstrafe beträgt 0,5 Prozent pro Woche.", "La pénalité est de 0,5 % par semaine."],
    ],
  },
  schadensersatz: {
    v: [
      ["Schadensersatz fordern", "réclamer des dommages et intérêts"],
      ["Schadensersatz leisten", "verser des dommages et intérêts"],
    ],
    s: [
      ["Der Kunde fordert Schadensersatz.", "Le client réclame des dommages et intérêts."],
      ["Schadensersatzansprüche sind ausgeschlossen.", "Toute demande de dommages et intérêts est exclue."],
    ],
  },
  haftungsausschluss: {
    v: [["einen Haftungsausschluss vereinbaren", "convenir d'une exclusion de responsabilité"]],
    s: [
      ["Der Haftungsausschluss gilt nicht bei Vorsatz.", "L'exclusion ne vaut pas en cas de faute intentionnelle."],
      ["Im Vertrag steht ein Haftungsausschluss.", "Le contrat prévoit une exclusion de responsabilité."],
    ],
  },
  verjaehrung: {
    v: [
      ["die Verjährung hemmen", "suspendre la prescription"],
      ["auf Verjährung berufen", "invoquer la prescription"],
    ],
    s: [
      ["Der Anspruch ist verjährt.", "La créance est prescrite."],
      ["Die Verjährung beträgt drei Jahre.", "La prescription est de trois ans."],
    ],
  },
  gerichtsstand: {
    v: [["den Gerichtsstand vereinbaren", "convenir de la juridiction compétente"]],
    s: [
      ["Gerichtsstand ist Hamburg.", "La juridiction compétente est Hambourg."],
      ["Der Gerichtsstand ist im Vertrag festgelegt.", "La juridiction est fixée dans le contrat."],
    ],
  },
  vollmacht: {
    v: [
      ["eine Vollmacht erteilen", "donner une procuration"],
      ["eine Vollmacht widerrufen", "révoquer une procuration"],
    ],
    s: [
      ["Ich handle im Auftrag und mit Vollmacht.", "J'agis par mandat et procuration."],
      ["Ohne Vollmacht dürfen Sie nicht unterschreiben.", "Sans procuration, vous ne pouvez pas signer."],
    ],
  },
  verstoss: {
    v: [
      ["einen Verstoß feststellen", "constater une infraction"],
      ["gegen die Vorschrift verstoßen", "enfreindre la prescription"],
    ],
    s: [
      ["Ein Verstoß kann teuer werden.", "Une infraction peut coûter cher."],
      ["Der Verstoß wurde bei der Kontrolle festgestellt.", "L'infraction a été constatée lors du contrôle."],
    ],
  },
  maengelruege: {
    v: [["eine Mängelrüge erheben", "notifier un vice"]],
    s: [
      ["Die Mängelrüge muss unverzüglich erfolgen.", "La notification du vice doit être immédiate."],
      ["Ohne rechtzeitige Mängelrüge gilt die Ware als genehmigt.", "Sans notification en temps utile, la marchandise est réputée acceptée."],
    ],
  },
  geheimhaltungsvereinbarung: {
    v: [["eine Geheimhaltungsvereinbarung unterzeichnen", "signer un accord de confidentialité"]],
    s: [
      ["Vor dem Gespräch unterschreiben wir eine Geheimhaltungsvereinbarung.", "Avant l'entretien, nous signons un accord de confidentialité."],
      ["Die Geheimhaltungsvereinbarung gilt fünf Jahre.", "L'accord de confidentialité vaut cinq ans."],
    ],
  },
  eigentumsvorbehalt: {
    v: [["Eigentumsvorbehalt vereinbaren", "convenir d'une réserve de propriété"]],
    s: [
      ["Die Ware bleibt bis zur vollständigen Bezahlung unser Eigentum.", "La marchandise reste notre propriété jusqu'au paiement intégral."],
      ["Der Eigentumsvorbehalt steht in den AGB.", "La réserve de propriété figure dans les CGV."],
    ],
  },
  richtlinie: {
    v: [
      ["eine Richtlinie umsetzen", "transposer une directive"],
      ["sich an die Richtlinie halten", "respecter la directive"],
    ],
    s: [
      ["Die Richtlinie gilt ab Januar.", "La directive s'applique dès janvier."],
      ["Diese interne Richtlinie ist für alle verbindlich.", "Cette directive interne s'impose à tous."],
    ],
  },
  genehmigung: {
    v: [
      ["eine Genehmigung beantragen", "demander une autorisation"],
      ["eine Genehmigung erteilen", "délivrer une autorisation"],
      ["eine Genehmigung widerrufen", "retirer une autorisation"],
    ],
    s: [
      ["Die Genehmigung liegt vor.", "L'autorisation est obtenue."],
      ["Ohne Genehmigung darf nicht geliefert werden.", "Sans autorisation, la livraison est interdite."],
    ],
  },
  vorschrift: {
    v: [
      ["Vorschriften einhalten", "respecter les prescriptions"],
      ["gegen Vorschriften verstoßen", "enfreindre les prescriptions"],
    ],
    s: [
      ["Die Vorschrift schreibt Sicherheitsschuhe vor.", "La prescription impose des chaussures de sécurité."],
      ["Das ist bei uns Vorschrift.", "C'est la règle chez nous."],
    ],
  },
  meldepflicht: {
    v: [["der Meldepflicht nachkommen", "satisfaire à l'obligation de déclaration"]],
    s: [
      ["Für diesen Vorgang besteht Meldepflicht.", "Cette opération est soumise à déclaration."],
      ["Die Meldepflicht gilt binnen 24 Stunden.", "L'obligation de déclaration court sous 24 heures."],
    ],
  },
  bussgeld: {
    v: [["ein Bußgeld verhängen", "infliger une amende"]],
    s: [
      ["Bei Verstößen droht ein Bußgeld.", "En cas d'infraction, une amende est encourue."],
      ["Das Bußgeld beträgt bis zu 50 000 Euro.", "L'amende peut atteindre 50 000 euros."],
    ],
  },
  norm: {
    v: [
      ["einer Norm entsprechen", "être conforme à une norme"],
      ["eine Norm erfüllen", "satisfaire à une norme"],
    ],
    s: [
      ["Die Verpackung entspricht der Norm.", "L'emballage est conforme à la norme."],
      ["Welche Norm gilt für dieses Bauteil?", "Quelle norme s'applique à ce composant ?"],
    ],
  },
};

export default usage;
