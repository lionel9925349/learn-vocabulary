import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import WordBrowser from "@/components/WordBrowser";
import WORDS from "@/data";

export const metadata: Metadata = {
  title: "Vocabulaire — Logistik & IT",
};

export default function MotsPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-1">Vocabulaire</h1>
      <p className="text-muted italic text-[15px] mb-4">
        Cherche un mot ou filtre par thème. Clique sur un mot pour voir sa fiche : sens,
        décomposition et déclinaison complète.
      </p>

      <Link
        href="/vocabulaire"
        className="block rounded-lg border border-line bg-paper-2 px-4 py-3 mb-6 hover:border-ink transition-colors"
        style={{ borderLeftWidth: 4, borderLeftColor: "var(--gold)" }}
      >
        <span className="font-semibold text-[15px]">Réviser le sens de ces mots →</span>
        <span className="block text-[13.5px] text-muted mt-0.5">
          Question, réponse, définition, « Suivant ». Sans quitter la liste des yeux.
        </span>
      </Link>
      <Suspense fallback={null}>
        <WordBrowser words={WORDS} />
      </Suspense>
    </div>
  );
}
