import { Quiz, Question } from "@/types/quiz";

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateQuizStructure(data: unknown): ValidationResult {
  const errors: string[] = [];

  if (!data || typeof data !== 'object') {
    errors.push("Le fichier n'est pas un JSON valide");
    return { valid: false, errors };
  }

  const quiz = data as Record<string, unknown>;

  // Vérifier les propriétés requises
  const requiredProps = ['id', 'title', 'description', 'questions'];
  const missingProps = requiredProps.filter(prop => !(prop in quiz));

  if (missingProps.length > 0) {
    errors.push(`Structure invalide : propriétés manquantes (${missingProps.join(', ')})`);
    return { valid: false, errors };
  }

  // Vérifier que les types de base sont corrects
  if (typeof quiz.id !== 'string') {
    errors.push("La propriété 'id' doit être une chaîne de caractères");
  }

  if (typeof quiz.title !== 'string') {
    errors.push("La propriété 'title' doit être une chaîne de caractères");
  }

  if (typeof quiz.description !== 'string') {
    errors.push("La propriété 'description' doit être une chaîne de caractères");
  }

  // Vérifier que questions est un tableau
  if (!Array.isArray(quiz.questions)) {
    errors.push("La propriété 'questions' doit être un tableau");
    return { valid: false, errors };
  }

  if (quiz.questions.length === 0) {
    errors.push("Le tableau 'questions' ne peut pas être vide");
    return { valid: false, errors };
  }

  // Vérifier chaque question
  quiz.questions.forEach((question: unknown, index: number) => {
    if (!question || typeof question !== 'object') {
      errors.push(`Question invalide à l'index ${index} : doit être un objet`);
      return;
    }

    const q = question as Record<string, unknown>;
    const requiredQuestionProps = ['id', 'text', 'options', 'correctAnswer'];
    const missingQuestionProps = requiredQuestionProps.filter(prop => !(prop in q));

    if (missingQuestionProps.length > 0) {
      errors.push(`Question invalide à l'index ${index} : propriété(s) manquante(s) (${missingQuestionProps.join(', ')})`);
      return;
    }

    if (typeof q.id !== 'string') {
      errors.push(`Question ${index} : 'id' doit être une chaîne de caractères`);
    }

    if (typeof q.text !== 'string') {
      errors.push(`Question ${index} : 'text' doit être une chaîne de caractères`);
    }

    if (!Array.isArray(q.options)) {
      errors.push(`Question ${index} : 'options' doit être un tableau`);
    } else if (q.options.length < 2) {
      errors.push(`Question ${index} : 'options' doit contenir au moins 2 éléments`);
    } else if (!q.options.every((opt: unknown) => typeof opt === 'string')) {
      errors.push(`Question ${index} : tous les éléments de 'options' doivent être des chaînes de caractères`);
    }

    if (typeof q.correctAnswer !== 'number') {
      errors.push(`Question ${index} : 'correctAnswer' doit être un nombre`);
    } else if (Array.isArray(q.options) && (q.correctAnswer < 0 || q.correctAnswer >= q.options.length)) {
      errors.push(`Question ${index} : 'correctAnswer' doit être un nombre entre 0 et ${q.options.length - 1}`);
    }
  });

  return {
    valid: errors.length === 0,
    errors
  };
}

export function validateQuizTypes(quiz: Quiz): ValidationResult {
  const errors: string[] = [];

  quiz.questions.forEach((question: Question, index: number) => {
    if (question.correctAnswer < 0 || question.correctAnswer >= question.options.length) {
      errors.push(`Question ${index} : correctAnswer doit être un nombre entre 0 et ${question.options.length - 1}`);
    }

    if (question.options.length < 2) {
      errors.push(`Question ${index} : 'options' doit contenir au moins 2 éléments`);
    }
  });

  return {
    valid: errors.length === 0,
    errors
  };
}

export function checkQuizIdUniqueness(id: string, existingQuizzes: Quiz[]): boolean {
  return !existingQuizzes.some(quiz => quiz.id === id);
}
