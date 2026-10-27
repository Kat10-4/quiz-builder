'use client';

import { useEffect, useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { QuizList } from '@/components/quizzes/QuizList';
import { api } from '@/lib/api/api';
import type { QuizListItem } from '@/lib/types/types';

function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<QuizListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await api.listQuizzes();
        if (!cancelled) {
          setQuizzes(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load quizzes');
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
  }, []);

  async function handleDelete(id: string) {
    const confirmed = window.confirm('Delete this quiz?');
    if (!confirmed) {
      return;
    }

    try {
      await api.deleteQuiz(id);
      setQuizzes((prev) => prev.filter((quiz) => quiz.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete quiz');
    }
  }

  if (loading) {
    return <p className="text-[var(--muted)]">Loading quizzes…</p>;
  }

  if (error) {
    return <p className="text-[var(--danger)]">{error}</p>;
  }

  const quizCountLabel = `${quizzes.length} ${quizzes.length === 1 ? 'quiz' : 'quizzes'}`;

  return (
    <div>
      <PageHeader title="Quizzes" description={quizCountLabel} />
      <QuizList quizzes={quizzes} onDelete={handleDelete} />
    </div>
  );
}

export default QuizzesPage;
