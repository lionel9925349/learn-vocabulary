import { strictEqual } from "node:assert/strict";
import { describe, it } from "node:test";
import {
  canPassivize,
  parsePerfect,
  passiveAuxiliary,
  passiveDistractors,
  wrongParticiple,
} from "./verbForms";
import type { Word } from "./types";

const verb = (de: string, perfekt: string, extra: Partial<Word> = {}): Word => ({
  id: de,
  de,
  fr: "",
  category: "verben",
  kind: "verb",
  perfekt,
  ...extra,
});

describe("parsePerfect", () => {
  it("sépare l'auxiliaire du participe", () => {
    const p = parsePerfect(verb("liefern", "hat geliefert"));
    strictEqual(p?.auxiliary, "hat");
    strictEqual(p?.participle, "geliefert");
    strictEqual(p?.reflexive, false);
  });

  it("reconnaît l'auxiliaire sein", () => {
    strictEqual(parsePerfect(verb("fahren", "ist gefahren"))?.auxiliary, "ist");
  });

  it("isole le pronom réfléchi", () => {
    const p = parsePerfect(verb("sich bewerben", "hat sich beworben"));
    strictEqual(p?.reflexive, true);
    strictEqual(p?.bare, "beworben");
    strictEqual(p?.participle, "sich beworben");
  });

  it("refuse ce qui n'est pas un parfait", () => {
    strictEqual(parsePerfect(verb("liefern", "geliefert")), null);
    strictEqual(parsePerfect(verb("liefern", "")), null);
    strictEqual(parsePerfect(verb("liefern", "wird geliefert")), null);
  });
});

/**
 * Les trois fautes de participe qui expliquent presque toutes les autres.
 * Le distracteur doit reproduire l'une d'elles : une forme fausse au hasard
 * n'apprendrait rien.
 */
describe("wrongParticiple", () => {
  it("retire le ge- là où il est correct", () => {
    strictEqual(wrongParticiple("geliefert"), "liefert");
  });

  it("ajoute un ge- aux verbes qui n'en prennent pas", () => {
    strictEqual(wrongParticiple("reklamiert"), "gereklamiert");
    strictEqual(wrongParticiple("bestellt"), "gebestellt");
  });

  it("remonte devant le ge- interne d'un verbe à particule", () => {
    strictEqual(wrongParticiple("abgeholt"), "geabholt");
    strictEqual(wrongParticiple("hochgeladen"), "gehochladen");
  });

  it("produit toujours une forme différente de l'originale", () => {
    for (const p of ["geliefert", "reklamiert", "abgeholt", "bestellt", "angenommen"]) {
      strictEqual(wrongParticiple(p) === p, false, p);
    }
  });
});

describe("canPassivize", () => {
  it("accepte un verbe transitif ordinaire", () => {
    strictEqual(canPassivize(verb("liefern", "hat geliefert")), true);
  });

  it("refuse un verbe en sein — il n'a pas de complément d'objet direct", () => {
    strictEqual(canPassivize(verb("fahren", "ist gefahren")), false);
  });

  it("refuse un verbe pronominal", () => {
    strictEqual(canPassivize(verb("sich kümmern", "hat sich gekümmert")), false);
  });

  it("refuse une locution verbale", () => {
    strictEqual(canPassivize(verb("zuständig sein", "ist zuständig gewesen")), false);
  });
});

describe("passiveAuxiliary", () => {
  it("donne werden au présent et au prétérit, sein au parfait", () => {
    strictEqual(passiveAuxiliary("praesens"), "wird");
    strictEqual(passiveAuxiliary("praeteritum"), "wurde");
    strictEqual(passiveAuxiliary("perfekt"), "ist");
  });

  it("accorde au pluriel", () => {
    strictEqual(passiveAuxiliary("praesens", true), "werden");
    strictEqual(passiveAuxiliary("praeteritum", true), "wurden");
  });
});

describe("passiveDistractors", () => {
  /**
   * Le piège utile est le passif d'état : *die Ware ist geliefert* décrit le
   * résultat, *die Ware wird geliefert* l'opération. Le français dit « est »
   * dans les deux cas, d'où la confusion.
   */
  it("oppose toujours le passif d'action au passif d'état", () => {
    strictEqual(passiveDistractors("praesens").includes("ist"), true);
    strictEqual(passiveDistractors("perfekt").includes("wird"), true);
  });

  it("ne contient jamais la bonne réponse", () => {
    for (const tense of ["praesens", "praeteritum", "perfekt"] as const) {
      strictEqual(passiveDistractors(tense).includes(passiveAuxiliary(tense)), false, tense);
    }
  });

  it("en fournit trois, tous différents", () => {
    const out = passiveDistractors("praesens");
    strictEqual(out.length, 3);
    strictEqual(new Set(out).size, 3);
  });
});
