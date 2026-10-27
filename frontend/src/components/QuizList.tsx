import { QuizListItem } from '@/components/QuizListItem';
import type { QuizListItem as QuizListItemType } from '@/lib/types/types';

type QuizListProps = {
  quizzes: QuizListItemType[];
  onDelete: (id: string) => void;
  emptyMessage?: string;
};

function QuizList({
  quizzes,
  onDelete,
  emptyMessage = 'No quizzes yet. Create your first one.',
}: QuizListProps) {
  if (quizzes.length === 0) {
    return <p className="text-[var(--muted)]">{emptyMessage}</p>;
  }

  return (
    <ul className="border border-[var(--border)]">
      {quizzes.map((quiz) => (
        <QuizListItem key={quiz.id} quiz={quiz} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export { QuizList };
export type { QuizListProps };
