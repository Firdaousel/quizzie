import { Quiz } from "@/types/quiz";
import { quizzes as staticQuizzes } from "@/data/quizzes";

const STORAGE_KEY = 'imported-quizzes';

export function saveQuizToLocalStorage(quiz: Quiz): void {
  if (typeof window === 'undefined') return;

  const existingQuizzes = getQuizzesFromLocalStorage();
  const updatedQuizzes = [...existingQuizzes, quiz];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedQuizzes));
}

export function getQuizzesFromLocalStorage(): Quiz[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    return JSON.parse(stored) as Quiz[];
  } catch (error) {
    console.error('Erreur lors de la lecture du localStorage:', error);
    return [];
  }
}

export function removeQuizFromLocalStorage(id: string): void {
  if (typeof window === 'undefined') return;

  const existingQuizzes = getQuizzesFromLocalStorage();
  const filteredQuizzes = existingQuizzes.filter(quiz => quiz.id !== id);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredQuizzes));
}

export function getAllQuizzes(): Quiz[] {
  return [...staticQuizzes, ...getQuizzesFromLocalStorage()];
}

export function isImportedQuiz(quizId: string): boolean {
  if (typeof window === 'undefined') return false;

  const importedQuizzes = getQuizzesFromLocalStorage();
  return importedQuizzes.some(quiz => quiz.id === quizId);
}
