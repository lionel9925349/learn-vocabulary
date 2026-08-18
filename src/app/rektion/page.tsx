import type { Metadata } from "next";
import TargetedQuiz from "@/components/TargetedQuiz";

export const metadata: Metadata = {
  title: "Rection des verbes",
};

export default function RektionPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-1">Rection des verbes</h1>
      <p className="text-muted italic text-[14.5px] mb-4">
        <i>warten <b>auf</b></i>, <i>teilnehmen <b>an</b></i>, <i>sich kümmern <b>um</b></i> : la
        préposition fait partie du verbe et ne se traduit pas depuis le français. Le point
        qui trahit le plus sûrement un francophone.
      </p>
      <TargetedQuiz kind="governs" />
    </div>
  );
}
