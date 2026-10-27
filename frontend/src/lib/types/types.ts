type QuestionType = 'BOOLEAN' | 'INPUT' | 'CHECKBOX';

type QuizListItem = {
  id: string;
  title: string;
  createdAt: string;
  questionCount: number;
};

type Option = {
  id: string;
  text: string;
  isCorrect: boolean;
};

type Question = {
  id: string;
  type: QuestionType;
  text: string;
  order: number;
  correctAnswer: string | null;
  options: Option[];
};

type Quiz = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  questions: Question[];
};

type CreateQuizPayload = {
  title: string;
  questions: Array<
    | { type: 'BOOLEAN'; text: string; correctAnswer: 'true' | 'false' }
    | { type: 'INPUT'; text: string; correctAnswer: string }
    | {
        type: 'CHECKBOX';
        text: string;
        options: Array<{ text: string; isCorrect: boolean }>;
      }
  >;
};

export type { QuestionType, QuizListItem, Option, Question, Quiz, CreateQuizPayload };
