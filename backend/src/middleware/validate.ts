import type { NextFunction, Request, Response } from 'express';
import type { ZodType } from 'zod';
import { ErrorMessage } from '../lib/constants/errorMessages';

type ValidatedRequest<T> = Request<object, object, T>;

const validateBody =
  <T>(schema: ZodType<T>) =>
  (req: Request, res: Response, next: NextFunction): void => {
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
export type { ValidatedRequest };
