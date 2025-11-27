# Quizzie

Une application moderne pour générer et gérer des quizzes interactifs.

## Technologies utilisées

- **[Next.js](https://nextjs.org/)** - Framework React pour le développement web
- **[shadcn/ui](https://ui.shadcn.com/)** - Composants UI réutilisables et accessibles
- **[TypeScript](https://www.typescriptlang.org/)** - JavaScript avec typage statique
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utility-first
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

## Déploiement

Ce projet est configuré pour être déployé sur Vercel :

1. Pusher votre code sur GitHub
2. Importer le projet sur [Vercel](https://vercel.com)
3. Vercel détectera automatiquement Next.js et configurera le déploiement

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
