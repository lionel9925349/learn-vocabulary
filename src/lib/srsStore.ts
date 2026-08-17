"use client";

import { useSyncExternalStore } from "react";
import WORDS from "@/data";
import { EMPTY_SRS, SRS_VERSION, gradeCard, migrate, pruneHistory, type SrsData } from "./srs";
import type { QuestionKind } from "./units";

/**
 * Petit store externe pour la progression, lu via `useSyncExternalStore`.
 *
 * C'est la façon propre de brancher React sur du localStorage : le rendu
 * serveur (export statique) reçoit un état vide, puis React re-rend avec la
 * vraie progression après hydratation — sans effet ni décalage d'affichage.
 */

/**
 * La clé n'a pas bougé depuis la version 1 : c'est elle qui permet de retrouver
 * une progression existante et de la convertir. La version du format est portée
 * par le champ `version` du contenu, pas par le nom de la clé.
 */
const STORAGE_KEY = "artikel-trainer:srs:v1";

let state: SrsData = EMPTY_SRS;
let loaded = false;
const listeners = new Set<() => void>();

function read(): { data: SrsData; converted: boolean } {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { data: EMPTY_SRS, converted: false };
    const parsed: unknown = JSON.parse(raw);
    const version = (parsed as Partial<SrsData> | null)?.version;
    // `migrate` valide autant qu'il convertit : une sauvegarde abîmée ou d'une
    // version antérieure ressort toujours au format courant.
    return { data: migrate(parsed, WORDS), converted: version !== SRS_VERSION };
  } catch {
    return { data: EMPTY_SRS, converted: false };
  }
}

function ensureLoaded() {
  if (loaded || typeof window === "undefined") return;
  const { data, converted } = read();
  state = data;
  loaded = true;
  // La conversion depuis une version antérieure n'a de valeur que si on la garde.
  if (converted && Object.keys(data.cards).length > 0) writeNow();
}

/**
 * Écriture différée.
 *
 * Sérialiser plusieurs milliers de facettes à chaque réponse bloquait le fil
 * principal pile au moment où l'utilisateur touche « Suivant ». On regroupe
 * donc les écritures, en vidant la file dès que la page passe en arrière-plan —
 * c'est le seul moment où l'on risquerait vraiment de perdre quelque chose.
 */
const WRITE_DELAY_MS = 400;
let writeTimer: ReturnType<typeof setTimeout> | null = null;

function writeNow() {
  if (writeTimer !== null) {
    clearTimeout(writeTimer);
    writeTimer = null;
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Quota plein ou mode privé : la session reste utilisable en mémoire.
  }
}

function persist() {
  if (typeof window === "undefined") return;
  if (writeTimer !== null) return;
  writeTimer = setTimeout(() => {
    writeTimer = null;
    writeNow();
  }, WRITE_DELAY_MS);
}

if (typeof window !== "undefined") {
  const flush = () => {
    if (writeTimer !== null) writeNow();
  };
  // `pagehide` est le seul événement fiable sur iOS ; `visibilitychange` couvre le reste.
  window.addEventListener("pagehide", flush);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flush();
  });
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

/** Enregistre une réponse sur une facette précise d'un mot. */
export function recordAnswer(wordId: string, kind: QuestionKind, correct: boolean): void {
  ensureLoaded();
  state = gradeCard(state, wordId, kind, correct);
  persist();
  emit();
}

export function resetProgress(): void {
  state = EMPTY_SRS;
  if (typeof window !== "undefined") {
    if (writeTimer !== null) {
      clearTimeout(writeTimer);
      writeTimer = null;
    }
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
  return JSON.stringify({ ...state, history: pruneHistory(state.history), version: SRS_VERSION });
}

/**
 * Restaure une sauvegarde. Renvoie faux si le fichier n'en est pas une.
 *
 * Une sauvegarde vide n'a aucun intérêt à écraser une progression en cours :
 * on considère donc qu'un fichier sans aucune carte exploitable est invalide,
 * plutôt que de laisser l'utilisateur effacer ses mois de travail sur un
 * fichier tronqué.
 */
export function importProgress(json: string): boolean {
  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch {
    return false;
  }
  if (!parsed || typeof parsed !== "object" || !("cards" in parsed)) return false;

  const migrated = migrate(parsed, WORDS);
  if (Object.keys(migrated.cards).length === 0 && Object.keys(migrated.history).length === 0) {
    return false;
  }

  state = migrated;
  loaded = true;
  writeNow();
  emit();
  return true;
}
