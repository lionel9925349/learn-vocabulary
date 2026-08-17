import type { Metadata } from "next";
import TargetedQuiz from "@/components/TargetedQuiz";

export const metadata: Metadata = {
  title: "der, die oder das ? — Articles",
};

export default function ArticlesPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-1">Articles</h1>
      <p className="text-muted italic text-[14.5px] mb-4">
        der, die ou das ? Chaque erreur revient plus loin dans la série et remonte dans ta
        file de révision.
      </p>
      <TargetedQuiz kind="article" />
    </div>
  );
}
