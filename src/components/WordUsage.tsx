import type { Word } from "@/lib/types";
import AudioButton from "./AudioButton";

/**
 * Verbes habituels et phrases d'usage.
 *
 * C'est l'information qu'un dictionnaire bilingue ne donne pas : on n'apprend
 * pas seulement que « Auftrag » veut dire commande, mais qu'on l'**erteilt**
 * — là où le français « donner » induirait *geben*, qui ne se dit pas.
 */
export default function WordUsage({
  word,
  compact = false,
}: {
  word: Word;
  compact?: boolean;
}) {
  const collocations = word.collocations ?? [];
  // La première phrase sert déjà d'exemple principal : on ne la répète pas.
  const sentences = (word.sentences ?? []).filter((s) => s.de !== word.example?.de);

  if (collocations.length === 0 && sentences.length === 0) return null;

  return (
    <div className={compact ? "mt-3" : "mt-6"}>
      {collocations.length > 0 && (
        <>
          <h3 className="font-ui text-[10.5px] uppercase tracking-[0.12em] text-muted mb-1.5">
            On l&rsquo;emploie avec
          </h3>
          <ul className="mb-3">
            {collocations.map((c) => (
              <li
                key={c.de}
                className="flex flex-wrap items-baseline gap-x-2 py-1 border-b border-line last:border-0"
              >
                <span className="text-[14.5px] font-medium">{c.de}</span>
                <span className="text-[13px] text-muted italic">{c.fr}</span>
              </li>
            ))}
          </ul>
        </>
      )}

      {sentences.length > 0 && (
        <>
          <h3 className="font-ui text-[10.5px] uppercase tracking-[0.12em] text-muted mb-1.5">
            En contexte
          </h3>
          <ul>
            {sentences.map((s) => (
              <li key={s.de} className="py-1.5 border-b border-line last:border-0">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[14.5px] italic">{s.de}</span>
                  <AudioButton text={s.de} label="▸" className="shrink-0 !px-2.5" />
                </div>
                <div className="text-[13px] text-muted mt-0.5">{s.fr}</div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
