/** Racine de l'application : "/learn-vocabulary" sur GitHub Pages, "" en local. */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Préfixe un chemin absolu de l'app (pour les fichiers servis depuis public/). */
export function asset(path: string): string {
  return `${BASE_PATH}${path}`;
}
