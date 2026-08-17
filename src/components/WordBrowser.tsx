"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import WORDS from "@/data";
import categories from "@/data/categories";
import { isNoun } from "@/lib/types";
import { useSrs } from "@/lib/srsStore";
import { wordState, type WordStatus } from "@/lib/srs";
import { matchesSearch, searchKeys } from "@/lib/text";

type Filter = "all" | "learning" | "unseen" | "acquired";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "Tous" },
  { key: "unseen", label: "Jamais vus" },
  { key: "learning", label: "En cours" },
  { key: "acquired", label: "Acquis" },
];

/** Pastille de progression : la couleur suit l'état du mot, pas une facette isolée. */
const STATUS_COLOR: Record<WordStatus, string | null> = {
  untouched: null,
  learning: "var(--gold)",
  known: "var(--der)",
  mastered: "var(--das)",
};

const STATUS_LABEL: Record<WordStatus, string> = {
  untouched: "jamais vu",
  learning: "en cours",
  known: "acquis",
  mastered: "maîtrisé",
};

export default function WordBrowser() {
  const searchParams = useSearchParams();
  const catParam = searchParams.get("cat");
  const srs = useSrs();

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(
    catParam && categories.some((c) => c.key === catParam) ? catParam : "all"
  );
  const [status, setStatus] = useState<Filter>("all");

  const filtered = useMemo(() => {
    const trimmed = query.trim();
    // « grosshandel » doit trouver *Großhandel*, « prufung » trouver *Prüfung* :
    // un clavier français n'a ni ß ni tréma.
    const keys = trimmed ? searchKeys(trimmed) : null;

    return WORDS.filter((w) => {
      if (activeCategory !== "all" && w.category !== activeCategory) return false;

      if (status !== "all") {
        const state = wordState(srs, w).status;
        if (status === "unseen" && state !== "untouched") return false;
        if (status === "learning" && state !== "learning") return false;
        // « Acquis » couvre le palier acquis et le palier maîtrisé.
        if (status === "acquired" && state !== "mastered" && state !== "known") return false;
      }

      if (!keys) return true;
      return matchesSearch(w.de, keys) || matchesSearch(w.fr, keys);
    });
  }, [query, activeCategory, status, srs]);

  return (
    <div>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Chercher un mot (allemand ou français)…"
        aria-label="Chercher un mot"
        className="w-full font-ui text-base px-4 py-3 rounded-lg border border-line bg-paper-2 outline-none focus:border-ink transition-colors"
      />

      <div
        className="flex gap-1.5 font-ui mt-3 overflow-x-auto -mx-4 px-4 pb-1 no-scrollbar"
        role="group"
        aria-label="Filtrer par état de mémorisation"
      >
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setStatus(f.key)}
            aria-pressed={status === f.key}
            className={`shrink-0 whitespace-nowrap text-[11.5px] px-3 py-2 rounded-full border transition ${
              status === f.key ? "bg-ink text-paper border-ink" : "border-line text-muted hover:border-ink"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div
        className="flex gap-1.5 font-ui mt-2 overflow-x-auto -mx-4 px-4 pb-1 no-scrollbar"
        role="group"
        aria-label="Filtrer par thème"
      >
        <button
          onClick={() => setActiveCategory("all")}
          aria-pressed={activeCategory === "all"}
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
            aria-pressed={activeCategory === c.key}
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

      <div className="font-ui text-[12px] text-muted mt-4 mb-2" role="status">
        {filtered.length} entrées
      </div>

      <ul className="divide-y divide-line border-t border-b border-line">
        {filtered.map((w) => {
          const state = wordState(srs, w);
          const color = STATUS_COLOR[state.status];
          return (
            <li key={w.id}>
              {/* Le mot et son sens sur deux lignes : la traduction n'est jamais coupée. */}
              <Link
                href={`/mots/${w.id}`}
                // Une liste de plus de mille entrées : sans cela, le navigateur
                // préchargerait la fiche de chaque mot qui passe à l'écran.
                prefetch={false}
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
                {color && (
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0 mt-2"
                    style={{ background: color }}
                    title={`${STATUS_LABEL[state.status]} — ${state.seenKinds}/${state.totalKinds} questions travaillées`}
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
