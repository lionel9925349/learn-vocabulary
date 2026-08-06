import type { Word } from "@/lib/types";
import lager from "./words/lager";
import transport from "./words/transport";
import zoll from "./words/zoll";
import einkauf from "./words/einkauf";
import produktion from "./words/produktion";
import verpackung from "./words/verpackung";
import qualitaet from "./words/qualitaet";
import software from "./words/software";
import programmierung from "./words/programmierung";
import netzwerk from "./words/netzwerk";
import finanzen from "./words/finanzen";
import arbeit from "./words/arbeit";
import kommunikation from "./words/kommunikation";
import personen from "./words/personen";

export { default as categories } from "./categories";

const WORDS: Word[] = [
  ...lager,
  ...transport,
  ...zoll,
  ...einkauf,
  ...produktion,
  ...verpackung,
  ...qualitaet,
  ...software,
  ...programmierung,
  ...netzwerk,
  ...finanzen,
  ...arbeit,
  ...kommunikation,
  ...personen,
];

export default WORDS;

export function getWordById(id: string): Word | undefined {
  return WORDS.find((w) => w.id === id);
}

export function getWordsByCategory(category: string): Word[] {
  return WORDS.filter((w) => w.category === category);
}
