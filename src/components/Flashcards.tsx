"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import WORDS from "@/data";
import categories from "@/data/categories";
import { displayForm, isNoun } from "@/lib/types";
import { ruleFor } from "@/lib/genderRules";
import { recordAnswer } from "@/lib/srsStore";
import { availableKinds } from "@/lib/units";
import { shuffle } from "@/lib/shuffle";
import AudioButton from "./AudioButton";
import Markup from "./Markup";

/**
 * Révision passive : on voit le mot, on essaie de se rappeler, on retourne la
 * carte. Deux boutons suffisent — « su » / « pas su » alimentent la répétition
 * espacée comme un quiz normal.
 */
export default function Flashcards() {
  const [category, setCategory] = useState("all");
  const [direction, setDirection] = useState<"de-fr" | "fr-de">("de-fr");
  const [flipped, setFlipped] = useState(false);
  const [index, setIndex] = useState(0);
  const [reviewed, setReviewed] = useState(0);

  const deck = useMemo(() => {
    const filtered = category === "all" ? WORDS : WORDS.filter((w) => w.category === category);
    return shuffle(filtered);
    // Un nouveau paquet à chaque changement de thème.
  }, [category]);

  const word = deck[index % Math.max(1, deck.length)];

  /**
   * La carte teste exactement le sens dans le sens affiché : « je savais » sur
   * une carte DE→FR ne dit rien du pluriel ni de la déclinaison. On crédite donc
   * la facette correspondante, et elle seule — c'est ce qui empêche d'atteindre
   * « maîtrisé » à coups de cartes retournées.
   */
  function grade(known: boolean) {
    if (!word) return;
    // Repli sur "de-fr" : une expression n'a pas toujours les deux facettes.
    const kinds = availableKinds(word);
    const kind = kinds.includes(direction) ? direction : kinds[0];
    recordAnswer(word.id, kind, known);
    setReviewed((r) => r + 1);
    setFlipped(false);
    setIndex((i) => i + 1);
  }

  if (!word) return <p className="text-muted text-center py-10">Aucun mot dans ce thème.</p>;

  const front = direction === "de-fr" ? displayForm(word) : word.fr;
  const back = direction === "de-fr" ? word.fr : displayForm(word);

  return (
    <div>
      <div className="flex gap-1.5 font-ui overflow-x-auto -mx-4 px-4 pb-1 no-scrollbar">
        <button
          onClick={() => {
            setCategory("all");
            setIndex(0);
            setFlipped(false);
          }}
          className={`shrink-0 whitespace-nowrap text-[11.5px] px-3 py-2 rounded-full border transition ${
            category === "all" ? "bg-ink text-paper border-ink" : "border-line text-muted"
          }`}
        >
          Tous
        </button>
        {categories.map((c) => (
          <button
            key={c.key}
            onClick={() => {
              setCategory(c.key);
              setIndex(0);
              setFlipped(false);
            }}
            className={`shrink-0 whitespace-nowrap text-[11.5px] px-3 py-2 rounded-full border transition ${
              category === c.key ? "bg-ink text-paper border-ink" : "border-line text-muted"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between font-ui text-[11.5px] text-muted mt-4 mb-2">
        <span>{reviewed} carte{reviewed > 1 ? "s" : ""} vue{reviewed > 1 ? "s" : ""}</span>
        <button
          onClick={() => {
            setDirection((d) => (d === "de-fr" ? "fr-de" : "de-fr"));
            setFlipped(false);
          }}
          className="px-3 py-1.5 rounded-full border border-line hover:border-ink hover:text-ink transition"
        >
          {direction === "de-fr" ? "DE → FR" : "FR → DE"} ⇄
        </button>
      </div>

      <button
        onClick={() => setFlipped((f) => !f)}
        aria-expanded={flipped}
        className="w-full text-left bg-paper-2 border border-line rounded-lg px-5 py-10 min-h-[240px] flex flex-col items-center justify-center motion-safe:active:scale-[0.995] transition"
      >
        {!flipped ? (
          <>
            <div lang="de" className="text-center font-semibold german word-display">{front}</div>
            <div className="font-ui text-[11px] uppercase tracking-[0.14em] text-muted mt-6">
              Toucher pour retourner
            </div>
          </>
        ) : (
          <div className="w-full">
            <div lang="de" className="text-center font-semibold german word-display">
              {isNoun(word) && word.artikel && direction === "fr-de" ? (
                <>
                  <span style={{ color: `var(--${word.artikel})` }}>{word.artikel}</span> {word.de}
                </>
              ) : (
                back
              )}
            </div>
            {word.plural && (
              <div className="text-center text-[13px] text-muted mt-1.5">
                Pluriel : die {word.plural}
              </div>
            )}
            {word.perfekt && (
              <div className="text-center text-[13px] text-muted mt-1.5">
                Parfait : {word.perfekt}
              </div>
            )}
            {word.governs && (
              <div className="text-center text-[13px] text-muted mt-1">{word.governs}</div>
            )}
            {isNoun(word) && (
              <Markup
                text={ruleFor(word)}
                className="mt-5 text-[13.5px] leading-relaxed bg-paper border-l-[3px] border-gold rounded px-3.5 py-2.5"
              />
            )}
            {word.example && (
              <div className="mt-3 text-[13.5px] text-muted text-center">
                <div className="italic">{word.example.de}</div>
                <div className="text-[12.5px] mt-0.5">{word.example.fr}</div>
              </div>
            )}
          </div>
        )}
      </button>

      <div className="flex items-center justify-center gap-2 mt-3">
        <AudioButton text={displayForm(word)} label="Prononcer" />
        <Link
          href={`/mots/${word.id}`}
          prefetch={false}
          className="font-ui text-[12px] px-3 py-2 rounded-full border border-line text-muted hover:border-ink hover:text-ink transition"
        >
          Fiche →
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-2.5 mt-4">
        <button
          onClick={() => grade(false)}
          className="font-ui text-[13px] font-semibold uppercase tracking-[0.06em] py-4 rounded-lg border-[1.5px] motion-safe:active:scale-[0.98] transition"
          style={{ background: "var(--die)", borderColor: "var(--die)", color: "var(--on-accent)" }}
        >
          À revoir
        </button>
        <button
          onClick={() => grade(true)}
          className="font-ui text-[13px] font-semibold uppercase tracking-[0.06em] py-4 rounded-lg border-[1.5px] motion-safe:active:scale-[0.98] transition"
          style={{ background: "var(--das)", borderColor: "var(--das)", color: "var(--on-accent)" }}
        >
          Je savais
        </button>
      </div>
      <p className="font-ui text-[11px] text-muted text-center mt-3">
        Ces réponses alimentent la répétition espacée, comme un quiz.
      </p>
    </div>
  );
}
