import type { Metadata } from "next";
import { Suspense } from "react";
import WordBrowser from "@/components/WordBrowser";
import WORDS from "@/data";

export const metadata: Metadata = {
  title: "Vocabulaire — Logistik & IT",
};

export default function MotsPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-1">Vocabulaire</h1>
      <p className="text-muted italic text-[15px] mb-6">
        Cherche un mot ou filtre par thème. Clique sur un mot pour voir sa fiche de
        déclinaison complète.
      </p>
      <Suspense fallback={null}>
        <WordBrowser words={WORDS} />
      </Suspense>
    </div>
  );
}
