import type { UsageMap } from "./types";

/**
 * Complément : matières dangereuses, achats, IT et entrepôt.
 * Les tournures sont volontairement variées — questions, négations, passif,
 * impératif — pour éviter d'apprendre un moule de phrase à la place du mot.
 */
const usage: UsageMap = {
  // — Gefahrgut —
  gefahrgutklasse: {
    v: [
      ["die Gefahrgutklasse bestimmen", "déterminer la classe de danger"],
      ["nach Gefahrgutklasse trennen", "séparer par classe de danger"],
    ],
    s: [
      ["Zu welcher Gefahrgutklasse gehört dieser Stoff?", "À quelle classe appartient cette matière ?"],
      ["Klasse 3 umfasst entzündbare Flüssigkeiten.", "La classe 3 regroupe les liquides inflammables."],
    ],
  },
  gefahrnummer: {
    v: [["die Gefahrnummer ablesen", "lire le code de danger"]],
    s: [
      ["Die obere Zahl auf der Warntafel ist die Gefahrnummer.", "Le nombre du haut sur le panneau orange est le code de danger."],
      ["33 bedeutet: leicht entzündbare Flüssigkeit.", "33 signifie : liquide très inflammable."],
    ],
  },
  gefahrensymbol: {
    v: [["das Gefahrensymbol erkennen", "reconnaître le pictogramme"]],
    s: [
      ["Erkennen Sie dieses Gefahrensymbol?", "Reconnaissez-vous ce pictogramme ?"],
      ["Das Gefahrensymbol steht auf jeder Verpackung.", "Le pictogramme figure sur chaque emballage."],
    ],
  },
  freigrenze: {
    v: [["die Freigrenze überschreiten", "dépasser le seuil d'exemption"]],
    s: [
      ["Unterhalb der Freigrenze gelten Erleichterungen.", "En dessous du seuil, des allègements s'appliquent."],
      ["Achtung: Wir überschreiten die Freigrenze.", "Attention : nous dépassons le seuil."],
    ],
  },
  trennvorschrift: {
    v: [["die Trennvorschriften beachten", "respecter les règles de ségrégation"]],
    s: [
      ["Welche Trennvorschriften gelten hier?", "Quelles règles de ségrégation s'appliquent ici ?"],
      ["Die Trennvorschriften verbieten diese Kombination.", "Les règles de ségrégation interdisent cette combinaison."],
    ],
  },
  notfallnummer: {
    v: [["die Notfallnummer anrufen", "appeler le numéro d'urgence"]],
    s: [
      ["Rufen Sie sofort die Notfallnummer an!", "Appelez immédiatement le numéro d'urgence !"],
      ["Die Notfallnummer steht im Unfallmerkblatt.", "Le numéro d'urgence figure dans les consignes écrites."],
    ],
  },
  gefahrenbereich: {
    v: [["den Gefahrenbereich absperren", "condamner la zone dangereuse"]],
    s: [
      ["Betreten des Gefahrenbereichs verboten!", "Accès interdit à la zone dangereuse !"],
      ["Niemand darf ohne Schutzausrüstung in den Gefahrenbereich.", "Personne n'entre en zone dangereuse sans protection."],
    ],
  },
  feuerloescher: {
    v: [["den Feuerlöscher prüfen lassen", "faire contrôler l'extincteur"]],
    s: [
      ["Wo hängt der nächste Feuerlöscher?", "Où se trouve l'extincteur le plus proche ?"],
      ["Der Feuerlöscher muss alle zwei Jahre geprüft werden.", "L'extincteur doit être contrôlé tous les deux ans."],
    ],
  },
  auffangwanne: {
    v: [["Fässer in eine Auffangwanne stellen", "placer les fûts sur un bac de rétention"]],
    s: [
      ["Ohne Auffangwanne darf hier nichts gelagert werden.", "Rien ne peut être stocké ici sans bac de rétention."],
      ["Die Auffangwanne fasst 200 Liter.", "Le bac de rétention contient 200 litres."],
    ],
  },
  entsorgen: {
    v: [
      ["Abfall fachgerecht entsorgen", "éliminer les déchets dans les règles"],
      ["Gefahrstoffe entsorgen lassen", "faire éliminer les produits dangereux"],
    ],
    s: [
      ["Wie wird dieser Stoff entsorgt?", "Comment cette matière est-elle éliminée ?"],
      ["Das darf nicht im Hausmüll entsorgt werden.", "Cela ne doit pas partir aux ordures ménagères."],
    ],
  },
  kennzeichnen: {
    v: [["Verpackungen kennzeichnen", "étiqueter les emballages"]],
    s: [
      ["Haben Sie die Kartons gekennzeichnet?", "Avez-vous étiqueté les cartons ?"],
      ["Die Ware wurde falsch gekennzeichnet.", "La marchandise a été mal étiquetée."],
    ],
  },

  // — Einkauf, suite —
  bestellwert: {
    v: [["den Bestellwert überschreiten", "dépasser la valeur de commande"]],
    s: [
      ["Ab welchem Bestellwert liefern Sie frei Haus?", "À partir de quel montant livrez-vous franco ?"],
      ["Der Bestellwert liegt unter der Freigabegrenze.", "Le montant est sous le seuil de validation."],
    ],
  },
  bestellposition: {
    v: [["eine Bestellposition ändern", "modifier une ligne de commande"]],
    s: [
      ["Welche Bestellposition fehlt?", "Quelle ligne de commande manque ?"],
      ["Position 3 wurde noch nicht geliefert.", "La ligne 3 n'a pas encore été livrée."],
    ],
  },
  freigabeprozess: {
    v: [["den Freigabeprozess durchlaufen", "passer par le circuit de validation"]],
    s: [
      ["Wie lange dauert der Freigabeprozess?", "Combien de temps prend le circuit de validation ?"],
      ["Der Freigabeprozess hängt beim Bereichsleiter.", "La validation est bloquée chez le chef de secteur."],
    ],
  },
  einsparpotenzial: {
    v: [["Einsparpotenziale identifizieren", "identifier des gisements d'économies"]],
    s: [
      ["Wo sehen Sie noch Einsparpotenzial?", "Où voyez-vous encore des économies possibles ?"],
      ["Das Einsparpotenzial wurde auf 8 Prozent geschätzt.", "Le potentiel d'économies a été estimé à 8 %."],
    ],
  },
  lieferantenaudit: {
    v: [["ein Lieferantenaudit ansetzen", "programmer un audit fournisseur"]],
    s: [
      ["Wann findet das nächste Lieferantenaudit statt?", "Quand a lieu le prochain audit fournisseur ?"],
      ["Beim Lieferantenaudit gab es keine Beanstandungen.", "L'audit fournisseur n'a relevé aucune non-conformité."],
    ],
  },
  wechselkurs: {
    v: [["den Wechselkurs absichern", "couvrir le taux de change"]],
    s: [
      ["Wie hoch ist der aktuelle Wechselkurs?", "Quel est le taux de change actuel ?"],
      ["Der Wechselkurs hat sich zu unseren Gunsten entwickelt.", "Le taux de change a évolué en notre faveur."],
    ],
  },
  vorkasse: {
    v: [["auf Vorkasse bestehen", "exiger un paiement d'avance"]],
    s: [
      ["Wir liefern nur gegen Vorkasse.", "Nous ne livrons que contre paiement d'avance."],
      ["Kommt Vorkasse für Sie infrage?", "Le paiement d'avance vous convient-il ?"],
    ],
  },
  kuendigungsfrist: {
    v: [["die Kündigungsfrist einhalten", "respecter le préavis"]],
    s: [
      ["Wie lang ist die Kündigungsfrist?", "Quel est le délai de préavis ?"],
      ["Die Kündigungsfrist beträgt drei Monate zum Quartalsende.", "Le préavis est de trois mois à la fin du trimestre."],
    ],
  },

  // — IT, suite —
  datensatz: {
    v: [
      ["einen Datensatz anlegen", "créer un enregistrement"],
      ["einen Datensatz löschen", "supprimer un enregistrement"],
    ],
    s: [
      ["Wie viele Datensätze wurden übertragen?", "Combien d'enregistrements ont été transférés ?"],
      ["Dieser Datensatz ist doppelt vorhanden.", "Cet enregistrement existe en double."],
    ],
  },
  auswertung: {
    v: [
      ["eine Auswertung erstellen", "produire une analyse"],
      ["die Auswertung verschicken", "envoyer l'analyse"],
    ],
    s: [
      ["Können Sie mir die Auswertung schicken?", "Pouvez-vous m'envoyer l'analyse ?"],
      ["Die Auswertung zeigt einen klaren Trend.", "L'analyse montre une tendance nette."],
    ],
  },
  benutzerkonto: {
    v: [
      ["ein Benutzerkonto anlegen", "créer un compte utilisateur"],
      ["ein Benutzerkonto sperren", "bloquer un compte utilisateur"],
    ],
    s: [
      ["Mein Benutzerkonto ist gesperrt.", "Mon compte est bloqué."],
      ["Für neue Kollegen legen wir ein Benutzerkonto an.", "Nous créons un compte pour les nouveaux collègues."],
    ],
  },
  wartungsfenster: {
    v: [["ein Wartungsfenster ankündigen", "annoncer une fenêtre de maintenance"]],
    s: [
      ["Das Wartungsfenster liegt am Sonntagmorgen.", "La fenêtre de maintenance est dimanche matin."],
      ["Während des Wartungsfensters ist das System nicht erreichbar.", "Pendant la maintenance, le système est inaccessible."],
    ],
  },
  schnittstellenfehler: {
    v: [["einen Schnittstellenfehler analysieren", "analyser une erreur d'interface"]],
    s: [
      ["Woher kommt dieser Schnittstellenfehler?", "D'où vient cette erreur d'interface ?"],
      ["Ein Schnittstellenfehler blockiert die Übertragung.", "Une erreur d'interface bloque le transfert."],
    ],
  },
  meilenstein: {
    v: [["einen Meilenstein erreichen", "atteindre un jalon"]],
    s: [
      ["Der nächste Meilenstein ist Ende März.", "Le prochain jalon est fin mars."],
      ["Haben wir den Meilenstein gehalten?", "Avons-nous tenu le jalon ?"],
    ],
  },
  schulung: {
    v: [
      ["eine Schulung anbieten", "proposer une formation"],
      ["an einer Schulung teilnehmen", "suivre une formation"],
    ],
    s: [
      ["Wer hat die Schulung noch nicht besucht?", "Qui n'a pas encore suivi la formation ?"],
      ["Nach der Schulung können alle das System bedienen.", "Après la formation, tous savent utiliser le système."],
    ],
  },

  // — Entrepôt, suite —
  stellplatz: {
    v: [
      ["einen Stellplatz reservieren", "réserver un emplacement"],
      ["einen Stellplatz räumen", "libérer un emplacement"],
    ],
    s: [
      ["Ist noch ein Stellplatz frei?", "Reste-t-il un emplacement libre ?"],
      ["Alle Stellplätze sind belegt.", "Tous les emplacements sont occupés."],
    ],
  },
  wareneingangskontrolle: {
    v: [["die Wareneingangskontrolle durchführen", "réaliser le contrôle à réception"]],
    s: [
      ["Wurde die Wareneingangskontrolle gemacht?", "Le contrôle à réception a-t-il été fait ?"],
      ["Die Wareneingangskontrolle deckte einen Schaden auf.", "Le contrôle à réception a révélé un dommage."],
    ],
  },
  gitterbox: {
    v: [["eine Gitterbox stapeln", "gerber une caisse-palette"]],
    s: [
      ["Wie viele Gitterboxen haben wir noch?", "Combien de caisses-palettes reste-t-il ?"],
      ["Die Gitterbox steht auf Stellplatz 12.", "La caisse-palette est à l'emplacement 12."],
    ],
  },
  hubwagen: {
    v: [["den Hubwagen nehmen", "prendre le transpalette"]],
    s: [
      ["Nimm den Hubwagen für die kurze Strecke.", "Prends le transpalette pour la courte distance."],
      ["Der Hubwagen steht am Tor.", "Le transpalette est près du portail."],
    ],
  },
  foerderband: {
    v: [["das Förderband anhalten", "arrêter le convoyeur"]],
    s: [
      ["Warum steht das Förderband?", "Pourquoi le convoyeur est-il à l'arrêt ?"],
      ["Das Förderband läuft seit zehn Minuten nicht mehr.", "Le convoyeur ne tourne plus depuis dix minutes."],
    ],
  },
  karton: {
    v: [
      ["einen Karton packen", "faire un carton"],
      ["einen Karton zukleben", "fermer un carton au ruban"],
    ],
    s: [
      ["Wie viele Kartons passen auf eine Palette?", "Combien de cartons tiennent sur une palette ?"],
      ["Der Karton ist aufgerissen.", "Le carton est déchiré."],
    ],
  },
};

export default usage;
