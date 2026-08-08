import type { Metadata } from "next";
import TargetedQuiz from "@/components/TargetedQuiz";
import AdjectiveTables from "@/components/AdjectiveTables";
import WORDS from "@/data";

export const metadata: Metadata = {
  title: "Déclinaison de l'adjectif",
};

export default function AdjektivePage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-1">Déclinaison de l&rsquo;adjectif</h1>
      <p className="text-muted italic text-[14.5px] mb-4">
        der gut<b>e</b> Preis · ein gut<b>er</b> Preis · mit gut<b>em</b> Preis. Le point le
        plus dur de l&rsquo;allemand — et le plus payant une fois compris.
      </p>

      <TargetedQuiz pool={WORDS} kind="adjective" />

      <h2 className="font-ui text-[11px] uppercase tracking-[0.14em] text-muted mt-12 mb-4">
        Tableaux de référence
      </h2>
      <AdjectiveTables />
    </div>
  );
}
