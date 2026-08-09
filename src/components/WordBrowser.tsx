"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Word } from "@/lib/types";
import { isNoun } from "@/lib/types";
import { useSrs } from "@/lib/srsStore";
import { categories } from "@/data";

type Filter = "all" | "learning" | "unseen" | "mastered";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "Tous" },
  { key: "unseen", label: "Jamais vus" },
  { key: "learning", label: "En cours" },
  { key: "mastered", label: "Maîtrisés" },
];

export default function WordBrowser({ words }: { words: Word[] }) {
  const searchParams = useSearchParams();
  const catParam = searchParams.get("cat");
  const srs = useSrs();

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(
    catParam && categories.some((c) => c.key === catParam) ? catParam : "all"
  );
  const [status, setStatus] = useState<Filter>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return words.filter((w) => {
      if (activeCategory !== "all" && w.category !== activeCategory) return false;

      if (status !== "all") {
        const card = srs.cards[w.id];
        if (status === "unseen" && card) return false;
        if (status === "learning" && (!card || card.box >= 3)) return false;
        if (status === "mastered" && (!card || card.box < 3)) return false;
      }

      if (!q) return true;
      return w.de.toLowerCase().includes(q) || w.fr.toLowerCase().includes(q);
    });
  }, [words, query, activeCategory, status, srs]);

  return (
    <div>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Chercher un mot (allemand ou français)…"
        className="w-full font-ui text-base px-4 py-3 rounded-lg border border-line bg-paper-2 outline-none focus:border-ink transition-colors"
      />

      <div className="flex gap-1.5 font-ui mt-3 overflow-x-auto -mx-4 px-4 pb-1 no-scrollbar">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setStatus(f.key)}
            className={`shrink-0 whitespace-nowrap text-[11.5px] px-3 py-2 rounded-full border transition ${
              status === f.key ? "bg-ink text-paper border-ink" : "border-line text-muted hover:border-ink"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="flex gap-1.5 font-ui mt-2 overflow-x-auto -mx-4 px-4 pb-1 no-scrollbar">
        <button
          onClick={() => setActiveCategory("all")}
          className={`shrink-0 whitespace-nowrap text-[11.5px] px-3 py-2 rounded-full border transition ${
            activeCategory === "all"
              ? "bg-ink text-paper border-ink"
              : "border-line text-muted hover:border-ink"
          }`}
        >
          Tous thèmes
        </button>
        {categories.map((c) => (
          <button
            key={c.key}
            onClick={() => setActiveCategory(c.key)}
            className={`shrink-0 whitespace-nowrap text-[11.5px] px-3 py-2 rounded-full border transition ${
              activeCategory === c.key
                ? "bg-ink text-paper border-ink"
                : "border-line text-muted hover:border-ink"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="font-ui text-[12px] text-muted mt-4 mb-2">{filtered.length} entrées</div>

      <ul className="divide-y divide-line border-t border-b border-line">
        {filtered.map((w) => {
          const card = srs.cards[w.id];
          return (
            <li key={w.id}>
              {/* Le mot et son sens sur deux lignes : la traduction n'est jamais coupée. */}
              <Link
                href={`/mots/${w.id}`}
                className="flex items-start gap-2 py-3 px-1 hover:bg-paper-2 transition-colors"
              >
                {isNoun(w) && w.artikel ? (
                  <span
                    className="font-semibold w-10 shrink-0 text-[15px]"
                    style={{ color: `var(--${w.artikel})` }}
                  >
                    {w.artikel}
                  </span>
                ) : (
                  <span className="font-ui text-[10px] uppercase text-muted w-10 shrink-0 pt-1">
                    {w.kind === "verb" ? "verbe" : w.kind === "phrase" ? "expr." : "adj."}
                  </span>
                )}
                <span className="min-w-0 flex-1">
                  <span lang="de" className="block german">{w.de}</span>
                  <span className="block text-muted text-[13.5px] italic mt-0.5">{w.fr}</span>
                </span>
                {card && (
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0 mt-2"
                    style={{
                      background:
                        card.box >= 5 ? "var(--das)" : card.box >= 3 ? "var(--der)" : "var(--gold)",
                    }}
                    title={`Palier ${card.box}`}
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>

      {filtered.length === 0 && (
        <p className="text-muted text-center py-10 text-[14.5px]">Aucun mot ne correspond.</p>
      )}
    </div>
  );
}
