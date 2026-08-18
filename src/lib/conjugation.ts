import type { Word } from "./types";

/**
 * Conjugaison au présent.
 *
 * Le présent est la priorité : c'est le temps de l'oral, et il concentre les
 * irrégularités utiles (changement de voyelle au singulier). Le parfait, saisi
 * mot par mot dans le vocabulaire, est affiché mais pas calculé — il est trop
 * irrégulier pour être généré de façon fiable.
 */

export const PERSONS = ["ich", "du", "er/sie/es", "wir", "ihr", "sie/Sie"] as const;
export type Person = (typeof PERSONS)[number];

/** Pronom réfléchi, pour les verbes pronominaux (sich kümmern → ich kümmere mich). */
const REFLEXIVE: Record<Person, string> = {
  ich: "mich",
  du: "dich",
  "er/sie/es": "sich",
  wir: "uns",
  ihr: "euch",
  "sie/Sie": "sich",
};

/**
 * Préfixes séparables : ils se détachent et partent en fin de proposition
 * (abholen → ich **hole** die Ware **ab**).
 *
 * über-, unter-, um- et durch- en sont volontairement absents : ils sont
 * tantôt séparables tantôt non (überweisen, überwachen, überprüfen sont
 * inséparables), et la forme seule ne permet pas de trancher. Un verbe de ce
 * type doit porter explicitement `separable: true` — il est alors cherché dans
 * `AMBIGUOUS_PREFIXES`.
 */
const SEPARABLE_PREFIXES = [
  "herunter",
  "zusammen",
  // « überein- » se place avant « über- » : c'est le préfixe complet
  // (übereinstimmen → ich stimme … überein), et il est toujours séparable.
  "überein",
  "zurück",
  "wieder",
  "voraus",
  "hinaus",
  "heraus",
  "hinein",
  "herein",
  "hoch",
  "statt",
  "weiter",
  "fest",
  "frei",
  "nach",
  "auf",
  "aus",
  "ein",
  "mit",
  "vor",
  "zu",
  "ab",
  "an",
  "bei",
  "los",
  "teil",
  "weg",
  "her",
  "hin",
];

/**
 * Préfixes tantôt séparables, tantôt non. On ne les consulte **que** si le mot
 * a déclaré `separable: true` : *umgehen mit* se sépare (ich gehe damit um),
 * *umgehen* au sens de contourner ne se sépare pas. La forme ne tranche pas,
 * seul le vocabulaire le sait.
 */
const AMBIGUOUS_PREFIXES = ["durch", "über", "unter", "um"];

/** Préfixes inséparables : ils restent collés au verbe. */
const INSEPARABLE_PREFIXES = ["be", "ge", "er", "ver", "zer", "ent", "emp", "miss"];

export interface SplitVerb {
  prefix: string | null;
  base: string;
  reflexive: boolean;
}

/** Isole particule séparable et forme pronominale (sich anmelden → sich + an + melden). */
export function splitVerb(word: Word): SplitVerb {
  let inf = word.de.trim();
  let reflexive = false;

  if (inf.startsWith("sich ")) {
    reflexive = true;
    inf = inf.slice(5).trim();
  }

  // Locutions (« zuständig sein ») : hors du champ de ce générateur.
  if (inf.includes(" ")) return { prefix: null, base: inf, reflexive };

  if (word.separable === true) {
    for (const p of [...SEPARABLE_PREFIXES, ...AMBIGUOUS_PREFIXES]) {
      if (inf.startsWith(p) && inf.length - p.length >= 4) {
        return { prefix: p, base: inf.slice(p.length), reflexive };
      }
    }
  }

  for (const p of INSEPARABLE_PREFIXES) {
    if (inf.startsWith(p)) return { prefix: null, base: inf, reflexive };
  }

  if (word.separable === false) return { prefix: null, base: inf, reflexive };

  for (const p of SEPARABLE_PREFIXES) {
    if (inf.startsWith(p) && inf.length - p.length >= 4) {
      return { prefix: p, base: inf.slice(p.length), reflexive };
    }
  }
  return { prefix: null, base: inf, reflexive };
}

/** Un verbe composé de plusieurs mots ne se conjugue pas ici. */
export function canConjugate(word: Word): boolean {
  if (word.kind !== "verb") return false;
  return !splitVerb(word).base.includes(" ");
}

/** Radical du présent : infinitif sans sa terminaison. */
function presentStem(infinitive: string): string {
  if (infinitive.endsWith("eln") || infinitive.endsWith("ern")) return infinitive.slice(0, -1);
  if (infinitive.endsWith("en")) return infinitive.slice(0, -2);
  if (infinitive.endsWith("n")) return infinitive.slice(0, -1);
  return infinitive;
}

/**
 * Faut-il intercaler un -e- pour rester prononçable ?
 *
 * Cas sûrs : radical en -d/-t (arbeiten → er arbeit**e**t), et groupes
 * consonantiques devant -m/-n (rechnen, atmen, öffnen). En revanche un -h-
 * simplement allongeant ne compte pas : nehmen → ihr nehmt, et non « nehmet ».
 */
function needsEpenthesis(stem: string): boolean {
  if (/[dt]$/.test(stem)) return true;
  return /(chn|ffn|tm|dm|gn)$/.test(stem);
}

/** Un radical en sifflante (-s, -ß, -z, -x) absorbe le -s- du « du ». */
function endsWithSibilant(stem: string): boolean {
  return /(s|ß|z|x)$/.test(stem);
}

export interface ConjugationRow {
  person: Person;
  /** Phrase complète : pronom, verbe fléchi, réfléchi et particule rejetée */
  form: string;
  /** Verbe fléchi seul */
  verb: string;
  prefix: string | null;
  irregular: boolean;
}

/**
 * Conjugue un verbe au présent.
 *
 * Les formes fortes (nehmen → du nimmst) ne se devinent pas : elles viennent du
 * champ `praesens` du vocabulaire.
 */
export function conjugatePresent(word: Word): ConjugationRow[] {
  const { prefix, base, reflexive } = splitVerb(word);
  const stem = presentStem(base);
  const e = needsEpenthesis(stem) ? "e" : "";

  const irregular3 = word.praesens ? stripPrefix(word.praesens, prefix) : null;
  const irregular2 = word.praesensDu
    ? stripPrefix(word.praesensDu, prefix)
    : irregular3
      ? duFromEr(irregular3)
      : null;

  const plural = base.endsWith("eln") || base.endsWith("ern") ? stem + "n" : stem + "en";

  // Les verbes en -eln perdent le -e- du radical à la 1ʳᵉ personne :
  // stapeln → ich stap**l**e, verhandeln → ich verhand**l**e.
  // Ceux en -ern le gardent : liefern → ich liefere.
  const ichStem = base.endsWith("eln") ? stem.replace(/el$/, "l") : stem;

  const forms: { person: Person; verb: string; irregular: boolean }[] = [
    { person: "ich", verb: ichStem + "e", irregular: false },
    {
      person: "du",
      verb: irregular2 ?? stem + (endsWithSibilant(stem) ? "t" : e + "st"),
      irregular: !!irregular2,
    },
    { person: "er/sie/es", verb: irregular3 ?? stem + e + "t", irregular: !!irregular3 },
    { person: "wir", verb: plural, irregular: false },
    { person: "ihr", verb: stem + e + "t", irregular: false },
    { person: "sie/Sie", verb: plural, irregular: false },
  ];

  return forms.map((f) => {
    const subject = f.person === "er/sie/es" ? "er" : f.person === "sie/Sie" ? "sie" : f.person;
    const parts = [subject, f.verb];
    if (reflexive) parts.push(REFLEXIVE[f.person]);
    if (prefix) parts.push("…", prefix);

    return {
      person: f.person,
      verb: f.verb,
      prefix,
      form: parts.join(" "),
      irregular: f.irregular,
    };
  });
}

/** Le vocabulaire note la forme complète (« nimmt an ») : on isole le verbe fléchi. */
function stripPrefix(praesens: string, prefix: string | null): string {
  const trimmed = praesens.trim();
  if (!prefix) return trimmed;
  return trimmed.replace(new RegExp(`\\s+${prefix}$`), "").trim();
}

/** « du » se déduit de « er » : nimmt → nimmst, liest → liest. */
function duFromEr(er: string): string {
  if (/(s|ß|z|x)t$/.test(er)) return er; // liest, isst → du liest, du isst
  if (er.endsWith("t")) return er.slice(0, -1) + "st";
  return er + "st";
}
