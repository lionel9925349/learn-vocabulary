import { strictEqual } from "node:assert/strict";
import { describe, it } from "node:test";
import WORDS, { RAW_ENTRIES, categories } from "@/data";
import { isNoun } from "./types";
import { availableKinds } from "./units";

/**
 * Contrôles portant sur la base elle-même.
 *
 * `npm run check:data` en fait déjà l'essentiel, mais il ne tourne pas dans la
 * même boucle que les tests : ce qui est vérifié ici est ce qu'on ne veut
 * découvrir ni en relisant un fichier de données, ni en production.
 */

describe("intégrité de la base", () => {
  /**
   * Le piège qui a coûté trente et une entrées : les lots sont fusionnés par
   * identifiant, et un mot saisi sous un identifiant déjà pris disparaît sans
   * bruit. Le contrôle ne peut donc pas porter sur la liste dédoublonnée.
   */
  it("ne perd aucune entrée au dédoublonnage", () => {
    const counts = new Map<string, number>();
    for (const w of RAW_ENTRIES) counts.set(w.id, (counts.get(w.id) ?? 0) + 1);
    const dups = [...counts.entries()].filter(([, n]) => n > 1).map(([id]) => id);
    strictEqual(dups.length, 0, `entrées écrasées : ${dups.join(", ")}`);
  });

  it("donne à chaque mot une catégorie déclarée", () => {
    const keys = new Set(categories.map((c) => c.key));
    for (const w of WORDS) {
      strictEqual(keys.has(w.category), true, `${w.de} : catégorie « ${w.category} » inconnue`);
    }
  });

  it("ne laisse aucun thème vide dans la liste des thèmes", () => {
    for (const c of categories) {
      const n = WORDS.filter((w) => w.category === c.key).length;
      strictEqual(n > 0, true, `le thème « ${c.label} » n'a aucun mot`);
    }
  });

  it("donne un article et un pluriel décidé à chaque nom", () => {
    for (const w of WORDS) {
      if (!isNoun(w)) continue;
      strictEqual(!!w.artikel, true, `${w.de} : article manquant`);
      strictEqual(w.plural !== undefined, true, `${w.de} : pluriel non tranché (null si aucun)`);
    }
  });

  it("donne un parfait à chaque verbe", () => {
    for (const w of WORDS) {
      if (w.kind !== "verb") continue;
      strictEqual(!!w.perfekt, true, `${w.de} : parfait manquant`);
    }
  });

  it("propose au moins une question par mot", () => {
    for (const w of WORDS) {
      strictEqual(availableKinds(w).length > 0, true, `${w.de} : aucun exercice possible`);
    }
  });

  /** Une phrase d'exemple qui ne serait pas en allemand trahit une inversion de colonnes. */
  it("ne confond pas la phrase allemande et sa traduction", () => {
    for (const w of WORDS) {
      if (!w.example) continue;
      strictEqual(w.example.de.trim().length > 0, true, `${w.de} : exemple allemand vide`);
      strictEqual(w.example.fr.trim().length > 0, true, `${w.de} : traduction vide`);
      strictEqual(w.example.de !== w.example.fr, true, `${w.de} : exemple et traduction identiques`);
    }
  });
});

/**
 * Couverture du métier.
 *
 * Ces mots-là ne sont pas choisis au hasard : ce sont ceux qu'on prononce le
 * plus souvent dans la messagerie express, et leur absence passée n'avait rien
 * d'évident — un lexique professionnel a tendance à couvrir le vocabulaire
 * rare et à oublier le banal.
 */
describe("couverture du métier", () => {
  const has = (de: string) => WORDS.some((w) => w.de === de);

  const CHECKS: [string, string[]][] = [
    [
      "messagerie express",
      ["Kurier", "Zusteller", "Depot", "Sortieranlage", "Ablageort", "Packstation", "Nachnahme", "Sperrgut", "Volumengewicht", "Nachforschungsauftrag"],
    ],
    [
      "temps et horaires",
      ["Uhrzeit", "Montag", "Freitag", "Kalenderwoche", "Werktag", "Feiertag", "Annahmeschluss", "Feierabend", "heute", "morgen", "spätestens"],
    ],
    [
      "quantités et mesures",
      ["Kilogramm", "Tonne", "Kubikmeter", "Prozent", "Länge", "Breite", "Höhe", "circa"],
    ],
    [
      "mots de base des composés",
      ["Ware", "Auftrag", "Lager", "Eingang", "Ausgang", "Zeit", "Menge", "Wert", "Stelle"],
    ],
  ];

  for (const [domain, words] of CHECKS) {
    it(`couvre le vocabulaire de base : ${domain}`, () => {
      const missing = words.filter((w) => !has(w));
      strictEqual(missing.length, 0, `manquants : ${missing.join(", ")}`);
    });
  }
});
