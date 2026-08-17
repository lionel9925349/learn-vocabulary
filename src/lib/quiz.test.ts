import { strictEqual } from "node:assert/strict";
import { describe, it } from "node:test";
import WORDS from "@/data";
import { KIND_LABELS, buildQuestion, evaluate } from "./quiz";
import { availableKinds, KIND_ORDER } from "./units";

/**
 * Le générateur de questions tire au sort — distracteurs, tournures, cas,
 * personne. On ne peut donc pas comparer une question à un texte attendu ;
 * on vérifie ses **invariants**, sur l'intégralité du vocabulaire réel.
 *
 * C'est le test qui attrape le plus de choses : un mot dont les distracteurs
 * viendraient à manquer, une réponse absente de ses propres propositions, ou
 * un doublon qui rendrait la question insoluble se voient tout de suite.
 */

/** Chaque type de question est-il réellement produit par le vocabulaire ? */
describe("couverture du vocabulaire", () => {
  it("produit au moins un mot pour chaque type de question", () => {
    const seen = new Set<string>();
    for (const word of WORDS) for (const kind of availableKinds(word)) seen.add(kind);
    for (const kind of KIND_ORDER) {
      strictEqual(seen.has(kind), true, `aucun mot ne permet la question « ${kind} »`);
    }
  });

  it("nomme chaque type de question dans l'interface", () => {
    for (const kind of KIND_ORDER) {
      strictEqual(typeof KIND_LABELS[kind], "string");
      strictEqual(KIND_LABELS[kind].length > 0, true);
    }
  });
});

describe("invariants d'une question, sur tout le vocabulaire", () => {
  // Un tirage par mot et par type : c'est aléatoire, donc chaque exécution
  // explore un échantillon différent des tournures possibles.
  const questions = WORDS.flatMap((word) =>
    availableKinds(word).map((kind) => ({ word, kind, q: buildQuestion(word, WORDS, kind) }))
  );

  it("porte bien sur le type demandé", () => {
    for (const { word, kind, q } of questions) {
      strictEqual(q.kind, kind, `${word.de} : type ${q.kind} au lieu de ${kind}`);
      strictEqual(q.word.id, word.id);
    }
  });

  it("affiche toujours un énoncé et une explication", () => {
    for (const { word, q } of questions) {
      strictEqual(q.prompt.trim().length > 0, true, `${word.de} : énoncé vide`);
      strictEqual(q.explanation.trim().length > 0, true, `${word.de} : explication vide`);
    }
  });

  it("place la bonne réponse parmi les propositions", () => {
    for (const { word, kind, q } of questions) {
      if (q.typed) continue;
      strictEqual(
        q.choices.includes(q.correct),
        true,
        `${word.de} (${kind}) : « ${q.correct} » absent des propositions`
      );
    }
  });

  it("ne propose jamais deux fois la même réponse", () => {
    for (const { word, kind, q } of questions) {
      if (q.typed) continue;
      strictEqual(
        new Set(q.choices).size,
        q.choices.length,
        `${word.de} (${kind}) : propositions en double — ${q.choices.join(", ")}`
      );
    }
  });

  it("laisse toujours un vrai choix à faire", () => {
    for (const { word, kind, q } of questions) {
      if (q.typed) continue;
      strictEqual(q.choices.length >= 2, true, `${word.de} (${kind}) : une seule proposition`);
    }
  });

  it("ne propose que des réponses non vides", () => {
    for (const { word, kind, q } of questions) {
      for (const choice of q.choices) {
        strictEqual(choice.trim().length > 0, true, `${word.de} (${kind}) : proposition vide`);
      }
    }
  });

  it("juge correcte la bonne réponse", () => {
    for (const { word, kind, q } of questions) {
      strictEqual(
        evaluate(q, q.correct).correct,
        true,
        `${word.de} (${kind}) : la bonne réponse est jugée fausse`
      );
    }
  });

  it("cache le sens seulement quand c'est justement lui la réponse", () => {
    for (const { word, q } of questions) {
      if (q.kind === "de-fr" || q.kind === "fr-de" || q.kind === "type-de") continue;
      strictEqual(
        (q.meaning ?? "").length > 0,
        true,
        `${word.de} (${q.kind}) : on n'apprend pas un article sur un mot dont on ignore le sens`
      );
    }
  });

  it("ne demande de taper que ce qui se tape", () => {
    for (const { q } of questions) {
      strictEqual(q.typed === true, q.kind === "type-de");
    }
  });
});

describe("evaluate", () => {
  const articleQuestion = () => {
    const noun = WORDS.find((w) => w.kind === "noun" && w.artikel)!;
    return buildQuestion(noun, WORDS, "article");
  };

  it("sur un choix multiple, compare à l'identique", () => {
    const q = articleQuestion();
    strictEqual(evaluate(q, q.correct).correct, true);
    const wrong = q.choices.find((c) => c !== q.correct)!;
    strictEqual(evaluate(q, wrong).correct, false);
  });

  it("sur une réponse tapée, tolère la faute de frappe en rappelant la forme exacte", () => {
    const noun = WORDS.find((w) => w.kind === "noun" && w.artikel && w.de.length > 8)!;
    const q = buildQuestion(noun, WORDS, "type-de");
    const typo = q.correct.slice(0, -1); // une lettre en moins
    const result = evaluate(q, typo);
    strictEqual(result.correct, true);
    strictEqual(result.note?.includes(q.correct), true);
  });

  it("sur une réponse tapée, accepte le nom sans son article en le signalant", () => {
    const noun = WORDS.find((w) => w.kind === "noun" && w.artikel)!;
    const q = buildQuestion(noun, WORDS, "type-de");
    const result = evaluate(q, noun.de);
    strictEqual(result.correct, true);
    strictEqual(result.note?.includes("article"), true);
  });
});
