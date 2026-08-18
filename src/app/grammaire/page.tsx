import type { Metadata } from "next";
import Link from "next/link";
import WORDS from "@/data";
import Markup from "@/components/Markup";
import { CASE_INFO, CASES, articleFor } from "@/lib/declension";
import {
  GROUP_HINTS,
  GROUP_LABELS,
  PREPOSITIONS_BY_GROUP,
  type PrepositionGroup,
} from "@/lib/prepositions";
import { parseRektion, slotLabel } from "@/lib/rektion";

export const metadata: Metadata = {
  title: "Mémento de grammaire",
};

const GROUP_ORDER: PrepositionGroup[] = ["accusative", "dative", "two-way", "genitive"];

/** Rections relevées dans le vocabulaire, groupées par préposition. */
function rektionenByPreposition() {
  const map = new Map<string, { verb: string; fr: string; label: string }[]>();
  for (const word of WORDS) {
    const rektion = parseRektion(word.governs);
    if (!rektion) continue;
    for (const slot of rektion.slots) {
      const list = map.get(slot.prep) ?? [];
      list.push({ verb: word.de, fr: word.fr, label: slotLabel(slot) });
      map.set(slot.prep, list);
    }
  }
  return [...map.entries()].sort((a, b) => b[1].length - a[1].length);
}

function Section({
  title,
  lead,
  children,
}: {
  title: string;
  lead?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold">{title}</h2>
      {lead && <p className="text-[14px] text-muted mt-1 leading-relaxed">{lead}</p>}
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Table({ children }: { children: React.ReactNode }) {
  // Un tableau large doit défiler dans son propre cadre : la page, elle, ne
  // défile jamais horizontalement.
  return (
    <div className="overflow-x-auto -mx-1 px-1">
      <table className="w-full text-[14px] border-collapse">{children}</table>
    </div>
  );
}

export default function GrammairePage() {
  const rektionen = rektionenByPreposition();

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-1">Mémento de grammaire</h1>
      <p className="text-muted italic text-[14.5px]">
        Ce qu&rsquo;il faut avoir sous les yeux quand un exercice résiste. Rien ici n&rsquo;est
        à apprendre par cœur d&rsquo;un coup : ces tableaux servent à comprendre une faute
        une fois qu&rsquo;on l&rsquo;a faite.
      </p>

      {/* ————————————————— Les cas ————————————————— */}
      <Section
        title="Les quatre cas"
        lead="Le cas ne dit pas ce qu'est le mot, il dit quel rôle il joue dans la phrase. C'est l'article qui le porte, presque jamais le nom."
      >
        <Table>
          <thead>
            <tr className="border-b border-line text-left font-ui text-[11px] uppercase tracking-[0.1em] text-muted">
              <th className="py-2 pr-3">Cas</th>
              <th className="py-2 pr-3">Question</th>
              <th className="py-2">Rôle</th>
            </tr>
          </thead>
          <tbody>
            {CASES.map((c) => (
              <tr key={c} className="border-b border-line">
                <td className="py-2 pr-3 font-semibold" lang="de">
                  {c}
                </td>
                <td className="py-2 pr-3 text-muted" lang="de">
                  {CASE_INFO[c].question}
                </td>
                <td className="py-2">{CASE_INFO[c].fr}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <h3 className="font-ui text-[11px] uppercase tracking-[0.12em] text-muted mt-6 mb-2">
          L&rsquo;article défini
        </h3>
        <Table>
          <thead>
            <tr className="border-b border-line text-left font-ui text-[11px] uppercase tracking-[0.1em] text-muted">
              <th className="py-2 pr-3"></th>
              <th className="py-2 pr-3">masculin</th>
              <th className="py-2 pr-3">féminin</th>
              <th className="py-2 pr-3">neutre</th>
              <th className="py-2">pluriel</th>
            </tr>
          </thead>
          <tbody>
            {CASES.map((c) => (
              <tr key={c} className="border-b border-line">
                <td className="py-2 pr-3 font-ui text-[12px] text-muted">{CASE_INFO[c].short}</td>
                {(["m", "f", "n", "pl"] as const).map((g) => (
                  <td key={g} className="py-2 pr-3 font-semibold" lang="de">
                    {articleFor(g, c, "definite")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
        <p className="text-[13px] text-muted mt-3 leading-relaxed">
          Le nom lui-même ne bouge qu&rsquo;à deux endroits : <b className="text-ink">-s / -es</b>{" "}
          au génitif singulier masculin et neutre, <b className="text-ink">-n</b> au datif
          pluriel. Tout le reste se joue sur l&rsquo;article.
        </p>
      </Section>

      {/* ————————————————— Prépositions ————————————————— */}
      <Section
        title="Les prépositions et leur cas"
        lead="Une préposition impose son cas, et il n'y a pas de logique à comprendre pour la plupart : elles s'apprennent par groupes."
      >
        {GROUP_ORDER.map((group) => (
          <div key={group} className="mt-5">
            <h3 className="font-ui text-[11px] uppercase tracking-[0.12em] text-muted mb-1">
              {GROUP_LABELS[group]}
            </h3>
            <Markup text={GROUP_HINTS[group]} className="text-[13.5px] text-muted leading-relaxed mb-2" />
            <ul className="border-t border-line">
              {PREPOSITIONS_BY_GROUP[group].map((p) => (
                <li key={p.de} className="py-2 border-b border-line">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <span lang="de" className="font-semibold text-[15px]">
                      {p.de}
                    </span>
                    <span className="text-muted italic text-[13.5px]">{p.fr}</span>
                    {p.contraction && (
                      <span className="font-ui text-[11px] text-muted">
                        contracté : {p.contraction}
                      </span>
                    )}
                  </div>
                  {p.note && (
                    <Markup text={p.note} className="text-[13px] text-muted mt-0.5 leading-relaxed" />
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Section>

      {/* ————————————————— wohin / wo ————————————————— */}
      <Section
        title="Wohin ? ou wo ? — la règle qui rapporte le plus"
        lead="Les neuf prépositions mixtes se partagent entre accusatif et datif selon le verbe, et non selon la préposition."
      >
        <Table>
          <thead>
            <tr className="border-b border-line text-left font-ui text-[11px] uppercase tracking-[0.1em] text-muted">
              <th className="py-2 pr-3">Question</th>
              <th className="py-2 pr-3">Cas</th>
              <th className="py-2">Verbes typiques</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-line">
              <td className="py-2 pr-3 font-semibold" lang="de">
                wohin?
              </td>
              <td className="py-2 pr-3" style={{ color: "var(--die)" }}>
                Akkusativ
              </td>
              <td className="py-2" lang="de">
                stellen, legen, fahren, schieben, heben
              </td>
            </tr>
            <tr className="border-b border-line">
              <td className="py-2 pr-3 font-semibold" lang="de">
                wo?
              </td>
              <td className="py-2 pr-3" style={{ color: "var(--der)" }}>
                Dativ
              </td>
              <td className="py-2" lang="de">
                stehen, liegen, warten, halten, parken
              </td>
            </tr>
          </tbody>
        </Table>
        <p className="text-[13.5px] text-muted mt-3 leading-relaxed">
          <span lang="de" className="text-ink">
            Der Stapler fährt in <b>die</b> Halle.
          </span>{" "}
          — il y entre, donc accusatif.
          <br />
          <span lang="de" className="text-ink">
            Der Stapler steht in <b>der</b> Halle.
          </span>{" "}
          — il y est, donc datif.
        </p>
        <Link
          href="/praepositionen"
          className="inline-block mt-3 font-ui text-[12.5px] text-muted underline decoration-line hover:text-ink"
        >
          S&rsquo;entraîner sur ce point →
        </Link>
      </Section>

      {/* ————————————————— Ordre des mots ————————————————— */}
      <Section
        title="La parenthèse verbale"
        lead="Le groupe verbal allemand ne reste pas d'un bloc : il encadre la phrase. C'est la structure qui distingue le plus nettement une phrase allemande d'une phrase française traduite."
      >
        <ul className="border-t border-line">
          {[
            {
              label: "Parfait",
              de: "Wir **haben** die Ware **geliefert**.",
              rule: "Auxiliaire en 2ᵉ position, participe à la fin.",
            },
            {
              label: "Verbe de modalité",
              de: "Wir **müssen** die Ware **liefern**.",
              rule: "Modal en 2ᵉ position, infinitif à la fin.",
            },
            {
              label: "Particule séparable",
              de: "Wir **holen** die Ware **ab**.",
              rule: "Le radical se conjugue, la particule part à la fin.",
            },
            {
              label: "Autre chose en tête",
              de: "Heute **liefern** **wir** die Ware.",
              rule: "Le verbe reste deuxième : c'est le sujet qui passe derrière lui.",
            },
            {
              label: "Subordonnée",
              de: "…, weil wir die Ware geliefert **haben**.",
              rule: "Le verbe conjugué va tout à la fin, derrière le participe.",
            },
            {
              label: "Subordonnée, verbe simple",
              de: "…, dass der Lieferant die Ware **abholt**.",
              rule: "La particule recolle au verbe : abholt, jamais « holt … ab ».",
            },
          ].map((row) => (
            <li key={row.label} className="py-2.5 border-b border-line">
              <div className="font-ui text-[11px] uppercase tracking-[0.1em] text-muted">
                {row.label}
              </div>
              <Markup text={row.de} className="german text-[15px] mt-0.5" />
              <div className="text-[13px] text-muted mt-0.5">{row.rule}</div>
            </li>
          ))}
        </ul>
        <Link
          href="/satzbau"
          className="inline-block mt-3 font-ui text-[12.5px] text-muted underline decoration-line hover:text-ink"
        >
          Reconstruire des phrases →
        </Link>
      </Section>

      {/* ————————————————— Passif ————————————————— */}
      <Section
        title="Le passif"
        lead="Le français dit « la marchandise est livrée » pour l'opération comme pour le résultat. L'allemand les sépare, et la distinction compte dans un entrepôt."
      >
        <Table>
          <thead>
            <tr className="border-b border-line text-left font-ui text-[11px] uppercase tracking-[0.1em] text-muted">
              <th className="py-2 pr-3">Forme</th>
              <th className="py-2 pr-3">Exemple</th>
              <th className="py-2">Sens</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Présent", "Die Ware wird geliefert.", "L'opération est en cours."],
              ["Prétérit", "Die Ware wurde geliefert.", "L'opération a eu lieu."],
              ["Parfait", "Die Ware ist geliefert worden.", "L'opération a eu lieu (registre oral)."],
              ["État", "Die Ware ist geliefert.", "Le résultat : c'est fait, elle est là."],
            ].map(([form, de, sens]) => (
              <tr key={form} className="border-b border-line">
                <td className="py-2 pr-3 font-ui text-[12px] text-muted whitespace-nowrap">{form}</td>
                <td className="py-2 pr-3" lang="de">
                  {de}
                </td>
                <td className="py-2 text-muted text-[13px]">{sens}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <p className="text-[13px] text-muted mt-3 leading-relaxed">
          Au parfait, le participe de <span lang="de">werden</span> perd son ge- :{" "}
          <b className="text-ink">worden</b>, jamais <i>geworden</i>. C&rsquo;est la marque du
          passif.
        </p>
      </Section>

      {/* ————————————————— Konjunktiv II ————————————————— */}
      <Section
        title="Konjunktiv II — la politesse"
        lead="L'atténuation n'est pas une élégance optionnelle : sans elle, une demande allemande passe pour un ordre."
      >
        <Table>
          <thead>
            <tr className="border-b border-line text-left font-ui text-[11px] uppercase tracking-[0.1em] text-muted">
              <th className="py-2 pr-3">Verbe</th>
              <th className="py-2 pr-3">Konjunktiv II</th>
              <th className="py-2">Emploi</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["können", "könnte", "Könnten Sie… — la demande standard"],
              ["haben", "hätte", "Ich hätte gerne… — je voudrais"],
              ["sein", "wäre", "Wäre es möglich… — serait-il possible"],
              ["werden", "würde", "Wir würden vorschlagen… — nous proposerions"],
              ["sollen", "sollte", "Wir sollten… — il faudrait que"],
              ["dürfen", "dürfte", "Dürfte ich… — puis-je me permettre"],
            ].map(([verb, form, use]) => (
              <tr key={verb} className="border-b border-line">
                <td className="py-2 pr-3 text-muted" lang="de">
                  {verb}
                </td>
                <td className="py-2 pr-3 font-semibold" lang="de">
                  {form}
                </td>
                <td className="py-2 text-[13px]">{use}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Link
          href="/hoeflichkeit"
          className="inline-block mt-3 font-ui text-[12.5px] text-muted underline decoration-line hover:text-ink"
        >
          S&rsquo;entraîner sur le registre →
        </Link>
      </Section>

      {/* ————————————————— Rections ————————————————— */}
      <Section
        title="Rections relevées dans le vocabulaire"
        lead="Chaque verbe impose sa préposition, et elle ne se traduit pas depuis le français. Les voici groupées par préposition — c'est ainsi qu'elles se retiennent le mieux."
      >
        {rektionen.map(([prep, verbs]) => (
          <div key={prep} className="mt-4">
            <h3 className="font-ui text-[12px] uppercase tracking-[0.12em] text-muted mb-1">
              <span lang="de" className="text-ink font-semibold text-[14px]">
                {prep}
              </span>{" "}
              · {verbs.length} verbe{verbs.length > 1 ? "s" : ""}
            </h3>
            <ul className="border-t border-line">
              {verbs.map((v) => (
                <li
                  key={`${prep}-${v.verb}`}
                  className="flex flex-wrap items-baseline gap-x-2 py-1.5 border-b border-line"
                >
                  <span lang="de" className="text-[14.5px] font-medium">
                    {v.verb}
                  </span>
                  <span className="font-ui text-[11.5px] text-muted">{v.label}</span>
                  <span className="text-muted italic text-[13px]">{v.fr}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <Link
          href="/rektion"
          className="inline-block mt-4 font-ui text-[12.5px] text-muted underline decoration-line hover:text-ink"
        >
          S&rsquo;entraîner sur les rections →
        </Link>
      </Section>

      <div className="h-6" />
    </div>
  );
}
