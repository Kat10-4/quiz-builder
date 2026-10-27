import { Router } from 'express';
import { Prisma } from '@prisma/client';
import { ErrorMessage } from '../constants/errorMessages';
import { validateBody } from '../middleware/validate';
import { createQuizSchema } from '../schemas/quiz';
import type { CreateQuizInput } from '../schemas/quiz';
import { quizService } from '../services/quizService';

const quizzesRouter = Router();

quizzesRouter.post('/', validateBody(createQuizSchema), async (req, res, next) => {
  try {
    const data = req.body as CreateQuizInput;
    const quiz = await quizService.createQuiz(data);
    res.status(201).json(quiz);
  } catch (err) {
    next(err);
  }
});

quizzesRouter.get('/', async (_req, res, next) => {
  try {
    const quizzes = await quizService.listQuizzes();
    res.json(quizzes);
  } catch (err) {
    next(err);
  }
});

quizzesRouter.get('/:id', async (req, res, next) => {
  try {
    const quiz = await quizService.getQuizById(req.params.id);
    if (!quiz) {
      res.status(404).json({ error: ErrorMessage.QUIZ_NOT_FOUND });
      return;
    }
    res.json(quiz);
  } catch (err) {
    next(err);
  }
});

quizzesRouter.delete('/:id', async (req, res, next) => {
  try {
    await quizService.deleteQuiz(req.params.id);
    res.status(204).send();
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
      res.status(404).json({ error: ErrorMessage.QUIZ_NOT_FOUND });
      return;
    }
    next(err);
  }
});

export { quizzesRouter };
