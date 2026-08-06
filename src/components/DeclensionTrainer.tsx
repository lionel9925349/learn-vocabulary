"use client";

import { useMemo, useState } from "react";
import type { Word } from "@/lib/types";
import { categories } from "@/data";
import DeclensionQuizSession from "./DeclensionQuizSession";

export default function DeclensionTrainer({ words }: { words: Word[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const pool = useMemo(
    () => (activeCategory === "all" ? words : words.filter((w) => w.category === activeCategory)),
    [activeCategory, words]
  );

  return (
    <div>
      <div className="flex gap-1.5 font-ui overflow-x-auto -mx-4 px-4 pb-1 no-scrollbar">
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

      <DeclensionQuizSession key={activeCategory} pool={pool} storageKey={activeCategory} />
    </div>
  );
}
