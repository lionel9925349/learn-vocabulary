import type { Metadata } from "next";
import TargetedQuiz from "@/components/TargetedQuiz";

export const metadata: Metadata = {
  title: "Le parfait",
};

export default function PerfektPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-1">Le parfait</h1>
      <p className="text-muted italic text-[14.5px] mb-4">
        <b>haben</b> ou <b>sein</b> ? Et le participe : <i>bestellt</i> sans ge-, <i>abgeholt</i>
        avec le ge- au milieu. Les deux tiers des fautes de parfait tiennent à ce ge-.
      </p>
      <TargetedQuiz kind="perfect" />
    </div>
  );
}
