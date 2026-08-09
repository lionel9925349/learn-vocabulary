/**
 * Vérifie la cohérence de la base de vocabulaire.
 *
 *   npm run check:data
 *
 * Contrôles :
 *  - identifiants uniques ;
 *  - champs obligatoires selon la nature du mot ;
 *  - catégorie existante ;
 *  - genre déclaré cohérent avec le genre déduit de la morphologie.
 *
 * Le dernier contrôle est le plus utile : sur un millier de mots saisis à la
 * main, c'est lui qui rattrape les fautes d'article. Un mot dont le genre
 * contredit sa terminaison est soit une erreur, soit une vraie exception —
 * dans ce cas il doit porter une `rule` écrite à la main pour l'assumer.
 */
import WORDS, { categories } from "../src/data/index";
import USAGE from "../src/data/usage";
import { inferGender } from "../src/lib/genderRules";
import { isNoun } from "../src/lib/types";

const errors: string[] = [];
const warnings: string[] = [];

const seen = new Set<string>();
const categoryKeys = new Set(categories.map((c) => c.key));

for (const w of WORDS) {
  const label = `${w.id} (${w.de})`;

  if (seen.has(w.id)) errors.push(`Identifiant dupliqué : ${label}`);
  seen.add(w.id);

  if (!w.de?.trim()) errors.push(`Mot allemand vide : ${w.id}`);
  if (!w.fr?.trim()) errors.push(`Traduction manquante : ${label}`);
  if (!categoryKeys.has(w.category)) errors.push(`Catégorie inconnue « ${w.category} » : ${label}`);

  if (isNoun(w)) {
    if (!w.artikel) {
      errors.push(`Article manquant : ${label}`);
      continue;
    }
    if (w.plural === undefined) {
      warnings.push(`Pluriel non renseigné (mettre null si le mot n'en a pas) : ${label}`);
    }

    const inferred = inferGender(w.de);
    if (inferred && inferred !== w.artikel && !w.rule) {
      errors.push(
        `Genre suspect : ${label} déclaré « ${w.artikel} » mais la morphologie donne « ${inferred} ». ` +
          `Corrige l'article, ou ajoute une "rule" si c'est une exception assumée.`
      );
    }
  } else {
    if (w.artikel) warnings.push(`Article inutile sur un ${w.kind} : ${label}`);
    if (w.kind === "verb" && !w.perfekt) warnings.push(`Parfait non renseigné : ${label}`);
  }
}

// Une clé d'usage qui ne correspond à aucun mot serait silencieusement perdue :
// c'est le genre de faute de frappe qu'on ne voit jamais à l'écran.
const wordIds = new Set(WORDS.map((w) => w.id));
for (const id of Object.keys(USAGE)) {
  if (!wordIds.has(id)) {
    errors.push(`Usage orphelin : aucun mot ne porte l'identifiant « ${id} »`);
  }
}

const nouns = WORDS.filter(isNoun);

// Fiabilité du moteur d'inférence, mesurée sur l'ensemble des noms :
// c'est ce qui autorise à saisir de nouveaux mots sans écrire leur règle.
let agree = 0;
let silent = 0;
let disagree = 0;
for (const w of nouns) {
  const inferred = inferGender(w.de);
  if (!inferred) silent++;
  else if (inferred === w.artikel) agree++;
  else disagree++;
}
const decided = agree + disagree;

console.log(`\n${WORDS.length} entrées · ${nouns.length} noms · ${categories.length} thèmes`);
console.log(
  `Inférence du genre : ${agree} justes, ${disagree} fausses, ${silent} sans règle applicable ` +
    `(précision ${decided ? Math.round((agree / decided) * 100) : 0}% sur les cas tranchés, ` +
    `couverture ${Math.round((decided / nouns.length) * 100)}%)`
);

if (warnings.length) {
  console.log(`\n${warnings.length} avertissement(s) :`);
  for (const w of warnings.slice(0, 20)) console.log(`  · ${w}`);
  if (warnings.length > 20) console.log(`  … et ${warnings.length - 20} autres`);
}

if (errors.length) {
  console.error(`\n✗ ${errors.length} erreur(s) :`);
  for (const e of errors) console.error(`  · ${e}`);
  process.exit(1);
}

console.log("\n✓ Base de vocabulaire cohérente\n");
