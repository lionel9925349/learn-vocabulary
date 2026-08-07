import type { Gender, Word } from "@/lib/types";

/**
 * Constructeurs compacts pour la saisie du vocabulaire.
 *
 * La règle de genre n'est plus écrite à la main : elle est déduite de la
 * morphologie du mot (voir `lib/genderRules`), et `npm run check:data` vérifie
 * que le genre déclaré est cohérent avec cette déduction. On ne saisit donc que
 * l'information qui ne peut pas être calculée.
 */

/** Identifiant d'URL stable à partir du mot allemand. */
export function slug(de: string): string {
  return de
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

type Extra = Partial<Omit<Word, "de" | "fr" | "category" | "kind">>;

export function makers(category: string) {
  return {
    /** Nom : article, pluriel (null si le mot n'en a pas), traduction. */
    n(de: string, artikel: Gender, plural: string | null, fr: string, extra: Extra = {}): Word {
      return { id: slug(de), de, artikel, plural, fr, category, kind: "noun", ...extra };
    },

    /** Verbe : parfait complet ("hat geliefert"), traduction. */
    v(de: string, perfekt: string, fr: string, extra: Extra = {}): Word {
      return { id: slug(de), de, fr, category, kind: "verb", perfekt, ...extra };
    },

    adj(de: string, fr: string, extra: Extra = {}): Word {
      return { id: slug(de), de, fr, category, kind: "adjective", ...extra };
    },

    /** Expression : l'identifiant est raccourci car la phrase peut être longue. */
    p(de: string, fr: string, extra: Extra = {}): Word {
      return { id: slug(de).slice(0, 60), de, fr, category, kind: "phrase", ...extra };
    },
  };
}
