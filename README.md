# Artikel-Trainer — Logistik, Einkauf & IT

Application Next.js pour apprendre le vocabulaire allemand professionnel :
logistique, achats et informatique. Pensée pour des sessions courtes dans les
transports — elle fonctionne **hors-ligne** et s'installe sur l'écran d'accueil
d'un téléphone.

## Ce que fait l'application

- **1121 entrées** : noms (avec article, pluriel et déclinaison complète),
  verbes (avec parfait, cas régis et conjugaison), adjectifs et expressions
  toutes faites, réparties en 22 thèmes.
- **Répétition espacée** (système de Leitner à 6 paliers) : chaque question
  revient juste avant d'être oubliée, de « dans 10 minutes » à « dans deux
  mois ».
- **Huit types d'exercices**, mélangés selon ce qui est dû : article,
  traduction DE→FR et FR→DE, **saisie au clavier** (rappel actif), pluriel,
  déclinaison de l'article, **déclinaison de l'adjectif** et **conjugaison**.
- **Prononciation** allemande par la synthèse vocale du navigateur.
- **Suivi de progression** : série de jours, taux de réussite, couverture du
  vocabulaire, échéancier de mémorisation, avancement par thème.
- **Hors-ligne complet** via service worker ; la progression est stockée
  localement dans le navigateur et n'est jamais envoyée sur Internet.
- **Sauvegarde export/import** : indispensable sur la durée, le stockage d'un
  navigateur n'étant pas éternel (iOS purge les sites peu visités).

## L'unité de révision est la facette, pas le mot

Un mot n'est pas un bloc. Savoir traduire *der Wareneingang*, savoir son
pluriel et savoir le décliner au génitif sont trois acquis distincts, qui
s'oublient à des rythmes différents. La répétition espacée porte donc sur le
couple **(mot, type de question)** — 1121 mots font ainsi 5875 facettes.

Concrètement :

- une bonne réponse en traduction ne repousse plus à deux mois une déclinaison
  jamais posée ;
- un mot n'est « maîtrisé » que lorsque **toutes** ses facettes le sont, et il
  perd ce statut dès qu'une seule est ratée ;
- on découvre un mot par son sens : une seule facette neuve par mot et par
  session, les autres arrivent aux sessions suivantes ;
- une facette ratée revient trois questions plus loin **dans la même session** —
  c'est ce que veut dire le palier « dans 10 minutes ».

Le format de sauvegarde est versionné (`version: 2`) et une progression écrite
par une version antérieure est convertie à la lecture : le palier du mot est
reporté sur chacune de ses facettes, les échéances échelonnées pour ne pas
toutes tomber le même jour, et les compteurs de réponses laissés sur une seule
facette pour ne pas gonfler le taux de réussite.

## Architecture : pourquoi pas de base de données

Chaque appareil garde sa propre progression dans le navigateur. Plusieurs
personnes peuvent donc apprendre chacune sur son téléphone sans aucun serveur,
sans compte et sans inscription — et l'application reste utilisable hors
connexion. Le volume en jeu (quelques kilo-octets par personne) ne justifie
aucune base de données ; le seul risque réel est la perte du stockage local,
que l'export/import couvre.

Une synchronisation entre appareils demanderait, elle, un service externe
(Supabase ou équivalent) : l'hébergement statique resterait sur GitHub Pages,
seul le stockage de la progression changerait.

### Le vocabulaire n'est pas transmis en propriété

Les composants interactifs importent `WORDS` directement plutôt que de le
recevoir en `prop` depuis un composant serveur. La différence n'est pas
esthétique : une prop traverse la frontière serveur/client, donc les 1121
entrées étaient sérialisées dans le HTML **et** dans la charge utile RSC de
chaque page, en plus d'être déjà présentes dans le JavaScript. Les pages
pesaient 630 Ko ; elles en pèsent 15 à 30. Le vocabulaire ne voyage plus qu'une
fois, dans un fragment de code mis en cache par le navigateur.

Corollaire à respecter : `@/data` (le vocabulaire complet) ne doit pas être
importé pour la seule liste des thèmes — c'est `@/data/categories` qu'il faut.

## Développement

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # export statique dans out/, puis génération du sw.js
npm run lint
npm test             # logique de grammaire et de répétition espacée
npm run check:data   # cohérence de la base de vocabulaire
npm run icons        # régénère les icônes PWA
```

`npm run lint`, `npm test` et `npm run check:data` tournent en intégration
continue avant chaque déploiement : c'est ce qui empêche une faute d'article ou
une régression de conjugaison d'arriver en ligne.

### Tests

Les tests couvrent la logique pure — celle qui, si elle se trompe, enseigne une
faute sans que personne s'en aperçoive : déclinaison du nom et de l'adjectif,
conjugaison, déduction du genre, correction des réponses tapées, répétition
espacée et migration des sauvegardes.

`src/lib/quiz.test.ts` fait autre chose : il génère **toutes** les questions de
**tout** le vocabulaire et vérifie leurs invariants (la bonne réponse figure
parmi les propositions, aucune proposition n'est en double, le sens reste
affiché sauf quand c'est lui la réponse). C'est le filet qui attrape les
problèmes de données que ne voit pas `check:data`.

## Déploiement sur GitHub Pages

Automatique via GitHub Actions (`.github/workflows/deploy.yml`) : chaque `push`
sur `main` vérifie puis reconstruit et publie le site.

Réglage à faire une seule fois sur GitHub : `Settings` → `Pages` → `Source` =
**GitHub Actions**. Le site est ensuite servi sur
`https://<utilisateur>.github.io/learn-vocabulary/`.

Le nom du dépôt est défini dans `next.config.ts` (`repoName`) pour calculer le
`basePath` — à changer si le dépôt est renommé.

### Service worker

`public/sw.js` est un **gabarit** : sa liste de précache et sa version sont
réécrites après le build par `scripts/generate-sw.mjs`, qui lit les pages
réellement produites et calcule une empreinte du build.

Ce n'est pas de la coquetterie. La liste tenue à la main précachait une route
`/reviser/` supprimée depuis et ignorait sept pages d'exercices ajoutées après
elle — sans que rien ne le signale, `Promise.allSettled` avalant les échecs.
« Hors-ligne complet » n'était donc vrai que pour la moitié de l'application.
La version du cache, elle aussi constante manuelle, n'avait jamais été relevée.

## Ajouter du vocabulaire

Les mots vivent dans `src/data/words/*.ts`. La saisie est volontairement
minimale : **la règle de genre n'est pas écrite à la main**, elle est déduite de
la morphologie du mot par `src/lib/genderRules.ts` (mot composé → genre du
dernier élément ; sinon terminaison en -ung, -tion, -heit…).

```ts
import { makers } from "../builders";
const { n, v, adj, p } = makers("einkauf"); // clé de thème

n("Lieferantenaudit", "das", "Lieferantenaudits", "audit fournisseur");
v("verhandeln", "hat verhandelt", "négocier", { governs: "über etwas (Akk.) verhandeln" });
adj("verbindlich", "ferme / contraignant");
p("Wir sind uns einig", "Nous sommes d'accord");
```

Ensuite, brancher le fichier dans `src/data/index.ts` et lancer :

```bash
npm run check:data
```

Le script vérifie l'unicité des identifiants, les champs obligatoires, et
surtout **compare le genre déclaré au genre déduit** : c'est ce qui rattrape les
fautes d'article à grande échelle. Il rapporte aussi la fiabilité du moteur
d'inférence (actuellement 100 % de précision sur les 72 % de noms qu'il sait
trancher). Un mot dont le genre contredit sa morphologie est soit une faute de
saisie, soit une vraie exception — dans ce second cas il doit porter une `rule`
écrite à la main pour l'assumer explicitement.

Le tableau de déclinaison (der/die/das/den/dem/des et ein/kein aux quatre cas)
est calculé par `src/lib/declension.ts` — il n'y a rien à saisir.
