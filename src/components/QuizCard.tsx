"use client";

import Link from "next/link";
import type { Question } from "@/lib/quiz";
import { KIND_LABELS, evaluate } from "@/lib/quiz";
import { categories } from "@/data";
import Markup from "./Markup";
import AudioButton from "./AudioButton";
import TypedAnswerInput from "./TypedAnswerInput";

/**
 * Carte de question, partagée par la session de révision et les exercices ciblés.
 * L'affichage des réponses s'adapte à leur longueur : en grille pour les
 * articles, empilées pour les traductions.
 */
export default function QuizCard({
  question,
  selected,
  onAnswer,
  onNext,
  nextLabel = "Suivant →",
}: {
  question: Question;
  selected: string | null;
  onAnswer: (choice: string) => void;
  onNext: () => void;
  nextLabel?: string;
}) {
  const answered = selected !== null;
  const result = answered ? evaluate(question, selected) : null;
  const isRight = result?.correct ?? false;
  const longChoices = question.choices.some((c) => c.length > 14);
  const category = categories.find((c) => c.key === question.word.category);

  return (
    <div className="bg-paper-2 border border-line rounded-lg px-5 py-6 sm:px-6">
      <div className="flex items-center justify-between gap-3 mb-4">
        <span className="font-ui text-[10px] tracking-[0.16em] uppercase text-muted">
          {KIND_LABELS[question.kind]}
        </span>
        {category && (
          <span className="font-ui text-[10px] tracking-[0.1em] uppercase text-muted truncate">
            {category.label}
          </span>
        )}
      </div>

      <div
        lang="de"
        className={`text-center font-semibold german ${
          question.kind === "declension" || question.kind === "adjective" || question.kind === "conjugation"
            ? "text-[19px] sm:text-[22px] leading-snug"
            : "word-display"
        }`}
      >
        {question.prompt}
      </div>
      {/* Le sens reste sous les yeux : on n'apprend pas un article sur un mot inconnu. */}
      {question.meaning && (
        <div className="text-center text-[16px] text-muted italic mt-2 px-2">{question.meaning}</div>
      )}
      {question.sub && (
        <div className="text-center text-[13px] text-muted mt-1.5 px-2">{question.sub}</div>
      )}

      {question.typed && !answered && <TypedAnswerInput onSubmit={onAnswer} />}

      {question.typed && answered && (
        <div className="mt-6 text-center">
          <div className="font-ui text-[11px] uppercase tracking-[0.12em] text-muted mb-1.5">
            Ta réponse
          </div>
          <div
            className="text-[20px] font-semibold"
            style={{ color: isRight ? "var(--das)" : "var(--die)" }}
          >
            {selected}
          </div>
        </div>
      )}

      <div
        className={`mt-6 grid gap-2.5 ${longChoices ? "grid-cols-1" : "grid-cols-3"} ${
          question.typed ? "hidden" : ""
        }`}
      >
        {question.choices.map((choice) => {
          const isCorrectChoice = choice === question.correct;
          const isPicked = choice === selected;

          let background = "transparent";
          let borderColor = "var(--line)";
          let color: string | undefined;
          let opacity = 1;

          if (answered) {
            if (isCorrectChoice) {
              background = "var(--das)";
              borderColor = "var(--das)";
              color = "#fff";
            } else if (isPicked) {
              background = "var(--die)";
              borderColor = "var(--die)";
              color = "#fff";
            } else {
              opacity = 0.4;
            }
          } else if (question.kind === "article") {
            borderColor = `var(--${choice})`;
          }

          return (
            <button
              key={choice}
              disabled={answered}
              onClick={() => onAnswer(choice)}
              // Une fois répondu, les choix se compactent : la place gagnée sert
              // à l'explication et à la phrase d'exemple.
              lang="de"
              className={`rounded-lg border-[1.5px] transition active:scale-[0.98] disabled:cursor-default german ${
                longChoices
                  ? `px-4 text-left text-[15px] ${answered ? "py-2" : "py-3.5"}`
                  : `px-2 text-center font-semibold ${answered ? "py-2.5 text-[17px]" : "py-4 text-lg sm:text-xl"}`
              }`}
              style={{ background, borderColor, color, opacity }}
            >
              {choice}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="mt-5 border-t border-line pt-4">
          <div
            className="font-semibold text-[15px] mb-2 flex items-center justify-between gap-3"
            style={{ color: isRight ? "var(--das)" : "var(--die)" }}
          >
            <span>{isRight ? "Richtig !" : `Non — ${question.correct}`}</span>
            {question.speak && <AudioButton text={question.speak} />}
          </div>

          {result?.note && (
            <Markup
              text={result.note}
              className="text-[13.5px] leading-relaxed text-muted mb-2"
            />
          )}

          <Markup
            text={question.explanation}
            className="text-[14px] leading-relaxed bg-paper border-l-[3px] border-gold rounded px-3.5 py-3"
          />

          {/* La phrase montre le mot au travail : sa construction, son registre. */}
          {question.word.example && (
            <div className="mt-3 text-[14px] leading-relaxed">
              <div className="flex items-start justify-between gap-3">
                <span className="italic">{question.word.example.de}</span>
                <AudioButton
                  text={question.word.example.de}
                  label="▸"
                  className="shrink-0 !px-2.5"
                />
              </div>
              <div className="text-muted text-[13px] mt-0.5">{question.word.example.fr}</div>
            </div>
          )}

          {question.word.collocations && question.word.collocations.length > 0 && (
            <div className="mt-3">
              <h4 className="font-ui text-[10px] uppercase tracking-[0.12em] text-muted mb-1">
                On l&rsquo;emploie avec
              </h4>
              <ul>
                {question.word.collocations.slice(0, 4).map((c) => (
                  <li key={c.de} className="flex flex-wrap items-baseline gap-x-2 text-[13.5px] py-0.5">
                    <span className="font-medium">{c.de}</span>
                    <span className="text-muted italic text-[12.5px]">{c.fr}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Link
            href={`/mots/${question.word.id}`}
            className="inline-block mt-3 font-ui text-[12.5px] text-muted underline decoration-line hover:text-ink"
          >
            Fiche complète de « {question.word.de} » →
          </Link>

          {/* Réserve la place occupée par la barre fixe, pour ne rien masquer. */}
          <div aria-hidden className="h-20" />
        </div>
      )}

      {answered && (
        <div
          className="fixed inset-x-0 z-30 px-4 pointer-events-none"
          style={{ bottom: "calc(3.5rem + env(safe-area-inset-bottom))" }}
        >
          <div className="max-w-2xl mx-auto pointer-events-auto">
            <button
              onClick={onNext}
              autoFocus
              className="font-ui w-full text-[13px] font-semibold tracking-[0.06em] uppercase py-4 bg-ink text-paper rounded-lg shadow-lg active:scale-[0.99]"
            >
              {nextLabel}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
