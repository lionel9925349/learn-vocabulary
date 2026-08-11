"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Word } from "@/lib/types";
import { buildQuestion, availableKinds, evaluate, type Question, type QuestionKind } from "@/lib/quiz";
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
 * Exercice ciblé sur un type de question (articles, déclinaisons…) ou sur un
 * petit groupe de types — le vocabulaire alterne ainsi allemand → français et
 * français → allemand sans qu'on ait à choisir.
 *
 * Les réponses alimentent la même répétition espacée que la session principale.
 */
export default function TargetedQuiz({
  pool,
  kind,
}: {
  pool: Word[];
  kind: QuestionKind | QuestionKind[];
}) {
  const [category, setCategory] = useState("all");

  const kinds = useMemo(() => (Array.isArray(kind) ? kind : [kind]), [kind]);

  /** Le mot ne se prête pas forcément à tous les types demandés : on tire parmi les siens. */
  const ask = useCallback(
    (word: Word): Question => {
      const usable = kinds.filter((k) => availableKinds(word).includes(k));
      return buildQuestion(word, pool, usable[Math.floor(Math.random() * usable.length)]);
    },
    [kinds, pool]
  );

  const eligible = useMemo(() => {
    const byKind = pool.filter((w) => kinds.some((k) => availableKinds(w).includes(k)));
    return category === "all" ? byKind : byKind.filter((w) => w.category === category);
  }, [pool, kinds, category]);

  // La première question est tirée après le montage, pas au rendu : l'appli est
  // exportée en statique, et un tirage au sort pendant le rendu serveur donnerait
  // un autre mot que celui tiré par le navigateur — React refuserait l'hydratation.
  const [question, setQuestion] = useState<Question | null>(null);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    if (started || eligible.length === 0) return;
    // Le tirage doit avoir lieu après l'hydratation, et une seule fois : c'est
    // le cas où l'état ne peut pas être calculé pendant le rendu.
    /* eslint-disable-next-line react-hooks/set-state-in-effect */
    setStarted(true);
    setQuestion(ask(eligible[Math.floor(Math.random() * eligible.length)]));
  }, [started, eligible, ask]);

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
      return { q: ask(head), rest };
    }
    if (list.length === 0) return { q: null, rest: pending };
    return { q: ask(list[Math.floor(Math.random() * list.length)]), rest: pending };
  }

  function changeCategory(key: string) {
    setCategory(key);
    const byKind = pool.filter((w) => kinds.some((k) => availableKinds(w).includes(k)));
    const next = key === "all" ? byKind : byKind.filter((w) => w.category === key);
    setQuestion(next.length ? ask(next[Math.floor(Math.random() * next.length)]) : null);
    setSelected(null);
    setQueue([]);
  }

  function answer(choice: string) {
    if (!question || selected !== null) return;
    setSelected(choice);
    const { correct: isRight } = evaluate(question, choice);
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
      ) : eligible.length === 0 ? (
        <p className="text-muted text-center py-10 text-[14.5px]">
          Aucun mot ne convient à cet exercice dans ce thème.
        </p>
      ) : (
        // Le temps du premier rendu, avant le tirage : la place est réservée
        // pour que la carte n'arrive pas en faisant sauter la page.
        <div aria-hidden className="rounded-lg border border-line bg-paper-2 h-[22rem]" />
      )}
    </div>
  );
}
