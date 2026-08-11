import type { Metadata } from "next";
import Link from "next/link";
import WORDS, { categories } from "@/data";
import { isNoun } from "@/lib/types";

export const metadata: Metadata = {
  title: "Exercices ciblés",
};

const MODES = [
  {
    href: "/vocabulaire",
    title: "Vocabulaire",
    desc: "Le sens des mots, dans les deux sens. Chaque réponse est suivie de sa définition et de sa décomposition.",
    accent: "var(--gold)",
  },
  {
    href: "/ecrire",
    title: "Écrire en allemand",
    desc: "Sans choix multiples : tu tapes le mot. Le plus exigeant, et celui qui ancre le mieux.",
    accent: "var(--gold)",
  },
  {
    href: "/articles",
    title: "Articles",
    desc: "der, die ou das ? Le réflexe de base, avec la règle expliquée à chaque réponse.",
    accent: "var(--der)",
  },
  {
    href: "/declinaisons",
    title: "Déclinaisons de l'article",
    desc: "Nominativ, Akkusativ, Dativ, Genitiv — la bonne forme de l'article dans la phrase.",
    accent: "var(--die)",
  },
  {
    href: "/adjektive",
    title: "Déclinaison de l'adjectif",
    desc: "der gute / ein guter / mit gutem — le point le plus dur de l'allemand, avec ses tableaux.",
    accent: "var(--die)",
  },
  {
    href: "/verben",
    title: "Conjugaison",
    desc: "Le présent : verbes forts (er nimmt) et particules séparables (ich hole … ab).",
    accent: "var(--das)",
  },
  {
    href: "/flashcards",
    title: "Cartes mémoire",
    desc: "Révision passive, sans quiz : on retourne la carte et on avance. Idéal debout dans le bus.",
    accent: "var(--das)",
  },
];

export default function ExercicesPage() {
  const nouns = WORDS.filter(isNoun).length;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-1">Exercices ciblés</h1>
      <p className="text-muted italic text-[14.5px] mb-6">
        Pour travailler un point précis. La session « Réviser » reste le meilleur moyen de
        retenir sur la durée.
      </p>

      <div className="grid gap-3">
        {MODES.map((m) => (
          <Link
            key={m.href}
            href={m.href}
            className="group block rounded-lg border border-line bg-paper-2 p-5 hover:border-ink transition-colors"
            style={{ borderLeftWidth: 4, borderLeftColor: m.accent }}
          >
            <div className="text-lg font-semibold group-hover:text-gold transition-colors">
              {m.title} →
            </div>
            <p className="text-[14px] text-muted mt-1">{m.desc}</p>
          </Link>
        ))}
      </div>

      <h2 className="font-ui text-[11px] uppercase tracking-[0.14em] text-muted mt-9 mb-3">
        Réviser un thème précis
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {categories.map((c) => {
          const count = WORDS.filter((w) => w.category === c.key).length;
          return (
            <Link
              key={c.key}
              href={`/mots?cat=${c.key}`}
              className="rounded-lg border border-line px-4 py-3 text-[14px] hover:border-ink hover:bg-paper-2 transition-colors flex items-center justify-between gap-2"
            >
              <span className="truncate">{c.label}</span>
              <span className="font-ui text-[11px] text-muted shrink-0">{count}</span>
            </Link>
          );
        })}
      </div>

      <p className="font-ui text-[11.5px] text-muted mt-6 text-center">
        {WORDS.length} entrées dont {nouns} noms avec article et déclinaison complète.
      </p>
    </div>
  );
}
