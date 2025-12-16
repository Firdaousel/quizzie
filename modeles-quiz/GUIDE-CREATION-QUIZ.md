# Guide de Création de Quiz - Quizzie

Ce guide vous explique comment créer vos propres quiz au format JSON pour les importer dans Quizzie.

## 📋 Fichiers Modèles Disponibles

Dans ce projet, vous trouverez :

1. **`modele-quiz-exemple.jsonc`** - Modèle avec commentaires détaillés (pour apprendre)
2. **`modele-quiz-propre.json`** - Modèle propre prêt à importer (pour utiliser)
3. **`exemple-quiz.json`** - Quiz d'exemple JavaScript

## 🎯 Structure d'un Quiz

Un quiz est un fichier JSON avec 4 propriétés principales :

```json
{
  "id": "identifiant-unique",
  "title": "Titre du Quiz",
  "description": "Description du quiz",
  "questions": [ ... ]
}
```

### 1. **`id`** - Identifiant du Quiz

- **Type** : Texte (string)
- **Obligatoire** : Oui
- **Unique** : Doit être différent de tous vos autres quiz
- **Format** : Sans espaces, utilisez des tirets `-`
- **Exemples** :
  ```
  ✅ "javascript-basics"
  ✅ "histoire-france-2024"
  ✅ "quiz-mathematiques"
  ❌ "Mon Quiz"           (avec espaces)
  ❌ "quiz@test"          (caractères spéciaux)
  ```

### 2. **`title`** - Titre du Quiz

- **Type** : Texte (string)
- **Obligatoire** : Oui
- **Affichage** : Carte sur la page d'accueil et en haut du quiz
- **Longueur** : Recommandé 5-50 caractères
- **Exemples** :
  ```
  ✅ "JavaScript - Les Bases"
  ✅ "Histoire de France"
  ✅ "Mathématiques CE2"
  ```

### 3. **`description`** - Description du Quiz

- **Type** : Texte (string)
- **Obligatoire** : Oui
- **Affichage** : Sous le titre sur la carte d'accueil
- **Longueur** : Recommandé 10-150 caractères
- **Exemples** :
  ```
  ✅ "Testez vos connaissances sur les bases du JavaScript"
  ✅ "Quiz sur l'histoire de France de 1789 à nos jours"
  ✅ "Questions de mathématiques pour le niveau CE2"
  ```

### 4. **`questions`** - Liste des Questions

- **Type** : Tableau (array)
- **Obligatoire** : Oui
- **Minimum** : 1 question
- **Recommandé** : 5-15 questions
- **Maximum** : Illimité

Chaque question contient 4 propriétés :

```json
{
  "id": "q1",
  "text": "Quelle est votre question ?",
  "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
  "correctAnswer": 0
}
```

#### 4.1 **`id`** - Identifiant de la Question

- **Type** : Texte (string)
- **Obligatoire** : Oui
- **Unique** : Dans ce quiz uniquement
- **Format** : Sans espaces
- **Exemples** :
  ```
  ✅ "q1", "q2", "q3"
  ✅ "question-1"
  ✅ "js_basics_1"
  ```

#### 4.2 **`text`** - Texte de la Question

- **Type** : Texte (string)
- **Obligatoire** : Oui
- **Format** : Question claire terminée par `?`
- **Exemples** :
  ```
  ✅ "Quelle est la capitale de la France ?"
  ✅ "Combien font 2 + 2 ?"
  ✅ "Quel est le langage de programmation créé par Guido van Rossum ?"
  ```

#### 4.3 **`options`** - Choix de Réponses

- **Type** : Tableau de textes (array of strings)
- **Obligatoire** : Oui
- **Minimum** : 2 options
- **Recommandé** : 4 options (bon équilibre)
- **Maximum** : Illimité
- **Ordre** : Les options sont affichées dans l'ordre du tableau
- **Exemples** :
  ```json
  ✅ ["Paris", "Lyon", "Marseille", "Bordeaux"]
  ✅ ["Vrai", "Faux"]
  ✅ ["Python", "Java", "JavaScript", "C++", "Ruby"]
  ```

#### 4.4 **`correctAnswer`** - Réponse Correcte

- **Type** : Nombre (number/integer)
- **Obligatoire** : Oui
- **Format** : **Index** de la bonne réponse dans le tableau `options`
- **⚠️ IMPORTANT** : L'index commence à **0**, pas à 1 !

**Tableau des index :**

| Position     | Index | Exemple      |
|--------------|-------|--------------|
| 1ère option  | `0`   | "Paris"      |
| 2ème option  | `1`   | "Lyon"       |
| 3ème option  | `2`   | "Marseille"  |
| 4ème option  | `3`   | "Bordeaux"   |

**Exemples :**

```json
// Si la bonne réponse est la PREMIÈRE option
{
  "options": ["Paris", "Lyon", "Marseille"],
  "correctAnswer": 0  // ← Paris
}

// Si la bonne réponse est la DEUXIÈME option
{
  "options": ["3", "4", "5"],
  "correctAnswer": 1  // ← 4
}

// Si la bonne réponse est la TROISIÈME option
{
  "options": ["Python", "Java", "JavaScript"],
  "correctAnswer": 2  // ← JavaScript
}
```

## 📝 Exemple Complet

Voici un quiz complet avec 3 questions :

```json
{
  "id": "culture-generale",
  "title": "Culture Générale",
  "description": "Testez vos connaissances en culture générale",
  "questions": [
    {
      "id": "q1",
      "text": "Quelle est la capitale de l'Italie ?",
      "options": ["Milan", "Rome", "Florence", "Venise"],
      "correctAnswer": 1
    },
    {
      "id": "q2",
      "text": "Combien de continents y a-t-il sur Terre ?",
      "options": ["5", "6", "7", "8"],
      "correctAnswer": 2
    },
    {
      "id": "q3",
      "text": "Qui a peint la Joconde ?",
      "options": [
        "Picasso",
        "Van Gogh",
        "Léonard de Vinci",
        "Michel-Ange"
      ],
      "correctAnswer": 2
    }
  ]
}
```

## ✅ Checklist Avant Import

Avant d'importer votre quiz, vérifiez :

- [ ] L'`id` du quiz est unique et sans espaces
- [ ] Le `title` et la `description` sont clairs
- [ ] Il y a au moins 1 question dans `questions`
- [ ] Chaque question a un `id` unique
- [ ] Chaque question a au moins 2 `options`
- [ ] Le `correctAnswer` de chaque question est :
  - Un nombre (0, 1, 2, 3...)
  - Compris entre 0 et (nombre d'options - 1)
- [ ] Le JSON est valide (pas de virgule après le dernier élément)
- [ ] Il n'y a pas de commentaires `//` dans le fichier JSON final

## 🚀 Comment Importer Votre Quiz

1. **Créez votre fichier JSON**
   - Utilisez `modele-quiz-propre.json` comme base
   - Modifiez les valeurs selon vos besoins
   - Sauvegardez avec l'extension `.json`

2. **Vérifiez la validité du JSON**
   - Utilisez un validateur JSON en ligne (jsonlint.com)
   - Ou ouvrez le fichier dans VS Code (il détecte les erreurs)

3. **Importez dans Quizzie**
   - Lancez l'application : `npm run dev`
   - Allez sur la page d'accueil
   - Cliquez sur "Importer un Quiz JSON"
   - Sélectionnez votre fichier `.json`
   - Vérifiez l'aperçu
   - Cliquez sur "Confirmer l'import"

4. **Testez votre quiz !**
   - Le quiz apparaît avec un badge "Importé"
   - Cliquez dessus pour le tester

## 🛠️ Outils Utiles

- **Validation JSON** : https://jsonlint.com/
- **Éditeur JSON** : VS Code avec l'extension "JSON Tools"
- **Générateur de Quiz** : Créez vos questions dans un tableur puis convertissez en JSON

## ⚠️ Erreurs Courantes

### Erreur : "Un quiz avec l'ID 'xxx' existe déjà"
**Solution** : Changez l'`id` du quiz pour qu'il soit unique.

### Erreur : "correctAnswer doit être un nombre entre 0 et X"
**Solution** : Vérifiez que :
- `correctAnswer` est un nombre (pas de guillemets)
- Le nombre est entre 0 et (nombre d'options - 1)

### Erreur : "Le fichier n'est pas un JSON valide"
**Solution** :
- Vérifiez les virgules (pas de virgule après le dernier élément)
- Vérifiez les guillemets (doubles `"` uniquement)
- Supprimez tous les commentaires `//`
- Utilisez un validateur JSON

### Erreur : "Le tableau 'questions' ne peut pas être vide"
**Solution** : Ajoutez au moins une question dans le tableau `questions`.

## 💡 Conseils et Bonnes Pratiques

1. **Nombre de questions**
   - Minimum : 5 questions pour un quiz intéressant
   - Idéal : 10-15 questions
   - Maximum : 20-30 questions (au-delà, faites plusieurs quiz)

2. **Nombre d'options**
   - 4 options est le standard (comme les QCM)
   - 2 options pour les questions Vrai/Faux
   - 3-5 options pour varier la difficulté

3. **Formulation des questions**
   - Soyez clair et précis
   - Évitez les questions ambiguës
   - Une seule bonne réponse par question

4. **Choix des options**
   - Toutes les options doivent être plausibles
   - Évitez les options absurdes qui se devinent trop facilement
   - Variez la position de la bonne réponse (pas toujours en premier)

5. **Organisation**
   - Groupez les questions par thème
   - Commencez par des questions faciles
   - Augmentez progressivement la difficulté

## 📞 Besoin d'Aide ?

Si vous rencontrez des problèmes :
1. Consultez la section "Erreurs Courantes" ci-dessus
2. Vérifiez votre JSON avec jsonlint.com
3. Comparez votre fichier avec `modele-quiz-propre.json`

Bon quiz ! 🎉
