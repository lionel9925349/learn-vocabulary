/**
 * Écrit la liste de précache et la version du service worker, après le build.
 *
 *   node scripts/generate-sw.mjs        (lancé par `npm run build`)
 *
 * Pourquoi une génération plutôt qu'une liste écrite à la main : la précédente
 * précachait « /reviser/ », une route supprimée depuis, et ignorait sept pages
 * d'exercices ajoutées après elle. Rien ne le signalait — `Promise.allSettled`
 * avale les échecs — et l'application se contentait de retomber sur l'accueil
 * quand on ouvrait « Écrire en allemand » dans le train.
 *
 * Sont précachés :
 *  - toutes les pages sauf les fiches de mots (il y en a plus de mille : elles
 *    se mettent en cache à la visite, comme avant) ;
 *  - la charge utile RSC de ces pages, pour que la navigation interne reste
 *    fluide hors-ligne au lieu de forcer un rechargement complet ;
 *  - la totalité de `_next/static`, c'est-à-dire le code et le vocabulaire :
 *    sans lui, « hors-ligne » ne veut rien dire.
 */
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, posix, relative, sep } from "node:path";

const OUT = "out";
const TEMPLATE = join("public", "sw.js");
const TARGET = join(OUT, "sw.js");

/** Répertoires dont on ne précache pas les pages : trop nombreuses. */
const SKIP_PREFIXES = ["mots/"];

/** Chemins de `out/` correspondant à des pages, en chemins d'URL. */
function collectRoutes(dir, base = "") {
  const routes = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    if (entry.name === "_next" || entry.name === "icons") continue;

    // On écarte les fiches (`mots/<id>`), pas la page qui les liste (`mots`).
    const rel = base ? `${base}/${entry.name}` : entry.name;
    if (SKIP_PREFIXES.some((p) => rel.startsWith(p))) continue;

    const child = join(dir, entry.name);
    const files = readdirSync(child);
    if (files.includes("index.html")) routes.push(`/${rel}/`);
    routes.push(...collectRoutes(child, rel));
  }
  return routes;
}

/** Tous les fichiers sous un répertoire, en chemins d'URL relatifs à `out/`. */
function collectFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...collectFiles(full));
    else out.push(`/${relative(OUT, full).split(sep).join(posix.sep)}`);
  }
  return out;
}

const routes = ["/", ...collectRoutes(OUT).sort()];

// La charge utile RSC d'une page : ce que Next va chercher lors d'une
// navigation interne. Sans elle, hors-ligne, chaque clic force un rechargement.
// Toutes les pages n'en ont pas (la page 404 statique, par exemple) : on ne
// précache que ce qui existe, sinon l'installation signalerait un échec à vie.
const payloads = routes
  .map((r) => `${r}index.txt`)
  .filter((p) => existsSync(join(OUT, p)));

const staticFiles = collectFiles(join(OUT, "_next", "static")).sort();

const paths = [
  ...routes,
  ...payloads,
  "/manifest.webmanifest",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  ...staticFiles,
];

/**
 * Empreinte du build : elle change dès qu'un octet servi change, ce qui purge
 * l'ancien cache à l'activation. Auparavant la version était une constante
 * relevée à la main, donc jamais relevée.
 */
const fingerprint = createHash("sha256");
for (const p of [...paths].sort()) {
  fingerprint.update(p);
  try {
    fingerprint.update(String(statSync(join(OUT, p)).size));
  } catch {
    // Fichier absent : il ressortira comme échec de précache, pas comme crash.
  }
}
const version = fingerprint.digest("hex").slice(0, 12);

const template = readFileSync(TEMPLATE, "utf8");
const filled = template
  .replace(/^const VERSION = .*$/m, `const VERSION = ${JSON.stringify(version)};`)
  .replace(
    /^const PRECACHE_PATHS = .*$/m,
    `const PRECACHE_PATHS = ${JSON.stringify(paths, null, 2)};`
  );

if (filled === template) {
  console.error("scripts/generate-sw.mjs : gabarit non reconnu, sw.js laissé tel quel");
  process.exit(1);
}

writeFileSync(TARGET, filled);
console.log(
  `sw.js : version ${version}, ${routes.length} pages + ${staticFiles.length} fichiers statiques précachés`
);
