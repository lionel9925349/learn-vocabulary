import type { UsageMap } from "./types";

/** Qualité, litiges et emballage : le vocabulaire du problème et de sa résolution. */
const usage: UsageMap = {
  // — Qualité et réclamations —
  mangel: {
    v: [
      ["einen Mangel feststellen", "constater un défaut"],
      ["einen Mangel rügen", "notifier un défaut"],
      ["einen Mangel beheben", "corriger un défaut"],
      ["Mängel dokumentieren", "documenter les défauts"],
    ],
    s: [
      ["Der Mangel wurde bei der Kontrolle entdeckt.", "Le défaut a été découvert lors du contrôle."],
      ["Verdeckte Mängel sind unverzüglich zu melden.", "Les vices cachés doivent être signalés sans délai."],
    ],
  },
  beanstandung: {
    v: [
      ["eine Beanstandung erheben", "émettre une contestation"],
      ["eine Beanstandung prüfen", "examiner une contestation"],
    ],
    s: [
      ["Die Beanstandung wird innerhalb von 48 Stunden bearbeitet.", "La contestation est traitée sous 48 heures."],
      ["Es gab keine Beanstandungen bei der Abnahme.", "Aucune contestation lors de la réception."],
    ],
  },
  abweichung: {
    v: [
      ["eine Abweichung feststellen", "constater un écart"],
      ["eine Abweichung dokumentieren", "documenter un écart"],
      ["Abweichungen analysieren", "analyser les écarts"],
    ],
    s: [
      ["Die Abweichung wurde dokumentiert.", "L'écart a été documenté."],
      ["Jede Abweichung von der Spezifikation ist meldepflichtig.", "Tout écart à la spécification doit être signalé."],
    ],
  },
  haftung: {
    v: [
      ["die Haftung übernehmen", "assumer la responsabilité"],
      ["die Haftung ausschließen", "exclure la responsabilité"],
      ["die Haftung begrenzen", "limiter la responsabilité"],
    ],
    s: [
      ["Die Haftung liegt beim Frachtführer.", "La responsabilité incombe au transporteur."],
      ["Die Haftung ist auf den Warenwert begrenzt.", "La responsabilité est limitée à la valeur des biens."],
    ],
  },
  retoure: {
    v: [
      ["eine Retoure anmelden", "déclarer un retour"],
      ["eine Retoure bearbeiten", "traiter un retour"],
      ["die Retoure gutschreiben", "créditer le retour"],
    ],
    s: [
      ["Die Retoure wird im System erfasst.", "Le retour est enregistré dans le système."],
      ["Retouren ohne Nummer werden nicht angenommen.", "Les retours sans numéro ne sont pas acceptés."],
    ],
  },
  falschlieferung: {
    v: [["eine Falschlieferung melden", "signaler une erreur de livraison"]],
    s: [
      ["Bei einer Falschlieferung wird die Ware kostenlos abgeholt.", "En cas d'erreur, la marchandise est reprise gratuitement."],
      ["Die Falschlieferung ging an den falschen Empfänger.", "La livraison est partie au mauvais destinataire."],
    ],
  },
  fehlmenge: {
    v: [
      ["eine Fehlmenge feststellen", "constater une quantité manquante"],
      ["die Fehlmenge nachliefern", "livrer le reliquat"],
    ],
    s: [
      ["Die Fehlmenge wird nachgeliefert.", "La quantité manquante sera livrée ultérieurement."],
      ["Die Fehlmenge beträgt zwölf Kartons.", "Le manquant s'élève à douze cartons."],
    ],
  },
  gewaehrleistung: {
    v: [
      ["Gewährleistung übernehmen", "accorder la garantie"],
      ["die Gewährleistung geltend machen", "faire jouer la garantie"],
    ],
    s: [
      ["Die Gewährleistung beträgt zwei Jahre.", "La garantie légale est de deux ans."],
      ["Die Gewährleistung ist nach Ablauf der Frist erloschen.", "La garantie a expiré à l'échéance du délai."],
    ],
  },
  korrekturmassnahme: {
    v: [
      ["eine Korrekturmaßnahme einleiten", "engager une action corrective"],
      ["Korrekturmaßnahmen nachverfolgen", "suivre les actions correctives"],
    ],
    s: [
      ["Eine Korrekturmaßnahme wurde eingeleitet.", "Une action corrective a été lancée."],
      ["Die Korrekturmaßnahmen werden im Audit überprüft.", "Les actions correctives sont vérifiées lors de l'audit."],
    ],
  },
  audit: {
    v: [
      ["ein Audit durchführen", "réaliser un audit"],
      ["ein Audit bestehen", "réussir un audit"],
      ["sich auf ein Audit vorbereiten", "se préparer à un audit"],
    ],
    s: [
      ["Das Audit findet nächste Woche statt.", "L'audit a lieu la semaine prochaine."],
      ["Im Audit wurden drei Abweichungen festgestellt.", "Trois écarts ont été relevés lors de l'audit."],
    ],
  },
  zertifizierung: {
    v: [
      ["eine Zertifizierung erlangen", "obtenir une certification"],
      ["die Zertifizierung verlängern", "renouveler la certification"],
    ],
    s: [
      ["Die Zertifizierung muss jährlich erneuert werden.", "La certification doit être renouvelée chaque année."],
      ["Ohne Zertifizierung dürfen wir nicht liefern.", "Sans certification, nous ne pouvons pas livrer."],
    ],
  },
  fehlerquote: {
    v: [["die Fehlerquote senken", "réduire le taux d'erreur"]],
    s: [
      ["Die Fehlerquote liegt unter einem Prozent.", "Le taux d'erreur est inférieur à 1 %."],
      ["Die Fehlerquote hat sich halbiert.", "Le taux d'erreur a été divisé par deux."],
    ],
  },
  pruefung: {
    v: [
      ["eine Prüfung durchführen", "effectuer un contrôle"],
      ["die Prüfung bestehen", "réussir le contrôle"],
    ],
    s: [
      ["Die Prüfung erfolgt stichprobenartig.", "Le contrôle se fait par sondage."],
      ["Die Ware hat die Prüfung nicht bestanden.", "La marchandise n'a pas passé le contrôle."],
    ],
  },
  schadensfall: {
    v: [["den Schadensfall melden", "déclarer le sinistre"]],
    s: [
      ["Im Schadensfall gilt die CMR-Haftung.", "En cas de sinistre, la responsabilité CMR s'applique."],
      ["Der Schadensfall wurde der Versicherung gemeldet.", "Le sinistre a été déclaré à l'assurance."],
    ],
  },

  // — Emballage —
  verpackung: {
    v: [
      ["die Verpackung öffnen", "ouvrir l'emballage"],
      ["die Verpackung entsorgen", "éliminer l'emballage"],
      ["die Verpackung beschriften", "marquer l'emballage"],
    ],
    s: [
      ["Die Verpackung ist beschädigt.", "L'emballage est endommagé."],
      ["Die Verpackung muss transportsicher sein.", "L'emballage doit résister au transport."],
    ],
  },
  etikett: {
    v: [
      ["ein Etikett anbringen", "apposer une étiquette"],
      ["ein Etikett drucken", "imprimer une étiquette"],
      ["ein Etikett überkleben", "recouvrir une étiquette"],
    ],
    s: [
      ["Das Etikett trägt den Barcode.", "L'étiquette porte le code-barres."],
      ["Das Etikett ist unleserlich geworden.", "L'étiquette est devenue illisible."],
    ],
  },
  packstueck: {
    v: [["die Packstücke zählen", "compter les colis"]],
    s: [
      ["Die Sendung besteht aus drei Packstücken.", "L'envoi se compose de trois colis."],
      ["Ein Packstück fehlt.", "Il manque un colis."],
    ],
  },
  barcode: {
    v: [
      ["den Barcode scannen", "scanner le code-barres"],
      ["den Barcode erzeugen", "générer le code-barres"],
    ],
    s: [
      ["Der Barcode lässt sich nicht scannen.", "Le code-barres ne se scanne pas."],
      ["Jedes Packstück trägt einen eindeutigen Barcode.", "Chaque colis porte un code-barres unique."],
    ],
  },
  folie: {
    v: [["die Palette in Folie wickeln", "filmer la palette"]],
    s: [
      ["Die Palette wird mit Folie umwickelt.", "La palette est filmée."],
      ["Die Folie schützt vor Feuchtigkeit.", "Le film protège de l'humidité."],
    ],
  },
  kennzeichnung: {
    v: [
      ["die Kennzeichnung anbringen", "apposer le marquage"],
      ["die Kennzeichnung prüfen", "vérifier le marquage"],
    ],
    s: [
      ["Die Kennzeichnung muss gut sichtbar sein.", "Le marquage doit être bien visible."],
      ["Eine fehlende Kennzeichnung führt zur Zurückweisung.", "Un marquage manquant entraîne un refus."],
    ],
  },
};

export default usage;
