import type { Metadata } from "next";
import TargetedQuiz from "@/components/TargetedQuiz";

export const metadata: Metadata = {
  title: "Wechselpräpositionen",
};

export default function PraepositionenPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-1">Wechselpräpositionen</h1>
      <p className="text-muted italic text-[14.5px] mb-4">
        Neuf prépositions hésitent entre accusatif et datif, et c&rsquo;est le <b>verbe</b> qui
        tranche : déplacement vers un lieu (wohin ?) ou position dans un lieu (wo ?).
        La règle la plus rentable de toute la grammaire des cas.
      </p>
      <TargetedQuiz kind="preposition" />
    </div>
  );
}
