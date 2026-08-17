import type { Metadata } from "next";
import TargetedQuiz from "@/components/TargetedQuiz";

export const metadata: Metadata = {
  title: "Écrire en allemand — rappel actif",
};

export default function EcrirePage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-1">Écrire en allemand</h1>
      <p className="text-muted italic text-[14.5px] mb-4">
        Sans choix multiples : le mot doit sortir de ta mémoire. C&rsquo;est l&rsquo;exercice
        le plus exigeant, et celui qui ancre le mieux.
      </p>
      <TargetedQuiz kind="type-de" />
    </div>
  );
}
