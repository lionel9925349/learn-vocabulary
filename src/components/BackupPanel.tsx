"use client";

import { useRef, useState } from "react";
import { exportProgress, importProgress } from "@/lib/srsStore";

/**
 * Sauvegarde de la progression.
 *
 * Sans serveur, la progression vit dans le navigateur — et un navigateur, ça
 * s'efface : nettoyage de cache, changement de téléphone, ou purge automatique
 * d'iOS pour un site peu visité. Sur un an d'apprentissage, c'est le seul vrai
 * risque de tout perdre. D'où l'export dans un fichier que l'on garde ailleurs.
 */
export default function BackupPanel() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<{ text: string; ok: boolean } | null>(null);

  function download() {
    const data = exportProgress();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const date = new Date().toISOString().slice(0, 10);

    const a = document.createElement("a");
    a.href = url;
    a.download = `artikel-trainer-progression-${date}.json`;
    a.click();
    URL.revokeObjectURL(url);

    setMessage({ text: "Fichier de sauvegarde téléchargé.", ok: true });
  }

  async function handleFile(file: File) {
    const text = await file.text();
    const ok = importProgress(text);
    setMessage(
      ok
        ? { text: "Progression restaurée.", ok: true }
        : { text: "Fichier illisible : ce n'est pas une sauvegarde valide.", ok: false }
    );
  }

  return (
    <div className="mt-6 border border-line rounded-lg p-4">
      <h3 className="font-ui text-[11px] uppercase tracking-[0.12em] text-muted mb-2">
        Sauvegarde
      </h3>
      <p className="text-[13.5px] text-muted mb-3 leading-relaxed">
        Ta progression n&rsquo;existe que dans ce navigateur. Exporte-la de temps en temps :
        c&rsquo;est ce qui te permet de la retrouver après un changement de téléphone ou un
        effacement des données.
      </p>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={download}
          className="font-ui text-[12.5px] px-4 py-2.5 rounded-lg bg-ink text-paper active:scale-[0.98] transition"
        >
          Exporter ma progression
        </button>
        <button
          onClick={() => inputRef.current?.click()}
          className="font-ui text-[12.5px] px-4 py-2.5 rounded-lg border border-line text-muted hover:border-ink hover:text-ink transition"
        >
          Restaurer depuis un fichier
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="application/json,.json"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          // Permet de réimporter deux fois de suite le même fichier.
          e.target.value = "";
        }}
      />

      {message && (
        <p
          className="font-ui text-[12.5px] mt-3"
          style={{ color: message.ok ? "var(--das)" : "var(--die)" }}
          role="status"
        >
          {message.text}
        </p>
      )}
    </div>
  );
}
