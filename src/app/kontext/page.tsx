import type { Metadata } from "next";
import TargetedQuiz from "@/components/TargetedQuiz";

export const metadata: Metadata = {
  title: "Le mot en contexte",
};

export default function KontextPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-1">Le mot en contexte</h1>
      <p className="text-muted italic text-[14.5px] mb-4">
        Une phrase vraie, un mot manquant. C&rsquo;est la phrase — son article, son verbe, sa
        construction — qui doit désigner le mot, pas sa traduction.
      </p>
      <TargetedQuiz kind="cloze" />
    </div>
  );
}
