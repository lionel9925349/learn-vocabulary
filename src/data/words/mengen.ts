import { makers } from "../builders";

const { n, adj, adv, p } = makers("mengen");

/**
 * Poids, volumes et quantités.
 *
 * Un quai se parle en chiffres : *zwei Paletten à 25 Kilo*, *drei Kubikmeter*,
 * *achtzehn Prozent Zuschlag*. Ces mots sont trop banals pour figurer dans un
 * lexique professionnel, et c'est justement pour cela qu'ils manquaient — mais
 * on ne peut pas prendre une commande sans eux.
 *
 * Trois écarts avec le français y sont signalés : l'unité de mesure reste au
 * **singulier** après un nombre (*zwanzig Kilo*, jamais *Kilos*), *Pfund* vaut
 * 500 g et non 453, et la virgule décimale allemande est notre virgule mais se
 * lit *Komma*.
 */
const mengen = [
  // — Le poids —
  n("Kilogramm", "das", "Kilogramm", "kilogramme", {
    note: "Après un nombre, l'unité reste au **singulier** : *zwanzig Kilogramm*, jamais *Kilogramme*. La même règle vaut pour Kilo, Meter, Liter, Prozent.",
    example: { de: "Das Packstück wiegt 18 Kilogramm.", fr: "Le colis pèse 18 kilogrammes." },
  }),
  n("Kilo", "das", "Kilo", "kilo", {
    example: { de: "Wir haben zwei Kilo zu viel gewogen.", fr: "Nous avons pesé deux kilos de trop." },
  }),
  n("Gramm", "das", "Gramm", "gramme", {
    example: { de: "Die Probe wiegt 250 Gramm.", fr: "L'échantillon pèse 250 grammes." },
  }),
  n("Tonne", "die", "Tonnen", "tonne", {
    example: { de: "Der Lkw darf 24 Tonnen laden.", fr: "Le camion peut charger 24 tonnes." },
  }),
  n("Pfund", "das", "Pfund", "livre (500 g)", {
    note: "Le *Pfund* allemand vaut exactement **500 grammes**, contrairement à la livre anglo-saxonne (453 g). Encore courant à l'oral pour les petites quantités.",
    example: { de: "Ein Pfund sind fünfhundert Gramm.", fr: "Une livre vaut cinq cents grammes." },
  }),

  // — Les dimensions —
  n("Meter", "der", "Meter", "mètre", {
    example: { de: "Die Palette ist zwei Meter hoch.", fr: "La palette fait deux mètres de haut." },
  }),
  n("Zentimeter", "der", "Zentimeter", "centimètre", {
    example: { de: "Der Karton misst 60 Zentimeter.", fr: "Le carton mesure 60 centimètres." },
  }),
  n("Kubikmeter", "der", "Kubikmeter", "mètre cube", {
    example: { de: "Die Sendung hat drei Kubikmeter.", fr: "L'envoi fait trois mètres cubes." },
  }),
  n("Liter", "der", "Liter", "litre", {
    example: { de: "Der Kanister fasst zwanzig Liter.", fr: "Le bidon contient vingt litres." },
  }),
  n("Länge", "die", "Längen", "longueur", {
    example: { de: "Die Länge überschreitet das Standardmaß.", fr: "La longueur dépasse la cote standard." },
  }),
  n("Breite", "die", "Breiten", "largeur", {
    example: { de: "Bitte prüfen Sie die Breite der Ladung.", fr: "Vérifiez la largeur du chargement." },
  }),
  n("Höhe", "die", "Höhen", "hauteur", {
    example: { de: "Die Höhe darf 1,80 Meter nicht übersteigen.", fr: "La hauteur ne doit pas dépasser 1,80 mètre." },
  }),
  n("Tiefe", "die", "Tiefen", "profondeur", {
    example: { de: "Die Tiefe des Regals reicht nicht aus.", fr: "La profondeur du rayonnage ne suffit pas." },
  }),
  n("Abmessung", "die", "Abmessungen", "cote / dimension", {
    example: { de: "Die Abmessungen stehen auf dem Etikett.", fr: "Les dimensions figurent sur l'étiquette." },
  }),

  // — Compter —
  n("Stückzahl", "die", "Stückzahlen", "nombre de pièces", {
    example: { de: "Bitte bestätigen Sie die Stückzahl.", fr: "Confirmez le nombre de pièces." },
  }),
  n("Prozent", "das", "Prozent", "pour cent", {
    example: { de: "Der Zuschlag beträgt achtzehn Prozent.", fr: "Le supplément est de dix-huit pour cent." },
  }),
  n("Hälfte", "die", "Hälften", "moitié", {
    example: { de: "Die Hälfte der Ladung ist schon verladen.", fr: "La moitié du chargement est déjà chargée." },
  }),
  n("Drittel", "das", "Drittel", "tiers", {
    example: { de: "Ein Drittel der Sendungen geht ins Ausland.", fr: "Un tiers des envois part à l'étranger." },
  }),
  n("Dutzend", "das", "Dutzend", "douzaine", {
    example: { de: "Wir haben ein Dutzend Rollbehälter im Umlauf.", fr: "Nous avons une douzaine de rolls en circulation." },
  }),
  n("Summe", "die", "Summen", "somme / total", {
    example: { de: "Die Summe stimmt mit der Rechnung überein.", fr: "Le total concorde avec la facture." },
  }),
  n("Differenz", "die", "Differenzen", "écart", {
    example: { de: "Es bleibt eine Differenz von zwei Kartons.", fr: "Il reste un écart de deux cartons." },
  }),
  n("Komma", "das", "Kommas", "virgule (décimale)", {
    note: "L'allemand écrit et **dit** la virgule décimale : *1,80 Meter* se lit *ein Komma acht null Meter*.",
    example: { de: "Ein Komma fünf Tonnen, nicht fünfzehn.", fr: "Une virgule cinq tonne, pas quinze." },
  }),

  // — Qualifier une quantité —
  adj("sperrig", "encombrant", {
    example: { de: "Sperrige Sendungen laufen über den Handbereich.", fr: "Les envois encombrants passent en traitement manuel." },
  }),
  adv("circa", "environ", {
    example: { de: "Circa fünfzig Packstücke, genau wissen wir es nicht.", fr: "Environ cinquante colis, nous ne savons pas exactement." },
  }),
  adv("ungefähr", "à peu près", {
    example: { de: "Es dauert ungefähr zwei Stunden.", fr: "Cela prend à peu près deux heures." },
  }),

  // — Les tournures de quantité —
  p("pro Stück", "à la pièce"),
  p("pro Palette", "par palette"),
  p("je nach Gewicht", "selon le poids"),
  p("zwei Paletten à 25 Kilo", "deux palettes de 25 kilos chacune", {
    note: "Le *à* français est passé tel quel dans le commerce allemand : *à* + prix ou poids unitaire.",
  }),
  p("Wie viel wiegt das?", "Combien cela pèse-t-il ?"),
  p("Wie viele Packstücke sind es?", "Combien de colis y a-t-il ?"),
  p("Das reicht nicht aus", "Cela ne suffit pas"),
  p("Es fehlen zwei Kartons", "Il manque deux cartons"),
];

export default mengen;
