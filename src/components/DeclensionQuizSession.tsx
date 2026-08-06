"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Word } from "@/lib/types";
import { CASE_INFO, type CaseName } from "@/lib/declension";
import { buildRound, type Round } from "@/lib/declensionQuiz";
import { getBestStreak, setBestStreak } from "@/lib/storage";

const SENTENCE: Record<CaseName, { verb: (art: string, noun: string) => string; hint: string }> = {
  Nominativ: {
    verb: (art, noun) => `${cap(art)} ${noun} ist gerade sehr gefragt.`,
    hint: "sujet de la phrase — répond à « qui / quoi ? »",
  },
  Akkusativ: {
    verb: (art, noun) => `Wir brauchen ${art} ${noun} dringend.`,
    hint: "complément d'objet direct — répond à « qui / quoi ? » après le verbe",
  },
  Dativ: {
    verb: (art, noun) => `Das Problem liegt bei ${art} ${noun}.`,
    hint: "complément d'objet indirect — ici introduit par la préposition « bei » (+ Dativ)",
  },
  Genitiv: {
    verb: (art, noun) => `Wegen ${art} ${noun} gibt es eine Verzögerung.`,
    hint: "complément du nom / cause — ici introduit par « wegen » (+ Genitiv)",
  },
};

function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const STORAGE_KEY = "declension";

export default function DeclensionQuizSession({ pool, storageKey }: { pool: Word[]; storageKey: string }) {
  const [round, setRound] = useState<Round | null>(() => buildRound(pool));
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [total, setTotal] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBest] = useState(() => getBestStreak(STORAGE_KEY + ":" + storageKey));

  function nextRound() {
    setRound(buildRound(pool));
    setSelected(null);
    setAnswered(false);
  }

  function choose(value: string) {
    if (!round || answered) return;
    setAnswered(true);
    setSelected(value);
    setTotal((t) => t + 1);
    if (value === round.correct) {
      setCorrectCount((c) => c + 1);
      setStreak((s) => {
        const n = s + 1;
        if (n > bestStreak) {
          setBest(n);
          setBestStreak(STORAGE_KEY + ":" + storageKey, n);
        }
        return n;
      });
    } else {
      setStreak(0);
    }
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (answered && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        nextRound();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (!round) return null;

  const info = SENTENCE[round.caseName];
  const sentence = info.verb(answered ? round.correct : "＿＿＿", round.noun);

  return (
    <div>
      <div className="flex justify-between items-baseline font-ui text-xs text-muted mt-5 mb-1.5 tracking-wide">
        <span>
          {round.word.artikel} {round.word.de}
          {round.plural ? " · pluriel" : " · singulier"}
        </span>
        <span>
          Série : <b className="text-gold">{streak}</b> · Meilleure : {bestStreak}
        </span>
      </div>

      <div className="bg-paper-2 border border-line rounded-sm px-6 py-8">
        <div className="font-ui text-[10.5px] tracking-[0.18em] uppercase text-muted text-center mb-1">
          Quel cas ? — {round.caseName}
        </div>
        <div className="font-ui text-[12.5px] text-muted text-center mb-5">
          {CASE_INFO[round.caseName].question} · {info.hint}
        </div>

        <div className="text-center text-[22px] leading-relaxed">{sentence}</div>
        <div className="text-center text-[13px] text-muted mt-2">
          {round.type === "definite" ? "Article défini" : round.plural ? "Article « kein »" : "Article indéfini « ein »"}
          {" — "}
          {round.word.artikel} {round.word.de} ({round.word.fr})
          {round.word.plural ? ` (Pl. ${round.word.plural})` : ""}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-6 font-ui">
          {round.choices.map((choice) => {
            const isCorrect = choice === round.correct;
            const isSelected = choice === selected;
            return (
              <button
                key={choice}
                disabled={answered}
                onClick={() => choose(choice)}
                className="text-[16px] font-semibold py-3 rounded border-[1.5px] transition-transform active:translate-y-px disabled:cursor-default"
                style={{
                  borderColor: answered && isCorrect ? "var(--das)" : "var(--line)",
                  background: answered ? (isCorrect ? "var(--das)" : isSelected ? "var(--die)" : "transparent") : "transparent",
                  color: answered && (isCorrect || isSelected) ? "#fff" : undefined,
                  opacity: answered && !isCorrect && !isSelected ? 0.4 : 1,
                }}
              >
                {choice}
              </button>
            );
          })}
        </div>

        {answered && (
          <div className="mt-5 border-t border-line pt-4 text-[14.5px]">
            <div
              className="font-semibold mb-2"
              style={{ color: selected === round.correct ? "var(--das)" : "var(--die)" }}
            >
              {selected === round.correct ? "Richtig — " : "Non — c'est "}
              {round.correct}
            </div>
            <p className="text-muted">
              Au <b className="text-ink">{round.caseName}</b> ({CASE_INFO[round.caseName].fr}),{" "}
              {round.plural ? "au pluriel" : `pour un mot ${round.word.artikel}`}, l&rsquo;article{" "}
              {round.type === "definite" ? "défini" : round.plural ? "« kein »" : "indéfini « ein »"} devient «{" "}
              <b className="text-ink">{round.correct}</b> ».
            </p>
            <Link
              href={`/mots/${round.word.id}`}
              className="inline-block mt-3 text-[13px] underline decoration-line hover:decoration-ink"
            >
              Voir la fiche de déclinaison complète de « {round.word.de} » →
            </Link>
          </div>
        )}

        {answered && (
          <button
            onClick={nextRound}
            className="font-ui w-full mt-5 text-[13px] font-semibold tracking-[0.06em] uppercase py-3.5 bg-ink text-paper rounded cursor-pointer active:translate-y-px"
          >
            Phrase suivante →
          </button>
        )}
      </div>

      <p className="font-ui text-[11px] text-muted text-center mt-4">
        {total > 0 && (
          <>
            {correctCount}/{total} corrects sur cette session ·{" "}
          </>
        )}
        Entrée/Espace pour continuer.
      </p>
    </div>
  );
}
