import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import WORDS, { categories, getWordById } from "@/data";
import { isNoun, displayForm } from "@/lib/types";
import { hasDeclension } from "@/lib/declension";
import { ruleFor } from "@/lib/genderRules";
import DeclensionTable from "@/components/DeclensionTable";
import ConjugationTable from "@/components/ConjugationTable";
import WordUsage from "@/components/WordUsage";
import WordDictionary from "@/components/WordDictionary";
import { explainsGender } from "@/lib/compound";
import WordIllustration, { hasIllustration } from "@/components/WordIllustration";
import { canConjugate } from "@/lib/conjugation";
import AudioButton from "@/components/AudioButton";
import Markup from "@/components/Markup";
import WordProgress from "@/components/WordProgress";

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
  return { title: `${displayForm(word)} — ${word.fr}` };
}

const KIND_LABEL: Record<string, string> = {
  verb: "Verbe",
  adjective: "Adjectif",
  phrase: "Expression",
};

export default async function WordPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const word = getWordById(id);
  if (!word) notFound();

  const category = categories.find((c) => c.key === word.category);
  const kindLabel = KIND_LABEL[word.kind ?? "noun"];

  return (
    <div>
      <Link href="/mots" className="font-ui text-[13px] text-muted hover:text-ink">
        ← Vocabulaire
      </Link>

      <div className="mt-4 mb-2 flex items-center gap-2 font-ui text-[10px] uppercase tracking-[0.16em] text-muted">
        <span>{category?.label ?? word.category}</span>
        {kindLabel && (
          <span className="px-2 py-0.5 rounded-full border border-line">{kindLabel}</span>
        )}
      </div>

      {hasIllustration(word.id) && (
        <div className="float-right ml-4 mb-2">
          <WordIllustration id={word.id} size={88} />
        </div>
      )}

      <h1 lang="de" className="german word-display sm:!text-[36px] font-semibold">
        {isNoun(word) && word.artikel ? (
          <>
            <span style={{ color: `var(--${word.artikel})` }}>{word.artikel}</span> {word.de}
          </>
        ) : (
          word.de
        )}
      </h1>
      <div className="text-muted italic mt-1 text-[16px]">{word.fr}</div>

      <div className="flex flex-wrap items-center gap-2 mt-3">
        <AudioButton text={displayForm(word)} label="Prononcer" />
        {word.plural && (
          <span className="font-ui text-[12px] px-3 py-2 rounded-full border border-line text-muted">
            Pl. die {word.plural}
          </span>
        )}
        {word.perfekt && (
          <span className="font-ui text-[12px] px-3 py-2 rounded-full border border-line text-muted">
            {word.perfekt}
          </span>
        )}
        {word.declClass === "weak" && (
          <span className="font-ui text-[12px] px-3 py-2 rounded-full border border-line text-muted">
            n-Deklination
          </span>
        )}
      </div>

      {word.governs && (
        <div className="mt-4 text-[14.5px] bg-paper-2 border border-line rounded-lg px-4 py-3">
          <span className="font-ui text-[10.5px] uppercase tracking-[0.12em] text-muted block mb-1">
            Construction
          </span>
          {word.governs}
        </div>
      )}

      {/* La règle de genre n'est rappelée que si la décomposition ne la montre
          pas déjà : sur un composé, « Waren·eingang → der Eingang » se lit plus
          vite que la règle réécrite à chaque fiche. */}
      {isNoun(word) && !explainsGender(word) && (
        <Markup
          text={ruleFor(word)}
          className="mt-5 text-[14.5px] leading-relaxed bg-paper-2 border-l-[3px] border-gold rounded px-4 py-3"
        />
      )}

      <WordDictionary word={word} />

      {word.example && (
        <div className="mt-4 text-[14.5px]">
          <div className="italic">{word.example.de}</div>
          <div className="text-muted mt-0.5">{word.example.fr}</div>
          <AudioButton text={word.example.de} label="Écouter la phrase" className="mt-2" />
        </div>
      )}

      {word.note && <p className="mt-4 text-[13.5px] text-muted italic">{word.note}</p>}

      <WordUsage word={word} />

      <WordProgress wordId={word.id} />

      {canConjugate(word) && (
        <>
          <h2 className="font-ui text-[11px] uppercase tracking-[0.14em] text-muted mt-9 mb-3">
            Conjugaison au présent
          </h2>
          <ConjugationTable word={word} />
        </>
      )}

      {hasDeclension(word) && (
        <>
          <h2 className="font-ui text-[11px] uppercase tracking-[0.14em] text-muted mt-9 mb-3">
            Déclinaison complète
          </h2>
          <DeclensionTable word={word} />
          <p className="text-[13px] text-muted mt-4 leading-relaxed">
            Le nom lui-même ne change qu&rsquo;au génitif singulier (
            <b className="text-ink">-s / -es</b> au masculin et au neutre) et au datif pluriel
            (<b className="text-ink">-n</b>). Tout le reste se joue sur l&rsquo;article : c&rsquo;est
            lui qui porte l&rsquo;information de cas.
          </p>
        </>
      )}
    </div>
  );
}
