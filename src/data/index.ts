import type { Word } from "@/lib/types";
import lager from "./words/lager";
import transport from "./words/transport";
import zoll from "./words/zoll";
import einkauf from "./words/einkauf";
import einkauf2 from "./words/einkauf2";
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
import it from "./words/it";
import verben from "./words/verben";
import wendungen from "./words/wendungen";
import adjektive from "./words/adjektive";
import buero from "./words/buero";
import recht from "./words/recht";
import logistik2 from "./words/logistik2";
import zoll2 from "./words/zoll2";

export { default as categories } from "./categories";

const ALL: Word[] = [
  ...lager,
  ...transport,
  ...zoll,
  ...einkauf,
  ...einkauf2,
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
  ...it,
  ...verben,
  ...wendungen,
  ...adjektive,
  ...buero,
  ...recht,
  ...logistik2,
  ...zoll2,
];

/**
 * Les lots sont saisis séparément : un même mot peut apparaître deux fois
 * (par exemple entre un lot détaillé et un lot compact). On garde la première
 * occurrence, qui est la plus richement documentée.
 */
const byId = new Map<string, Word>();
for (const w of ALL) {
  if (!byId.has(w.id)) byId.set(w.id, w);
}

const WORDS: Word[] = [...byId.values()];

export default WORDS;

export function getWordById(id: string): Word | undefined {
  return byId.get(id);
}

export function getWordsByCategory(category: string): Word[] {
  return WORDS.filter((w) => w.category === category);
}
