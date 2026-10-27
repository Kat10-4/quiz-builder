import type { CreateQuizPayload, Quiz, QuizListItem } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not set');
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const message =
      body && typeof body === 'object' && 'error' in body
        ? String((body as { error: unknown }).error)
        : `Request failed (${res.status})`;
    throw new Error(message);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json() as Promise<T>;
}

const api = {
  listQuizzes: () => request<QuizListItem[]>('/quizzes'),
  getQuiz: (id: string) => request<Quiz>(`/quizzes/${id}`),
  createQuiz: (payload: CreateQuizPayload) =>
    request<Quiz>('/quizzes', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  deleteQuiz: (id: string) => request<void>(`/quizzes/${id}`, { method: 'DELETE' }),
};

export { api };
