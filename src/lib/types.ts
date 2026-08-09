export type Gender = "der" | "die" | "das";

/**
 * "weak" = n-Deklination (der Kunde, der Mandant, der Experte...):
 * takes -n/-en in Akkusativ, Dativ AND Genitiv Singular (not just Genitiv).
 */
export type DeclensionClass = "strong" | "weak";

/** Nature du mot : les noms portent un article, les autres non. */
export type WordKind = "noun" | "verb" | "adjective" | "phrase";

export interface Word {
  id: string;
  de: string; // Nominativ Singular (nom) / infinitif (verbe), sans article
  fr: string;
  category: string;
  kind?: WordKind; // par défaut "noun"

  // — Noms —
  artikel?: Gender; // requis pour kind "noun"
  plural?: string | null; // Nominativ Plural sans article ; null = pas de pluriel usuel
  declClass?: DeclensionClass; // par défaut "strong"
  /** Neutralise l'heuristique si la forme Genitiv Singular est irrégulière */
  genitiveSgOverride?: string;
  /** Neutralise l'heuristique si la forme oblique faible est irrégulière (der Name → Namen) */
  weakObliqueOverride?: string;

  // — Adjectifs —
  /**
   * Adjectif épithète, qui se décline devant un nom (der **gute** Preis).
   * Faux pour les adverbes et mots de liaison, invariables (sofort, trotz…).
   */
  attributive?: boolean;

  // — Verbes —
  /** Participe passé avec auxiliaire, ex. "hat geliefert" / "ist gefahren" */
  perfekt?: string;
  /** Cas et préposition régis, ex. "sich kümmern um + Akk." */
  governs?: string;
  /** Verbe à particule séparable (an|kommen) */
  separable?: boolean;
  /**
   * 3ᵉ personne du singulier au présent, uniquement pour les verbes forts dont
   * la voyelle change (nehmen → "nimmt", laden → "lädt"). Les verbes réguliers
   * sont conjugués automatiquement.
   */
  praesens?: string;
  /**
   * 2ᵉ personne du singulier, quand elle ne se déduit pas de la 3ᵉ : c'est le
   * cas des radicaux déjà terminés par -t, où le -t final est absorbé au
   * singulier (er hält → du häl**tst**, er tritt → du tri**ttst**).
   */
  praesensDu?: string;

  /** Explication de la règle de genre. Si absente, elle est déduite de la morphologie. */
  rule?: string;
  example?: { de: string; fr: string };
  /**
   * Phrases d'usage supplémentaires : le mot au travail, dans plusieurs contextes.
   */
  sentences?: { de: string; fr: string }[];
  /**
   * Verbes et tournures qui accompagnent habituellement le mot
   * (einen Auftrag **erteilen**). C'est l'information qui manque le plus à un
   * francophone : le mot seul ne dit pas avec quel verbe on l'emploie, et la
   * traduction littérale du français induit en erreur (geben ≠ erteilen).
   */
  collocations?: { de: string; fr: string }[];
  note?: string;
}

export interface Category {
  key: string;
  label: string;
  description: string;
  /** Regroupement affiché dans l'interface */
  group?: string;
}

export function isNoun(w: Word): boolean {
  return (w.kind ?? "noun") === "noun";
}

/** Forme d'affichage complète : "der Auftrag" pour un nom, "liefern" pour un verbe. */
export function displayForm(w: Word): string {
  return isNoun(w) && w.artikel ? `${w.artikel} ${w.de}` : w.de;
}
