"use client";

import { useEffect, useMemo, useState } from "react";

/**
 * Reconstruction d'une phrase par assemblage.
 *
 * On touche un mot pour le poser, on touche un mot posé pour le reprendre.
 * C'est la seule façon honnête de faire travailler l'ordre des mots sur un
 * téléphone : un choix multiple donnerait la réponse en la montrant, et une
 * saisie libre sanctionnerait l'orthographe au lieu de la syntaxe.
 *
 * Les mots identiques sont distingués par leur position d'origine, sans quoi
 * reprendre l'un reprendrait l'autre.
 */

interface Slot {
  /** Position dans le mélange initial — l'identité d'un mot, même en double. */
  id: number;
  text: string;
}

export default function SentenceBuilder({
  tokens,
  lead,
  onSubmit,
}: {
  tokens: string[];
  /** Amorce non modifiable, affichée avant les mots à placer. */
  lead?: string;
  onSubmit: (sentence: string) => void;
}) {
  const initial = useMemo<Slot[]>(() => tokens.map((text, id) => ({ id, text })), [tokens]);
  const [placed, setPlaced] = useState<Slot[]>([]);

  // Une nouvelle question réinitialise le plateau.
  useEffect(() => {
    /* eslint-disable-next-line react-hooks/set-state-in-effect */
    setPlaced([]);
  }, [initial]);

  const remaining = initial.filter((slot) => !placed.some((p) => p.id === slot.id));
  const complete = remaining.length === 0;

  function place(slot: Slot) {
    setPlaced((p) => [...p, slot]);
  }

  function take(slot: Slot) {
    setPlaced((p) => p.filter((s) => s.id !== slot.id));
  }

  function submit() {
    if (!complete) return;
    onSubmit(placed.map((s) => s.text).join(" "));
  }

  return (
    <div className="mt-6">
      {/* La phrase en construction. */}
      <div
        className="min-h-[4.5rem] rounded-lg border border-line bg-paper px-3 py-3 flex flex-wrap items-start gap-1.5 content-start"
        aria-label="Phrase en construction"
      >
        {lead && (
          <span lang="de" className="text-[15px] italic text-muted py-2 pr-1">
            {lead}
          </span>
        )}
        {placed.length === 0 && !lead && (
          <span className="text-[13.5px] text-muted py-2">Touche les mots dans le bon ordre…</span>
        )}
        {placed.map((slot, i) => (
          <button
            key={slot.id}
            type="button"
            onClick={() => take(slot)}
            lang="de"
            aria-label={`Retirer « ${slot.text} », en position ${i + 1}`}
            className="german text-[15px] px-2.5 py-2 rounded-md border border-ink bg-ink text-paper motion-safe:active:scale-95 transition"
          >
            {slot.text}
          </button>
        ))}
        {complete && <span className="text-[15px] py-2">.</span>}
      </div>

      {/* Les mots restants. */}
      <div className="mt-3 flex flex-wrap gap-1.5 justify-center" aria-label="Mots à placer">
        {remaining.map((slot) => (
          <button
            key={slot.id}
            type="button"
            onClick={() => place(slot)}
            lang="de"
            className="german text-[15px] px-3 py-2.5 rounded-md border border-line text-ink hover:border-ink motion-safe:active:scale-95 transition"
          >
            {slot.text}
          </button>
        ))}
        {complete && (
          <span className="font-ui text-[12px] text-muted py-2.5">
            Tous les mots sont placés.
          </span>
        )}
      </div>

      <button
        onClick={submit}
        disabled={!complete}
        className="font-ui w-full mt-4 text-[13px] font-semibold tracking-[0.06em] uppercase py-4 bg-ink text-paper rounded-lg motion-safe:active:scale-[0.99] disabled:opacity-40"
      >
        Vérifier
      </button>
    </div>
  );
}
