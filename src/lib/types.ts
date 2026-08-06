export type Gender = "der" | "die" | "das";

/**
 * "weak" = n-Deklination (der Kunde, der Mandant, der Experte...):
 * takes -n/-en in Akkusativ, Dativ AND Genitiv Singular (not just Genitiv).
 */
export type DeclensionClass = "strong" | "weak";

export interface Word {
  id: string;
  de: string; // Nominativ Singular, sans article
  artikel: Gender;
  plural: string | null; // Nominativ Plural, sans article ; null = pas de pluriel usuel
  fr: string;
  category: string;
  declClass?: DeclensionClass; // par défaut "strong"
  /** Neutralise l'heuristique si la forme Genitiv Singular est irrégulière */
  genitiveSgOverride?: string;
  /** Neutralise l'heuristique si la forme Akk/Dat/Gen Singular faible est irrégulière (ex: Name -> Namen) */
  weakObliqueOverride?: string;
  rule: string; // explication de la règle de genre, en français
  example: { de: string; fr: string };
  note?: string;
}

export interface Category {
  key: string;
  label: string;
  description: string;
}
