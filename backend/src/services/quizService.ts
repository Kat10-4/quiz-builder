import { prisma } from '../lib/prisma';
import type { CreateQuizInput } from '../schemas/quiz';

class QuizService {
  async createQuiz(data: CreateQuizInput) {
    return prisma.quiz.create({
      data: {
        title: data.title,
        questions: {
          create: data.questions.map((q, index) => {
            if (q.type === 'CHECKBOX') {
              return {
                type: q.type,
                text: q.text,
                order: index,
                options: {
                  create: q.options,
                },
              };
            }

            return {
              type: q.type,
              text: q.text,
              order: index,
              correctAnswer: q.correctAnswer,
            };
          }),
        },
      },
      include: {
        questions: {
          orderBy: { order: 'asc' },
          include: { options: true },
        },
      },
    });
  }

  async listQuizzes() {
    const quizzes = await prisma.quiz.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        createdAt: true,
        _count: {
          select: { questions: true },
        },
      },
    });

    return quizzes.map(({ _count, ...quiz }) => ({
      ...quiz,
      questionCount: _count.questions,
    }));
  }

  async getQuizById(id: string) {
    return prisma.quiz.findUnique({
      where: { id },
      include: {
        questions: {
          orderBy: { order: 'asc' },
          include: { options: true },
        },
      },
    });
  }

  async deleteQuiz(id: string) {
    return prisma.quiz.delete({
      where: { id },
    });
  }
}

const quizService = new QuizService();
export { quizService };
