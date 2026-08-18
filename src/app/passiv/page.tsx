import type { Metadata } from "next";
import TargetedQuiz from "@/components/TargetedQuiz";

export const metadata: Metadata = {
  title: "Le passif",
};

export default function PassivPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-1">Le passif</h1>
      <p className="text-muted italic text-[14.5px] mb-4">
        <i>Die Ware <b>wird</b> geliefert</i> — l&rsquo;opération en cours. <i>Die Ware <b>ist</b>
        geliefert</i> — le résultat acquis. Le français dit « est » dans les deux cas ;
        l&rsquo;allemand non.
      </p>
      <TargetedQuiz kind="passive" />
    </div>
  );
}
