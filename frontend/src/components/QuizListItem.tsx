import Link from 'next/link';
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
      <button
        type="button"
        onClick={() => onDelete(quiz.id)}
        className="border border-black bg-transparent px-4 py-2 text-sm font-medium text-black hover:bg-black hover:text-white"
        aria-label={`Delete ${quiz.title}`}
      >
        Delete
      </button>
    </li>
  );
}

export { QuizListItem };
export type { QuizListItemProps };
