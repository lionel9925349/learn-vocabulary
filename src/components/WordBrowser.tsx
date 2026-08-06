"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Word } from "@/lib/types";
import { categories } from "@/data";

export default function WordBrowser({ words }: { words: Word[] }) {
  const searchParams = useSearchParams();
  const catParam = searchParams.get("cat");
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(
    catParam && categories.some((c) => c.key === catParam) ? catParam : "all"
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return words.filter((w) => {
      if (activeCategory !== "all" && w.category !== activeCategory) return false;
      if (!q) return true;
      return w.de.toLowerCase().includes(q) || w.fr.toLowerCase().includes(q);
    });
  }, [words, query, activeCategory]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Chercher un mot (allemand ou français)…"
        className="w-full font-ui text-base px-4 py-3 rounded border border-line bg-paper-2 outline-none focus:border-ink transition-colors"
      />

      <div className="flex gap-1.5 font-ui mt-4 overflow-x-auto -mx-4 px-4 pb-1 no-scrollbar">
        <button
          onClick={() => setActiveCategory("all")}
          className={`shrink-0 whitespace-nowrap text-[11.5px] tracking-wide px-3 py-2 rounded-full border transition-colors ${
            activeCategory === "all" ? "bg-ink text-paper border-ink" : "border-line text-muted hover:border-ink"
          }`}
        >
          Tous
        </button>
        {categories.map((c) => (
          <button
            key={c.key}
            onClick={() => setActiveCategory(c.key)}
            className={`shrink-0 whitespace-nowrap text-[11.5px] tracking-wide px-3 py-2 rounded-full border transition-colors ${
              activeCategory === c.key ? "bg-ink text-paper border-ink" : "border-line text-muted hover:border-ink"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="font-ui text-[12px] text-muted mt-4 mb-2">{filtered.length} mots</div>

      <ul className="divide-y divide-line border-t border-b border-line">
        {filtered.map((w) => (
          <li key={w.id}>
            <Link
              href={`/mots/${w.id}`}
              className="flex items-center justify-between gap-3 py-3 px-1 hover:bg-paper-2 transition-colors"
            >
              <span className="flex items-baseline gap-2 min-w-0">
                <span className="font-semibold w-11 shrink-0" style={{ color: `var(--${w.artikel})` }}>
                  {w.artikel}
                </span>
                <span className="truncate">{w.de}</span>
              </span>
              <span className="text-muted text-[13.5px] italic truncate max-w-[40%] text-right">{w.fr}</span>
            </Link>
          </li>
        ))}
      </ul>

      {filtered.length === 0 && (
        <p className="text-muted text-center py-10 text-[14.5px]">Aucun mot ne correspond.</p>
      )}
    </div>
  );
}
