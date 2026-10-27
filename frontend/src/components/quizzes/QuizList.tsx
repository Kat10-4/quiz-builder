import { ButtonLink } from '@/components/header/ButtonLink';
import { QuizListItem } from '@/components/quizzes/QuizListItem';
import type { QuizListItem as QuizListItemType } from '@/lib/types/types';

type QuizListProps = {
  quizzes: QuizListItemType[];
  onDelete: (id: string) => void;
};

function QuizList({ quizzes, onDelete }: QuizListProps) {
  if (quizzes.length === 0) {
    return (
      <div>
        <p className="text-[var(--muted)]">No quizzes yet. Create your first one.</p>
        <div className="mt-4">
          <ButtonLink href="/create">Create quiz</ButtonLink>
        </div>
      </div>
    );
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
