"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Word } from "@/lib/types";
import { displayForm, isNoun } from "@/lib/types";
import { buildSession, computeStats } from "@/lib/srs";
import { useSrs, recordAnswer } from "@/lib/srsStore";
import { buildQuestion, type Question } from "@/lib/quiz";
import { ruleFor } from "@/lib/genderRules";
import QuizCard from "./QuizCard";
import AudioButton from "./AudioButton";
import Markup from "./Markup";

/** Un mot jamais vu est d'abord présenté, puis testé dans la foulée. */
type Step = { type: "intro"; word: Word } | { type: "quiz"; question: Question };

type Phase = "idle" | "running" | "done";

const SIZES = [10, 20, 40];

export default function ReviewSession({ pool }: { pool: Word[] }) {
  const srs = useSrs();
  const [phase, setPhase] = useState<Phase>("idle");
  const [size, setSize] = useState(20);
  const [steps, setSteps] = useState<Step[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [results, setResults] = useState<{ word: Word; correct: boolean }[]>([]);

  const stats = useMemo(() => computeStats(srs, pool), [srs, pool]);

  function start() {
    const plan = buildSession(srs, pool, size);
    if (plan.words.length === 0) return;

    const built: Step[] = [];
    for (const word of plan.words) {
      // Premier contact : on montre le mot avant d'interroger dessus.
      if (!srs.cards[word.id]) built.push({ type: "intro", word });
      built.push({ type: "quiz", question: buildQuestion(word, pool) });
    }

    setSteps(built);
    setIndex(0);
    setSelected(null);
    setResults([]);
    setPhase("running");
  }

  function answer(choice: string) {
    const step = steps[index];
    if (step.type !== "quiz" || selected !== null) return;
    setSelected(choice);
    const correct = choice === step.question.correct;
    recordAnswer(step.question.word.id, correct);
    setResults((r) => [...r, { word: step.question.word, correct }]);
  }

  function next() {
    if (index + 1 >= steps.length) {
      setPhase("done");
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
  }

  if (phase === "idle") {
    return (
      <StartScreen
        stats={stats}
        size={size}
        onSize={setSize}
        onStart={start}
        available={stats.dueNow + stats.untouched}
      />
    );
  }

  if (phase === "done") {
    return <Summary results={results} onRestart={() => setPhase("idle")} />;
  }

  const step = steps[index];
  const quizCount = steps.filter((s) => s.type === "quiz").length;
  const quizDone = results.length;
  const progress = quizCount === 0 ? 0 : (quizDone / quizCount) * 100;

  return (
    <div>
      <div className="flex justify-between items-baseline font-ui text-xs text-muted mb-1.5 tracking-wide">
        <span>
          {quizDone} / {quizCount}
        </span>
        <button onClick={() => setPhase("done")} className="underline decoration-line hover:text-ink">
          Terminer
        </button>
      </div>
      <div className="h-[3px] bg-line rounded overflow-hidden mb-5">
        <div className="h-full bg-ink transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      {step.type === "intro" ? (
        <IntroCard word={step.word} onNext={next} />
      ) : (
        <QuizCard
          question={step.question}
          selected={selected}
          onAnswer={answer}
          onNext={next}
          nextLabel={index + 1 >= steps.length ? "Voir le bilan →" : "Suivant →"}
        />
      )}
    </div>
  );
}

function StartScreen({
  stats,
  size,
  onSize,
  onStart,
  available,
}: {
  stats: ReturnType<typeof computeStats>;
  size: number;
  onSize: (n: number) => void;
  onStart: () => void;
  available: number;
}) {
  return (
    <div>
      <div className="grid grid-cols-3 gap-2.5 mb-6">
        <Stat value={stats.dueNow} label="à revoir" accent="var(--die)" />
        <Stat value={stats.untouched} label="jamais vus" accent="var(--der)" />
        <Stat value={stats.mastered} label="maîtrisés" accent="var(--das)" />
      </div>

      <div className="bg-paper-2 border border-line rounded-lg px-5 py-6 text-center">
        <h2 className="text-xl font-semibold mb-1">
          {stats.dueNow > 0 ? "Des mots t'attendent" : "Prêt à apprendre"}
        </h2>
        <p className="text-muted text-[14.5px] mb-5">
          {stats.dueNow > 0
            ? `${stats.dueNow} mot${stats.dueNow > 1 ? "s" : ""} arrive${stats.dueNow > 1 ? "nt" : ""} à échéance. La session mélange articles, traductions, pluriels et déclinaisons.`
            : "Une session courte suffit : les mots ratés reviendront plus souvent, les mots sus s'espaceront."}
        </p>

        <div className="font-ui text-[11px] uppercase tracking-[0.14em] text-muted mb-2">
          Longueur de la session
        </div>
        <div className="flex justify-center gap-2 mb-6">
          {SIZES.map((n) => (
            <button
              key={n}
              onClick={() => onSize(n)}
              className={`font-ui text-[13px] px-5 py-2.5 rounded-full border transition ${
                size === n ? "bg-ink text-paper border-ink" : "border-line text-muted hover:border-ink"
              }`}
            >
              {n}
            </button>
          ))}
        </div>

        <button
          onClick={onStart}
          disabled={available === 0}
          className="font-ui w-full text-[14px] font-semibold tracking-[0.06em] uppercase py-4 bg-ink text-paper rounded-lg active:scale-[0.99] disabled:opacity-40"
        >
          {available === 0 ? "Tout est à jour — reviens plus tard" : "Commencer →"}
        </button>

        {stats.streakDays > 0 && (
          <p className="font-ui text-[12px] text-muted mt-4">
            Série de <b className="text-gold">{stats.streakDays}</b> jour
            {stats.streakDays > 1 ? "s" : ""} · {stats.reviewedToday} révision
            {stats.reviewedToday > 1 ? "s" : ""} aujourd&rsquo;hui
          </p>
        )}
      </div>
    </div>
  );
}

function Stat({ value, label, accent }: { value: number; label: string; accent: string }) {
  return (
    <div className="border border-line rounded-lg py-3 text-center bg-paper-2">
      <div className="text-2xl font-semibold" style={{ color: accent }}>
        {value}
      </div>
      <div className="font-ui text-[10.5px] uppercase tracking-[0.1em] text-muted mt-0.5">{label}</div>
    </div>
  );
}

function IntroCard({ word, onNext }: { word: Word; onNext: () => void }) {
  return (
    <div className="bg-paper-2 border border-line rounded-lg px-5 py-6 sm:px-6">
      <div className="font-ui text-[10px] tracking-[0.16em] uppercase text-muted text-center mb-4">
        Nouveau mot
      </div>

      <div className="text-center text-[30px] sm:text-[34px] font-semibold leading-tight">
        {isNoun(word) && word.artikel ? (
          <>
            <span style={{ color: `var(--${word.artikel})` }}>{word.artikel}</span> {word.de}
          </>
        ) : (
          word.de
        )}
      </div>
      <div className="text-center text-[16px] text-muted italic mt-1.5">{word.fr}</div>

      {word.plural && (
        <div className="text-center text-[13px] text-muted mt-1">Pluriel : die {word.plural}</div>
      )}
      {word.perfekt && (
        <div className="text-center text-[13px] text-muted mt-1">Parfait : {word.perfekt}</div>
      )}
      {word.governs && (
        <div className="text-center text-[13px] text-muted mt-1">Construction : {word.governs}</div>
      )}

      <div className="flex justify-center mt-4">
        <AudioButton text={displayForm(word)} label="Prononcer" />
      </div>

      {isNoun(word) && (
        <Markup
          text={ruleFor(word)}
          className="mt-5 text-[14px] leading-relaxed bg-paper border-l-[3px] border-gold rounded px-3.5 py-3"
        />
      )}

      {word.example && (
        <div className="mt-3 text-[14px] text-muted">
          <div className="italic">{word.example.de}</div>
          <div className="text-[13px] mt-0.5">{word.example.fr}</div>
        </div>
      )}

      <button
        onClick={onNext}
        className="font-ui w-full mt-6 text-[13px] font-semibold tracking-[0.06em] uppercase py-4 bg-ink text-paper rounded-lg active:scale-[0.99]"
      >
        J&rsquo;ai lu — teste-moi →
      </button>
    </div>
  );
}

function Summary({
  results,
  onRestart,
}: {
  results: { word: Word; correct: boolean }[];
  onRestart: () => void;
}) {
  const correct = results.filter((r) => r.correct).length;
  const missed = results.filter((r) => !r.correct);
  const rate = results.length ? Math.round((correct / results.length) * 100) : 0;

  return (
    <div className="bg-paper-2 border border-line rounded-lg px-5 py-8 text-center">
      <h2 className="text-2xl font-semibold mb-1">Session terminée</h2>
      <div className="text-lg">
        <b className="text-2xl">
          {correct}/{results.length}
        </b>{" "}
        corrects
      </div>
      <p className="text-muted text-[14.5px] mt-2 max-w-sm mx-auto">
        {rate >= 90
          ? "Excellent. Ces mots s'espacent maintenant dans le temps."
          : rate >= 70
            ? "Bon rythme. Les mots ratés reviendront très vite."
            : "C'est en butant dessus qu'on les retient — ils reviennent bientôt."}
      </p>

      {missed.length > 0 && (
        <div className="text-left max-w-md mx-auto mt-7">
          <h3 className="font-ui text-[11px] uppercase tracking-[0.12em] text-muted mb-2">
            À revoir en priorité
          </h3>
          <ul>
            {missed.map((m, i) => (
              <li
                key={`${m.word.id}-${i}`}
                className="py-2 border-b border-line flex justify-between gap-3 items-baseline"
              >
                <Link href={`/mots/${m.word.id}`} className="hover:text-gold">
                  {isNoun(m.word) && m.word.artikel && (
                    <span className="font-semibold" style={{ color: `var(--${m.word.artikel})` }}>
                      {m.word.artikel}{" "}
                    </span>
                  )}
                  {m.word.de}
                </Link>
                <span className="text-muted italic text-[13.5px] text-right">{m.word.fr}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={onRestart}
        className="font-ui mt-7 w-full max-w-xs mx-auto block text-[13px] font-semibold tracking-[0.06em] uppercase py-4 bg-ink text-paper rounded-lg active:scale-[0.99]"
      >
        Nouvelle session →
      </button>
    </div>
  );
}
