import type { Word } from "@/lib/types";
import { CASES, CASE_INFO, getDeclensionTable } from "@/lib/declension";

export default function DeclensionTable({ word }: { word: Word }) {
  const rows = getDeclensionTable(word);
  const singular = rows.filter((r) => !r.plural);
  const plural = rows.filter((r) => r.plural);

  return (
    <div className="grid sm:grid-cols-2 gap-5">
      <Block
        title="Singulier"
        rows={singular}
        indefLabel="ein / kein"
        color={`var(--${word.artikel ?? "das"})`}
      />
      <Block title="Pluriel (tous genres)" rows={plural} indefLabel="kein" color="var(--gold)" />
    </div>
  );
}

function Block({
  title,
  rows,
  indefLabel,
  color,
}: {
  title: string;
  rows: ReturnType<typeof getDeclensionTable>;
  indefLabel: string;
  color: string;
}) {
  return (
    <div>
      <h3 className="font-ui text-[11px] uppercase tracking-[0.14em] text-muted mb-2">{title}</h3>
      {/* Les noms composés sont longs : le tableau défile plutôt que d'être rogné. */}
      <div className="overflow-x-auto -mx-1 px-1">
        <table className="w-full text-[14.5px] border-collapse">
        <thead>
          <tr className="font-ui text-[10.5px] uppercase tracking-wide text-muted">
            <th className="text-left font-normal pb-1.5">Cas</th>
            <th className="text-left font-normal pb-1.5">Défini</th>
            <th className="text-left font-normal pb-1.5">{indefLabel}</th>
            <th className="text-left font-normal pb-1.5">Nom</th>
          </tr>
        </thead>
        <tbody>
          {CASES.map((c) => {
            const row = rows.find((r) => r.case === c);
            if (!row) return null;
            return (
              <tr key={c} className="border-t border-line">
                <td className="py-1.5 pr-2 font-ui text-[11px] text-muted align-top">
                  {CASE_INFO[c].short}
                </td>
                <td className="py-1.5 pr-2 font-semibold" style={{ color }}>
                  {row.definiteArticle}
                </td>
                <td className="py-1.5 pr-2 text-muted">{row.indefiniteArticle ?? "—"}</td>
                <td lang="de" className="py-1.5 german">
                  {row.noun ?? <span className="text-muted">—</span>}
                </td>
              </tr>
            );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
