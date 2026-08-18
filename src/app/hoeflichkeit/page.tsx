import type { Metadata } from "next";
import TargetedQuiz from "@/components/TargetedQuiz";

export const metadata: Metadata = {
  title: "Registre professionnel",
};

export default function HoeflichkeitPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-1">Registre professionnel</h1>
      <p className="text-muted italic text-[14.5px] mb-4">
        <i>Schicken Sie mir den Lieferschein</i> est correct — et brutal. L&rsquo;allemand de
        bureau atténue tout au Konjunktiv II : <i>könnten</i>, <i>hätte</i>, <i>wäre</i>,
        <i>würde</i>.
      </p>
      <TargetedQuiz kind="politeness" />
    </div>
  );
}
