# Artikel-Trainer — Logistik & IT

Application Next.js pour apprendre le vocabulaire allemand de la logistique et de
l'IT : les articles (der/die/das) et toutes les formes de déclinaison
(Nominativ, Akkusativ, Dativ, Genitiv, singulier/pluriel, article défini et
indéfini).

- **343 mots** classés en 14 thèmes (entrepôt, transport, douane, achats,
  production, qualité, logiciels métier, programmation, réseau, finance,
  travail, communication, personnes...)
- Chaque mot a : son article, son pluriel, une explication de la règle de
  genre, un exemple de phrase traduit, et sa fiche de déclinaison complète
  générée automatiquement.
- Trois modules : entraînement aux articles, entraînement aux déclinaisons,
  et exploration/recherche du vocabulaire.

## Développement local

```bash
npm install
npm run dev
```

Puis ouvrir [http://localhost:3000](http://localhost:3000).

## Déploiement sur GitHub Pages

Le déploiement est automatique via GitHub Actions (`.github/workflows/deploy.yml`) :
à chaque `push` sur `main`, le site est reconstruit (export statique) et publié.

**Étape unique à faire une fois sur GitHub** : dans le dépôt, aller dans
`Settings` → `Pages` → section "Build and deployment" → régler `Source` sur
**GitHub Actions**. Le site sera ensuite disponible à
`https://<utilisateur>.github.io/learn-vocabulary/`.

Pour déployer manuellement en local (sans passer par les Actions) :

```bash
npm run build   # génère le dossier out/ (export statique)
```

Le nom du dépôt est en dur dans `next.config.ts` (`repoName`) pour calculer le
`basePath` — à modifier si le dépôt est renommé.

## Ajouter du vocabulaire

Les mots sont organisés par thème dans `src/data/words/*.ts`. Pour ajouter un
mot, ajouter une entrée `Word` (voir `src/lib/types.ts`) dans le fichier du
thème concerné :

```ts
{
  id: "identifiant-unique",
  de: "Nomallemand",
  artikel: "der", // ou "die" / "das"
  plural: "Nomallemände", // ou null si pas de pluriel courant
  fr: "traduction",
  category: "lager", // doit correspondre à une clé de src/data/categories.ts
  rule: "Explication de la règle de genre (peut contenir **gras**).",
  example: { de: "Phrase d'exemple.", fr: "Traduction." },
  // declClass: "weak", // si le nom suit la n-Déklination (der Kunde, der Mandant...)
}
```

Le tableau de déclinaison complet (les 6 formes d'article : der, die, das,
den, dem, des, et les formes ein/kein) est calculé automatiquement par
`src/lib/declension.ts` à partir du genre — inutile de le saisir à la main.
