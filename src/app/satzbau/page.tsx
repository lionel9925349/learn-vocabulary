import type { Metadata } from "next";
import TargetedQuiz from "@/components/TargetedQuiz";

export const metadata: Metadata = {
  title: "L'ordre des mots",
};

export default function SatzbauPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-1">L&rsquo;ordre des mots</h1>
      <p className="text-muted italic text-[14.5px] mb-4">
        Le verbe en deuxième position, le reste du groupe verbal à la fin — et l&rsquo;inverse
        en subordonnée. Remets les mots dans l&rsquo;ordre : c&rsquo;est ce qui fait qu&rsquo;une
        phrase sonne allemande ou traduite.
      </p>
      <TargetedQuiz kind="word-order" />
    </div>
  );
}
