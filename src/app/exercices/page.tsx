import type { Metadata } from "next";
import Link from "next/link";
import WORDS, { categories } from "@/data";
import { isNoun } from "@/lib/types";
import { availableKinds, KIND_SHORT, type QuestionKind } from "@/lib/units";

export const metadata: Metadata = {
  title: "Exercices ciblés",
};

interface Mode {
  href: string;
  title: string;
  desc: string;
  accent: string;
  /** Le type de question travaillé, pour afficher combien de mots s'y prêtent. */
  kind?: QuestionKind;
}

interface Group {
  title: string;
  intro: string;
  modes: Mode[];
}

/**
 * Les exercices, rangés par ce qu'ils font travailler.
 *
 * L'ordre n'est pas décoratif : le vocabulaire d'abord parce qu'il ne suppose
 * rien, la grammaire ensuite parce qu'elle suppose le vocabulaire, le registre
 * en dernier parce qu'il suppose les deux.
 */
const GROUPS: Group[] = [
  {
    title: "Le sens des mots",
    intro: "Reconnaître, produire, replacer en contexte.",
    modes: [
      {
        href: "/vocabulaire",
        title: "Vocabulaire",
        desc: "Le sens des mots, dans les deux sens. Chaque réponse est suivie de sa définition et de sa décomposition.",
        accent: "var(--gold)",
        kind: "de-fr",
      },
      {
        href: "/kontext",
        title: "Le mot en contexte",
        desc: "Une phrase vraie, un mot manquant. C'est la construction de la phrase qui doit désigner le mot.",
        accent: "var(--gold)",
        kind: "cloze",
      },
      {
        href: "/ecrire",
        title: "Écrire en allemand",
        desc: "Sans choix multiples : tu tapes le mot. Le plus exigeant, et celui qui ancre le mieux.",
        accent: "var(--gold)",
        kind: "type-de",
      },
      {
        href: "/flashcards",
        title: "Cartes mémoire",
        desc: "Révision passive, sans quiz : on retourne la carte et on avance. Idéal debout dans le bus.",
        accent: "var(--gold)",
      },
    ],
  },
  {
    title: "Les cas",
    intro: "Qui commande le cas : l'article, la préposition, ou le verbe.",
    modes: [
      {
        href: "/articles",
        title: "Articles",
        desc: "der, die ou das ? Le réflexe de base, avec la règle expliquée à chaque réponse.",
        accent: "var(--der)",
        kind: "article",
      },
      {
        href: "/declinaisons",
        title: "Déclinaisons de l'article",
        desc: "Nominativ, Akkusativ, Dativ, Genitiv — la bonne forme de l'article dans la phrase.",
        accent: "var(--der)",
        kind: "declension",
      },
      {
        href: "/praepositionen",
        title: "Wechselpräpositionen",
        desc: "Accusatif ou datif ? C'est le verbe qui tranche : on entre dans le lieu, ou on s'y trouve.",
        accent: "var(--der)",
        kind: "preposition",
      },
      {
        href: "/adjektive",
        title: "Déclinaison de l'adjectif",
        desc: "der gute / ein guter / mit gutem — le point le plus dur de l'allemand, avec ses tableaux.",
        accent: "var(--der)",
        kind: "adjective",
      },
    ],
  },
  {
    title: "Le verbe",
    intro: "Ce que le verbe impose autour de lui, et où il se place.",
    modes: [
      {
        href: "/verben",
        title: "Conjugaison",
        desc: "Le présent : verbes forts (er nimmt) et particules séparables (ich hole … ab).",
        accent: "var(--das)",
        kind: "conjugation",
      },
      {
        href: "/perfekt",
        title: "Parfait",
        desc: "haben ou sein, et surtout le ge- : bestellt sans, abgeholt avec, au milieu.",
        accent: "var(--das)",
        kind: "perfect",
      },
      {
        href: "/rektion",
        title: "Rection des verbes",
        desc: "warten auf, teilnehmen an, sich kümmern um. La préposition fait partie du verbe.",
        accent: "var(--das)",
        kind: "governs",
      },
      {
        href: "/passiv",
        title: "Passif",
        desc: "wird geliefert (l'opération) contre ist geliefert (le résultat). Le français ne distingue pas.",
        accent: "var(--das)",
        kind: "passive",
      },
      {
        href: "/satzbau",
        title: "Ordre des mots",
        desc: "Verbe en deuxième position, groupe verbal à la fin — et l'inverse en subordonnée.",
        accent: "var(--das)",
        kind: "word-order",
      },
    ],
  },
  {
    title: "Le registre",
    intro: "Le dernier écart, quand la grammaire est déjà juste.",
    modes: [
      {
        href: "/hoeflichkeit",
        title: "Registre professionnel",
        desc: "Demander, refuser, relancer sans brusquer. Le Konjunktiv II du bureau allemand.",
        accent: "var(--die)",
        kind: "politeness",
      },
    ],
  },
];

/** Combien de mots se prêtent à chaque type de question. */
function countByKind(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const word of WORDS) {
    for (const kind of availableKinds(word)) counts[kind] = (counts[kind] ?? 0) + 1;
  }
  return counts;
}

export default function ExercicesPage() {
  const nouns = WORDS.filter(isNoun).length;
  const counts = countByKind();
  const facets = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-1">Exercices ciblés</h1>
      <p className="text-muted italic text-[14.5px] mb-8">
        Pour travailler un point précis. La session « Réviser » reste le meilleur moyen de
        retenir sur la durée : elle mélange tout cela selon ce qui est dû.
      </p>

      {GROUPS.map((group) => (
        <section key={group.title} className="mb-9">
          <h2 className="font-ui text-[11px] uppercase tracking-[0.14em] text-muted">
            {group.title}
          </h2>
          <p className="text-[13px] text-muted italic mt-0.5 mb-3">{group.intro}</p>

          <div className="grid gap-3">
            {group.modes.map((m) => (
              <Link
                key={m.href}
                href={m.href}
                className="group block rounded-lg border border-line bg-paper-2 p-5 hover:border-ink transition-colors"
                style={{ borderLeftWidth: 4, borderLeftColor: m.accent }}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-lg font-semibold group-hover:text-gold transition-colors">
                    {m.title} →
                  </span>
                  {m.kind && counts[m.kind] > 0 && (
                    <span className="font-ui text-[11px] text-muted shrink-0">
                      {counts[m.kind]} mots
                    </span>
                  )}
                </div>
                <p className="text-[14px] text-muted mt-1">{m.desc}</p>
              </Link>
            ))}
          </div>
        </section>
      ))}

      <Link
        href="/grammaire"
        className="block rounded-lg border border-line bg-paper-2 p-5 hover:border-ink transition-colors"
        style={{ borderLeftWidth: 4, borderLeftColor: "var(--gold)" }}
      >
        <div className="text-lg font-semibold">Mémento de grammaire →</div>
        <p className="text-[14px] text-muted mt-1">
          Les tableaux à consulter quand un exercice résiste : cas et prépositions, parenthèse
          verbale, passif, Konjunktiv II, rections fréquentes.
        </p>
      </Link>

      <h2 className="font-ui text-[11px] uppercase tracking-[0.14em] text-muted mt-9 mb-3">
        Réviser un thème précis
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {categories.map((c) => {
          const count = WORDS.filter((w) => w.category === c.key).length;
          if (count === 0) return null;
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

      <p className="font-ui text-[11.5px] text-muted mt-6 text-center leading-relaxed">
        {WORDS.length} entrées dont {nouns} noms avec article et déclinaison complète.
        <br />
        {facets} questions possibles, réparties sur {Object.keys(KIND_SHORT).length} types.
      </p>
    </div>
  );
}
