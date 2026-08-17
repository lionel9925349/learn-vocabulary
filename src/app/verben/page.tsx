import type { Metadata } from "next";
import TargetedQuiz from "@/components/TargetedQuiz";

export const metadata: Metadata = {
  title: "Conjugaison des verbes",
};

export default function VerbenPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-1">Conjugaison</h1>
      <p className="text-muted italic text-[14.5px] mb-4">
        Le présent, temps de l&rsquo;oral : verbes forts (nehmen → er nimmt) et particules
        séparables (ich hole die Ware ab).
      </p>
      <TargetedQuiz kind="conjugation" />
    </div>
  );
}
