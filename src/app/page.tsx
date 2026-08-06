import Link from "next/link";
import WORDS, { categories } from "@/data";

function countFor(catKey: string) {
  return WORDS.filter((w) => w.category === catKey).length;
}

const CARDS = [
  {
    href: "/articles",
    title: "Entraînement aux articles",
    desc: "der, die ou das ? Devine l'article de chaque mot, avec l'explication de la règle à chaque réponse.",
    accent: "var(--der)",
  },
  {
    href: "/declinaisons",
    title: "Entraînement aux déclinaisons",
    desc: "Nominativ, Akkusativ, Dativ, Genitiv — apprends comment l'article (et le nom) change selon le cas.",
    accent: "var(--die)",
  },
  {
    href: "/mots",
    title: "Explorer le vocabulaire",
    desc: "Cherche un mot, filtre par thème logistique/IT, et consulte sa fiche de déclinaison complète.",
    accent: "var(--das)",
  },
];

export default function Home() {
  return (
    <div>
      <p className="text-muted italic text-[15px] mb-8">
        Vocabulaire allemand de la logistique &amp; de l&rsquo;IT — {WORDS.length} mots,
        classés par thème, chacun avec son article, son pluriel, sa règle de genre et sa
        déclinaison complète.
      </p>

      <div className="grid gap-3">
        {CARDS.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group block rounded-md border border-line bg-paper-2 p-5 hover:border-ink transition-colors"
            style={{ borderLeftWidth: 4, borderLeftColor: c.accent }}
          >
            <div className="text-lg font-semibold group-hover:text-gold transition-colors">
              {c.title} →
            </div>
            <p className="text-[14.5px] text-muted mt-1">{c.desc}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="font-ui text-[11px] uppercase tracking-[0.14em] text-muted mb-3">
          Thèmes disponibles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {categories.map((c) => (
            <Link
              key={c.key}
              href={`/mots?cat=${c.key}`}
              className="rounded border border-line px-3 py-2 text-[13.5px] hover:border-ink hover:bg-paper-2 transition-colors flex items-center justify-between gap-2"
            >
              <span>{c.label}</span>
              <span className="font-ui text-[11px] text-muted">{countFor(c.key)}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-10 rounded-md border border-line bg-paper-2 p-5">
        <h2 className="font-semibold mb-2">Comment fonctionne la déclinaison ?</h2>
        <p className="text-[14.5px] text-muted leading-relaxed">
          En allemand, l&rsquo;article change selon trois choses : le{" "}
          <b className="text-ink">genre</b> du nom (der/die/das), son{" "}
          <b className="text-ink">nombre</b> (singulier/pluriel) et son{" "}
          <b className="text-ink">cas</b> — c&rsquo;est-à-dire sa fonction dans la phrase
          (sujet, complément d&rsquo;objet direct, indirect, ou complément du nom). C&rsquo;est
          la même logique que <i>le/la/les</i> en français, mais avec quatre cas au lieu
          d&rsquo;un seul. Le module{" "}
          <Link href="/declinaisons" className="underline decoration-line hover:decoration-ink">
            Déclinaisons
          </Link>{" "}
          t&rsquo;entraîne cas par cas, et chaque fiche mot affiche le tableau complet.
        </p>
      </div>
    </div>
  );
}
