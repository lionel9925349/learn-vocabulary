"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import WORDS from "@/data";
import categories from "@/data/categories";
import { buildQuestion, evaluate, type Question } from "@/lib/quiz";
import { availableKinds, cardKey, type QuestionKind, type Unit } from "@/lib/units";
import { recordAnswer, useSrs } from "@/lib/srsStore";
import { pick, shuffle } from "@/lib/shuffle";
import QuizCard from "./QuizCard";

/**
 * Exercice ciblé sur un type de question (articles, déclinaisons…) ou sur un
 * petit groupe de types — le vocabulaire alterne ainsi allemand → français et
 * français → allemand sans qu'on ait à choisir.
 *
 * Les réponses alimentent la même répétition espacée que la session principale,
 * et le tirage suit la même priorité : ce qui est dû, puis ce qui n'a jamais
 * été posé, puis le reste.
 */
export default function TargetedQuiz({
  kind,
}: {
  kind: QuestionKind | QuestionKind[];
}) {
  const srs = useSrs();
  const [category, setCategory] = useState("all");

  const kinds = useMemo(() => (Array.isArray(kind) ? kind : [kind]), [kind]);

  const eligible = useMemo(() => {
    const byKind = WORDS.filter((w) => {
      const own = availableKinds(w);
      return kinds.some((k) => own.includes(k));
    });
    return category === "all" ? byKind : byKind.filter((w) => w.category === category);
  }, [kinds, category]);

  /**
   * Tirage prioritaire : ce qui est arrivé à échéance, sinon ce qui n'a jamais
   * été posé, sinon n'importe quoi. C'est la même règle que la session de
   * révision, appliquée au sous-ensemble de types demandé par l'exercice.
   */
  const nextUnit = useCallback(
    (list: typeof WORDS): Unit | null => {
      const now = Date.now();
      const due: Unit[] = [];
      const fresh: Unit[] = [];
      const rest: Unit[] = [];

      for (const word of list) {
        const own = availableKinds(word);
        for (const k of kinds) {
          if (!own.includes(k)) continue;
          const card = srs.cards[cardKey(word.id, k)];
          if (!card) fresh.push({ word, kind: k });
          else if (card.due <= now) due.push({ word, kind: k });
          else rest.push({ word, kind: k });
        }
      }

      const bucket = due.length ? due : fresh.length ? fresh : rest;
      return bucket.length ? pick(bucket) : null;
    },
    [kinds, srs]
  );

  const ask = useCallback(
    (unit: Unit): Question => buildQuestion(unit.word, WORDS, unit.kind),
    []
  );

  // La première question est tirée après le montage, pas au rendu : l'appli est
  // exportée en statique, et un tirage au sort pendant le rendu serveur donnerait
  // un autre mot que celui tiré par le navigateur — React refuserait l'hydratation.
  const [current, setCurrent] = useState<{ unit: Unit; question: Question } | null>(null);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    if (started || eligible.length === 0) return;
    // Le tirage doit avoir lieu après l'hydratation, et une seule fois : c'est
    // le cas où l'état ne peut pas être calculé pendant le rendu.
    /* eslint-disable-next-line react-hooks/set-state-in-effect */
    setStarted(true);
    const unit = nextUnit(eligible);
    if (unit) setCurrent({ unit, question: ask(unit) });
  }, [started, eligible, nextUnit, ask]);

  const [selected, setSelected] = useState<string | null>(null);
  const [asked, setAsked] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);
  const [queue, setQueue] = useState<Unit[]>([]);

  function changeCategory(key: string) {
    setCategory(key);
    const byKind = WORDS.filter((w) => {
      const own = availableKinds(w);
      return kinds.some((k) => own.includes(k));
    });
    const next = key === "all" ? byKind : byKind.filter((w) => w.category === key);
    const unit = nextUnit(next);
    setCurrent(unit ? { unit, question: ask(unit) } : null);
    setSelected(null);
    setQueue([]);
  }

  function answer(choice: string) {
    if (!current || selected !== null) return;
    setSelected(choice);
    const { correct: isRight } = evaluate(current.question, choice);
    recordAnswer(current.unit.word.id, current.unit.kind, isRight);
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
      setQueue((q) => shuffle([...q, current.unit]));
    }
  }

  function next() {
    // Ce qui a été raté revient quelques questions plus loin.
    if (queue.length > 0 && Math.random() < 0.35) {
      const [head, ...rest] = queue;
      setCurrent({ unit: head, question: ask(head) });
      setQueue(rest);
    } else {
      const unit = nextUnit(eligible);
      setCurrent(unit ? { unit, question: ask(unit) } : null);
    }
    setSelected(null);
  }

  return (
    <div>
      <div className="flex gap-1.5 font-ui overflow-x-auto -mx-4 px-4 pb-1 no-scrollbar" role="group" aria-label="Filtrer par thème">
        <button
          onClick={() => changeCategory("all")}
          aria-pressed={category === "all"}
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
            aria-pressed={category === c.key}
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

      {current ? (
        <QuizCard question={current.question} selected={selected} onAnswer={answer} onNext={next} />
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
