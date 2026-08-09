import type { UsageMap, Pair } from "./types";
import lager from "./lager";
import transport from "./transport";
import gefahrgut from "./gefahrgut";
import einkauf from "./einkauf";
import zoll from "./zoll";
import qualitaet from "./qualitaet";
import it from "./it";
import verben from "./verben";
import produktion from "./produktion";
import recht from "./recht";
import buero from "./buero";
import adjektive from "./adjektive";
import divers from "./divers";

const MAPS: UsageMap[] = [
  lager,
  transport,
  gefahrgut,
  einkauf,
  zoll,
  qualitaet,
  it,
  verben,
  produktion,
  recht,
  buero,
  adjektive,
  divers,
];

/** Table d'usages consolidée, indexée par identifiant de mot. */
const USAGE: UsageMap = Object.assign({}, ...MAPS);

export default USAGE;

export function toPairs(pairs: readonly Pair[] | undefined) {
  return pairs?.map(([de, fr]) => ({ de, fr }));
}
