"use client";

import { useSyncExternalStore } from "react";
import { speak, speechSupported } from "@/lib/speech";

// Capacité du navigateur : elle ne change jamais en cours de session, d'où un
// abonnement vide. Le rendu serveur suppose « non supporté » pour éviter tout
// décalage d'hydratation.
const neverChanges = () => () => {};

/** Bouton de prononciation allemande. Ne s'affiche que si le navigateur sait parler. */
export default function AudioButton({
  text,
  className = "",
  label = "Écouter",
}: {
  text: string;
  className?: string;
  label?: string;
}) {
  const supported = useSyncExternalStore(neverChanges, speechSupported, () => false);

  if (!supported) return null;

  return (
    <button
      type="button"
      onClick={() => speak(text)}
      aria-label={`${label} : ${text}`}
      className={`font-ui inline-flex items-center gap-1.5 text-[12px] px-3 py-2 rounded-full border border-line text-muted hover:border-ink hover:text-ink active:scale-95 transition ${className}`}
    >
      <span aria-hidden>🔊</span>
      {label}
    </button>
  );
}
