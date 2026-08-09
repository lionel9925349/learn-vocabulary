import type { UsageMap, Pair } from "./types";
import lager from "./lager";
import transport from "./transport";
import gefahrgut from "./gefahrgut";
import einkauf from "./einkauf";

const MAPS: UsageMap[] = [lager, transport, gefahrgut, einkauf];

/** Table d'usages consolidée, indexée par identifiant de mot. */
const USAGE: UsageMap = Object.assign({}, ...MAPS);

export default USAGE;

export function toPairs(pairs: readonly Pair[] | undefined) {
  return pairs?.map(([de, fr]) => ({ de, fr }));
}
