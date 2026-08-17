import { strictEqual } from "node:assert/strict";
import { describe, it } from "node:test";
import { checkAnswer } from "./answerCheck";

describe("réponse exacte", () => {
  it("accepte sans commentaire", () => {
    const r = checkAnswer("der Auftrag", "der Auftrag");
    strictEqual(r.verdict, "correct");
    strictEqual(r.note, undefined);
  });

  it("tolère les espaces surnuméraires", () => {
    strictEqual(checkAnswer("  der   Auftrag ", "der Auftrag").verdict, "correct");
  });
});

describe("clavier français", () => {
  it("accepte ue pour ü, en rappelant l'orthographe", () => {
    const r = checkAnswer("die Pruefung", "die Prüfung");
    strictEqual(r.verdict, "correct");
    strictEqual(r.note?.includes("die Prüfung"), true);
  });

  it("accepte ss pour ß", () => {
    strictEqual(checkAnswer("die Strasse", "die Straße").verdict, "correct");
  });

  it("accepte ae et oe", () => {
    strictEqual(checkAnswer("die Zaehlung", "die Zählung").verdict, "correct");
    strictEqual(checkAnswer("der Behoerde", "der Behörde").verdict, "correct");
  });
});

describe("majuscule des noms communs", () => {
  /**
   * C'est une règle d'orthographe à part entière, mais rater la touche Maj ne
   * veut pas dire qu'on ignore le mot : on accepte en le signalant.
   */
  it("accepte mais signale", () => {
    const r = checkAnswer("der auftrag", "der Auftrag");
    strictEqual(r.verdict, "correct");
    strictEqual(r.note?.includes("majuscule"), true);
  });
});

describe("faute de frappe", () => {
  it("une lettre d'écart sur un mot court passe en « presque »", () => {
    const r = checkAnswer("der Auftrga", "der Auftrag");
    strictEqual(r.verdict, "almost");
    strictEqual(r.note?.includes("der Auftrag"), true);
  });

  it("deux lettres d'écart sont tolérées sur un mot long", () => {
    strictEqual(checkAnswer("die Bestellungg", "die Bestellung").verdict, "almost");
  });

  it("un mot différent reste faux", () => {
    strictEqual(checkAnswer("der Vertrag", "der Auftrag").verdict, "wrong");
  });

  it("une réponse vide est fausse", () => {
    strictEqual(checkAnswer("", "der Auftrag").verdict, "wrong");
  });
});

describe("formes alternatives acceptées", () => {
  const accepted = [
    { form: "Auftrag", note: "Juste, mais un nom s'apprend avec son article : der Auftrag." },
  ];

  it("accepte le nom sans article, en rappelant la forme complète", () => {
    const r = checkAnswer("Auftrag", "der Auftrag", accepted);
    strictEqual(r.verdict, "correct");
    strictEqual(r.note, accepted[0].note);
  });

  it("accepte aussi la variante mal accentuée", () => {
    const alt = [{ form: "Prüfung", note: "Pense à l'article." }];
    const r = checkAnswer("pruefung", "die Prüfung", alt);
    strictEqual(r.verdict, "correct");
    strictEqual(r.note, alt[0].note);
  });
});

describe("ponctuation", () => {
  it("n'est pas comptée comme une faute", () => {
    strictEqual(checkAnswer("der Auftrag.", "der Auftrag").verdict, "correct");
  });
});
