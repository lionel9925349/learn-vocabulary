"use client";

import { useSyncExternalStore } from "react";

/**
 * Les réglages de session, retenus d'une fois sur l'autre.
 *
 * Avec plus de mille cinq cents mots répartis en vingt-sept thèmes, quelqu'un
 * qui prend un poste dans la messagerie express n'a pas besoin du même
 * vocabulaire que quelqu'un qui travaille aux achats. Restreindre la session à
 * ses thèmes est donc un réglage durable, pas un choix à refaire à chaque
 * ouverture — d'où la persistance.
 *
 * Stocké à part de la progression : perdre ses préférences n'a aucune gravité,
 * perdre sa progression en a.
 */

const STORAGE_KEY = "artikel-trainer:prefs:v1";

export interface Preferences {
  /** Thèmes retenus. Vide = tout le vocabulaire. */
  themes: string[];
  /** Nombre de questions par session. */
  size: number;
}

export const DEFAULT_PREFERENCES: Preferences = { themes: [], size: 20 };

let state: Preferences = DEFAULT_PREFERENCES;
let loaded = false;
const listeners = new Set<() => void>();

function read(): Preferences {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PREFERENCES;
    const parsed = JSON.parse(raw) as Partial<Preferences>;
    return {
      themes: Array.isArray(parsed.themes) ? parsed.themes.filter((t) => typeof t === "string") : [],
      size: typeof parsed.size === "number" && parsed.size > 0 ? Math.round(parsed.size) : 20,
    };
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

function ensureLoaded() {
  if (loaded || typeof window === "undefined") return;
  state = read();
  loaded = true;
}

function subscribe(cb: () => void): () => void {
  ensureLoaded();
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function getSnapshot(): Preferences {
  ensureLoaded();
  return state;
}

function getServerSnapshot(): Preferences {
  return DEFAULT_PREFERENCES;
}

export function usePreferences(): Preferences {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function setPreferences(patch: Partial<Preferences>): void {
  ensureLoaded();
  state = { ...state, ...patch };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Mode privé : le réglage vaut pour la session en cours.
  }
  for (const l of listeners) l();
}
