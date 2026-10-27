'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ButtonLink } from '@/components/header/ButtonLink';
import { PageHeader } from '@/components/PageHeader';
import { QuestionList } from '@/components/questions/QuestionList';
import { api } from '@/lib/api/api';
import type { Quiz } from '@/lib/types/types';

function QuizDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await api.getQuiz(id);
        if (!cancelled) {
          setQuiz(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load quiz');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return <p className="text-[var(--muted)]">Loading quiz…</p>;
  }

  if (error || !quiz) {
    return (
      <div className="py-16 text-center">
        <h2 className="text-2xl font-semibold text-[var(--ink)]">Quiz not found</h2>
        <p className="mt-2 text-[var(--muted)]">{error ?? 'That quiz does not exist.'}</p>
        <div className="mt-6">
          <ButtonLink href="/quizzes">Back to quizzes</ButtonLink>
        </div>
      </div>
    );
  }

  const questionCountLabel = `${quiz.questions.length} ${
    quiz.questions.length === 1 ? 'question' : 'questions'
  }`;

  return (
    <div>
      <div className="mb-8">
        <ButtonLink href="/quizzes">Back to quizzes</ButtonLink>
      </div>

      <PageHeader title={quiz.title} description={questionCountLabel} />
      <QuestionList questions={quiz.questions} />
    </div>
  );
}

export default QuizDetailPage;
