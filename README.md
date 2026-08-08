# Artikel-Trainer — Logistik, Einkauf & IT

Application Next.js pour apprendre le vocabulaire allemand professionnel :
logistique, achats et informatique. Pensée pour des sessions courtes dans les
transports — elle fonctionne **hors-ligne** et s'installe sur l'écran d'accueil
d'un téléphone.

## Ce que fait l'application

- **1060 entrées** : noms (avec article, pluriel et déclinaison complète),
  verbes (avec parfait, cas régis et conjugaison), adjectifs et expressions
  toutes faites, réparties en 21 thèmes.
- **Répétition espacée** (système de Leitner à 6 paliers) : chaque mot revient
  juste avant d'être oublié, de « dans 10 minutes » à « dans deux mois ».
- **Sept types d'exercices**, mélangés selon ce qui est dû : article,
  traduction DE→FR et FR→DE, **saisie au clavier** (rappel actif), pluriel,
  déclinaison de l'article, **déclinaison de l'adjectif** et **conjugaison**.
- **Prononciation** allemande par la synthèse vocale du navigateur.
- **Suivi de progression** : série de jours, taux de réussite, couverture du
  vocabulaire, échéancier de mémorisation, avancement par thème.
- **Hors-ligne complet** via service worker ; la progression est stockée
  localement dans le navigateur et n'est jamais envoyée sur Internet.
- **Sauvegarde export/import** : indispensable sur la durée, le stockage d'un
  navigateur n'étant pas éternel (iOS purge les sites peu visités).

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

## Développement

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # export statique dans out/
npm run lint
npm run check:data   # cohérence de la base de vocabulaire
npm run icons        # régénère les icônes PWA
```

## Déploiement sur GitHub Pages

Automatique via GitHub Actions (`.github/workflows/deploy.yml`) : chaque `push`
sur `main` reconstruit et publie le site.

Réglage à faire une seule fois sur GitHub : `Settings` → `Pages` → `Source` =
**GitHub Actions**. Le site est ensuite servi sur
`https://<utilisateur>.github.io/learn-vocabulary/`.

Le nom du dépôt est défini dans `next.config.ts` (`repoName`) pour calculer le
`basePath` — à changer si le dépôt est renommé.

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
