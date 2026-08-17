import Link from "next/link";
import type { Word } from "@/lib/types";
import { isNoun } from "@/lib/types";
import { articleOf, decompose, segmented, wordIdOf } from "@/lib/compound";
import Markup from "./Markup";

/**
 * Le volet dictionnaire d'un mot : ce qu'il **veut dire**, quand la traduction
 * ne suffit pas.
 *
 * Deux sources, complémentaires :
 *  - la définition écrite à la main, pour les notions dont le mot français est
 *    lui-même du jargon (Skonto → « escompte », qui n'éclaire personne) ;
 *  - la décomposition du composé, qui rend le mot lisible élément par élément —
 *    et qui explique du même coup son genre, sans avoir à répéter la règle.
 */
export default function WordDictionary({ word, compact = false }: { word: Word; compact?: boolean }) {
  const parts = decompose(word.de);
  if (!word.definition && !parts) return null;

  const last = parts?.[parts.length - 1];
  const lastArticle = last ? articleOf(last.de) : null;

  return (
    <div className={compact ? "mt-3" : "mt-5"}>
      {word.definition && (
        <>
          <h3 className="font-ui text-[10.5px] uppercase tracking-[0.12em] text-muted mb-1.5">
            Ce que ça veut dire
          </h3>
          <Markup
            text={word.definition}
            className="text-[14.5px] leading-relaxed bg-paper-2 border-l-[3px] border-line rounded px-4 py-3"
          />
        </>
      )}

      {parts && (
        <>
          <h3 className="font-ui text-[10.5px] uppercase tracking-[0.12em] text-muted mb-1.5 mt-4">
            Mot à mot
          </h3>
          <div lang="de" className="german text-[15px] mb-1.5">
            {segmented(parts)}
          </div>
          <ul>
            {parts.map((p, i) => {
              const id = wordIdOf(p.de);
              return (
                <li
                  key={`${p.de}-${i}`}
                  className="flex flex-wrap items-baseline gap-x-2 py-1 border-b border-line last:border-0"
                >
                  {/* Un élément qui est lui-même au programme mène à sa fiche :
                      de composé en composé, le vocabulaire se relit tout seul. */}
                  {id ? (
                    <Link
                      href={`/mots/${id}`}
                      prefetch={false}
                      lang="de"
                      className="text-[14px] font-medium underline decoration-line underline-offset-2 hover:text-gold"
                    >
                      {p.de}
                    </Link>
                  ) : (
                    <span lang="de" className="text-[14px] font-medium">
                      {p.de}
                    </span>
                  )}
                  <span className="text-[13px] text-muted italic">{p.fr}</span>
                </li>
              );
            })}
          </ul>
          {isNoun(word) && lastArticle && (
            <p className="text-[13px] text-muted mt-2 leading-relaxed">
              Le genre vient du dernier élément :{" "}
              <b style={{ color: `var(--${lastArticle})` }}>
                {lastArticle} {last?.de}
              </b>
              .
            </p>
          )}
        </>
      )}
    </div>
  );
}
