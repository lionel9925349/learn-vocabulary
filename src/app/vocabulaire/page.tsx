import type { Metadata } from "next";
import TargetedQuiz from "@/components/TargetedQuiz";

export const metadata: Metadata = {
  title: "Vocabulaire — le sens des mots",
};

export default function VocabulairePage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-1">Vocabulaire</h1>
      <p className="text-muted italic text-[14.5px] mb-4">
        Le sens, dans les deux sens : de l&rsquo;allemand vers le français, puis l&rsquo;inverse.
        Une réponse, la définition du mot, et on enchaîne avec « Suivant ».
      </p>
      <TargetedQuiz kind={["de-fr", "fr-de"]} />
    </div>
  );
}
