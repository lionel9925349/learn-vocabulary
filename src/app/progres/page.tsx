import type { Metadata } from "next";
import ProgressDashboard from "@/components/ProgressDashboard";

export const metadata: Metadata = {
  title: "Progrès",
};

export default function ProgresPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-1">Progrès</h1>
      <p className="text-muted italic text-[14.5px] mb-6">
        Où tu en es, ce qui est ancré, ce qui doit revenir.
      </p>
      <ProgressDashboard />
    </div>
  );
}
