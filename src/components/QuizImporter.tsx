"use client";

import { useState, useRef } from "react";
import { Quiz } from "@/types/quiz";
import { validateQuizStructure, validateQuizTypes, checkQuizIdUniqueness } from "@/lib/quizValidation";
import { saveQuizToLocalStorage, getAllQuizzes } from "@/lib/quizStorage";
import { Upload, X, CheckCircle, AlertCircle, Download, FileJson } from "lucide-react";

interface QuizImporterProps {
  onQuizImported: () => void;
}

export default function QuizImporter({ onQuizImported }: QuizImporterProps) {
  const [previewQuiz, setPreviewQuiz] = useState<Quiz | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      let parsedData: unknown;

      try {
        parsedData = JSON.parse(text);
      } catch (error) {
        setValidationErrors(["Le fichier n'est pas un JSON valide"]);
        setPreviewQuiz(null);
        setShowPreview(false);
        return;
      }

      // Valider la structure
      const structureValidation = validateQuizStructure(parsedData);
      if (!structureValidation.valid) {
        setValidationErrors(structureValidation.errors);
        setPreviewQuiz(null);
        setShowPreview(false);
        return;
      }

      const quiz = parsedData as Quiz;

      // Valider les types
      const typeValidation = validateQuizTypes(quiz);
      if (!typeValidation.valid) {
        setValidationErrors(typeValidation.errors);
        setPreviewQuiz(null);
        setShowPreview(false);
        return;
      }

      // Vérifier l'unicité de l'ID
      const existingQuizzes = getAllQuizzes();
      if (!checkQuizIdUniqueness(quiz.id, existingQuizzes)) {
        setValidationErrors([`Un quiz avec l'ID '${quiz.id}' existe déjà`]);
        setPreviewQuiz(null);
        setShowPreview(false);
        return;
      }

      // Tout est valide, afficher l'aperçu
      setPreviewQuiz(quiz);
      setValidationErrors([]);
      setShowPreview(true);

    } catch (error) {
      setValidationErrors(["Erreur lors de la lecture du fichier"]);
      setPreviewQuiz(null);
      setShowPreview(false);
    }

    // Réinitialiser l'input file
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleConfirmImport = () => {
    if (!previewQuiz) return;

    saveQuizToLocalStorage(previewQuiz);
    setShowPreview(false);
    setPreviewQuiz(null);
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);

    onQuizImported();
  };

  const handleCancelPreview = () => {
    setShowPreview(false);
    setPreviewQuiz(null);
    setValidationErrors([]);
  };

  const handleCloseErrors = () => {
    setValidationErrors([]);
  };

  const handleDownloadTemplate = () => {
    const template = {
      id: "mon-quiz-exemple",
      title: "Mon Quiz d'Exemple",
      description: "Une description claire et concise du contenu de ce quiz",
      questions: [
        {
          id: "q1",
          text: "Quelle est la capitale de la France ?",
          options: ["Paris", "Lyon", "Marseille", "Bordeaux"],
          correctAnswer: 0
        },
        {
          id: "q2",
          text: "Combien font 2 + 2 ?",
          options: ["3", "4", "5", "22"],
          correctAnswer: 1
        },
        {
          id: "q3",
          text: "Quel langage de programmation est principalement utilisé pour le développement web côté client ?",
          options: ["Python", "Java", "JavaScript", "C++"],
          correctAnswer: 2
        },
        {
          id: "q4",
          text: "Quelle est la couleur du ciel par temps clair ?",
          options: ["Vert", "Rouge", "Jaune", "Bleu"],
          correctAnswer: 3
        }
      ]
    };

    const blob = new Blob([JSON.stringify(template, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'modele-quiz.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadGuide = () => {
    const guide = `# Guide de Création de Quiz - Quizzie

## Structure d'un Quiz JSON

Un quiz doit contenir 4 propriétés principales :

{
  "id": "identifiant-unique",        // ID unique sans espaces
  "title": "Titre du Quiz",          // Titre affiché
  "description": "Description...",   // Description du quiz
  "questions": [ ... ]               // Tableau de questions
}

## Structure d'une Question

Chaque question contient 4 propriétés :

{
  "id": "q1",                        // ID unique de la question
  "text": "Votre question ?",        // Texte de la question
  "options": [                       // Choix de réponses (min 2)
    "Option 1",                      // Index 0
    "Option 2",                      // Index 1
    "Option 3",                      // Index 2
    "Option 4"                       // Index 3
  ],
  "correctAnswer": 0                 // Index de la bonne réponse
}

## ⚠️ IMPORTANT : L'index commence à 0 !

- Première option = 0
- Deuxième option = 1
- Troisième option = 2
- Quatrième option = 3

## Exemple Complet

{
  "id": "culture-generale",
  "title": "Culture Générale",
  "description": "Testez vos connaissances",
  "questions": [
    {
      "id": "q1",
      "text": "Quelle est la capitale de l'Italie ?",
      "options": ["Milan", "Rome", "Florence", "Venise"],
      "correctAnswer": 1
    }
  ]
}

## Checklist Avant Import

- [ ] L'ID du quiz est unique
- [ ] Il y a au moins 1 question
- [ ] Chaque question a au moins 2 options
- [ ] Le correctAnswer est entre 0 et (nombre d'options - 1)
- [ ] Le JSON est valide (testez sur jsonlint.com)

## Erreurs Courantes

1. "Un quiz avec l'ID 'xxx' existe déjà"
   → Changez l'ID du quiz

2. "correctAnswer doit être un nombre entre 0 et X"
   → Vérifiez que correctAnswer est un nombre (pas de guillemets)
   → Vérifiez qu'il est entre 0 et (nombre d'options - 1)

3. "Le fichier n'est pas un JSON valide"
   → Vérifiez les virgules (pas après le dernier élément)
   → Vérifiez les guillemets (doubles " uniquement)

Bon quiz ! 🎉
`;

    const blob = new Blob([guide], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'guide-creation-quiz.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row justify-center gap-3">
        {/* Bouton Télécharger Modèle JSON */}
        <button
          onClick={handleDownloadTemplate}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          <Download className="w-5 h-5" />
          Télécharger Modèle JSON
        </button>

        {/* Bouton Télécharger Guide */}
        <button
          onClick={handleDownloadGuide}
          className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          <FileJson className="w-5 h-5" />
          Télécharger Guide
        </button>

        {/* Bouton Importer Quiz */}
        <label className="cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
          <Upload className="w-5 h-5" />
          Importer un Quiz JSON
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-slide-in z-50">
          <CheckCircle className="w-6 h-6" />
          <span className="font-medium">Quiz importé avec succès!</span>
        </div>
      )}

      {validationErrors.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6">
            <div className="flex items-start gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Erreurs de validation</h3>
                <ul className="space-y-2">
                  {validationErrors.map((error, index) => (
                    <li key={index} className="text-red-600 text-sm">
                      • {error}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={handleCloseErrors}
                className="text-gray-400 hover:text-gray-600 flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleCloseErrors}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {showPreview && previewQuiz && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full my-8">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Aperçu du Quiz</h3>
                  <p className="text-gray-600">Vérifiez les informations avant d'importer</p>
                </div>
                <button
                  onClick={handleCancelPreview}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 max-h-96 overflow-y-auto">
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{previewQuiz.title}</h4>
                <p className="text-gray-600 mb-4">{previewQuiz.description}</p>
                <div className="flex gap-4 text-sm">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                    ID: {previewQuiz.id}
                  </span>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                    {previewQuiz.questions.length} question{previewQuiz.questions.length > 1 ? 's' : ''}
                  </span>
                </div>
              </div>

              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Questions:</h5>
                <div className="space-y-3">
                  {previewQuiz.questions.map((question, index) => (
                    <div key={question.id} className="bg-gray-50 rounded-lg p-4">
                      <p className="font-medium text-gray-800 mb-2">
                        {index + 1}. {question.text}
                      </p>
                      <div className="space-y-1">
                        {question.options.map((option, optIndex) => (
                          <div
                            key={optIndex}
                            className={`text-sm pl-4 py-1 ${
                              optIndex === question.correctAnswer
                                ? 'text-green-600 font-medium'
                                : 'text-gray-600'
                            }`}
                          >
                            {optIndex === question.correctAnswer && '✓ '}
                            {option}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={handleCancelPreview}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleConfirmImport}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
              >
                Confirmer l'import
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
