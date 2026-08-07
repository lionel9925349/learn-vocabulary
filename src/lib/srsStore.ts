"use client";

import { useSyncExternalStore } from "react";
import { EMPTY_SRS, gradeCard, type SrsData } from "./srs";

/**
 * Petit store externe pour la progression, lu via `useSyncExternalStore`.
 *
 * C'est la façon propre de brancher React sur du localStorage : le rendu
 * serveur (export statique) reçoit un état vide, puis React re-rend avec la
 * vraie progression après hydratation — sans effet ni décalage d'affichage.
 */

const STORAGE_KEY = "artikel-trainer:srs:v1";

let state: SrsData = EMPTY_SRS;
let loaded = false;
const listeners = new Set<() => void>();

function read(): SrsData {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_SRS;
    const parsed = JSON.parse(raw) as Partial<SrsData>;
    return {
      cards: parsed.cards ?? {},
      history: parsed.history ?? {},
      version: parsed.version ?? 1,
    };
  } catch {
    return EMPTY_SRS;
  }
}

function ensureLoaded() {
  if (loaded || typeof window === "undefined") return;
  state = read();
  loaded = true;
}

function persist() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Quota plein ou mode privé : la session reste utilisable en mémoire.
  }
}

function emit() {
  for (const l of listeners) l();
}

function subscribe(cb: () => void): () => void {
  ensureLoaded();
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function getSnapshot(): SrsData {
  ensureLoaded();
  return state;
}

function getServerSnapshot(): SrsData {
  return EMPTY_SRS;
}

/** Progression courante. Vaut EMPTY_SRS pendant le rendu serveur. */
export function useSrs(): SrsData {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function recordAnswer(id: string, correct: boolean): void {
  ensureLoaded();
  state = gradeCard(state, id, correct);
  persist();
  emit();
}

export function resetProgress(): void {
  state = EMPTY_SRS;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }
  emit();
}

/** Sauvegarde exportable (l'utilisateur peut copier sa progression ailleurs). */
export function exportProgress(): string {
  ensureLoaded();
  return JSON.stringify(state);
}

export function importProgress(json: string): boolean {
  try {
    const parsed = JSON.parse(json) as Partial<SrsData>;
    if (!parsed || typeof parsed !== "object" || !parsed.cards) return false;
    state = { cards: parsed.cards, history: parsed.history ?? {}, version: parsed.version ?? 1 };
    loaded = true;
    persist();
    emit();
    return true;
  } catch {
    return false;
  }
}
