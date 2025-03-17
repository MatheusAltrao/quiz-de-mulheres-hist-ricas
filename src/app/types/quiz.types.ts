export interface UserAnswersProps {
  question: string;
  selected: string;
  correct: boolean;
}

export interface QuizProps {
  question: string;
  description: string;
  answers: { answer: string; isCorrect: boolean }[];
}
