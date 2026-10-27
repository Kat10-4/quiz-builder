import Link from 'next/link';
import { FormButton } from '@/components/create/FormButton';
import type { QuizListItem as QuizListItemType } from '@/lib/types/types';

type QuizListItemProps = {
  quiz: QuizListItemType;
  onDelete: (id: string) => void;
};

function QuizListItem({ quiz, onDelete }: QuizListItemProps) {
  return (
    <li className="flex items-center justify-between gap-4 border-b border-[var(--border)] px-4 py-4 last:border-b-0">
      <Link
        href={`/quizzes/${quiz.id}`}
        className="min-w-0 flex-1 text-[var(--ink)] hover:underline"
      >
        <span className="block font-medium">{quiz.title}</span>
        <span className="text-sm text-[var(--muted)]">
          {quiz.questionCount} {quiz.questionCount === 1 ? 'question' : 'questions'}
        </span>
      </Link>
      <FormButton
        type="button"
        variant="secondary"
        size="sm"
        onClick={() => onDelete(quiz.id)}
        aria-label={`Delete ${quiz.title}`}
      >
        Delete
      </FormButton>
    </li>
  );
}

export { QuizListItem };
export type { QuizListItemProps };
