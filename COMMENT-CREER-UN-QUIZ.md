# 📝 Comment Créer un Quiz pour Quizzie

## 🚀 Démarrage Rapide

Pour créer et importer votre propre quiz :

### Étape 1 : Accédez aux modèles
📁 Tous les modèles et guides sont dans le dossier **`modeles-quiz/`**

### Étape 2 : Créez votre quiz
1. Copiez le fichier **`modeles-quiz/modele-quiz-propre.json`**
2. Renommez-le (ex: `mon-quiz-histoire.json`)
3. Modifiez les valeurs selon vos besoins

### Étape 3 : Importez dans l'application
1. Lancez l'application : `npm run dev`
2. Cliquez sur **"Importer un Quiz JSON"**
3. Sélectionnez votre fichier
4. Vérifiez l'aperçu et confirmez

---

## 📚 Documentation Disponible

### Dans le dossier `modeles-quiz/` :

1. **📖 GUIDE-CREATION-QUIZ.md**
   - Guide complet et détaillé
   - Explication de tous les champs
   - Exemples et bonnes pratiques
   - Solutions aux erreurs courantes

2. **💡 modele-quiz-exemple.jsonc**
   - Modèle avec commentaires explicatifs
   - Pour comprendre la structure
   - ⚠️ Ne peut pas être importé directement

3. **✅ modele-quiz-propre.json**
   - Modèle prêt à utiliser
   - À copier et modifier
   - ✓ Peut être importé directement

4. **📄 README.md**
   - Résumé rapide des fichiers disponibles

---

## 🎯 Structure Minimale

Un quiz nécessite 4 champs principaux :

```json
{
  "id": "identifiant-unique",
  "title": "Titre du Quiz",
  "description": "Description du quiz",
  "questions": [
    {
      "id": "q1",
      "text": "Votre question ?",
      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
      "correctAnswer": 0
    }
  ]
}
```

**⚠️ Important :** `correctAnswer` est l'index (0 = première option, 1 = deuxième, etc.)

---

## 💡 Exemples Fournis

- **`exemple-quiz.json`** - Quiz JavaScript (racine du projet)
- Voir aussi les quiz par défaut dans `src/data/quizzes.ts`

---

## ✅ Avant d'Importer

Vérifiez que :
- [ ] L'`id` du quiz est unique
- [ ] Il y a au moins 1 question
- [ ] Chaque question a au moins 2 options
- [ ] Le `correctAnswer` est un nombre entre 0 et (nombre d'options - 1)
- [ ] Le JSON est valide (testez sur https://jsonlint.com)

---

## 🆘 Besoin d'Aide ?

👉 Consultez **`modeles-quiz/GUIDE-CREATION-QUIZ.md`** pour une documentation complète !

---

Bon quiz ! 🎉
