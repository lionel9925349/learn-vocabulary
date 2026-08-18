import { strictEqual } from "node:assert/strict";
import { describe, it } from "node:test";
import WORDS from "@/data";
import { KIND_LABELS, buildQuestion, evaluate } from "./quiz";
import { availableKinds, KIND_ORDER } from "./units";
import { BLANK } from "./cloze";

/**
 * Le générateur de questions tire au sort — distracteurs, tournures, cas,
 * personne. On ne peut donc pas comparer une question à un texte attendu ;
 * on vérifie ses **invariants**, sur l'intégralité du vocabulaire réel.
 *
 * C'est le test qui attrape le plus de choses : un mot dont les distracteurs
 * viendraient à manquer, une réponse absente de ses propres propositions, ou
 * un doublon qui rendrait la question insoluble se voient tout de suite.
 */

/** Les trois façons de répondre, qui n'ont pas les mêmes invariants. */
const TYPED_KINDS = new Set(["type-de"]);
const BUILDER_KINDS = new Set(["word-order"]);
/** Questions dont la réponse **est** le sens : le montrer les résoudrait. */
const MEANING_IS_ANSWER = new Set(["de-fr", "fr-de", "type-de", "cloze"]);

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

  it("affiche toujours une explication", () => {
    for (const { word, q } of questions) {
      strictEqual(q.explanation.trim().length > 0, true, `${word.de} : explication vide`);
    }
  });

  it("affiche un énoncé, sauf là où la phrase se construit de zéro", () => {
    for (const { word, kind, q } of questions) {
      // Une phrase à reconstruire n'a d'énoncé que si elle a une amorce
      // (« Wir sind im Verzug, … ») ; sinon elle commence par le premier mot
      // à placer, et c'est le plateau qui l'affiche.
      if (BUILDER_KINDS.has(kind)) continue;
      strictEqual(q.prompt.trim().length > 0, true, `${word.de} (${kind}) : énoncé vide`);
    }
  });

  it("place la bonne réponse parmi les propositions", () => {
    for (const { word, kind, q } of questions) {
      if (q.typed || q.builder) continue;
      strictEqual(
        q.choices.includes(q.correct),
        true,
        `${word.de} (${kind}) : « ${q.correct} » absent des propositions`
      );
    }
  });

  it("ne propose jamais deux fois la même réponse", () => {
    for (const { word, kind, q } of questions) {
      if (q.typed || q.builder) continue;
      strictEqual(
        new Set(q.choices).size,
        q.choices.length,
        `${word.de} (${kind}) : propositions en double — ${q.choices.join(", ")}`
      );
    }
  });

  it("laisse toujours un vrai choix à faire", () => {
    for (const { word, kind, q } of questions) {
      if (q.typed || q.builder) continue;
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
      if (MEANING_IS_ANSWER.has(q.kind)) continue;
      strictEqual(
        (q.meaning ?? "").length > 0,
        true,
        `${word.de} (${q.kind}) : on ne travaille pas la grammaire d'un mot dont on ignore le sens`
      );
    }
  });

  it("n'utilise le clavier et le plateau qu'où il faut", () => {
    for (const { q } of questions) {
      strictEqual(q.typed === true, TYPED_KINDS.has(q.kind));
      strictEqual(q.builder === true, BUILDER_KINDS.has(q.kind));
    }
  });

  /**
   * Une question à reconstruire doit être résoluble : les mots proposés
   * doivent recouvrir exactement la phrase attendue, chacun servant une fois.
   *
   * Les mots ne sont pas des mots au sens typographique — « den Karton » en
   * est un seul, pour que le Mittelfeld reste insécable. On vérifie donc que
   * la phrase se laisse carreler par les jetons, et non qu'elle se découpe aux
   * espaces.
   */
  it("donne exactement les mots de la phrase attendue", () => {
    for (const { word, q } of questions) {
      if (!q.builder) continue;
      strictEqual(Array.isArray(q.tokens), true, `${word.de} : aucun mot à placer`);

      const remaining = [...(q.tokens ?? [])];
      let rest = q.correct;
      while (rest.length > 0 && remaining.length > 0) {
        // Le plus long d'abord : un jeton pourrait être le préfixe d'un autre.
        const index = remaining
          .map((t, i) => [t, i] as const)
          .filter(([t]) => rest === t || rest.startsWith(`${t} `))
          .sort((a, b) => b[0].length - a[0].length)[0]?.[1];
        if (index === undefined) break;
        const token = remaining.splice(index, 1)[0];
        rest = rest.slice(token.length).replace(/^ /, "");
      }

      strictEqual(rest, "", `${word.de} : « ${q.correct} » n'est pas couverte par les mots proposés`);
      strictEqual(remaining.length, 0, `${word.de} : mots en trop — ${remaining.join(", ")}`);
    }
  });

  it("laisse un trou visible dans une question à contexte", () => {
    for (const { word, q } of questions) {
      if (q.kind !== "cloze") continue;
      strictEqual(q.prompt.includes(BLANK), true, `${word.de} : pas de trou dans la phrase`);
      strictEqual(
        q.prompt.includes(q.correct),
        false,
        `${word.de} : la réponse est encore lisible dans l'énoncé`
      );
    }
  });

  it("ne laisse pas la réponse dans l'énoncé d'une question à trou grammatical", () => {
    for (const { word, q } of questions) {
      if (q.kind !== "preposition" && q.kind !== "passive") continue;
      strictEqual(
        q.prompt.includes("＿＿＿"),
        true,
        `${word.de} (${q.kind}) : pas de trou dans la phrase`
      );
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

  /** Sur une phrase reconstruite, seul l'ordre exact passe. */
  it("sur une phrase assemblée, refuse un ordre différent", () => {
    const verb = WORDS.find((w) => availableKinds(w).includes("word-order"))!;
    const q = buildQuestion(verb, WORDS, "word-order");
    strictEqual(evaluate(q, q.correct).correct, true);

    const tokens = q.correct.split(" ");
    const swapped = [tokens[1], tokens[0], ...tokens.slice(2)].join(" ");
    strictEqual(evaluate(q, swapped).correct, false);
  });
});
