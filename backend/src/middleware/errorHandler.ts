import type { ErrorRequestHandler } from 'express';
import { ErrorMessage } from '../lib/constants/errorMessages';

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: ErrorMessage.INTERNAL_SERVER_ERROR });
};

export { errorHandler };
