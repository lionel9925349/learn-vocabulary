"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

/**
 * Le thème vit dans le DOM (attribut `data-theme`), posé avant le premier
 * rendu par le script d'initialisation du layout.
 *
 * On le lit donc via `useSyncExternalStore` plutôt qu'avec un `useState` :
 * pendant l'hydratation React utilise `getServerSnapshot`, ce qui garantit que
 * le client reconstruit exactement le HTML reçu, puis re-rend avec la vraie
 * valeur. Un `useState(lireLeDOM())` produisait « ☾ Sombre » côté serveur et
 * « ☀︎ Clair » côté client — un décalage d'hydratation à chaque visite en
 * thème sombre.
 */
const listeners = new Set<() => void>();

function currentTheme(): Theme {
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "light" || attr === "dark") return attr;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function subscribe(cb: () => void): () => void {
  listeners.add(cb);
  // Le thème système peut changer pendant la session (bascule automatique du soir).
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", cb);
  return () => {
    listeners.delete(cb);
    media.removeEventListener("change", cb);
  };
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore<Theme>(subscribe, currentTheme, () => "light");

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Mode privé : le thème vaut alors pour la session en cours seulement.
    }
    for (const l of listeners) l();
  }

  return (
    <button
      onClick={toggle}
      aria-label={theme === "dark" ? "Passer en thème clair" : "Passer en thème sombre"}
      className="font-ui text-xs px-2.5 py-1.5 rounded-full border border-line text-muted hover:border-ink hover:text-ink transition-colors cursor-pointer"
    >
      {theme === "dark" ? "☀︎ Clair" : "☾ Sombre"}
    </button>
  );
}
