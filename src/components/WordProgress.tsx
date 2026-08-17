"use client";

import type { Word } from "@/lib/types";
import { BOX_COUNT, BOX_LABELS, wordState } from "@/lib/srs";
import { KIND_SHORT, availableKinds, cardKey } from "@/lib/units";
import { useSrs } from "@/lib/srsStore";

const DATE_FORMAT = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long" });

const STATUS_LABEL = {
  untouched: "Jamais rencontré",
  learning: "En cours d'apprentissage",
  known: "Acquis",
  mastered: "Maîtrisé",
} as const;

/**
 * État de mémorisation d'un mot, facette par facette.
 *
 * Le détail compte plus que le total : on peut connaître le sens d'un mot
 * depuis des semaines et buter encore sur son pluriel. Le tableau montre
 * précisément où en est chaque angle, et donc ce qui reste à travailler.
 */
export default function WordProgress({ word }: { word: Word }) {
  const srs = useSrs();
  const kinds = availableKinds(word);
  const state = wordState(srs, word);

  if (state.seenKinds === 0) {
    return (
      <p className="font-ui text-[12px] text-muted mt-6 border-t border-line pt-4">
        Mot pas encore rencontré en révision.
      </p>
    );
  }

  return (
    <div className="mt-6 border-t border-line pt-4">
      <h2 className="font-ui text-[11px] uppercase tracking-[0.14em] text-muted mb-3">
        Où tu en es · {STATUS_LABEL[state.status]}
      </h2>

      <ul>
        {kinds.map((kind) => {
          const card = srs.cards[cardKey(word.id, kind)];
          const rate = card && card.seen ? Math.round((card.correct / card.seen) * 100) : null;

          return (
            <li key={kind} className="py-2 border-b border-line last:border-0">
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-ui text-[12.5px]">{KIND_SHORT[kind]}</span>
                <span className="font-ui text-[11.5px] text-muted shrink-0">
                  {card ? BOX_LABELS[card.box] : "jamais posée"}
                </span>
              </div>

              <div className="flex items-center gap-1.5 mt-1.5" aria-hidden>
                {Array.from({ length: BOX_COUNT }, (_, i) => (
                  <span
                    key={i}
                    className="h-1.5 flex-1 rounded-full"
                    style={{ background: card && i <= card.box ? "var(--das)" : "var(--line)" }}
                  />
                ))}
              </div>

              {card && (
                <p className="font-ui text-[11.5px] text-muted mt-1">
                  {card.correct}/{card.seen} correct{card.correct > 1 ? "s" : ""}
                  {rate !== null && card.seen > 0 ? ` (${rate}%)` : ""} · prochaine révision le{" "}
                  {DATE_FORMAT.format(new Date(card.due))}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
