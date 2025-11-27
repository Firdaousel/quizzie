"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { getQuizById } from "@/data/quizzes";
import { Question } from "@/types/quiz";
import { CheckCircle, XCircle, RotateCcw, Home } from "lucide-react";

export default function ResultsPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const quizId = params.id as string;

  const [quiz, setQuiz] = useState(() => getQuizById(quizId));
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [questionsOrder, setQuestionsOrder] = useState<Question[]>([]);

  useEffect(() => {
    const answersParam = searchParams.get("answers");
    const questionsParam = searchParams.get("questions");

    if (answersParam && questionsParam) {
      try {
        const parsedAnswers = JSON.parse(decodeURIComponent(answersParam));
        const parsedQuestions = JSON.parse(decodeURIComponent(questionsParam));
        setUserAnswers(parsedAnswers);
        setQuestionsOrder(parsedQuestions);
      } catch (error) {
        console.error("Error parsing results:", error);
        router.push("/");
      }
    } else {
      router.push("/");
    }
  }, [searchParams, router]);

  if (!quiz || questionsOrder.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">Chargement des résultats...</p>
        </div>
      </div>
    );
  }

  const correctAnswersCount = userAnswers.reduce((acc, answer, index) => {
    if (answer === null) return acc;
    return acc + (answer === questionsOrder[index].correctAnswer ? 1 : 0);
  }, 0);

  const totalQuestions = questionsOrder.length;
  const score = Math.round((correctAnswersCount / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
            Récapitulatif - {quiz.title}
          </h1>

          {/* Score Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center">
              <p className="text-gray-600 font-medium mb-2">Total Questions</p>
              <p className="text-4xl font-bold text-gray-900">{totalQuestions}</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center">
              <p className="text-gray-600 font-medium mb-2">Bonnes Réponses</p>
              <p className="text-4xl font-bold text-green-600">{correctAnswersCount}</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center">
              <p className="text-gray-600 font-medium mb-2">Score Final</p>
              <p className="text-4xl font-bold text-purple-600">{score}%</p>
            </div>
          </div>
        </div>

        {/* Questions Detail */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Détail des réponses
          </h2>

          {questionsOrder.map((question, index) => {
            const userAnswer = userAnswers[index];
            const isCorrect = userAnswer === question.correctAnswer;

            return (
              <div
                key={question.id}
                className={`bg-white rounded-xl shadow-md p-6 border-2 ${
                  isCorrect ? "border-green-200" : "border-red-200"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {isCorrect ? (
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    ) : (
                      <XCircle className="w-8 h-8 text-red-500" />
                    )}
                  </div>

                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                        Question {index + 1}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          isCorrect
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {isCorrect ? "Correct" : "Incorrect"}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {question.text}
                    </h3>

                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => {
                        const isUserAnswer = userAnswer === optionIndex;
                        const isCorrectAnswer = question.correctAnswer === optionIndex;

                        return (
                          <div
                            key={optionIndex}
                            className={`p-3 rounded-lg border-2 ${
                              isCorrectAnswer
                                ? "bg-green-50 border-green-300"
                                : isUserAnswer
                                ? "bg-red-50 border-red-300"
                                : "bg-gray-50 border-gray-200"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              {isCorrectAnswer && (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              )}
                              {isUserAnswer && !isCorrectAnswer && (
                                <XCircle className="w-5 h-5 text-red-600" />
                              )}
                              <span
                                className={`${
                                  isCorrectAnswer
                                    ? "text-green-900 font-semibold"
                                    : isUserAnswer
                                    ? "text-red-900"
                                    : "text-gray-700"
                                }`}
                              >
                                {option}
                              </span>
                              {isCorrectAnswer && (
                                <span className="ml-auto text-sm text-green-700 font-medium">
                                  Bonne réponse
                                </span>
                              )}
                              {isUserAnswer && !isCorrectAnswer && (
                                <span className="ml-auto text-sm text-red-700 font-medium">
                                  Votre réponse
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 mb-8">
          <button
            onClick={() => router.push(`/quiz/${quizId}`)}
            className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
          >
            <RotateCcw className="w-5 h-5" />
            Recommencer ce quiz
          </button>

          <button
            onClick={() => router.push("/")}
            className="flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
          >
            <Home className="w-5 h-5" />
            Retour à l'accueil
          </button>
        </div>
      </div>
    </div>
  );
}
