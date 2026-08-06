import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import WORDS, { categories, getWordById } from "@/data";
import DeclensionTable from "@/components/DeclensionTable";
import { mdBold } from "@/lib/markdown";

export function generateStaticParams() {
  return WORDS.map((w) => ({ id: w.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const word = getWordById(id);
  if (!word) return {};
  return { title: `${word.artikel} ${word.de} — ${word.fr}` };
}

export default async function WordPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const word = getWordById(id);
  if (!word) notFound();

  const category = categories.find((c) => c.key === word.category);

  return (
    <div>
      <Link href="/mots" className="font-ui text-[13px] text-muted hover:text-ink">
        ← Retour au vocabulaire
      </Link>

      <div className="mt-4 mb-2 font-ui text-[10.5px] uppercase tracking-[0.18em] text-muted">
        {category?.label ?? word.category}
      </div>

      <h1 className="text-[34px] font-semibold leading-tight">
        <span style={{ color: `var(--${word.artikel})` }}>{word.artikel}</span> {word.de}
      </h1>
      <div className="text-muted italic mt-1">
        {word.fr}
        {word.plural ? ` · Pluriel : die ${word.plural}` : " · pas de pluriel courant"}
      </div>

      <div
        className="mt-5 text-[14.5px] bg-paper-2 border-l-[3px] rounded-sm px-3.5 py-2.5"
        style={{ borderColor: "var(--gold)" }}
        dangerouslySetInnerHTML={{ __html: mdBold(word.rule) }}
      />

      <div className="mt-3 text-[14.5px] text-muted">
        <span dangerouslySetInnerHTML={{ __html: mdBold(word.example.de) }} />
        <div className="mt-0.5">{word.example.fr}</div>
      </div>

      {word.note && <p className="mt-3 text-[13.5px] text-muted italic">{word.note}</p>}

      <h2 className="font-ui text-[11px] uppercase tracking-[0.14em] text-muted mt-8 mb-3">
        Déclinaison complète
      </h2>
      <DeclensionTable word={word} />
    </div>
  );
}
