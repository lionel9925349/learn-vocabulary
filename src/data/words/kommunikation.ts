import type { Word } from "@/lib/types";
import { RULE_UNG, RULE_E_FEM, RULE_ANGLICISM_DAS, RULE_MEMORIZE, ruleCompound } from "../ruleHelpers";

const cat = "kommunikation";

const words: Word[] = [
  { id: "besprechung", de: "Besprechung", artikel: "die", plural: "Besprechungen", fr: "réunion", category: cat, rule: RULE_UNG, example: { de: "Die Besprechung beginnt um 9 Uhr.", fr: "La réunion commence à 9h." } },
  { id: "meeting", de: "Meeting", artikel: "das", plural: "Meetings", fr: "réunion (anglicisme)", category: cat, rule: RULE_ANGLICISM_DAS, example: { de: "Das Meeting wurde verschoben.", fr: "La réunion a été reportée." } },
  { id: "rueckmeldung", de: "Rückmeldung", artikel: "die", plural: "Rückmeldungen", fr: "retour / feedback", category: cat, rule: RULE_UNG, example: { de: "Die Rückmeldung kam sofort.", fr: "Le retour est arrivé immédiatement." } },
  { id: "anfrage", de: "Anfrage", artikel: "die", plural: "Anfragen", fr: "demande / requête", category: cat, rule: RULE_E_FEM, example: { de: "Die Anfrage wurde per E-Mail gestellt.", fr: "La demande a été envoyée par e-mail." } },
  { id: "eskalation", de: "Eskalation", artikel: "die", plural: "Eskalationen", fr: "escalade", category: cat, rule: "Suffixe **-tion** → toujours féminin.", example: { de: "Die Eskalation ging an den Bereichsleiter.", fr: "L'escalade est remontée au chef de secteur." } },
  { id: "absprache", de: "Absprache", artikel: "die", plural: "Absprachen", fr: "accord / arrangement", category: cat, rule: RULE_E_FEM, example: { de: "Nach Absprache mit dem Kunden liefern wir früher.", fr: "En accord avec le client, nous livrons plus tôt." } },
  { id: "protokoll-meeting", de: "Protokoll", artikel: "das", plural: "Protokolle", fr: "compte rendu", category: cat, rule: RULE_MEMORIZE, example: { de: "Das Protokoll wird allen Teilnehmern geschickt.", fr: "Le compte rendu est envoyé à tous les participants." } },
  { id: "hinweis", de: "Hinweis", artikel: "der", plural: "Hinweise", fr: "remarque / indication", category: cat, rule: RULE_MEMORIZE, example: { de: "Bitte beachten Sie den Hinweis auf der Palette.", fr: "Merci de tenir compte de la remarque sur la palette." } },
  { id: "anweisung", de: "Anweisung", artikel: "die", plural: "Anweisungen", fr: "instruction / consigne", category: cat, rule: RULE_UNG, example: { de: "Die Anweisung kam direkt vom Disponenten.", fr: "L'instruction est venue directement de l'affréteur." } },
  { id: "abweichungsmeldung", de: "Abweichungsmeldung", artikel: "die", plural: "Abweichungsmeldungen", fr: "signalement d'écart", category: cat, rule: ruleCompound("die", "Meldung"), example: { de: "Die Abweichungsmeldung geht automatisch an den Teamleiter.", fr: "Le signalement d'écart part automatiquement au chef d'équipe." } },
];

export default words;
