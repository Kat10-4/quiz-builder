'use client';

import { useEffect, useState } from 'react';
import { ConfirmModal } from '@/components/ConfirmModal';
import { PageHeader } from '@/components/PageHeader';
import { QuizList } from '@/components/quizzes/QuizList';
import { api } from '@/lib/api/api';
import type { QuizListItem } from '@/lib/types/types';

function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<QuizListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quizToDelete, setQuizToDelete] = useState<QuizListItem | null>(null);
  const [deleting, setDeleting] = useState(false);

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

  async function confirmDelete() {
    if (!quizToDelete) {
      return;
    }

    setDeleting(true);
    try {
      await api.deleteQuiz(quizToDelete.id);
      setQuizzes((prev) => prev.filter((quiz) => quiz.id !== quizToDelete.id));
      setQuizToDelete(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete quiz');
      setQuizToDelete(null);
    } finally {
      setDeleting(false);
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
      <QuizList
        quizzes={quizzes}
        onDelete={(id) => {
          const quiz = quizzes.find((item) => item.id === id) ?? null;
          setQuizToDelete(quiz);
        }}
      />
      <ConfirmModal
        open={quizToDelete !== null}
        title="Delete quiz?"
        description={
          quizToDelete
            ? `"${quizToDelete.title}" will be permanently deleted.`
            : 'This quiz will be permanently deleted.'
        }
        confirmLabel="Delete"
        cancelLabel="Cancel"
        busy={deleting}
        onConfirm={confirmDelete}
        onCancel={() => {
          if (!deleting) {
            setQuizToDelete(null);
          }
        }}
      />
    </div>
  );
}

export default QuizzesPage;
