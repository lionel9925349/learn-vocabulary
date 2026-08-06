import type { Metadata } from "next";
import ArticleTrainer from "@/components/ArticleTrainer";
import WORDS from "@/data";

export const metadata: Metadata = {
  title: "der, die oder das ? — Articles",
};

export default function ArticlesPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-1">Entraînement aux articles</h1>
      <p className="text-muted italic text-[15px] mb-6">
        Devine l&rsquo;article de chaque mot. Chaque erreur revient un peu plus loin dans la
        série, jamais perdue.
      </p>
      <ArticleTrainer words={WORDS} />
    </div>
  );
}
