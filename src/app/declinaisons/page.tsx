import type { Metadata } from "next";
import TargetedQuiz from "@/components/TargetedQuiz";

export const metadata: Metadata = {
  title: "Déclinaisons — Nominativ, Akkusativ, Dativ, Genitiv",
};

export default function DeclinaisonsPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-1">Déclinaisons</h1>
      <p className="text-muted italic text-[14.5px] mb-4">
        Une phrase, un cas : trouve la bonne forme de l&rsquo;article parmi les six possibles
        (der, die, das, den, dem, des — ou ein/kein).
      </p>
      <TargetedQuiz kind="declension" />
    </div>
  );
}
