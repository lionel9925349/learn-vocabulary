import { CASE_INFO } from "@/lib/declension";
import {
  DECLENSION_LABELS,
  DECLENSION_TRIGGER,
  endingTable,
  type AdjectiveDeclension,
} from "@/lib/adjectiveDeclension";

const ORDER: AdjectiveDeclension[] = ["weak", "mixed", "strong"];

const EXAMPLES: Record<AdjectiveDeclension, string> = {
  weak: "der zuverlässige Lieferant · mit dem zuverlässigen Lieferanten",
  mixed: "ein zuverlässiger Lieferant · mit einem zuverlässigen Lieferanten",
  strong: "zuverlässige Ware · mit zuverlässiger Ware",
};

/** Tableaux de référence des trois déclinaisons de l'adjectif. */
export default function AdjectiveTables() {
  return (
    <div className="space-y-8">
      {ORDER.map((d) => (
        <section key={d}>
          <h3 className="font-semibold text-[17px]">Déclinaison {DECLENSION_LABELS[d]}</h3>
          <p className="text-[13.5px] text-muted mt-0.5 mb-3">{DECLENSION_TRIGGER[d]}</p>

          <div className="overflow-x-auto">
            <table className="w-full text-[14px] border-collapse min-w-[320px]">
              <thead>
                <tr className="font-ui text-[10.5px] uppercase tracking-wide text-muted">
                  <th className="text-left font-normal pb-1.5">Cas</th>
                  <th className="text-left font-normal pb-1.5">Masc.</th>
                  <th className="text-left font-normal pb-1.5">Fém.</th>
                  <th className="text-left font-normal pb-1.5">Neutre</th>
                  <th className="text-left font-normal pb-1.5">Pluriel</th>
                </tr>
              </thead>
              <tbody>
                {endingTable(d).map((row) => (
                  <tr key={row.case} className="border-t border-line">
                    <td className="py-1.5 pr-2 font-ui text-[11px] text-muted">
                      {CASE_INFO[row.case].short}
                    </td>
                    <td className="py-1.5 pr-2 font-semibold">-{row.m}</td>
                    <td className="py-1.5 pr-2 font-semibold">-{row.f}</td>
                    <td className="py-1.5 pr-2 font-semibold">-{row.n}</td>
                    <td className="py-1.5 font-semibold">-{row.pl}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-[13.5px] text-muted italic mt-2">{EXAMPLES[d]}</p>
        </section>
      ))}

      <div className="bg-paper-2 border-l-[3px] border-gold rounded px-4 py-3 text-[14px] leading-relaxed">
        <b>La logique à retenir :</b> le genre et le cas ne doivent être marqués
        qu&rsquo;<b>une seule fois</b> dans le groupe nominal. Si le déterminant les porte déjà
        (<i>der, dem, des…</i>), l&rsquo;adjectif se repose et prend simplement <b>-e</b> ou{" "}
        <b>-en</b>. S&rsquo;il n&rsquo;y a pas de déterminant, c&rsquo;est l&rsquo;adjectif qui
        doit faire le travail : il reprend alors les terminaisons de l&rsquo;article défini.
        <i> ein</i> est le cas intermédiaire : il ne marque ni le masculin ni le neutre au
        nominatif, donc l&rsquo;adjectif compense là où il manque quelque chose.
      </div>
    </div>
  );
}
