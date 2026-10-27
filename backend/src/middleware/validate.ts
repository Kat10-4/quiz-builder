import type { RequestHandler } from 'express';
import type { ZodTypeAny } from 'zod';

const validateBody =
  (schema: ZodTypeAny): RequestHandler =>
  (req, res, next) => {
    const parsed = schema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({
        error: 'Validation failed',
        details: parsed.error.flatten(),
      });
      return;
    }

    req.body = parsed.data;
    next();
  };

export { validateBody };
