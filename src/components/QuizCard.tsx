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
        className={`text-center font-semibold leading-tight ${
          question.kind === "declension" ? "text-[20px] sm:text-[22px]" : "text-[28px] sm:text-[32px]"
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
              className={`rounded-lg border-[1.5px] transition active:scale-[0.98] disabled:cursor-default ${
                longChoices
                  ? "px-4 py-3.5 text-left text-[15px]"
                  : "py-4 text-center text-xl font-semibold"
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

          <Link
            href={`/mots/${question.word.id}`}
            className="inline-block mt-3 font-ui text-[12.5px] text-muted underline decoration-line hover:text-ink"
          >
            Fiche complète de « {question.word.de} » →
          </Link>

          <button
            onClick={onNext}
            autoFocus
            className="font-ui w-full mt-5 text-[13px] font-semibold tracking-[0.06em] uppercase py-4 bg-ink text-paper rounded-lg active:scale-[0.99]"
          >
            {nextLabel}
          </button>
        </div>
      )}
    </div>
  );
}
