import { makers } from "../builders";

const { v } = makers("verben");

/**
 * Les verbes à rection prépositionnelle.
 *
 * C'est le lot qui manquait le plus. Un francophone peut connaître mille mots
 * et rester incompréhensible s'il dit *ich warte für den Lkw* au lieu de *ich
 * warte auf den Lkw* : la préposition allemande ne se déduit jamais de la
 * française, et le cas qu'elle régit ne se déduit pas non plus du sens.
 *
 * Chaque entrée porte donc son patron complet dans `governs` — c'est lui qui
 * alimente l'exercice de rection — et une phrase où le verbe travaille pour de
 * bon. Les `note` signalent le piège précis que tend le français.
 */
const rektion = [
  // — auf + Akkusativ : le groupe le plus fourni, et le plus contre-intuitif —
  v("warten", "hat gewartet", "attendre", {
    governs: "auf etwas (Akk.) warten",
    note: "Jamais *warten für*. On attend « sur » quelque chose en allemand.",
    example: { de: "Wir warten seit zwei Stunden auf den Lkw.", fr: "Nous attendons le camion depuis deux heures." },
  }),
  v("achten", "hat geachtet", "faire attention à / veiller à", {
    governs: "auf etwas (Akk.) achten",
    example: { de: "Bitte achten Sie auf die Kennzeichnung.", fr: "Veuillez faire attention au marquage." },
  }),
  v("sich verlassen", "hat sich verlassen", "compter sur / se fier à", {
    governs: "sich auf jemanden (Akk.) verlassen",
    praesens: "verlässt",
    note: "À ne pas confondre avec *verlassen* seul, qui veut dire quitter.",
    example: { de: "Auf diesen Spediteur können wir uns verlassen.", fr: "Sur ce transporteur, nous pouvons compter." },
  }),
  v("sich beziehen", "hat sich bezogen", "se référer à", {
    governs: "sich auf etwas (Akk.) beziehen",
    note: "La formule d'ouverture des courriers : *Bezug nehmend auf Ihr Schreiben…*",
    example: { de: "Ich beziehe mich auf Ihre Anfrage vom 3. März.", fr: "Je me réfère à votre demande du 3 mars." },
  }),
  v("reagieren", "hat reagiert", "réagir à", {
    governs: "auf etwas (Akk.) reagieren",
    example: { de: "Der Lieferant hat nicht auf unsere Mahnung reagiert.", fr: "Le fournisseur n'a pas réagi à notre relance." },
  }),
  v("verzichten", "hat verzichtet", "renoncer à / se passer de", {
    governs: "auf etwas (Akk.) verzichten",
    example: { de: "Wir verzichten auf die Teillieferung.", fr: "Nous renonçons à la livraison partielle." },
  }),
  v("hoffen", "hat gehofft", "espérer", {
    governs: "auf etwas (Akk.) hoffen",
    example: { de: "Wir hoffen auf eine schnelle Klärung.", fr: "Nous espérons un règlement rapide." },
  }),
  v("sich freuen", "hat sich gefreut", "se réjouir", {
    governs: "sich über etwas (Akk.) freuen",
    note: "**über** pour ce qui est arrivé, **auf** pour ce qui vient : *ich freue mich auf die Messe* (je m'en réjouis d'avance).",
    example: { de: "Wir freuen uns über die pünktliche Lieferung.", fr: "Nous nous réjouissons de la livraison ponctuelle." },
  }),

  // — an + Dativ : participation, travail, cause —
  v("arbeiten", "hat gearbeitet", "travailler (sur un sujet)", {
    governs: "an etwas (Dat.) arbeiten",
    note: "*arbeiten an* = travailler sur un dossier ; *arbeiten bei* = travailler chez un employeur.",
    example: { de: "Die IT arbeitet an einer Lösung.", fr: "L'informatique travaille à une solution." },
  }),
  v("sich beteiligen", "hat sich beteiligt", "participer à / prendre part à", {
    governs: "sich an etwas (Dat.) beteiligen",
    example: { de: "Drei Lieferanten beteiligen sich an der Ausschreibung.", fr: "Trois fournisseurs participent à l'appel d'offres." },
  }),
  v("liegen", "hat gelegen", "tenir à / être dû à", {
    governs: "an etwas (Dat.) liegen",
    note: "*Es liegt an…* est la tournure standard pour désigner une cause.",
    example: { de: "Die Verzögerung liegt an der Zollabfertigung.", fr: "Le retard tient au dédouanement." },
  }),
  v("zweifeln", "hat gezweifelt", "douter de", {
    governs: "an etwas (Dat.) zweifeln",
    example: { de: "Niemand zweifelt an der Qualität.", fr: "Personne ne doute de la qualité." },
  }),

  // — an + Akkusativ : direction, destinataire, mémoire —
  v("sich wenden", "hat sich gewandt", "s'adresser à", {
    governs: "sich an jemanden (Akk.) wenden",
    note: "Même préposition qu'au datif ci-dessus, mais ici il y a un destinataire : le mouvement va vers quelqu'un.",
    example: { de: "Wenden Sie sich bitte an die Buchhaltung.", fr: "Adressez-vous à la comptabilité." },
  }),
  v("denken", "hat gedacht", "penser à", {
    governs: "an etwas (Akk.) denken",
    example: { de: "Denken Sie bitte an die Zollpapiere.", fr: "Pensez aux documents douaniers." },
  }),
  v("sich erinnern", "hat sich erinnert", "se souvenir de", {
    governs: "sich an etwas (Akk.) erinnern",
    example: { de: "Erinnern Sie sich an den Vorfall im Mai?", fr: "Vous souvenez-vous de l'incident de mai ?" },
  }),
  v("sich gewöhnen", "hat sich gewöhnt", "s'habituer à", {
    governs: "sich an etwas (Akk.) gewöhnen",
    example: { de: "Das Team gewöhnt sich an das neue System.", fr: "L'équipe s'habitue au nouveau système." },
  }),

  // — mit + Dativ : ce qui accompagne, ce sur quoi on compte —
  v("rechnen", "hat gerechnet", "s'attendre à / tabler sur", {
    governs: "mit etwas (Dat.) rechnen",
    note: "Piège classique : *rechnen mit* ne veut pas dire calculer avec, mais prévoir.",
    example: { de: "Wir rechnen mit einer Verzögerung von drei Tagen.", fr: "Nous tablons sur un retard de trois jours." },
  }),
  v("sich beschäftigen", "hat sich beschäftigt", "s'occuper de / se pencher sur", {
    governs: "sich mit etwas (Dat.) beschäftigen",
    example: { de: "Die Qualitätssicherung beschäftigt sich mit dem Fall.", fr: "L'assurance qualité se penche sur le cas." },
  }),
  v("umgehen", "ist umgegangen", "manier / traiter (quelque chose d'une certaine façon)", {
    governs: "mit etwas (Dat.) umgehen",
    separable: true,
    note: "Séparable ici (*ich gehe damit um*), inséparable au sens de contourner.",
    example: { de: "Mit Gefahrgut muss man vorsichtig umgehen.", fr: "Les matières dangereuses demandent d'être maniées avec précaution." },
  }),
  v("versehen", "hat versehen", "munir de / doter de", {
    governs: "etwas (Akk.) mit etwas (Dat.) versehen",
    praesens: "versieht",
    example: { de: "Jede Palette wird mit einem Etikett versehen.", fr: "Chaque palette est munie d'une étiquette." },
  }),
  v("zusammenarbeiten", "hat zusammengearbeitet", "collaborer avec", {
    governs: "mit jemandem (Dat.) zusammenarbeiten",
    separable: true,
    example: { de: "Wir arbeiten seit zehn Jahren mit diesem Werk zusammen.", fr: "Nous collaborons avec cette usine depuis dix ans." },
  }),
  v("übereinstimmen", "hat übereingestimmt", "concorder avec / correspondre à", {
    governs: "mit etwas (Dat.) übereinstimmen",
    separable: true,
    note: "Le verbe du contrôle réception : la marchandise concorde — ou non — avec le bon de livraison.",
    example: { de: "Die Menge stimmt nicht mit dem Lieferschein überein.", fr: "La quantité ne concorde pas avec le bon de livraison." },
  }),

  // — von + Dativ : origine, dépendance —
  v("abhängen", "hat abgehangen", "dépendre de", {
    governs: "von etwas (Dat.) abhängen",
    separable: true,
    example: { de: "Der Termin hängt von der Zollfreigabe ab.", fr: "La date dépend de la mainlevée douanière." },
  }),
  v("profitieren", "hat profitiert", "profiter de / bénéficier de", {
    governs: "von etwas (Dat.) profitieren",
    example: { de: "Wir profitieren von besseren Konditionen.", fr: "Nous bénéficions de meilleures conditions." },
  }),
  v("überzeugen", "hat überzeugt", "convaincre de", {
    governs: "jemanden (Akk.) von etwas (Dat.) überzeugen",
    example: { de: "Der Preis hat den Kunden nicht von uns überzeugt.", fr: "Le prix n'a pas convaincu le client." },
  }),

  // — für + Akkusativ : responsabilité, intérêt, remerciement —
  v("sorgen", "hat gesorgt", "veiller à / faire en sorte que", {
    governs: "für etwas (Akk.) sorgen",
    example: { de: "Bitte sorgen Sie für eine lückenlose Kühlkette.", fr: "Veillez à une chaîne du froid sans rupture." },
  }),
  v("sich interessieren", "hat sich interessiert", "s'intéresser à", {
    governs: "sich für etwas (Akk.) interessieren",
    example: { de: "Der Kunde interessiert sich für eine Rahmenvereinbarung.", fr: "Le client s'intéresse à un accord-cadre." },
  }),
  v("danken", "hat gedankt", "remercier de", {
    governs: "jemandem (Dat.) für etwas (Akk.) danken",
    note: "Double rection : la personne au datif, la chose au **für** + accusatif.",
    example: { de: "Wir danken Ihnen für Ihre schnelle Rückmeldung.", fr: "Nous vous remercions de votre réponse rapide." },
  }),
  v("sich entscheiden", "hat sich entschieden", "opter pour / trancher", {
    governs: "sich für etwas (Akk.) entscheiden",
    example: { de: "Wir haben uns für den günstigeren Anbieter entschieden.", fr: "Nous avons opté pour le prestataire le moins cher." },
  }),
  v("sich eignen", "hat sich geeignet", "convenir à / se prêter à", {
    governs: "sich für etwas (Akk.) eignen",
    example: { de: "Diese Verpackung eignet sich nicht für den Seetransport.", fr: "Cet emballage ne convient pas au transport maritime." },
  }),
  v("sich bewerben", "hat sich beworben", "postuler / se porter candidat", {
    governs: "sich um etwas (Akk.) bewerben",
    praesens: "bewirbt",
    example: { de: "Zwei Firmen bewerben sich um den Auftrag.", fr: "Deux entreprises se portent candidates au marché." },
  }),
  v("bitten", "hat gebeten", "prier de / demander (poliment)", {
    governs: "jemanden (Akk.) um etwas (Akk.) bitten",
    note: "*bitten um* demande une faveur ; *fragen nach* demande une information.",
    example: { de: "Wir bitten Sie um eine kurze Bestätigung.", fr: "Nous vous prions de nous confirmer brièvement." },
  }),

  // — nach + Dativ : recherche, renseignement, conformité —
  v("fragen", "hat gefragt", "demander (une information)", {
    governs: "nach etwas (Dat.) fragen",
    example: { de: "Der Kunde fragt nach dem Liefertermin.", fr: "Le client demande la date de livraison." },
  }),
  v("suchen", "hat gesucht", "chercher", {
    governs: "nach etwas (Dat.) suchen",
    example: { de: "Wir suchen nach einer Alternative.", fr: "Nous cherchons une solution de remplacement." },
  }),
  v("sich erkundigen", "hat sich erkundigt", "se renseigner sur", {
    governs: "sich nach etwas (Dat.) erkundigen",
    example: { de: "Bitte erkundigen Sie sich nach dem Sendungsstatus.", fr: "Renseignez-vous sur le statut de l'envoi." },
  }),
  v("sich richten", "hat sich gerichtet", "se conformer à / s'aligner sur", {
    governs: "sich nach etwas (Dat.) richten",
    example: { de: "Der Preis richtet sich nach der Abnahmemenge.", fr: "Le prix s'aligne sur la quantité commandée." },
  }),

  // — zu + Dativ : appartenance, résultat, contribution —
  v("gehören", "hat gehört", "appartenir à / faire partie de", {
    governs: "zu etwas (Dat.) gehören",
    note: "*gehören zu* = faire partie de ; *gehören* + datif seul = appartenir à quelqu'un.",
    example: { de: "Die Verpackung gehört zum Lieferumfang.", fr: "L'emballage fait partie de la fourniture." },
  }),
  v("führen", "hat geführt", "mener à / conduire à", {
    governs: "zu etwas (Dat.) führen",
    example: { de: "Der Ausfall führt zu einer Verzögerung.", fr: "La panne entraîne un retard." },
  }),
  v("beitragen", "hat beigetragen", "contribuer à", {
    governs: "zu etwas (Dat.) beitragen",
    separable: true,
    praesens: "trägt bei",
    example: { de: "Die neue Software trägt zur Fehlervermeidung bei.", fr: "Le nouveau logiciel contribue à éviter les erreurs." },
  }),
  v("dienen", "hat gedient", "servir à", {
    governs: "zu etwas (Dat.) dienen",
    example: { de: "Das Formular dient zur Erfassung der Schäden.", fr: "Le formulaire sert à recenser les dommages." },
  }),
  v("sich äußern", "hat sich geäußert", "se prononcer sur", {
    governs: "sich zu etwas (Dat.) äußern",
    example: { de: "Der Lieferant hat sich noch nicht zu der Reklamation geäußert.", fr: "Le fournisseur ne s'est pas encore prononcé sur la réclamation." },
  }),

  // — über + Akkusativ : le sujet dont on traite —
  v("berichten", "hat berichtet", "rendre compte de / faire un rapport sur", {
    governs: "über etwas (Akk.) berichten",
    example: { de: "Die Leitung berichtet monatlich über die Kennzahlen.", fr: "La direction rend compte des indicateurs chaque mois." },
  }),
  v("diskutieren", "hat diskutiert", "débattre de", {
    governs: "über etwas (Akk.) diskutieren",
    example: { de: "Wir diskutieren noch über die Konditionen.", fr: "Nous débattons encore des conditions." },
  }),
  v("sich ärgern", "hat sich geärgert", "s'agacer de", {
    governs: "sich über etwas (Akk.) ärgern",
    example: { de: "Der Kunde ärgert sich über die späte Antwort.", fr: "Le client s'agace de la réponse tardive." },
  }),
  v("verfügen", "hat verfügt", "disposer de", {
    governs: "über etwas (Akk.) verfügen",
    note: "*verfügen über* = avoir à disposition. Rien à voir avec *über* au sens spatial.",
    example: { de: "Das Lager verfügt über 4 000 Stellplätze.", fr: "L'entrepôt dispose de 4 000 emplacements." },
  }),

  // — vor + Dativ : ce dont on protège —
  v("schützen", "hat geschützt", "protéger de", {
    governs: "etwas (Akk.) vor etwas (Dat.) schützen",
    note: "Le français dit « protéger **de** » ; l'allemand dit « protéger **devant** ».",
    example: { de: "Die Folie schützt die Ware vor Feuchtigkeit.", fr: "Le film protège la marchandise de l'humidité." },
  }),
  v("warnen", "hat gewarnt", "mettre en garde contre", {
    governs: "jemanden (Akk.) vor etwas (Dat.) warnen",
    example: { de: "Das Schild warnt vor herabfallenden Lasten.", fr: "Le panneau met en garde contre les chutes de charges." },
  }),

  // — aus + Dativ : composition —
  v("bestehen", "hat bestanden", "se composer de", {
    governs: "aus etwas (Dat.) bestehen",
    note: "Autre sens, autre rection : *bestehen auf* + datif = insister sur.",
    example: { de: "Die Sendung besteht aus zwölf Kartons.", fr: "L'envoi se compose de douze cartons." },
  }),
];

export default rektion;
