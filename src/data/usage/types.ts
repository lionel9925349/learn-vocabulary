/**
 * Usage d'un mot : ses verbes habituels et ses phrases d'exemple.
 *
 * Saisi à part des mots eux-mêmes, en format tuple compact, pour que ces
 * fichiers restent lisibles et faciles à compléter thème par thème.
 * La fusion avec le vocabulaire se fait dans `data/index.ts`.
 */
export type Pair = readonly [de: string, fr: string];

export interface Usage {
  /** Verbes et tournures qui vont avec le mot */
  v?: readonly Pair[];
  /** Phrases complètes montrant le mot en contexte */
  s?: readonly Pair[];
}

/** Table d'usages, indexée par identifiant de mot. */
export type UsageMap = Record<string, Usage>;
