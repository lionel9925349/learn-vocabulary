/** Échappe le HTML : les données de vocabulaire sont rendues via dangerouslySetInnerHTML. */
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Rend le balisage léger utilisé dans les règles et explications :
 * `**gras**`, `_italique_` et paragraphes séparés par une ligne vide.
 */
export function renderMarkup(s: string): string {
  return escapeHtml(s)
    .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
    .replace(/_(.+?)_/g, "<i>$1</i>")
    .split(/\n\n+/)
    .map((p) => p.replace(/\n/g, "<br/>"))
    .join('</p><p class="mt-2">');
}

/** Conservé pour les appels existants : gras uniquement. */
export function mdBold(s: string): string {
  return renderMarkup(s);
}
