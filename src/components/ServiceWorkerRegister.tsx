"use client";

import { useEffect } from "react";
import { asset } from "@/lib/basePath";

/** Enregistre le service worker qui rend l'app utilisable hors-ligne. */
export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    // En développement le service worker sert du contenu périmé : inutile ici.
    if (process.env.NODE_ENV !== "production") return;

    const onLoad = () => {
      navigator.serviceWorker.register(asset("/sw.js"), { scope: asset("/") }).catch(() => {
        // Contexte non sécurisé ou navigateur sans support : l'app reste utilisable en ligne.
      });
    };

    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return null;
}
