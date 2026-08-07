"use client";

import { BOX_COUNT, BOX_LABELS } from "@/lib/srs";
import { useSrs } from "@/lib/srsStore";

const DATE_FORMAT = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long" });

/** État de mémorisation d'un mot précis, sur sa fiche. */
export default function WordProgress({ wordId }: { wordId: string }) {
  const srs = useSrs();
  const card = srs.cards[wordId];

  if (!card) {
    return (
      <p className="font-ui text-[12px] text-muted mt-6 border-t border-line pt-4">
        Mot pas encore rencontré en révision.
      </p>
    );
  }

  const rate = card.seen ? Math.round((card.correct / card.seen) * 100) : 0;

  return (
    <div className="mt-6 border-t border-line pt-4">
      <div className="flex items-center gap-1.5 mb-2">
        {Array.from({ length: BOX_COUNT }, (_, i) => (
          <span
            key={i}
            className="h-1.5 flex-1 rounded-full"
            style={{ background: i <= card.box ? "var(--das)" : "var(--line)" }}
          />
        ))}
      </div>
      <p className="font-ui text-[12px] text-muted">
        Palier <b className="text-ink">{BOX_LABELS[card.box]}</b> · {card.correct}/{card.seen}{" "}
        correct{card.correct > 1 ? "s" : ""} ({rate}%) · prochaine révision le{" "}
        {DATE_FORMAT.format(new Date(card.due))}
      </p>
    </div>
  );
}
