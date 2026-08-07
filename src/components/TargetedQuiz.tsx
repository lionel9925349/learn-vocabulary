"use client";

import { useMemo, useState } from "react";
import type { Word } from "@/lib/types";
import { buildQuestion, availableKinds, type Question, type QuestionKind } from "@/lib/quiz";
import { recordAnswer } from "@/lib/srsStore";
import { categories } from "@/data";
import QuizCard from "./QuizCard";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Exercice ciblé sur un seul type de question (articles, déclinaisons…).
 * Les réponses alimentent la même répétition espacée que la session principale.
 */
export default function TargetedQuiz({ pool, kind }: { pool: Word[]; kind: QuestionKind }) {
  const [category, setCategory] = useState("all");

  const eligible = useMemo(() => {
    const byKind = pool.filter((w) => availableKinds(w).includes(kind));
    return category === "all" ? byKind : byKind.filter((w) => w.category === category);
  }, [pool, kind, category]);

  const [question, setQuestion] = useState<Question | null>(() =>
    eligible.length ? buildQuestion(eligible[Math.floor(Math.random() * eligible.length)], pool, kind) : null
  );
  const [selected, setSelected] = useState<string | null>(null);
  const [asked, setAsked] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);
  const [queue, setQueue] = useState<Word[]>([]);

  function pickNext(list: Word[], pending: Word[]): { q: Question | null; rest: Word[] } {
    // Les mots ratés reviennent quelques questions plus loin.
    if (pending.length > 0 && Math.random() < 0.35) {
      const [head, ...rest] = pending;
      return { q: buildQuestion(head, pool, kind), rest };
    }
    if (list.length === 0) return { q: null, rest: pending };
    return { q: buildQuestion(list[Math.floor(Math.random() * list.length)], pool, kind), rest: pending };
  }

  function changeCategory(key: string) {
    setCategory(key);
    const byKind = pool.filter((w) => availableKinds(w).includes(kind));
    const next = key === "all" ? byKind : byKind.filter((w) => w.category === key);
    setQuestion(next.length ? buildQuestion(next[Math.floor(Math.random() * next.length)], pool, kind) : null);
    setSelected(null);
    setQueue([]);
  }

  function answer(choice: string) {
    if (!question || selected !== null) return;
    setSelected(choice);
    const isRight = choice === question.correct;
    recordAnswer(question.word.id, isRight);
    setAsked((n) => n + 1);
    if (isRight) {
      setCorrect((n) => n + 1);
      setStreak((s) => {
        const n = s + 1;
        setBest((b) => Math.max(b, n));
        return n;
      });
    } else {
      setStreak(0);
      setQueue((q) => shuffle([...q, question.word]));
    }
  }

  function next() {
    const { q, rest } = pickNext(eligible, queue);
    setQuestion(q);
    setQueue(rest);
    setSelected(null);
  }

  return (
    <div>
      <div className="flex gap-1.5 font-ui overflow-x-auto -mx-4 px-4 pb-1 no-scrollbar">
        <button
          onClick={() => changeCategory("all")}
          className={`shrink-0 whitespace-nowrap text-[11.5px] px-3 py-2 rounded-full border transition ${
            category === "all" ? "bg-ink text-paper border-ink" : "border-line text-muted hover:border-ink"
          }`}
        >
          Tous
        </button>
        {categories.map((c) => (
          <button
            key={c.key}
            onClick={() => changeCategory(c.key)}
            className={`shrink-0 whitespace-nowrap text-[11.5px] px-3 py-2 rounded-full border transition ${
              category === c.key ? "bg-ink text-paper border-ink" : "border-line text-muted hover:border-ink"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-baseline font-ui text-xs text-muted mt-5 mb-4 tracking-wide">
        <span>
          {asked > 0 ? `${correct} / ${asked} corrects` : `${eligible.length} mots dans ce lot`}
        </span>
        <span>
          Série : <b className="text-gold">{streak}</b>
          {best > 0 && ` · record ${best}`}
        </span>
      </div>

      {question ? (
        <QuizCard question={question} selected={selected} onAnswer={answer} onNext={next} />
      ) : (
        <p className="text-muted text-center py-10 text-[14.5px]">
          Aucun mot ne convient à cet exercice dans ce thème.
        </p>
      )}
    </div>
  );
}
