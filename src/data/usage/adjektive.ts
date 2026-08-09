import type { UsageMap } from "./types";

/**
 * Adjectifs : l'usage montre le mot en position épithète, avec sa terminaison
 * déclinée — ce qui fait d'une pierre deux coups, sens et grammaire.
 */
const usage: UsageMap = {
  puenktlich: {
    v: [["eine pünktliche Lieferung", "une livraison ponctuelle"]],
    s: [
      ["Der Lkw war pünktlich an der Rampe.", "Le camion était à l'heure au quai."],
      ["Wir liefern pünktlich, wie vereinbart.", "Nous livrons à l'heure, comme convenu."],
    ],
  },
  verspaetet: {
    v: [["eine verspätete Sendung", "un envoi en retard"]],
    s: [["Die Ware kam verspätet an.", "La marchandise est arrivée en retard."]],
  },
  dringend: {
    v: [["ein dringender Fall", "un cas urgent"], ["dringender Bedarf", "besoin urgent"]],
    s: [
      ["Das ist dringend.", "C'est urgent."],
      ["Wir brauchen die Teile dringend.", "Nous avons un besoin urgent des pièces."],
    ],
  },
  vollstaendig: {
    v: [["eine vollständige Lieferung", "une livraison complète"]],
    s: [
      ["Die Unterlagen sind vollständig.", "Les documents sont complets."],
      ["Die Sendung wurde vollständig geliefert.", "L'envoi a été livré au complet."],
    ],
  },
  unvollstaendig: {
    v: [["eine unvollständige Lieferung", "une livraison incomplète"]],
    s: [["Die Lieferung war unvollständig.", "La livraison était incomplète."]],
  },
  verfuegbar: {
    v: [["verfügbare Ware", "marchandise disponible"]],
    s: [
      ["Der Artikel ist derzeit nicht verfügbar.", "L'article n'est pas disponible actuellement."],
      ["Ab wann ist die Ware wieder verfügbar?", "À partir de quand la marchandise sera-t-elle disponible ?"],
    ],
  },
  lieferbar: {
    v: [["sofort lieferbar", "livrable immédiatement"]],
    s: [["Das Teil ist nicht mehr lieferbar.", "La pièce n'est plus livrable."]],
  },
  beschaedigt: {
    v: [["eine beschädigte Palette", "une palette endommagée"]],
    s: [
      ["Zwei Kartons waren beschädigt.", "Deux cartons étaient endommagés."],
      ["Die Ware kam beschädigt an.", "La marchandise est arrivée endommagée."],
    ],
  },
  einwandfrei: {
    v: [["einwandfreie Qualität", "qualité irréprochable"]],
    s: [["Die Ware ist in einwandfreiem Zustand.", "La marchandise est en parfait état."]],
  },
  fehlerhaft: {
    v: [["ein fehlerhaftes Bauteil", "un composant défectueux"]],
    s: [["Die Lieferung war fehlerhaft.", "La livraison était défectueuse."]],
  },
  mangelhaft: {
    v: [["mangelhafte Ware", "marchandise défectueuse"]],
    s: [["Die Qualität ist mangelhaft.", "La qualité est insuffisante."]],
  },
  zuverlaessig: {
    v: [["ein zuverlässiger Lieferant", "un fournisseur fiable"]],
    s: [
      ["Dieser Partner ist sehr zuverlässig.", "Ce partenaire est très fiable."],
      ["Wir suchen einen zuverlässigen Transporteur.", "Nous cherchons un transporteur fiable."],
    ],
  },
  unzuverlaessig: {
    v: [["ein unzuverlässiger Anbieter", "un prestataire peu fiable"]],
    s: [["Der Lieferant ist unzuverlässig geworden.", "Le fournisseur est devenu peu fiable."]],
  },
  verbindlich: {
    v: [["ein verbindliches Angebot", "une offre ferme"]],
    s: [
      ["Der Termin ist verbindlich zugesagt.", "La date est confirmée fermement."],
      ["Ist das verbindlich?", "Est-ce ferme ?"],
    ],
  },
  unverbindlich: {
    v: [["ein unverbindliches Angebot", "une offre sans engagement"]],
    s: [["Die Auskunft ist unverbindlich.", "L'information est donnée sans engagement."]],
  },
  kostenlos: {
    v: [["eine kostenlose Lieferung", "une livraison gratuite"]],
    s: [["Der Umtausch ist kostenlos.", "L'échange est gratuit."]],
  },
  kostenpflichtig: {
    v: [["eine kostenpflichtige Leistung", "une prestation payante"]],
    s: [["Die Rücksendung ist kostenpflichtig.", "Le retour est payant."]],
  },
  wirtschaftlich: {
    v: [["eine wirtschaftliche Lösung", "une solution économique"]],
    s: [["Das ist auf Dauer nicht wirtschaftlich.", "Ce n'est pas rentable sur la durée."]],
  },
  teuer: {
    v: [["ein teurer Fehler", "une erreur coûteuse"]],
    s: [
      ["Das wird teuer.", "Cela va coûter cher."],
      ["Der Expressversand ist deutlich teurer.", "L'envoi express est nettement plus cher."],
    ],
  },
  guenstig: {
    v: [["ein günstiger Preis", "un prix avantageux"]],
    s: [["Dieses Angebot ist günstiger.", "Cette offre est plus avantageuse."]],
  },
  zustaendig: {
    v: [["die zuständige Abteilung", "le service compétent"]],
    s: [
      ["Dafür bin ich nicht zuständig.", "Je ne suis pas responsable de cela."],
      ["Wer ist dafür zuständig?", "Qui s'en occupe ?"],
    ],
  },
  erforderlich: {
    v: [["die erforderlichen Unterlagen", "les documents requis"]],
    s: [["Eine Genehmigung ist erforderlich.", "Une autorisation est requise."]],
  },
  notwendig: {
    v: [["eine notwendige Anpassung", "une adaptation nécessaire"]],
    s: [["Ist das wirklich notwendig?", "Est-ce vraiment nécessaire ?"]],
  },
  moeglich: {
    v: [["die bestmögliche Lösung", "la meilleure solution possible"]],
    s: [
      ["Das ist leider nicht möglich.", "Ce n'est malheureusement pas possible."],
      ["So schnell wie möglich.", "Dès que possible."],
    ],
  },
  machbar: {
    s: [["Das ist machbar.", "C'est faisable."], ["Bis Freitag ist das nicht machbar.", "Ce n'est pas faisable d'ici vendredi."]],
  },
  geeignet: {
    v: [["eine geeignete Verpackung", "un emballage approprié"]],
    s: [["Diese Palette ist dafür nicht geeignet.", "Cette palette ne convient pas pour cela."]],
  },
  vorlaeufig: {
    v: [["ein vorläufiges Ergebnis", "un résultat provisoire"]],
    s: [["Die Zahlen sind vorläufig.", "Les chiffres sont provisoires."]],
  },
  endgueltig: {
    v: [["die endgültige Fassung", "la version définitive"]],
    s: [["Die Entscheidung ist endgültig.", "La décision est définitive."]],
  },
  offen: {
    v: [["eine offene Rechnung", "une facture impayée"], ["offene Punkte", "points en suspens"]],
    s: [["Zwei Punkte sind noch offen.", "Deux points sont encore en suspens."]],
  },
  erledigt: {
    s: [
      ["Das ist erledigt.", "C'est réglé."],
      ["Die Aufgabe ist erledigt.", "La tâche est terminée."],
    ],
  },
  laufend: {
    v: [["das laufende Jahr", "l'année en cours"], ["laufende Kosten", "frais courants"]],
    s: [["Der Vorgang ist noch laufend.", "L'opération est encore en cours."]],
  },
  gueltig: {
    v: [["ein gültiger Vertrag", "un contrat valable"]],
    s: [["Das Angebot ist bis Monatsende gültig.", "L'offre est valable jusqu'à la fin du mois."]],
  },
  ungueltig: {
    s: [["Die Bescheinigung ist ungültig.", "L'attestation n'est pas valable."]],
  },
  zulaessig: {
    v: [["das zulässige Gesamtgewicht", "le poids total autorisé"]],
    s: [["Das ist nach den Vorschriften nicht zulässig.", "Ce n'est pas autorisé par les prescriptions."]],
  },
  haftbar: {
    s: [["Dafür sind wir nicht haftbar.", "Nous n'en sommes pas responsables."]],
  },
  nachhaltig: {
    v: [["eine nachhaltige Lieferkette", "une chaîne d'approvisionnement durable"]],
    s: [["Wir setzen auf nachhaltige Verpackungen.", "Nous misons sur des emballages durables."]],
  },
  sicher: {
    v: [["eine sichere Verbindung", "une connexion sécurisée"]],
    s: [
      ["Die Ladung ist sicher verstaut.", "Le chargement est bien arrimé."],
      ["Sind Sie sicher?", "En êtes-vous sûr ?"],
    ],
  },
  vertraulich: {
    v: [["vertrauliche Unterlagen", "documents confidentiels"]],
    s: [["Diese Information ist vertraulich.", "Cette information est confidentielle."]],
  },
  intern: {
    v: [["eine interne Abstimmung", "une concertation interne"]],
    s: [["Das klären wir intern.", "Nous réglons cela en interne."]],
  },
  extern: {
    v: [["ein externer Dienstleister", "un prestataire externe"]],
    s: [["Die Prüfung erfolgt durch ein externes Labor.", "Le contrôle est fait par un laboratoire externe."]],
  },
  kurzfristig: {
    v: [["eine kurzfristige Änderung", "une modification de dernière minute"]],
    s: [["Der Termin wurde kurzfristig abgesagt.", "Le rendez-vous a été annulé au dernier moment."]],
  },
  langfristig: {
    v: [["eine langfristige Zusammenarbeit", "une collaboration à long terme"]],
    s: [["Langfristig lohnt sich die Investition.", "À long terme, l'investissement est rentable."]],
  },
  wichtig: {
    v: [["ein wichtiger Kunde", "un client important"]],
    s: [["Das ist mir wichtig.", "C'est important pour moi."]],
  },
  genau: {
    v: [["eine genaue Angabe", "une indication précise"]],
    s: [["Wir brauchen genaue Zahlen.", "Il nous faut des chiffres précis."]],
  },
  falsch: {
    v: [["die falsche Menge", "la mauvaise quantité"]],
    s: [["Da ist etwas falsch gelaufen.", "Quelque chose s'est mal passé."]],
  },
  richtig: {
    v: [["der richtige Lagerplatz", "le bon emplacement"]],
    s: [["Das ist richtig so.", "C'est correct ainsi."]],
  },
  schwierig: {
    v: [["eine schwierige Situation", "une situation difficile"]],
    s: [["Das wird schwierig.", "Ça va être difficile."]],
  },
  einfach: {
    v: [["eine einfache Lösung", "une solution simple"]],
    s: [["So einfach ist das nicht.", "Ce n'est pas si simple."]],
  },
  schnell: {
    v: [["eine schnelle Rückmeldung", "un retour rapide"]],
    s: [["Das geht schneller als gedacht.", "C'est plus rapide que prévu."]],
  },
  schwer: {
    v: [["eine schwere Palette", "une palette lourde"]],
    s: [["Die Kiste ist zu schwer für eine Person.", "La caisse est trop lourde pour une personne."]],
  },
  voll: {
    v: [["ein voller Container", "un conteneur plein"]],
    s: [["Das Lager ist voll.", "L'entrepôt est plein."]],
  },
  leer: {
    v: [["ein leerer Lkw", "un camion vide"]],
    s: [["Der Lkw fährt leer zurück.", "Le camion repart à vide."]],
  },
  gefaehrlich: {
    v: [["eine gefährliche Ladung", "un chargement dangereux"]],
    s: [["Das ist gefährlich.", "C'est dangereux."]],
  },
  entzuendbar: {
    v: [["entzündbare Flüssigkeiten", "liquides inflammables"]],
    s: [["Der Stoff ist leicht entzündbar.", "La matière est facilement inflammable."]],
  },
  aetzend: {
    v: [["ätzende Stoffe", "matières corrosives"]],
    s: [["Vorsicht, der Inhalt ist ätzend.", "Attention, le contenu est corrosif."]],
  },
  giftig: {
    v: [["giftige Dämpfe", "vapeurs toxiques"]],
    s: [["Der Stoff ist giftig beim Einatmen.", "La matière est toxique par inhalation."]],
  },
};

export default usage;
