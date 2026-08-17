"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import WORDS from "@/data";
import type { Word } from "@/lib/types";
import { displayForm, isNoun } from "@/lib/types";
import { buildSession, computeStats, wordState } from "@/lib/srs";
import { useSrs, recordAnswer } from "@/lib/srsStore";
import type { Unit } from "@/lib/units";
import { buildQuestion, evaluate, type Question } from "@/lib/quiz";
import { ruleFor } from "@/lib/genderRules";
import QuizCard from "./QuizCard";
import AudioButton from "./AudioButton";
import Markup from "./Markup";
import WordUsage from "./WordUsage";
import WordDictionary from "./WordDictionary";
import { explainsGender } from "@/lib/compound";
import WordIllustration, { hasIllustration } from "./WordIllustration";

/** Un mot jamais vu est d'abord présenté, puis testé dans la foulée. */
type Step =
  | { type: "intro"; word: Word }
  | { type: "quiz"; unit: Unit; question: Question; repeat?: boolean };

type Phase = "idle" | "running" | "done";

const SIZES = [10, 20, 40];

/** Combien de questions plus loin une facette ratée revient dans la même session. */
const REPEAT_GAP = 3;

export default function ReviewSession() {
  const srs = useSrs();
  const [phase, setPhase] = useState<Phase>("idle");
  const [size, setSize] = useState(20);
  const [steps, setSteps] = useState<Step[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [results, setResults] = useState<{ word: Word; correct: boolean }[]>([]);

  const stats = useMemo(() => computeStats(srs, WORDS), [srs]);

  function start() {
    const plan = buildSession(srs, WORDS, size);
    if (plan.units.length === 0) return;

    const built: Step[] = [];
    const introduced = new Set<string>();
    for (const unit of plan.units) {
      // Premier contact avec le mot : on le montre avant d'interroger dessus.
      if (wordState(srs, unit.word).seenKinds === 0 && !introduced.has(unit.word.id)) {
        introduced.add(unit.word.id);
        built.push({ type: "intro", word: unit.word });
      }
      built.push({ type: "quiz", unit, question: buildQuestion(unit.word, WORDS, unit.kind) });
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
    const { correct } = evaluate(step.question, choice);
    recordAnswer(step.unit.word.id, step.unit.kind, correct);
    setResults((r) => [...r, { word: step.unit.word, correct }]);

    // La boîte 0 vaut « dans dix minutes » : une facette ratée doit donc
    // repasser avant la fin de la session, pas la semaine suivante. Une seule
    // reprise, sinon on tournerait en boucle sur le mot qui résiste.
    if (!correct && !step.repeat) {
      setSteps((prev) => {
        const next = [...prev];
        const at = Math.min(index + REPEAT_GAP, next.length);
        next.splice(at, 0, {
          type: "quiz",
          unit: step.unit,
          question: buildQuestion(step.unit.word, WORDS, step.unit.kind),
          repeat: true,
        });
        return next;
      });
    }
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
        available={stats.dueNow + stats.newUnits}
      />
    );
  }

  if (phase === "done") {
    return <Summary results={results} onRestart={() => setPhase("idle")} />;
  }

  const step = steps[index];
  const quizCount = steps.filter((s) => s.type === "quiz").length;
  const quizDone = results.length;
  const progress = quizCount === 0 ? 0 : Math.round((quizDone / quizCount) * 100);

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
      <div
        className="h-[3px] bg-line rounded overflow-hidden mb-5"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={quizCount}
        aria-valuenow={quizDone}
        aria-label="Avancement de la session"
      >
        <div className="h-full bg-ink motion-safe:transition-all duration-300" style={{ width: `${progress}%` }} />
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
        <Stat value={stats.untouched} label="mots jamais vus" accent="var(--der)" />
        <Stat value={stats.mastered} label="maîtrisés" accent="var(--das)" />
      </div>

      <div className="bg-paper-2 border border-line rounded-lg px-5 py-6 text-center">
        <h2 className="text-xl font-semibold mb-1">
          {stats.dueNow > 0 ? "Des mots t'attendent" : "Prêt à apprendre"}
        </h2>
        <p className="text-muted text-[14.5px] mb-5">
          {stats.dueNow > 0
            ? `${stats.dueNow} question${stats.dueNow > 1 ? "s" : ""} arrive${stats.dueNow > 1 ? "nt" : ""} à échéance. La session mélange articles, traductions, pluriels et déclinaisons.`
            : "Une session courte suffit : ce que tu rates revient plus souvent, ce que tu sais s'espace."}
        </p>

        <div className="font-ui text-[11px] uppercase tracking-[0.14em] text-muted mb-2">
          Longueur de la session
        </div>
        <div className="flex justify-center gap-2 mb-6">
          {SIZES.map((n) => (
            <button
              key={n}
              onClick={() => onSize(n)}
              aria-pressed={size === n}
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
          className="font-ui w-full text-[14px] font-semibold tracking-[0.06em] uppercase py-4 bg-ink text-paper rounded-lg motion-safe:active:scale-[0.99] disabled:opacity-40"
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

      {/* Voir l'objet en même temps que son nom crée une seconde trace en mémoire. */}
      {hasIllustration(word.id) && (
        <div className="flex justify-center mb-3">
          <WordIllustration id={word.id} size={104} />
        </div>
      )}

      <div lang="de" className="text-center font-semibold german word-display sm:!text-[34px]">
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

      {/* Sur un composé, la décomposition dit déjà d'où vient le genre. */}
      {isNoun(word) && !explainsGender(word) && (
        <Markup
          text={ruleFor(word)}
          className="mt-5 text-[14px] leading-relaxed bg-paper border-l-[3px] border-gold rounded px-3.5 py-3"
        />
      )}

      <WordDictionary word={word} compact />

      {word.example && (
        <div className="mt-3 text-[14px] text-muted">
          <div className="italic">{word.example.de}</div>
          <div className="text-[13px] mt-0.5">{word.example.fr}</div>
        </div>
      )}

      <WordUsage word={word} compact />

      {/* Réserve la hauteur de la barre fixe pour ne rien masquer. */}
      <div aria-hidden className="h-20" />

      <StickyAction onClick={onNext} label="J'ai lu — teste-moi →" />
    </div>
  );
}

/**
 * Bouton d'action collé au bas de l'écran : il reste sous le pouce quelle que
 * soit la longueur de la carte, sans avoir à faire défiler.
 */
function StickyAction({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <div
      className="fixed inset-x-0 z-30 px-4 pointer-events-none"
      style={{ bottom: "calc(3.5rem + env(safe-area-inset-bottom))" }}
    >
      <div className="max-w-2xl mx-auto pointer-events-auto">
        <button
          onClick={onClick}
          className="font-ui w-full text-[13px] font-semibold tracking-[0.06em] uppercase py-4 bg-ink text-paper rounded-lg shadow-lg motion-safe:active:scale-[0.99]"
        >
          {label}
        </button>
      </div>
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
  const rate = results.length ? Math.round((correct / results.length) * 100) : 0;

  // Un mot peut avoir été raté puis repris dans la session : on ne le liste
  // qu'une fois, et seulement s'il est resté en échec.
  const missed = useMemo(() => {
    const byWord = new Map<string, { word: Word; ok: boolean }>();
    for (const r of results) {
      const prev = byWord.get(r.word.id);
      byWord.set(r.word.id, { word: r.word, ok: (prev?.ok ?? false) || r.correct });
    }
    return [...byWord.values()].filter((e) => !e.ok).map((e) => e.word);
  }, [results]);

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
          ? "Excellent. Ces questions s'espacent maintenant dans le temps."
          : rate >= 70
            ? "Bon rythme. Ce qui a été raté reviendra très vite."
            : "C'est en butant dessus qu'on les retient — ils reviennent bientôt."}
      </p>

      {missed.length > 0 && (
        <div className="text-left max-w-md mx-auto mt-7">
          <h3 className="font-ui text-[11px] uppercase tracking-[0.12em] text-muted mb-2">
            À revoir en priorité
          </h3>
          <ul>
            {missed.map((word) => (
              <li key={word.id} className="py-2 border-b border-line">
                <Link href={`/mots/${word.id}`} prefetch={false} className="block hover:text-gold">
                  <span className="block">
                    {isNoun(word) && word.artikel && (
                      <span className="font-semibold" style={{ color: `var(--${word.artikel})` }}>
                        {word.artikel}{" "}
                      </span>
                    )}
                    {word.de}
                  </span>
                  <span className="block text-muted italic text-[13.5px] mt-0.5">{word.fr}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={onRestart}
        className="font-ui mt-7 w-full max-w-xs mx-auto block text-[13px] font-semibold tracking-[0.06em] uppercase py-4 bg-ink text-paper rounded-lg motion-safe:active:scale-[0.99]"
      >
        Nouvelle session →
      </button>
    </div>
  );
}
