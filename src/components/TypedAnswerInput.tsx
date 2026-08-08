"use client";

import { useRef, useState } from "react";

/** Caractères allemands absents d'un clavier français, insérables d'un doigt. */
const GERMAN_CHARS = ["ä", "ö", "ü", "ß", "Ä", "Ö", "Ü"];

export default function TypedAnswerInput({ onSubmit }: { onSubmit: (value: string) => void }) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  /** Insère le caractère à la position du curseur, sans casser la saisie en cours. */
  function insert(char: string) {
    const input = inputRef.current;
    if (!input) return;

    const start = input.selectionStart ?? value.length;
    const end = input.selectionEnd ?? value.length;
    const next = value.slice(0, start) + char + value.slice(end);
    setValue(next);

    // Le curseur doit repasser après le caractère inséré une fois le rendu fait.
    requestAnimationFrame(() => {
      input.focus();
      input.setSelectionRange(start + char.length, start + char.length);
    });
  }

  function submit() {
    if (!value.trim()) return;
    onSubmit(value);
  }

  return (
    <div className="mt-6">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            submit();
          }
        }}
        autoFocus
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        lang="de"
        placeholder="Tape le mot en allemand…"
        aria-label="Réponse en allemand"
        className="w-full font-ui text-base px-4 py-3.5 rounded-lg border border-line bg-paper outline-none focus:border-ink transition-colors text-center"
      />

      <div className="flex justify-center gap-1.5 mt-2.5 flex-wrap">
        {GERMAN_CHARS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => insert(c)}
            tabIndex={-1}
            className="w-10 h-10 rounded-lg border border-line text-[16px] text-muted hover:border-ink hover:text-ink active:scale-95 transition"
          >
            {c}
          </button>
        ))}
      </div>

      <button
        onClick={submit}
        disabled={!value.trim()}
        className="font-ui w-full mt-3 text-[13px] font-semibold tracking-[0.06em] uppercase py-4 bg-ink text-paper rounded-lg active:scale-[0.99] disabled:opacity-40"
      >
        Vérifier
      </button>
    </div>
  );
}
