import type { UsageMap } from "./types";

/** Matières dangereuses : le vocabulaire s'emploie dans des formules très codifiées. */
const usage: UsageMap = {
  gefahrgut: {
    v: [
      ["Gefahrgut befördern", "transporter des matières dangereuses"],
      ["Gefahrgut deklarieren", "déclarer des matières dangereuses"],
      ["Gefahrgut kennzeichnen", "étiqueter des matières dangereuses"],
      ["Gefahrgut annehmen", "accepter des matières dangereuses"],
    ],
    s: [
      ["Für Gefahrgut gelten besondere Vorschriften.", "Des prescriptions particulières s'appliquent aux matières dangereuses."],
      ["Der Fahrer muss für Gefahrgut geschult sein.", "Le conducteur doit être formé aux matières dangereuses."],
      ["Gefahrgut darf nicht mit Lebensmitteln zusammengeladen werden.", "Les matières dangereuses ne doivent pas être chargées avec des denrées alimentaires."],
    ],
  },
  "un-nummer": {
    v: [
      ["die UN-Nummer angeben", "indiquer le numéro ONU"],
      ["die UN-Nummer ermitteln", "déterminer le numéro ONU"],
    ],
    s: [
      ["Die UN-Nummer steht im Beförderungspapier.", "Le numéro ONU figure sur le document de transport."],
      ["UN 1203 steht für Benzin.", "UN 1203 correspond à l'essence."],
    ],
  },
  gefahrzettel: {
    v: [
      ["den Gefahrzettel anbringen", "apposer l'étiquette de danger"],
      ["den Gefahrzettel entfernen", "retirer l'étiquette de danger"],
    ],
    s: [
      ["Der Gefahrzettel muss auf zwei Seiten sichtbar sein.", "L'étiquette doit être visible sur deux faces."],
      ["Ein beschädigter Gefahrzettel ist sofort zu ersetzen.", "Une étiquette endommagée doit être remplacée immédiatement."],
    ],
  },
  warntafel: {
    v: [
      ["die Warntafel anbringen", "poser le panneau orange"],
      ["die Warntafel abdecken", "occulter le panneau orange"],
    ],
    s: [
      ["Die orangefarbene Warntafel wird vorn und hinten angebracht.", "Le panneau orange se pose à l'avant et à l'arrière."],
      ["Ohne Ladung wird die Warntafel abgedeckt.", "Sans chargement, le panneau orange est occulté."],
    ],
  },
  gefahrgutbeauftragte: {
    v: [
      ["einen Gefahrgutbeauftragten bestellen", "désigner un conseiller à la sécurité"],
      ["den Gefahrgutbeauftragten hinzuziehen", "faire appel au conseiller à la sécurité"],
    ],
    s: [
      ["Der Gefahrgutbeauftragte erstellt den Jahresbericht.", "Le conseiller à la sécurité rédige le rapport annuel."],
      ["Jeder Betrieb mit Gefahrgut braucht einen Gefahrgutbeauftragten.", "Toute entreprise manipulant des matières dangereuses doit avoir un conseiller à la sécurité."],
    ],
  },
  sicherheitsdatenblatt: {
    v: [
      ["das Sicherheitsdatenblatt anfordern", "demander la fiche de données de sécurité"],
      ["das Sicherheitsdatenblatt hinterlegen", "archiver la fiche de données de sécurité"],
    ],
    s: [
      ["Das Sicherheitsdatenblatt liegt in deutscher Sprache vor.", "La fiche de données de sécurité est disponible en allemand."],
      ["Ohne Sicherheitsdatenblatt nehmen wir die Ware nicht an.", "Sans fiche de données de sécurité, nous n'acceptons pas la marchandise."],
    ],
  },
  beförderungspapier: {
    v: [
      ["das Beförderungspapier mitführen", "avoir le document de transport à bord"],
      ["das Beförderungspapier ausfüllen", "remplir le document de transport"],
    ],
    s: [
      ["Das Beförderungspapier muss während der Fahrt mitgeführt werden.", "Le document de transport doit être présent pendant le trajet."],
      ["Im Beförderungspapier stehen UN-Nummer, Menge und Verpackungsgruppe.", "Le document de transport indique le numéro ONU, la quantité et le groupe d'emballage."],
    ],
  },
  zusammenladeverbot: {
    v: [["das Zusammenladeverbot beachten", "respecter l'interdiction de chargement en commun"]],
    s: [
      ["Für diese Klassen gilt ein Zusammenladeverbot.", "Ces classes sont soumises à une interdiction de chargement en commun."],
      ["Das Zusammenladeverbot wird bei der Verladung geprüft.", "L'interdiction est vérifiée au chargement."],
    ],
  },
  leckage: {
    v: [
      ["eine Leckage feststellen", "constater une fuite"],
      ["eine Leckage abdichten", "colmater une fuite"],
      ["eine Leckage melden", "signaler une fuite"],
    ],
    s: [
      ["Bei einer Leckage ist der Bereich sofort zu räumen.", "En cas de fuite, la zone doit être évacuée immédiatement."],
      ["Die Leckage wurde mit Bindemittel aufgenommen.", "La fuite a été absorbée avec un produit absorbant."],
    ],
  },
  unterweisung: {
    v: [
      ["eine Unterweisung durchführen", "réaliser une formation"],
      ["an der Unterweisung teilnehmen", "participer à la formation"],
      ["die Unterweisung dokumentieren", "documenter la formation"],
    ],
    s: [
      ["Die Unterweisung ist jährlich zu wiederholen.", "La formation doit être renouvelée chaque année."],
      ["Ohne Unterweisung darf niemand Gefahrgut verladen.", "Sans formation, personne ne peut charger de matières dangereuses."],
    ],
  },
  schutzausruestung: {
    v: [
      ["Schutzausrüstung tragen", "porter l'équipement de protection"],
      ["Schutzausrüstung bereitstellen", "mettre à disposition l'équipement"],
    ],
    s: [
      ["Im Gefahrenbereich ist Schutzausrüstung Pflicht.", "L'équipement de protection est obligatoire en zone dangereuse."],
      ["Die persönliche Schutzausrüstung wird vom Betrieb gestellt.", "L'équipement de protection individuelle est fourni par l'entreprise."],
    ],
  },
  verpackungsgruppe: {
    v: [["die Verpackungsgruppe bestimmen", "déterminer le groupe d'emballage"]],
    s: [
      ["Die Verpackungsgruppe I steht für hohe Gefahr.", "Le groupe d'emballage I correspond à un danger élevé."],
      ["Die Verpackungsgruppe richtet sich nach dem Gefahrengrad.", "Le groupe d'emballage dépend du degré de danger."],
    ],
  },
  freistellung: {
    v: [["eine Freistellung in Anspruch nehmen", "bénéficier d'une exemption"]],
    s: [
      ["Unter der Freigrenze gilt eine Freistellung.", "En dessous du seuil, une exemption s'applique."],
      ["Die Freistellung entbindet nicht von der Kennzeichnung.", "L'exemption ne dispense pas de l'étiquetage."],
    ],
  },
  auslaufen: {
    v: [["Flüssigkeit läuft aus", "du liquide s'écoule"]],
    s: [
      ["Aus dem Fass läuft Flüssigkeit aus.", "Du liquide s'écoule du fût."],
      ["Wenn Gefahrgut ausläuft, ist die Feuerwehr zu alarmieren.", "Si une matière dangereuse fuit, il faut alerter les pompiers."],
    ],
  },
};

export default usage;
