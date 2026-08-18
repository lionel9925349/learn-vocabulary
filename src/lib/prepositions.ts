import type { CaseName } from "./declension";

/**
 * Les prépositions et le cas qu'elles régissent.
 *
 * C'est le point où un francophone perd le plus de temps, parce que le
 * français ne demande jamais ce travail : « avec le client » ne change pas
 * d'article, *mit dem Kunden* si. La préposition **impose** son cas, et il n'y
 * a pas de logique à comprendre pour la plupart — elles s'apprennent par
 * groupes.
 *
 * Le seul groupe qui obéit à une règle est celui des **Wechselpräpositionen**,
 * qui se partagent entre accusatif et datif selon qu'il y a déplacement vers un
 * lieu (wohin ? → accusatif) ou position dans un lieu (wo ? → datif). C'est la
 * règle la plus rentable de toute la grammaire allemande des cas.
 */

export type PrepositionGroup = "accusative" | "dative" | "two-way" | "genitive";

export const GROUP_LABELS: Record<PrepositionGroup, string> = {
  accusative: "Toujours l'accusatif",
  dative: "Toujours le datif",
  "two-way": "Accusatif ou datif, selon le sens",
  genitive: "Génitif",
};

export const GROUP_HINTS: Record<PrepositionGroup, string> = {
  accusative:
    "Ces prépositions ne varient jamais : quel que soit le verbe, quel que soit le sens, elles appellent l'accusatif.",
  dative:
    "Le groupe le plus fourni, et celui qu'on emploie le plus au travail. Elles appellent toujours le datif.",
  "two-way":
    "Les **Wechselpräpositionen**. Déplacement vers un lieu (wohin ?) → accusatif ; position dans un lieu (wo ?) → datif.",
  genitive:
    "Prépositions du registre écrit et administratif — celui des courriers et des contrats. À l'oral, plusieurs se construisent aussi avec le datif.",
};

export interface Preposition {
  de: string;
  fr: string;
  group: PrepositionGroup;
  /** Contraction usuelle, quand elle existe : in + dem → im. */
  contraction?: string;
  note?: string;
}

/**
 * Inventaire restreint à ce qui sert réellement en logistique, en achats et en
 * informatique. Les prépositions purement littéraires n'y sont pas.
 */
export const PREPOSITIONS: Preposition[] = [
  // — Accusatif —
  { de: "für", fr: "pour", group: "accusative" },
  { de: "ohne", fr: "sans", group: "accusative" },
  { de: "gegen", fr: "contre / vers (une heure)", group: "accusative" },
  { de: "um", fr: "autour de / à (une heure)", group: "accusative" },
  { de: "durch", fr: "à travers / par (l'intermédiaire de)", group: "accusative" },
  { de: "bis", fr: "jusqu'à", group: "accusative", note: "Souvent suivie d'une autre préposition : *bis zum 15. März*." },
  { de: "entlang", fr: "le long de", group: "accusative", note: "Se place **après** le nom : *die Straße entlang*." },

  // — Datif —
  { de: "mit", fr: "avec", group: "dative" },
  { de: "nach", fr: "après / vers (une ville, un pays)", group: "dative" },
  { de: "bei", fr: "chez / auprès de / lors de", group: "dative" },
  { de: "von", fr: "de (provenance, appartenance)", group: "dative" },
  { de: "zu", fr: "vers / à (une personne, un lieu)", group: "dative", contraction: "zum / zur" },
  { de: "aus", fr: "hors de / en (matière)", group: "dative" },
  { de: "seit", fr: "depuis", group: "dative" },
  { de: "gegenüber", fr: "en face de / vis-à-vis de", group: "dative" },
  { de: "ab", fr: "à partir de", group: "dative", note: "Très fréquente en logistique : *ab Werk*, *ab Lager*." },
  { de: "laut", fr: "selon / conformément à", group: "dative", note: "Registre administratif : *laut Lieferschein*." },
  { de: "entgegen", fr: "contrairement à", group: "dative" },

  // — Mixtes (Wechselpräpositionen) —
  { de: "in", fr: "dans", group: "two-way", contraction: "ins / im" },
  { de: "an", fr: "à / contre (contact vertical)", group: "two-way", contraction: "ans / am" },
  { de: "auf", fr: "sur (contact horizontal)", group: "two-way", contraction: "aufs" },
  { de: "über", fr: "au-dessus de / au sujet de", group: "two-way" },
  { de: "unter", fr: "sous / parmi", group: "two-way" },
  { de: "vor", fr: "devant / avant", group: "two-way" },
  { de: "hinter", fr: "derrière", group: "two-way" },
  { de: "neben", fr: "à côté de", group: "two-way" },
  { de: "zwischen", fr: "entre", group: "two-way" },

  // — Génitif —
  { de: "wegen", fr: "à cause de", group: "genitive", note: "À l'oral, souvent employée avec le datif." },
  { de: "trotz", fr: "malgré", group: "genitive" },
  { de: "während", fr: "pendant", group: "genitive" },
  { de: "aufgrund", fr: "en raison de", group: "genitive" },
  { de: "innerhalb", fr: "à l'intérieur de / sous (un délai)", group: "genitive", note: "*innerhalb einer Woche* — le délai contractuel." },
  { de: "außerhalb", fr: "en dehors de", group: "genitive" },
  { de: "anstelle", fr: "au lieu de", group: "genitive" },
  { de: "mangels", fr: "faute de", group: "genitive", note: "Registre juridique : *mangels Nachweis*." },
  { de: "zwecks", fr: "aux fins de", group: "genitive" },
];

export const PREPOSITIONS_BY_GROUP: Record<PrepositionGroup, Preposition[]> = {
  accusative: PREPOSITIONS.filter((p) => p.group === "accusative"),
  dative: PREPOSITIONS.filter((p) => p.group === "dative"),
  "two-way": PREPOSITIONS.filter((p) => p.group === "two-way"),
  genitive: PREPOSITIONS.filter((p) => p.group === "genitive"),
};

/** Cas imposé par une préposition à cas fixe. Null pour les mixtes. */
export function fixedCase(prep: Preposition): CaseName | null {
  switch (prep.group) {
    case "accusative":
      return "Akkusativ";
    case "dative":
      return "Dativ";
    case "genitive":
      return "Genitiv";
    case "two-way":
      return null;
  }
}

export function findPreposition(de: string): Preposition | undefined {
  return PREPOSITIONS.find((p) => p.de === de);
}

/**
 * Phrases de test pour les prépositions mixtes.
 *
 * Chaque tournure est construite autour d'un verbe qui tranche : *stellen*,
 * *legen*, *fahren* impliquent un déplacement (accusatif) ; *stehen*, *liegen*,
 * *arbeiten* décrivent une position (datif). C'est le verbe qu'il faut
 * apprendre à lire, pas la préposition.
 */
export interface TwoWayFrame {
  prep: string;
  /** `%` marque l'emplacement du groupe nominal. */
  sentence: string;
  caseName: Extract<CaseName, "Akkusativ" | "Dativ">;
  /** Le mot de la phrase qui commande le cas. */
  trigger: string;
  why: string;
  fr: string;
}

export const TWO_WAY_FRAMES: TwoWayFrame[] = [
  {
    prep: "in",
    sentence: "Der Stapler fährt in %.",
    caseName: "Akkusativ",
    trigger: "fährt … in",
    why: "**fahren in** décrit un déplacement : on entre dans le lieu. Question *wohin ?* → accusatif.",
    fr: "Le chariot entre dans …",
  },
  {
    prep: "in",
    sentence: "Die Ware liegt in %.",
    caseName: "Dativ",
    trigger: "liegt … in",
    why: "**liegen** décrit une position, rien ne bouge. Question *wo ?* → datif.",
    fr: "La marchandise se trouve dans …",
  },
  {
    prep: "auf",
    sentence: "Wir stellen die Kartons auf %.",
    caseName: "Akkusativ",
    trigger: "stellen … auf",
    why: "**stellen** est un verbe de déplacement : on pose quelque chose *sur*. *wohin ?* → accusatif.",
    fr: "Nous posons les cartons sur …",
  },
  {
    prep: "auf",
    sentence: "Die Kartons stehen auf %.",
    caseName: "Dativ",
    trigger: "stehen … auf",
    why: "**stehen** décrit l'état, pas le mouvement. *wo ?* → datif.",
    fr: "Les cartons sont posés sur …",
  },
  {
    prep: "an",
    sentence: "Der Fahrer fährt an %.",
    caseName: "Akkusativ",
    trigger: "fährt an",
    why: "Déplacement vers le point de contact. *wohin ?* → accusatif.",
    fr: "Le chauffeur se met à …",
  },
  {
    prep: "an",
    sentence: "Der Lkw wartet an %.",
    caseName: "Dativ",
    trigger: "wartet an",
    why: "**warten** ne déplace rien : le camion est immobile au quai. *wo ?* → datif.",
    fr: "Le camion attend à …",
  },
  {
    prep: "vor",
    sentence: "Der Lkw hält vor %.",
    caseName: "Dativ",
    trigger: "hält vor",
    why: "**halten** décrit l'endroit où l'on est arrêté. *wo ?* → datif.",
    fr: "Le camion s'arrête devant …",
  },
  {
    prep: "zwischen",
    sentence: "Die Palette steht zwischen %.",
    caseName: "Dativ",
    trigger: "steht zwischen",
    why: "Position entre deux repères, sans déplacement. *wo ?* → datif.",
    fr: "La palette est entre …",
  },
  {
    prep: "unter",
    sentence: "Wir schieben die Gabel unter %.",
    caseName: "Akkusativ",
    trigger: "schieben … unter",
    why: "**schieben** engage un déplacement sous quelque chose. *wohin ?* → accusatif.",
    fr: "Nous glissons la fourche sous …",
  },
  {
    prep: "über",
    sentence: "Der Kran hebt die Kiste über %.",
    caseName: "Akkusativ",
    trigger: "hebt … über",
    why: "Le mouvement franchit un espace. *wohin ?* → accusatif.",
    fr: "La grue soulève la caisse au-dessus de …",
  },
  {
    prep: "neben",
    sentence: "Das Ersatzteil liegt neben %.",
    caseName: "Dativ",
    trigger: "liegt neben",
    why: "**liegen** décrit une position. *wo ?* → datif.",
    fr: "La pièce détachée est à côté de …",
  },
  {
    prep: "hinter",
    sentence: "Der Wagen parkt hinter %.",
    caseName: "Dativ",
    trigger: "parkt hinter",
    why: "**parken** décrit l'endroit où l'on est garé. *wo ?* → datif.",
    fr: "Le véhicule est garé derrière …",
  },
];

/** Tournures pour les prépositions à cas fixe : c'est la préposition seule qui décide. */
export interface FixedFrame {
  prep: string;
  sentence: string;
  fr: string;
}

export const FIXED_FRAMES: FixedFrame[] = [
  { prep: "für", sentence: "Wir zahlen extra für %.", fr: "Nous payons un supplément pour …" },
  { prep: "ohne", sentence: "Ohne % geht es nicht.", fr: "Sans …, ce n'est pas possible." },
  { prep: "gegen", sentence: "Der Kunde protestiert gegen %.", fr: "Le client conteste …" },
  { prep: "durch", sentence: "Die Zustellung erfolgt durch %.", fr: "La livraison se fait par …" },
  { prep: "um", sentence: "Es geht um %.", fr: "Il s'agit de …" },
  { prep: "mit", sentence: "Wir arbeiten mit %.", fr: "Nous travaillons avec …" },
  { prep: "nach", sentence: "Nach % ist Schluss.", fr: "Après …, c'est terminé." },
  { prep: "bei", sentence: "Das Problem liegt bei %.", fr: "Le problème vient de …" },
  { prep: "von", sentence: "Die Ware kommt von %.", fr: "La marchandise vient de …" },
  { prep: "zu", sentence: "Zu % habe ich eine Frage.", fr: "J'ai une question sur …" },
  { prep: "aus", sentence: "Die Sendung stammt aus %.", fr: "L'envoi provient de …" },
  { prep: "seit", sentence: "Seit % läuft alles besser.", fr: "Depuis …, tout va mieux." },
  { prep: "ab", sentence: "Ab % gilt der neue Preis.", fr: "À partir de …, le nouveau prix s'applique." },
  { prep: "laut", sentence: "Laut % ist alles korrekt.", fr: "Selon …, tout est correct." },
  { prep: "wegen", sentence: "Wegen % gibt es eine Verzögerung.", fr: "En raison de …, il y a un retard." },
  { prep: "trotz", sentence: "Trotz % liefern wir pünktlich.", fr: "Malgré …, nous livrons à l'heure." },
  { prep: "während", sentence: "Während % bleibt das Lager zu.", fr: "Pendant …, l'entrepôt reste fermé." },
  { prep: "aufgrund", sentence: "Aufgrund % wurde der Auftrag gestoppt.", fr: "En raison de …, la commande a été stoppée." },
  { prep: "innerhalb", sentence: "Innerhalb % muss geliefert werden.", fr: "La livraison doit avoir lieu sous …" },
];
