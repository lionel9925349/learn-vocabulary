import type { Metadata } from "next";
import DeclensionTrainer from "@/components/DeclensionTrainer";
import WORDS from "@/data";

export const metadata: Metadata = {
  title: "Déclinaisons — Nominativ, Akkusativ, Dativ, Genitiv",
};

export default function DeclinaisonsPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-1">Entraînement aux déclinaisons</h1>
      <p className="text-muted italic text-[15px] mb-6">
        Une phrase, un cas à identifier : choisis la bonne forme de l&rsquo;article parmi les
        six formes possibles (der, die, das, den, dem, des — ou ein/eine/einen&hellip;).
      </p>
      <DeclensionTrainer words={WORDS} />
    </div>
  );
}
