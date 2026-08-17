/**
 * Normalisation du texte allemand, partagée par la correction des réponses
 * tapées et par la recherche dans le vocabulaire.
 *
 * Un clavier français n'a ni ä, ni ö, ni ü, ni ß : quelqu'un qui cherche
 * « grosshandel » doit trouver *Großhandel*, et quelqu'un qui tape « prufung »
 * ne fait pas une faute d'allemand mais une concession à son clavier.
 */

/** Translittération usuelle : ä→ae, ö→oe, ü→ue, ß→ss. */
export function foldGerman(s: string): string {
  return s
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss");
}

/**
 * Forme de comparaison : minuscules, sans ponctuation, espaces normalisés.
 *
 * L'ordre est important, et il était faux : en coupant les bords *avant* de
 * retirer la ponctuation, « der Auftrag ! » laissait une espace finale et ne
 * correspondait plus à « der Auftrag ». On nettoie donc d'abord, on coupe après.
 */
export function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[.,;:!?]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Retire les signes diacritiques (é → e, ü → u). Le ß, qui n'en est pas un, survit. */
function stripDiacritics(s: string): string {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "");
}

/**
 * Les orthographes sous lesquelles un mot peut être cherché.
 *
 * Face à *Losgröße*, un francophone tape « losgrosse » (il ignore et le tréma
 * et l'eszett), « losgroesse » (il connaît la translittération) ou
 * « losgröße » (il a le bon clavier). Aucune forme unique ne couvre les trois :
 * on indexe donc chaque variante, et on compare chaque variante de la requête à
 * chaque variante du mot.
 *
 *   1. tréma retiré, eszett gardé   → losgroße
 *   2. translittération complète    → losgroesse
 *   3. tréma retiré, eszett en ss   → losgrosse
 */
export function searchKeys(s: string): string[] {
  const base = normalize(s);
  const bare = stripDiacritics(base);
  return [...new Set([bare, stripDiacritics(foldGerman(base)), bare.replace(/ß/g, "ss")])];
}

/** Vrai si la requête apparaît dans le texte, quelle que soit la façon de l'écrire. */
export function matchesSearch(haystack: string, queryKeys: readonly string[]): boolean {
  const keys = searchKeys(haystack);
  return queryKeys.some((q) => keys.some((k) => k.includes(q)));
}
