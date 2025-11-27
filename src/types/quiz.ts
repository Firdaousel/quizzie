export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export interface QuizSession {
  quizId: string;
  currentQuestionIndex: number;
  selectedAnswers: (number | null)[];
  randomizedQuestions: Question[];
}
