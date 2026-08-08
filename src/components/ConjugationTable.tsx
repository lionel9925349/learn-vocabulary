import type { Word } from "@/lib/types";
import { conjugatePresent } from "@/lib/conjugation";

/** Conjugaison au présent, sur la fiche d'un verbe. */
export default function ConjugationTable({ word }: { word: Word }) {
  const rows = conjugatePresent(word);
  const hasIrregular = rows.some((r) => r.irregular);
  const prefix = rows[0]?.prefix;

  return (
    <div>
      <table className="w-full text-[15px] border-collapse">
        <tbody>
          {rows.map((row) => (
            <tr key={row.person} className="border-t border-line">
              <td className="py-2 pr-3 font-ui text-[12px] text-muted w-24 align-baseline">
                {row.person}
              </td>
              <td className="py-2">
                <span className={row.irregular ? "font-semibold" : ""}>{row.verb}</span>
                {row.prefix && <span className="text-muted"> … {row.prefix}</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {prefix && (
        <p className="text-[13.5px] text-muted mt-3 leading-relaxed">
          Particule <b className="text-ink">séparable</b> : à la conjugaison,{" "}
          <b className="text-ink">{prefix}</b> se détache et part en fin de proposition —{" "}
          <i>ich {rows[0].verb} die Ware {prefix}</i>.
        </p>
      )}
      {hasIrregular && (
        <p className="text-[13.5px] text-muted mt-2 leading-relaxed">
          Verbe <b className="text-ink">fort</b> : la voyelle du radical change aux 2ᵉ et 3ᵉ
          personnes du singulier. C&rsquo;est l&rsquo;irrégularité à mémoriser.
        </p>
      )}
      {word.perfekt && (
        <p className="text-[13.5px] text-muted mt-2">
          Parfait : <b className="text-ink">{word.perfekt}</b>
        </p>
      )}
    </div>
  );
}
