# 📁 Modèles de Quiz - Quizzie

Ce dossier contient des modèles et guides pour créer vos propres quiz.

## 📄 Fichiers Disponibles

### 1. **GUIDE-CREATION-QUIZ.md** 📖
Guide complet et détaillé pour créer vos quiz au format JSON.
- Structure complète expliquée
- Exemples pour chaque champ
- Erreurs courantes et solutions
- Conseils et bonnes pratiques

**👉 Commencez par lire ce guide !**

---

### 2. **modele-quiz-exemple.jsonc** 💡
Fichier modèle **avec commentaires détaillés** expliquant chaque champ.

**Utilisation :**
- Ouvrez ce fichier dans votre éditeur (VS Code recommandé)
- Lisez les commentaires pour comprendre la structure
- Utilisez-le comme référence lors de la création

**⚠️ Important :** Ce fichier contient des commentaires (`//`) et ne peut **PAS** être importé directement dans Quizzie.

---

### 3. **modele-quiz-propre.json** ✅
Fichier modèle **prêt à utiliser** sans commentaires.

**Utilisation :**
1. Copiez ce fichier
2. Renommez-le (ex: `mon-quiz-histoire.json`)
3. Modifiez les valeurs selon vos besoins
4. Importez-le dans Quizzie via le bouton "Importer un Quiz JSON"

**✓ Ce fichier peut être importé directement !**

---

### 4. **exemple-quiz-simple.json** 🎯
Quiz d'exemple simple avec 3 questions pour **tester l'import**.

**Utilisation :**
- Importez ce fichier tel quel pour tester la fonctionnalité
- Questions basiques de culture générale
- Parfait pour voir comment fonctionne l'import

**✓ Prêt à importer immédiatement !**

---

## 🚀 Démarrage Rapide

### Pour les débutants :
1. ✅ Lisez **GUIDE-CREATION-QUIZ.md**
2. 📖 Consultez **modele-quiz-exemple.jsonc** pour comprendre
3. 📝 Copiez **modele-quiz-propre.json** et modifiez-le
4. 📤 Importez votre quiz dans Quizzie

### Pour les utilisateurs avancés :
1. 📝 Copiez **modele-quiz-propre.json**
2. ✏️ Modifiez selon vos besoins
3. ✓ Validez avec https://jsonlint.com
4. 📤 Importez dans Quizzie

---

## 📋 Structure Minimale d'un Quiz

```json
{
  "id": "mon-quiz",
  "title": "Mon Quiz",
  "description": "Description du quiz",
  "questions": [
    {
      "id": "q1",
      "text": "Ma question ?",
      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
      "correctAnswer": 0
    }
  ]
}
```

**⚠️ N'oubliez pas :** `correctAnswer` est l'**index** (commence à 0, pas 1) !

---

## 🔗 Exemples Disponibles

Consultez également :
- **`exemple-quiz.json`** (racine du projet) - Quiz JavaScript complet

---

## 💡 Aide et Support

- 📖 Consultez le **GUIDE-CREATION-QUIZ.md** pour plus de détails
- 🔍 Vérifiez votre JSON : https://jsonlint.com
- ✅ Comparez avec les modèles fournis

---

Bon quiz ! 🎉
