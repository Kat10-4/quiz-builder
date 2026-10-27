import { QuestionView } from '@/components/questions/QuestionView';
import type { Question } from '@/lib/types/types';

type QuestionListProps = {
  questions: Question[];
};

function QuestionList({ questions }: QuestionListProps) {
  return (
    <ul className="border border-[var(--border)]">
      {questions.map((question, index) => (
        <QuestionView key={question.id} question={question} index={index} />
      ))}
    </ul>
  );
}

export { QuestionList };
export type { QuestionListProps };
