import cors from 'cors';
import express from 'express';
import { errorHandler } from './middleware/errorHandler';
import { quizzesRouter } from './routes/quizzes';

function createApp() {
  const app = express();

  app.use(cors({ origin: ['http://localhost:3000'] }));
  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/quizzes', quizzesRouter);

  app.use(errorHandler);

  return app;
}

export { createApp };
