"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getQuizById } from "@/data/quizzes";
import { Question } from "@/types/quiz";
import { CheckCircle, XCircle } from "lucide-react";

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const quizId = params.id as string;

  const [quiz, setQuiz] = useState(() => getQuizById(quizId));
  const [randomizedQuestions, setRandomizedQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    if (quiz) {
      const shuffled = shuffleArray(quiz.questions);
      setRandomizedQuestions(shuffled);
      setAnswers(new Array(shuffled.length).fill(null));
    }
  }, [quiz]);

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <div className="mb-4">
            <svg
              className="mx-auto h-16 w-16 text-red-500"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Quiz introuvable
          </h2>
          <p className="text-gray-600 mb-6">
            Le quiz demandé n'existe pas ou n'a pas pu être chargé.
          </p>
          <button
            onClick={() => router.push("/")}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Retour aux quiz
          </button>
        </div>
      </div>
    );
  }

  if (randomizedQuestions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">Chargement du quiz...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = randomizedQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === randomizedQuestions.length - 1;
  const isCorrectAnswer = selectedAnswer === currentQuestion.correctAnswer;

  const handleAnswerSelect = (optionIndex: number) => {
    if (showAnswer) return; // Ne pas permettre de changer après validation
    setSelectedAnswer(optionIndex);
  };

  const handleValidate = () => {
    if (selectedAnswer !== null) {
      setShowAnswer(true);
    }
  };

  const handleNext = () => {
    if (selectedAnswer !== null && showAnswer) {
      const newAnswers = [...answers];
      newAnswers[currentQuestionIndex] = selectedAnswer;
      setAnswers(newAnswers);

      if (!isLastQuestion) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setShowAnswer(false);
      } else {
        const answersParam = encodeURIComponent(JSON.stringify(newAnswers));
        const questionsParam = encodeURIComponent(JSON.stringify(randomizedQuestions));
        router.push(`/quiz/${quizId}/results?answers=${answersParam}&questions=${questionsParam}`);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0 && !showAnswer) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(answers[currentQuestionIndex - 1]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => router.push("/")}
            className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-2"
          >
            ← Retour aux quiz
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold text-gray-900">{quiz.title}</h1>
              <span className="text-sm text-gray-500">
                Question {currentQuestionIndex + 1} / {randomizedQuestions.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentQuestionIndex + 1) / randomizedQuestions.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Message de feedback */}
          {showAnswer && (
            <div
              className={`mb-6 p-4 rounded-xl border-2 flex items-center justify-center gap-3 ${
                isCorrectAnswer
                  ? "bg-green-50 border-green-300"
                  : "bg-red-50 border-red-300"
              }`}
            >
              {isCorrectAnswer ? (
                <>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                  <span className="text-2xl font-bold text-green-700">
                    Correct! ✓
                  </span>
                </>
              ) : (
                <>
                  <XCircle className="w-8 h-8 text-red-600" />
                  <span className="text-2xl font-bold text-red-700">
                    Incorrect ✗
                  </span>
                </>
              )}
            </div>
          )}

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              {currentQuestion.text}
            </h2>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isUserAnswer = selectedAnswer === index;
                const isCorrect = index === currentQuestion.correctAnswer;

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showAnswer}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                      showAnswer
                        ? isCorrect
                          ? "bg-green-50 border-green-300"
                          : isUserAnswer
                          ? "bg-red-50 border-red-300"
                          : "bg-gray-50 border-gray-200"
                        : isUserAnswer
                        ? "border-indigo-600 bg-indigo-50 shadow-md"
                        : "border-gray-200 hover:border-indigo-300 hover:bg-gray-50"
                    } ${showAnswer ? "cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    <div className="flex items-center gap-3">
                      {showAnswer ? (
                        <>
                          {isCorrect && (
                            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                          )}
                          {isUserAnswer && !isCorrect && (
                            <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                          )}
                          {!isCorrect && !isUserAnswer && (
                            <div className="w-6 h-6 flex-shrink-0" />
                          )}
                        </>
                      ) : (
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            isUserAnswer
                              ? "border-indigo-600 bg-indigo-600"
                              : "border-gray-300"
                          }`}
                        >
                          {isUserAnswer && (
                            <div className="w-3 h-3 bg-white rounded-full" />
                          )}
                        </div>
                      )}
                      <span
                        className={`flex-grow ${
                          showAnswer
                            ? isCorrect
                              ? "text-green-900 font-semibold"
                              : isUserAnswer
                              ? "text-red-900"
                              : "text-gray-700"
                            : "text-gray-700"
                        }`}
                      >
                        {option}
                      </span>
                      {showAnswer && (
                        <>
                          {isCorrect && (
                            <span className="text-sm text-green-700 font-medium flex-shrink-0">
                              Bonne réponse
                            </span>
                          )}
                          {isUserAnswer && !isCorrect && (
                            <span className="text-sm text-red-700 font-medium flex-shrink-0">
                              Votre réponse
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-between gap-4">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0 || showAnswer}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                currentQuestionIndex === 0 || showAnswer
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400"
              }`}
            >
              Précédent
            </button>

            {!showAnswer ? (
              <button
                onClick={handleValidate}
                disabled={selectedAnswer === null}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  selectedAnswer === null
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                Valider
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                {isLastQuestion ? "Voir les résultats" : "Question suivante"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
