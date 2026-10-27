import type { RequestHandler } from 'express';
import type { ZodTypeAny } from 'zod';
import { ErrorMessage } from '../constants/errorMessages';

const validateBody =
  (schema: ZodTypeAny): RequestHandler =>
  (req, res, next) => {
    const parsed = schema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({
        error: ErrorMessage.VALIDATION_FAILED,
        details: parsed.error.flatten(),
      });
      return;
    }

    req.body = parsed.data;
    next();
  };

export { validateBody };
