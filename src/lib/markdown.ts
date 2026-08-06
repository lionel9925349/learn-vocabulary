/** Convertit un léger balisage markdown (**gras**) en HTML, en laissant passer le HTML déjà présent. */
export function mdBold(s: string): string {
  return s.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
}
