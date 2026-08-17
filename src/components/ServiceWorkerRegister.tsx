"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { asset } from "@/lib/basePath";

/**
 * Enregistre le service worker qui rend l'app utilisable hors-ligne, et rend
 * visibles les deux états qu'il ne montrait pas :
 *
 *  - **perte du réseau** : l'app continue de fonctionner, mais mieux vaut le
 *    dire que laisser croire à un plantage ;
 *  - **nouvelle version prête** : le service worker prenait déjà la main tout
 *    seul, mais l'onglet ouvert gardait l'ancien code jusqu'au rechargement
 *    suivant, sans que rien ne l'indique.
 */
export default function ServiceWorkerRegister() {
  const online = useOnline();
  const [waiting, setWaiting] = useState<ServiceWorker | null>(null);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    // En développement le service worker sert du contenu périmé : inutile ici.
    if (process.env.NODE_ENV !== "production") return;

    let cancelled = false;

    const onLoad = () => {
      navigator.serviceWorker
        .register(asset("/sw.js"), { scope: asset("/") })
        .then((registration) => {
          if (cancelled) return;
          if (registration.waiting) setWaiting(registration.waiting);

          registration.addEventListener("updatefound", () => {
            const installing = registration.installing;
            if (!installing) return;
            installing.addEventListener("statechange", () => {
              // « installed » avec un contrôleur déjà en place = mise à jour
              // en attente, et non première installation.
              if (installing.state === "installed" && navigator.serviceWorker.controller) {
                setWaiting(installing);
              }
            });
          });
        })
        .catch(() => {
          // Contexte non sécurisé ou navigateur sans support : l'app reste utilisable en ligne.
        });
    };

    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad);
    return () => {
      cancelled = true;
      window.removeEventListener("load", onLoad);
    };
  }, []);

  function applyUpdate() {
    waiting?.postMessage("skip-waiting");
    window.location.reload();
  }

  return (
    // La région vit en permanence dans le DOM : un lecteur d'écran n'annonce
    // que les changements survenus *dans* une région déjà présente.
    <div
      className="fixed inset-x-0 z-40 px-4 pointer-events-none"
      style={{ top: "calc(env(safe-area-inset-top) + 3.7rem)" }}
      role="status"
      aria-live="polite"
    >
      <div className="max-w-2xl mx-auto pointer-events-auto">
        {waiting ? (
          <div className="flex items-center justify-between gap-3 rounded-lg border border-line bg-paper-2 px-4 py-2.5 shadow-lg">
            <span className="font-ui text-[12.5px]">Une nouvelle version est prête.</span>
            <button
              onClick={applyUpdate}
              className="font-ui text-[12px] px-3 py-1.5 rounded-full bg-ink text-paper shrink-0"
            >
              Recharger
            </button>
          </div>
        ) : !online ? (
          <div className="rounded-lg border border-line bg-paper-2 px-4 py-2 shadow-lg text-center">
            <span className="font-ui text-[12px] text-muted">
              Hors-ligne — tout le vocabulaire reste disponible.
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/**
 * État du réseau.
 *
 * Lu via `useSyncExternalStore` pour que le rendu serveur (export statique)
 * suppose « en ligne » et que le client n'ait pas de décalage d'hydratation.
 */
function subscribeOnline(cb: () => void): () => void {
  window.addEventListener("online", cb);
  window.addEventListener("offline", cb);
  return () => {
    window.removeEventListener("online", cb);
    window.removeEventListener("offline", cb);
  };
}

function useOnline(): boolean {
  return useSyncExternalStore(
    subscribeOnline,
    () => navigator.onLine,
    () => true
  );
}
