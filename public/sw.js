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
 */

const VERSION = "v2";
const CACHE = `artikel-trainer-${VERSION}`;

// Racine de l'app : "/learn-vocabulary" sur GitHub Pages, "" en local.
const BASE = self.location.pathname.replace(/\/sw\.js$/, "");

const PRECACHE = [
  `${BASE}/`,
  `${BASE}/reviser/`,
  `${BASE}/exercices/`,
  `${BASE}/mots/`,
  `${BASE}/progres/`,
  `${BASE}/manifest.webmanifest`,
  `${BASE}/icons/icon-192.png`,
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      // Une ressource manquante ne doit pas faire échouer toute l'installation.
      await Promise.allSettled(PRECACHE.map((url) => cache.add(url)));
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
