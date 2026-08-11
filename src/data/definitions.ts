import { slug } from "./builders";

/**
 * Définitions — le volet « dictionnaire » de l'application.
 *
 * Beaucoup de mots ont une traduction française exacte mais tout aussi obscure :
 * savoir que *Skonto* se dit « escompte » n'aide pas si l'on ignore ce qu'est un
 * escompte. On explique donc ici la **chose**, pas le mot, et on la distingue de
 * ses voisines (Skonto ≠ Rabatt, Lastenheft ≠ Pflichtenheft) — c'est là que se
 * jouent les vraies confusions.
 *
 * Tout le vocabulaire n'a pas besoin d'une définition : on n'en écrit que là où
 * la traduction seule laisse le sens dans le flou. Le reste est éclairé
 * automatiquement par la décomposition des composés (`lib/compound`).
 */
const RAW: Record<string, string> = {
  // — Entrepôt et stocks —
  Kommissionierung:
    "Aller chercher dans l'entrepôt les articles d'une commande précise et les rassembler pour l'expédition. C'est le cœur du métier de magasinier : on « prélève » (picking) selon une liste, article par article.",
  Umschlag:
    "Le passage de la marchandise d'un moyen de transport ou d'un stock à un autre — on décharge, on trie, on recharge. Par extension, le **rythme** auquel un stock se renouvelle.",
  Umschlagshäufigkeit:
    "Combien de fois le stock est entièrement écoulé et reconstitué dans l'année. Élevé = la marchandise tourne vite et immobilise peu d'argent ; faible = du capital dort en rayon.",
  Sicherheitsbestand:
    "Réserve que l'on garde en permanence sous le stock minimum, pour absorber un retard du fournisseur ou un pic de commandes. C'est un stock qu'on espère ne jamais entamer.",
  Mindestbestand:
    "Seuil qui déclenche le réapprovisionnement : quand le stock descend jusque-là, on recommande. À ne pas confondre avec le _Sicherheitsbestand_, qui est la réserve d'urgence située en dessous.",
  Schwund:
    "Marchandise qui disparaît sans mouvement enregistré : casse, évaporation, erreurs de saisie, vol. On la constate à l'inventaire, comme un écart inexpliqué.",
  Inventur:
    "Le comptage physique de tout ce qui est réellement en stock, pour le confronter aux quantités du système. Obligation légale annuelle en Allemagne.",
  Permanentinventur:
    "Inventaire étalé sur toute l'année : chaque emplacement est compté à son tour, au lieu de tout arrêter un jour donné. L'entrepôt ne ferme jamais.",
  Stichprobeninventur:
    "Inventaire par sondage : on ne compte qu'un échantillon représentatif et on extrapole statistiquement au reste du stock.",
  Leergut:
    "Les emballages qui repartent : palettes, caisses, bacs, bouteilles. Ils ont une valeur et se suivent comme de la marchandise, souvent avec consigne.",
  Konsignationslager:
    "Stock physiquement chez le client mais qui reste la propriété du fournisseur : le client ne paie qu'au moment où il prélève. Très courant en industrie.",
  Pufferlager:
    "Stock intermédiaire placé entre deux étapes qui ne vont pas à la même vitesse, pour que la plus lente ne bloque pas l'autre.",
  Sperrware:
    "Marchandise bloquée en stock : elle existe physiquement mais ne peut être ni vendue ni expédiée tant que le contrôle qualité ou la douane n'a pas donné son feu vert.",
  Gitterbox:
    "Caisse-palette en grillage métallique, empilable et pliable, standard européen. Le contenu reste visible et l'ensemble se manipule au chariot élévateur.",
  Ladeeinheit:
    "Ensemble regroupé pour être manipulé d'un seul geste — typiquement une palette filmée. On ne déplace plus des colis, on déplace une unité.",
  Artikelstamm:
    "La fiche d'identité permanente d'un article dans le système : référence, désignation, unité, poids, fournisseur. Elle ne change pas d'une commande à l'autre, contrairement aux mouvements.",
  Verräumung:
    "Ranger à leur emplacement définitif des marchandises déjà réceptionnées et posées en zone d'arrivée.",
  Nachschub:
    "Le fait de réalimenter les emplacements de prélèvement depuis le stock de masse, pour que le préparateur trouve toujours de quoi servir.",
  Lieferbereitschaft:
    "Part des commandes que l'on peut servir immédiatement depuis le stock. C'est la promesse commerciale mesurée en pourcentage.",
  Kühlkette:
    "Chaîne du froid : la température doit rester dans une plage donnée sans interruption, de la production au client. Une seule rupture invalide toute la chaîne.",

  // — Transport —
  Spediteur:
    "Il organise le transport sans forcément le réaliser : il choisit les moyens, les sous-traitants, les itinéraires. Le _Frachtführer_, lui, conduit effectivement la marchandise.",
  Frachtführer:
    "Celui qui exécute matériellement le transport et en assume la responsabilité pendant le trajet.",
  Disponent:
    "La personne qui, chaque jour, attribue les chargements aux camions et aux chauffeurs, et arbitre entre urgences, capacités et temps de conduite.",
  Verlader:
    "L'entreprise qui confie la marchandise au transport — c'est le donneur d'ordre côté départ, pas l'ouvrier qui charge le camion.",
  Frachtbrief:
    "Document qui accompagne la marchandise et fait foi du contrat de transport : qui expédie, qui reçoit, quoi, dans quel état. La version internationale routière s'appelle CMR.",
  Wechselbrücke:
    "Caisse mobile : le conteneur du transport routier européen, posé sur béquilles, que l'on dépose et reprend sans grue et sans immobiliser le camion.",
  Sammelgut:
    "Groupage : des envois de plusieurs clients, trop petits pour remplir un camion, sont réunis sur un même véhicule puis redistribués.",
  Laufzeit:
    "Le temps que met un envoi entre son départ et sa livraison — le délai promis au client, hors préparation.",
  Standzeit:
    "Temps pendant lequel un véhicule attend, à quai ou sur site, sans rouler ni être déchargé. Au-delà d'un seuil, le transporteur le facture.",
  Lenkzeit:
    "Temps de conduite réglementé du chauffeur, enregistré par le tachygraphe. Il est plafonné par jour et par semaine, pauses obligatoires comprises.",
  Auslastung:
    "À quel point la capacité disponible est réellement utilisée — camion à moitié vide, entrepôt à moitié plein, machine à l'arrêt.",
  Zeitfenster:
    "Créneau réservé à un camion pour se présenter au quai. Arriver hors créneau, c'est attendre.",
  Leerfahrt:
    "Trajet effectué sans chargement — il coûte autant qu'un autre et ne rapporte rien.",

  // — Douane —
  Zollanmeldung:
    "La déclaration par laquelle on présente une marchandise à la douane : nature, valeur, origine, régime demandé. C'est elle qui déclenche le calcul des droits.",
  Verzollung:
    "L'ensemble des formalités qui font passer une marchandise sous statut douanier réglé — droits calculés, taxes payées, marchandise libérée.",
  Warennummer:
    "Le code chiffré qui classe une marchandise dans la nomenclature douanière. C'est lui, et non le nom du produit, qui détermine le taux de droit applicable.",
  Präferenzursprung:
    "Origine qui ouvre droit à un taux de douane réduit ou nul, en vertu d'un accord commercial. Elle est plus exigeante que la simple origine géographique.",
  Präferenznachweis:
    "Le document qui prouve cette origine privilégiée — sans lui, le taux préférentiel est refusé même si la marchandise y avait droit.",
  Ursprungszeugnis:
    "Certificat délivré par une chambre de commerce attestant du pays où la marchandise a été produite.",
  Zolllager:
    "Entrepôt où la marchandise importée peut rester sans que les droits soient payés — ils ne sont dus qu'à la sortie, ou jamais si elle est réexportée.",
  Zollkontingent:
    "Volume de marchandises admis à taux réduit ; une fois le contingent épuisé, on repasse au taux plein.",
  Einfuhrumsatzsteuer:
    "La TVA due à l'entrée sur le territoire, calculée sur la valeur en douane augmentée des droits. Elle est généralement récupérable par l'entreprise.",
  Zollwert:
    "La valeur retenue par la douane pour calculer les droits : le prix payé, augmenté du transport et de l'assurance jusqu'à la frontière.",
  Zollfreigabe:
    "Le moment où la douane libère la marchandise et autorise sa mise en circulation.",
  // Ces deux entrées portent un identifiant écrit à la main dans le lot d'origine :
  // on le reprend tel quel, `slug` étant sans effet sur un identifiant déjà formé.
  dualuse:
    "Bien civil qui peut aussi servir à des fins militaires (chimie, électronique, machines-outils). Son export est soumis à autorisation, même vers des pays amis.",
  Verbringung:
    "Mouvement de marchandises entre deux pays de l'Union : on ne parle pas d'import/export puisqu'il n'y a pas de douane, mais des obligations statistiques subsistent.",
  Intrastat:
    "Déclaration statistique mensuelle des échanges de marchandises à l'intérieur de l'Union. Elle remplace la déclaration en douane disparue avec le marché unique.",
  Carnet:
    "Carnet ATA : passeport douanier des marchandises qui voyagent temporairement (échantillons, matériel de salon) et qui reviennent sans droits.",
  ATLAS:
    "Le système informatique allemand de dédouanement : toutes les déclarations passent par lui, plus rien ne se dépose sur papier.",
  Incoterm:
    "Sigle en trois lettres (EXW, FCA, DAP…) qui fixe, entre vendeur et acheteur, qui paie le transport, qui l'assure, et à quel instant précis le risque change de mains.",
  Gefahrenübergang:
    "L'instant exact où la marchandise cesse d'être au risque du vendeur pour être à celui de l'acheteur. Si elle est détruite après, l'acheteur paie quand même.",
  Embargo:
    "Interdiction, décidée par un État ou l'Union, de commercer avec un pays, une entité ou une personne donnée.",

  // — Achats —
  Skonto:
    "Réduction accordée si l'on paie vite : « 2 % Skonto sous 10 jours, net à 30 ». Elle récompense la rapidité de paiement, là où le _Rabatt_ récompense le volume ou la relation.",
  Rabatt: "Remise consentie d'emblée sur le prix affiché, selon la quantité, le client ou la période.",
  Rahmenvertrag:
    "Contrat qui fixe une fois pour toutes les conditions (prix, qualité, délais) sans engager les quantités. Chaque besoin donne ensuite lieu à un simple appel de livraison.",
  Abrufauftrag:
    "Commande passée dans le cadre d'un contrat-cadre : on ne renégocie rien, on « appelle » une quantité pour une date.",
  Bestellanforderung:
    "Demande interne adressée au service achats par celui qui a le besoin. Elle devient une commande fournisseur seulement une fois validée.",
  Bedarfsträger:
    "Le service ou la personne qui exprime le besoin en interne — le demandeur, par opposition à l'acheteur qui le traite.",
  Ausschreibung:
    "Mise en concurrence formalisée : on publie un cahier des charges, plusieurs fournisseurs remettent une offre, on compare et on attribue.",
  Zuschlag:
    "L'attribution du marché au fournisseur retenu. Le même mot désigne aussi un supplément de prix (surcoût carburant, majoration).",
  Preisgleitklausel:
    "Clause qui fait évoluer automatiquement le prix d'un contrat long selon un indice (acier, énergie, salaires), au lieu de le renégocier.",
  Preisspiegel:
    "Tableau qui met en regard, ligne à ligne, les offres reçues, pour les comparer à périmètre identique.",
  Kostentreiber:
    "L'élément qui fait réellement varier le coût — le nombre de références, la fréquence de livraison, la taille des lots. On l'identifie pour agir dessus.",
  Bündelung:
    "Regrouper des besoins éparpillés (services, sites, périodes) en un seul volume d'achat pour peser dans la négociation.",
  Einzelquelle:
    "Un seul fournisseur pour un besoin donné : prix et relation optimisés, mais toute défaillance de sa part arrête la production.",
  Doppelquelle:
    "Deux fournisseurs pour le même besoin : on paie un peu plus cher la sécurité d'avoir toujours une alternative.",
  Bezugsquelle: "Le fournisseur ou le circuit par lequel on se procure effectivement un article.",
  Bonitätsprüfung:
    "Examen de la santé financière d'un partenaire avant de s'engager : peut-il payer, ou risque-t-on l'impayé ?",
  Vorkasse: "Paiement exigé avant toute expédition — la marchandise ne part qu'une fois l'argent reçu.",
  Werkvertrag:
    "Contrat où l'on doit un **résultat** défini et réceptionné (un logiciel qui marche, une installation qui tourne). Le _Dienstleistungsvertrag_, lui, ne doit que des moyens et du temps.",
  Leiharbeit:
    "Personnel mis à disposition par une agence d'intérim : il travaille sous vos consignes mais reste salarié de l'agence.",
  Lieferkettengesetz:
    "Loi allemande qui rend l'entreprise responsable du respect des droits humains et de l'environnement chez ses fournisseurs, y compris à l'étranger.",
  Verhaltenskodex:
    "Charte que le fournisseur signe et s'engage à respecter : travail, corruption, environnement. Son non-respect peut rompre le contrat.",
  Preisuntergrenze:
    "Le prix en dessous duquel une vente n'est plus rentable — la limite que le négociateur ne franchit pas.",
  Gesamtkosten:
    "Le coût complet sur toute la durée de vie : achat, transport, stockage, maintenance, élimination. Le prix d'achat n'en est souvent qu'une petite part.",

  // — Production —
  Stückliste:
    "La liste de tous les composants et quantités nécessaires pour fabriquer un produit — sa recette, souvent structurée en niveaux.",
  Arbeitsplan:
    "La suite ordonnée des opérations de fabrication, avec les postes et les temps. La _Stückliste_ dit avec quoi, l'_Arbeitsplan_ dit comment.",
  Rüstzeit:
    "Temps improductif de reconfiguration d'une machine entre deux séries. Le réduire permet de fabriquer par plus petits lots.",
  Taktzeit:
    "Rythme imposé par la demande : un produit doit sortir toutes les X minutes pour tenir la cadence prévue.",
  Durchlaufzeit:
    "Temps total qu'un ordre met à traverser tout le processus, attentes comprises — bien plus long que la somme des temps de travail.",
  Ausschuss:
    "Pièces produites mais inutilisables, mises au rebut. Le taux d'_Ausschuss_ mesure la maîtrise du procédé.",
  Nacharbeit:
    "Reprise d'une pièce défectueuse pour la rendre conforme, au lieu de la jeter — du travail non prévu, donc non facturé.",
  Losgröße:
    "Nombre de pièces lancées en une fois. Grands lots = moins de réglages mais plus de stock ; petits lots = l'inverse.",
  Fertigungstiefe:
    "Part de la valeur du produit réalisée en interne plutôt qu'achetée. Faible profondeur = on assemble surtout des pièces achetées.",
  Instandhaltung:
    "L'entretien qui maintient l'équipement en état : inspection, maintenance préventive, réparation.",
  Stillstand: "Arrêt d'une machine ou d'une ligne — planifié ou subi ; dans les deux cas rien ne se produit.",
  "just-in-time":
    "Produire et livrer juste au moment du besoin, sans stock d'avance. Très économe, mais le moindre retard arrête tout.",
  Wertschöpfung:
    "Ce que l'entreprise ajoute réellement à ce qu'elle a acheté. Tout le reste — attente, transport interne, contrôle, retouche — est du coût sans valeur ajoutée.",

  // — Qualité et réclamations —
  Reklamation:
    "Contestation formelle du client après livraison : quantité, qualité, retard. Elle ouvre un traitement tracé, avec réponse et éventuelle compensation.",
  Beanstandung:
    "Le fait de signaler une non-conformité constatée, souvent en interne ou à la réception, avant même toute demande de réparation.",
  Mangel:
    "Défaut qui fait que la marchandise ne correspond pas à ce qui était convenu. C'est la notion juridique qui déclenche la garantie.",
  "Mängelrüge":
    "Signalement formel du défaut au vendeur, dans le délai légal. Ne pas le faire à temps, c'est perdre ses droits — obligation stricte entre commerçants en Allemagne.",
  Gewährleistung:
    "La garantie **légale** : le vendeur répond des défauts déjà présents à la livraison. Elle s'impose à lui, contrairement à la garantie commerciale qu'il offre volontairement.",
  Gutschrift:
    "Document par lequel le vendeur réduit ou annule une somme due — le contraire d'une facture. Souvent émis après une réclamation acceptée.",
  Retoure: "Marchandise renvoyée par le client, qu'il faut réceptionner, contrôler et réintégrer ou détruire.",
  Abweichung:
    "Écart entre ce qui était prévu (norme, quantité, spécification) et ce qui est constaté. Ni bon ni mauvais en soi : c'est un signal à analyser.",
  Korrekturmaßnahme:
    "Action qui s'attaque à la **cause** d'un défaut pour qu'il ne revienne pas — au-delà de la simple réparation du cas présent.",
  Audit:
    "Examen méthodique, par un tiers ou en interne, de la conformité d'un processus à un référentiel. Il se conclut par des constats et des actions.",
  Abnahme:
    "La réception formelle d'une prestation ou d'un ouvrage par le client : elle déclenche le paiement, le transfert des risques et le départ des délais de garantie.",
  Vertragsstrafe:
    "Somme fixée d'avance au contrat, due automatiquement en cas de manquement (retard, défaut), sans avoir à prouver le préjudice.",

  // — Droit et administration —
  Haftung:
    "Le fait de devoir répondre juridiquement d'un dommage et de le réparer — question centrale dès qu'une marchandise est abîmée.",
  Verjährung:
    "Extinction d'un droit par l'écoulement du temps : passé le délai, la créance existe encore mais n'est plus réclamable en justice.",
  Eigentumsvorbehalt:
    "Clause qui laisse la marchandise propriété du vendeur jusqu'au paiement intégral, même si l'acheteur l'a déjà reçue et utilisée.",
  Gerichtsstand:
    "Le tribunal compétent en cas de litige, désigné à l'avance dans le contrat. Un enjeu réel dans le commerce international.",
  Schiedsverfahren:
    "Règlement d'un litige par des arbitres choisis par les parties plutôt que par un tribunal d'État : plus discret et souvent plus rapide.",
  Streitbeilegung: "L'ensemble des moyens de mettre fin à un litige — de la négociation à l'arbitrage.",
  Sorgfaltspflicht:
    "Obligation de diligence : vérifier, contrôler, se renseigner. On peut être fautif pour ne pas avoir cherché à savoir.",
  Aufbewahrungspflicht:
    "Obligation légale de conserver documents et justificatifs pendant une durée déterminée (souvent six ou dix ans en Allemagne).",
  Geheimhaltungsvereinbarung:
    "Accord de confidentialité signé avant d'échanger des informations sensibles, typiquement au début d'un appel d'offres.",
  Haftungsausschluss: "Clause par laquelle une partie exclut sa responsabilité pour certains dommages.",
  Endverbleibserklärung:
    "Déclaration signée par l'acheteur sur l'usage final et la destination réelle d'un bien sensible — exigée pour les exportations contrôlées.",
  Betriebsrat:
    "Instance élue représentant le personnel en Allemagne. Son accord est requis sur de nombreux sujets : horaires, embauches, surveillance.",
  Kündigungsfrist:
    "Délai à respecter entre l'annonce de la résiliation et sa prise d'effet — pour un contrat comme pour un emploi.",

  // — Finances —
  Abschreibung:
    "Étalement comptable du coût d'un bien sur sa durée d'utilisation, au lieu de le passer en charge en une fois.",
  Rückstellung:
    "Somme mise de côté au bilan pour une dépense probable dont le montant ou la date reste incertain (litige, garantie).",
  Deckungsbeitrag:
    "Ce qui reste du prix de vente une fois déduits les coûts variables : la contribution de chaque vente à couvrir les frais fixes.",
  Mahnung:
    "Rappel formel adressé au client qui n'a pas payé. En Allemagne, c'est elle qui met le débiteur en demeure et fait courir les intérêts de retard.",
  Zahlungsziel: "Le délai accordé pour payer, compté à partir de la facture — 30 jours net, par exemple.",
  Zahlungsverzug: "Situation du client qui a dépassé l'échéance : des intérêts courent et les relances commencent.",
  Bilanz:
    "Photographie du patrimoine de l'entreprise à une date : d'un côté ce qu'elle possède, de l'autre ce qu'elle doit.",
  Jahresabschluss: "L'ensemble des comptes arrêtés en fin d'exercice : bilan, compte de résultat, annexe.",
  Kalkulation:
    "Le calcul qui construit un prix à partir des coûts, avant de proposer une offre — ou qui vérifie après coup ce que l'affaire a réellement coûté.",
  Umsatz:
    "Le total facturé sur une période. Ce n'est pas un gain : le bénéfice, c'est ce qu'il en reste une fois les coûts déduits.",
  Wechselkurs: "Le taux auquel une monnaie s'échange contre une autre au moment de l'opération.",
  Währungsrisiko:
    "Risque de perdre de l'argent parce que le taux de change a bougé entre la commande et le paiement.",

  // — Informatique et projets —
  Mandant:
    "Entité juridique ou client isolé dans un même système : chacun ne voit que ses propres données, bien qu'ils partagent le logiciel.",
  Stammdaten:
    "Les données stables qui décrivent articles, clients, fournisseurs. Elles servent de référence à tous les mouvements, qui eux changent en permanence.",
  Buchung:
    "L'enregistrement d'un mouvement dans le système, qui met le stock ou le compte à jour. Rien n'existe tant que ce n'est pas « bouché ».",
  Lastenheft:
    "Ce que le **client** veut : les besoins et les exigences, exprimés sans dire comment les réaliser.",
  Pflichtenheft:
    "La réponse du **prestataire** : comment il compte réaliser ce qui est demandé, techniquement et concrètement.",
  Schnittstelle:
    "Le point de contact par lequel deux systèmes — ou deux services — échangent des données. Littéralement « l'endroit de la coupure ».",
  Anforderung:
    "Exigence formulée à laquelle la solution devra répondre, et sur laquelle elle sera contrôlée à la réception.",
  Bereitstellung:
    "Mettre une version ou une ressource à disposition de ceux qui vont l'utiliser — le déploiement.",
  Rollout: "Le déploiement progressif d'une nouvelle solution : site par site, service par service.",
  Inbetriebnahme: "Le passage en service réel, le jour où le système devient celui avec lequel on travaille.",
  Produktivumgebung:
    "L'environnement réel, celui où travaillent les utilisateurs. Une erreur y a des conséquences immédiates, contrairement à l'environnement de test.",
  Regressionstest:
    "Test qui revérifie ce qui fonctionnait déjà, pour s'assurer qu'une modification n'a rien cassé ailleurs.",
  Testabdeckung: "Part du code ou des cas d'usage réellement couverts par des tests.",
  Stapelverarbeitung:
    "Traitement d'un gros volume en une seule passe automatique, sans intervention — typiquement la nuit.",
  Nachtlauf: "Le traitement automatique lancé chaque nuit : facturation, réapprovisionnement, statistiques.",
  Schwachstelle:
    "Point faible d'un système par lequel une attaque devient possible, tant qu'il n'est pas corrigé.",
  Verschlüsselung:
    "Transformation des données en texte illisible sans la clé, pour qu'une interception ne serve à rien.",
  Berechtigung:
    "Ce qu'un utilisateur a le droit de voir et de faire dans le système, selon son rôle.",
  Zwischenablage: "Mémoire temporaire où atterrit ce que l'on copie, en attendant d'être collé.",
  Aufwandsschätzung:
    "Estimation du travail nécessaire, en jours ou en heures, avant de s'engager sur un délai ou un prix.",
  Meilenstein:
    "Date-repère d'un projet marquant un résultat vérifiable — pas une tâche, mais un état atteint.",
  Benutzergeschichte:
    "Besoin exprimé du point de vue de l'utilisateur : « en tant que magasinier, je veux… afin de… ».",
  Eskalation:
    "Faire remonter un problème au niveau hiérarchique supérieur parce qu'il n'a pas pu être réglé à son niveau.",
  Fachbereich:
    "Le service métier concerné — ceux qui connaissent l'activité, par opposition à l'informatique qui construit l'outil.",
  Sachbearbeiter:
    "L'agent qui traite les dossiers au quotidien : saisie, vérification, suivi. Pas un cadre, mais celui qui fait avancer les cas.",

  // — Emballage et matières dangereuses —
  Umverpackung:
    "Emballage extérieur qui regroupe plusieurs colis déjà emballés, pour les protéger et les manipuler ensemble.",
  Packstück: "Une unité expédiée telle qu'elle est comptée sur le document de transport : un colis, un fût, une palette.",
  Packmittel: "Tout ce qui sert à emballer : cartons, films, calages, sangles, étiquettes.",
  Gefahrgut:
    "Marchandise dont le transport est réglementé parce qu'elle présente un danger — inflammable, corrosive, toxique. Chaque classe a ses règles d'emballage, d'étiquetage et de documents.",
  Gefahrstoff:
    "Substance dangereuse pour la santé ou l'environnement **au poste de travail**. Le _Gefahrgut_ concerne, lui, son transport.",
  Gefahrzettel:
    "L'étiquette en losange apposée sur le colis : symbole, couleur et numéro de classe indiquent la nature du danger.",
  Gefahrnummer:
    "Nombre affiché en haut du panneau orange du véhicule, qui code la nature et l'intensité du danger — un chiffre doublé signale une intensité accrue.",
  Sicherheitsdatenblatt:
    "Fiche normalisée qui accompagne un produit chimique : composition, dangers, protection, conduite à tenir en cas d'accident.",
  Unfallmerkblatt:
    "Consigne écrite remise au chauffeur, qui indique quoi faire immédiatement en cas d'incident avec la marchandise transportée.",
  Zusammenladeverbot:
    "Interdiction de charger ensemble des matières qui réagiraient dangereusement en cas de fuite ou d'incendie.",
  Verpackungsgruppe:
    "Niveau de danger d'une matière (I à III), qui commande la robustesse exigée de l'emballage.",
  Wassergefährdungsklasse: "Classement allemand du danger d'un produit pour les eaux, qui impose des mesures de rétention.",
  Selbstentzündung: "Capacité d'une matière à s'enflammer seule, sans source de chaleur extérieure.",
  Gefahrgutbeauftragte:
    "Personne désignée et formée, obligatoire dans l'entreprise, qui veille au respect de la réglementation des matières dangereuses.",
  Beförderungspapier:
    "Document de transport obligatoire pour les matières dangereuses : il énonce précisément ce qui est transporté et sous quelle classification.",

  // — Travail et organisation —
  Einarbeitung:
    "La période pendant laquelle un nouveau est formé et accompagné jusqu'à devenir autonome à son poste.",
  Unterweisung:
    "Formation obligatoire et répétée aux consignes de sécurité d'un poste, dont la tenue doit être documentée.",
  Staplerschein:
    "Autorisation de conduite d'un chariot élévateur, délivrée après formation et examen — sans elle, interdiction de conduire.",
  Leitstand:
    "Poste central d'où l'on suit et pilote l'activité en temps réel : écrans, indicateurs, décisions immédiates.",
  Abstimmung:
    "Le fait de se mettre d'accord entre services avant d'agir : on cale les positions, on lève les divergences.",
  Zuständigkeit: "Le périmètre dont on répond officiellement — qui traite quoi, et à qui l'on s'adresse.",
  Freigabe:
    "Le feu vert formel qui débloque une suite : une marchandise, un budget, une version. Sans lui, rien n'avance.",
  Vorgesetzter: "Le responsable hiérarchique direct, celui qui donne les consignes et évalue.",
  Ansprechpartner: "La personne à contacter sur un sujet donné — l'interlocuteur attitré, pas forcément le décideur.",
  Kennzahl:
    "Chiffre suivi régulièrement pour piloter une activité (taux de service, rotation, taux d'erreur). Il ne décrit pas tout : il alerte.",
  Aufwand:
    "La charge que représente une tâche — temps, personnes, moyens. Se dit aussi bien d'un projet informatique que d'une manutention.",
  Auswertung: "L'exploitation des données brutes pour en tirer un constat lisible : tableau, rapport, graphique.",
};

/** Clés converties en identifiants de mots, comme dans `builders.slug`. */
const DEFINITIONS: Record<string, string> = {};
for (const [de, text] of Object.entries(RAW)) DEFINITIONS[slug(de)] = text;

export default DEFINITIONS;
