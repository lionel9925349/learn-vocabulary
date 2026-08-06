import type { Word } from "@/lib/types";
import { RULE_UNG, RULE_E_FEM, RULE_CHEN_LEIN, RULE_MEMORIZE, ruleCompound } from "../ruleHelpers";

const cat = "verpackung";

const words: Word[] = [
  { id: "verpackung", de: "Verpackung", artikel: "die", plural: "Verpackungen", fr: "emballage", category: cat, rule: RULE_UNG, example: { de: "Die Verpackung ist beschädigt.", fr: "L'emballage est endommagé." } },
  { id: "karton", de: "Karton", artikel: "der", plural: "Kartons", fr: "carton", category: cat, rule: RULE_MEMORIZE, example: { de: "Der Karton enthält zwölf Stück.", fr: "Le carton contient douze pièces." } },
  { id: "folie", de: "Folie", artikel: "die", plural: "Folien", fr: "film plastique", category: cat, rule: "Suffixe **-ie** → toujours féminin (die).", example: { de: "Die Palette wird mit Folie umwickelt.", fr: "La palette est filmée." } },
  { id: "etikett", de: "Etikett", artikel: "das", plural: "Etiketten", fr: "étiquette", category: cat, rule: RULE_MEMORIZE, example: { de: "Das Etikett trägt den Barcode.", fr: "L'étiquette porte le code-barres." } },
  { id: "kennzeichnung", de: "Kennzeichnung", artikel: "die", plural: "Kennzeichnungen", fr: "marquage / étiquetage", category: cat, rule: RULE_UNG, example: { de: "Die Kennzeichnung muss gut sichtbar sein.", fr: "Le marquage doit être bien visible." } },
  { id: "packstueck", de: "Packstück", artikel: "das", plural: "Packstücke", fr: "colis", category: cat, rule: ruleCompound("das", "Stück"), example: { de: "Die Sendung besteht aus drei Packstücken.", fr: "L'envoi se compose de trois colis." } },
  { id: "polsterung", de: "Polsterung", artikel: "die", plural: "Polsterungen", fr: "calage / rembourrage", category: cat, rule: RULE_UNG, example: { de: "Die Polsterung schützt vor Stößen.", fr: "Le calage protège des chocs." } },
  { id: "schrumpffolie", de: "Schrumpffolie", artikel: "die", plural: "Schrumpffolien", fr: "film thermorétractable", category: cat, rule: ruleCompound("die", "Folie"), example: { de: "Die Pakete werden in Schrumpffolie verpackt.", fr: "Les paquets sont emballés sous film thermorétractable." } },
  { id: "packmittel", de: "Packmittel", artikel: "das", plural: "Packmittel", fr: "matériel d'emballage", category: cat, rule: ruleCompound("das", "Mittel"), example: { de: "Wiederverwendbare Packmittel sparen Kosten.", fr: "Les emballages réutilisables permettent des économies." } },
  { id: "gefahrgutkennzeichnung", de: "Gefahrgutkennzeichnung", artikel: "die", plural: "Gefahrgutkennzeichnungen", fr: "étiquetage de matières dangereuses", category: cat, rule: ruleCompound("die", "Kennzeichnung"), example: { de: "Die Gefahrgutkennzeichnung ist auf allen Seiten sichtbar.", fr: "L'étiquetage matières dangereuses est visible sur toutes les faces." } },
  { id: "barcode", de: "Barcode", artikel: "der", plural: "Barcodes", fr: "code-barres", category: cat, rule: "Anglicisme se terminant en -e mais désignant un objet technique → masculin établi par usage (der Code).", example: { de: "Der Barcode lässt sich nicht scannen.", fr: "Le code-barres ne se laisse pas scanner." } },
  { id: "paeckchen", de: "Päckchen", artikel: "das", plural: "Päckchen", fr: "petit colis / paquet", category: cat, rule: RULE_CHEN_LEIN, example: { de: "Das Päckchen wiegt unter zwei Kilo.", fr: "Le petit colis pèse moins de deux kilos." } },
  { id: "umverpackung", de: "Umverpackung", artikel: "die", plural: "Umverpackungen", fr: "suremballage", category: cat, rule: ruleCompound("die", "Verpackung"), example: { de: "Die Umverpackung wird recycelt.", fr: "Le suremballage est recyclé." } },
  { id: "versandkarton", de: "Versandkarton", artikel: "der", plural: "Versandkartons", fr: "carton d'expédition", category: cat, rule: ruleCompound("der", "Karton"), example: { de: "Der Versandkarton ist für den Versand genormt.", fr: "Le carton d'expédition est standardisé pour l'envoi." } },
  { id: "packvorschrift", de: "Packvorschrift", artikel: "die", plural: "Packvorschriften", fr: "consigne d'emballage", category: cat, rule: ruleCompound("die", "Vorschrift"), example: { de: "Die Packvorschrift schreibt eine doppelte Wand vor.", fr: "La consigne d'emballage impose une double paroi." } },
  { id: "palettenschein", de: "Palettenschein", artikel: "der", plural: "Palettenscheine", fr: "bon de palette / échange de palettes", category: cat, rule: ruleCompound("der", "Schein"), example: { de: "Der Palettenschein wird bei der Übergabe unterschrieben.", fr: "Le bon de palette est signé à la remise." } },
  { id: "klebeband", de: "Klebeband", artikel: "das", plural: "Klebebänder", fr: "ruban adhésif", category: cat, rule: ruleCompound("das", "Band"), example: { de: "Das Klebeband hält die Kartonlaschen zusammen.", fr: "Le ruban adhésif maintient les rabats du carton." } },
  { id: "kartonage", de: "Kartonage", artikel: "die", plural: "Kartonagen", fr: "carton (matériel d'emballage)", category: cat, rule: RULE_E_FEM, example: { de: "Die Kartonage wird pro Palette bestellt.", fr: "Le carton est commandé par palette." } },
];

export default words;
