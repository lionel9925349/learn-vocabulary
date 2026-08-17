/**
 * Service worker : rend l'application utilisable sans réseau (bus, train, métro).
 *
 * Stratégies :
 *  - ressources versionnées (/_next/static) → cache d'abord, elles ne changent jamais ;
 *  - navigations → réseau d'abord (pour récupérer les mises à jour), repli sur le cache ;
 *  - reste → cache d'abord avec rafraîchissement en arrière-plan.
 *
 * Tout le vocabulaire est embarqué dans le JavaScript : une fois l'app chargée,
 * il n'y a plus aucun appel réseau nécessaire pour réviser.
 *
 * ⚠ Les deux constantes ci-dessous sont **réécrites au build** par
 * `scripts/generate-sw.mjs`, qui lit la liste réelle des pages produites et
 * calcule une empreinte du build. Les tenir à jour à la main ne marchait pas :
 * la liste précédente précachait une route « /reviser/ » qui n'existait plus et
 * oubliait sept pages d'exercices, si bien que « hors-ligne complet » n'était
 * vrai que pour la moitié de l'application. Les valeurs écrites ici servent de
 * repli en développement, où le service worker n'est de toute façon pas activé.
 */

const VERSION = "dev";
const PRECACHE_PATHS = ["/"];

const CACHE = `artikel-trainer-${VERSION}`;

// Racine de l'app : "/learn-vocabulary" sur GitHub Pages, "" en local.
const BASE = self.location.pathname.replace(/\/sw\.js$/, "");

const PRECACHE = PRECACHE_PATHS.map((p) => `${BASE}${p}`);

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      // Une ressource manquante ne doit pas faire échouer toute l'installation.
      const results = await Promise.allSettled(PRECACHE.map((url) => cache.add(url)));
      const failed = results.filter((r) => r.status === "rejected").length;
      if (failed > 0) {
        // Visible dans la console de l'app installée : c'est le seul endroit où
        // une liste de précache devenue fausse se voit.
        console.warn(`[sw] ${failed}/${PRECACHE.length} ressources non précachées`);
      }
      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(names.filter((n) => n !== CACHE).map((n) => caches.delete(n)));
      await self.clients.claim();
    })()
  );
});

self.addEventListener("message", (event) => {
  if (event.data === "skip-waiting") self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Fichiers au nom haché : immuables, le cache fait autorité.
  if (url.pathname.includes("/_next/static/")) {
    event.respondWith(cacheFirst(request));
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(navigationHandler(request));
    return;
  }

  event.respondWith(staleWhileRevalidate(request));
});

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) (await caches.open(CACHE)).put(request, response.clone());
  return response;
}

async function navigationHandler(request) {
  try {
    const response = await fetch(request);
    if (response.ok) (await caches.open(CACHE)).put(request, response.clone());
    return response;
  } catch {
    // Hors-ligne : la page demandée, sinon la racine de l'app.
    return (await caches.match(request)) ?? (await caches.match(`${BASE}/`)) ?? Response.error();
  }
}

async function staleWhileRevalidate(request) {
  const cached = await caches.match(request);
  const network = fetch(request)
    .then(async (response) => {
      if (response.ok) (await caches.open(CACHE)).put(request, response.clone());
      return response;
    })
    .catch(() => null);
  return cached ?? (await network) ?? Response.error();
}
