# Quizzie

Une application moderne pour générer et gérer des quizzes interactifs.

## Technologies utilisées

- **[Next.js](https://nextjs.org/)** - Framework React pour le développement web
- **[shadcn/ui](https://ui.shadcn.com/)** - Composants UI réutilisables et accessibles
- **[TypeScript](https://www.typescriptlang.org/)** - JavaScript avec typage statique
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utility-first
- **[Cypress](https://www.cypress.io/)** - Framework de tests E2E
- **[Vercel](https://vercel.com/)** - Plateforme de déploiement

## Prérequis

- Node.js 18.x ou supérieur
- npm ou yarn

## Installation

1. Cloner le repository :
```bash
git clone <votre-repo-url>
cd quizzie
```

2. Installer les dépendances :
```bash
npm install
# ou
yarn install
```

## Développement

Lancer le serveur de développement :

```bash
npm run dev
# ou
yarn dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur pour voir l'application.

## Build

Pour créer une version de production :

```bash
npm run build
# ou
yarn build
```

## Tests

### Tests E2E avec Cypress

Lancer les tests en mode interactif :
```bash
npm run e2e
```

Lancer les tests en mode headless :
```bash
npm run e2e:headless
```

Ouvrir uniquement Cypress (serveur dev doit être lancé) :
```bash
npm run cypress
```

## CI/CD

Le projet utilise GitHub Actions pour l'intégration continue :

- **ci.yml** : Lance le build et les tests E2E sur chaque push/PR
- **deploy.yml** : Déploie automatiquement sur Vercel après succès des tests (uniquement sur la branche main)

### Configuration des secrets GitHub

Pour activer le déploiement automatique, ajoutez ces secrets dans votre repository GitHub (Settings > Secrets and variables > Actions) :

1. **VERCEL_TOKEN** : Votre token d'API Vercel
   - Obtenez-le sur https://vercel.com/account/tokens

2. **VERCEL_ORG_ID** : ID de votre organisation Vercel
   - Trouvez-le dans les paramètres de votre projet Vercel

3. **VERCEL_PROJECT_ID** : ID de votre projet Vercel
   - Trouvez-le dans les paramètres de votre projet Vercel

## Déploiement

Ce projet est configuré pour être déployé sur Vercel :

1. Pusher votre code sur GitHub
2. Importer le projet sur [Vercel](https://vercel.com)
3. Vercel détectera automatiquement Next.js et configurera le déploiement

Ou utilisez le déploiement automatique via GitHub Actions (voir section CI/CD).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## Structure du projet

```
quizzie/
├── app/              # Pages et routes de l'application
├── components/       # Composants React réutilisables
├── lib/             # Utilitaires et helpers
├── public/          # Fichiers statiques
└── styles/          # Styles globaux
```

## Fonctionnalités

- Génération de quizzes personnalisés
- Interface utilisateur moderne et responsive
- Déploiement automatique avec Vercel

## Licence

MIT
