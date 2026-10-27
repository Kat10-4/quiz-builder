import type { Question } from '@/lib/types/types';

type QuestionViewProps = {
  question: Question;
  index: number;
};

function QuestionView({ question, index }: QuestionViewProps) {
  return (
    <li className="min-w-0 border-b border-[var(--border)] px-4 py-4 last:border-b-0">
      <p className="text-sm text-[var(--muted)]">
        Question {index + 1} · {question.type}
      </p>
      <h3 className="mt-2 break-words font-medium text-[var(--ink)]">{question.text}</h3>

      {question.type === 'BOOLEAN' ? (
        <p className="mt-3 text-[var(--ink)]">
          <span className="font-bold">Correct answer:</span>{' '}
          {question.correctAnswer === 'true' ? 'True' : 'False'}
        </p>
      ) : null}

      {question.type === 'INPUT' ? (
        <p className="mt-3 text-[var(--ink)]">
          <span className="font-bold">Correct answer:</span>{' '}
          <span className="break-words">{question.correctAnswer}</span>
        </p>
      ) : null}

      {question.type === 'CHECKBOX' ? (
        <ul className="mt-3 flex flex-col gap-2">
          {question.options.map((option) => (
            <li key={option.id} className="flex items-center gap-2 text-[var(--ink)]">
              <span
                className={`inline-block h-3 w-3 shrink-0 border border-black ${
                  option.isCorrect ? 'bg-black' : 'bg-transparent'
                }`}
                aria-hidden
              />
              <span className="min-w-0 break-words">
                {option.text}
                {option.isCorrect ? (
                  <span className="ml-2 text-sm text-[var(--muted)]">(correct)</span>
                ) : null}
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export { QuestionView };
export type { QuestionViewProps };
