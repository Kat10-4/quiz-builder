import { z } from 'zod';
import { ValidationMessage } from '@/lib/constants/validationMessages';

const booleanQuestionSchema = z.object({
  type: z.literal('BOOLEAN'),
  text: z.string().trim().min(1, ValidationMessage.TEXT_REQUIRED),
  correctAnswer: z.enum(['true', 'false'], {
    error: ValidationMessage.CORRECT_ANSWER_REQUIRED,
  }),
});

const inputQuestionSchema = z.object({
  type: z.literal('INPUT'),
  text: z.string().trim().min(1, ValidationMessage.TEXT_REQUIRED),
  correctAnswer: z.string().trim().min(1, ValidationMessage.CORRECT_ANSWER_REQUIRED),
});

const checkboxQuestionSchema = z.object({
  type: z.literal('CHECKBOX'),
  text: z.string().trim().min(1, ValidationMessage.TEXT_REQUIRED),
  options: z
    .array(
      z.object({
        text: z.string().trim().min(1, ValidationMessage.TEXT_REQUIRED),
        isCorrect: z.boolean(),
      }),
    )
    .min(2, ValidationMessage.OPTION_NUMBER_VALIDATION),
});

const questionSchema = z.discriminatedUnion('type', [
  booleanQuestionSchema,
  inputQuestionSchema,
  checkboxQuestionSchema,
]);

const createQuizSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, ValidationMessage.TITLE_REQUIRED)
      .max(200, ValidationMessage.TITLE_MAX),
    questions: z.array(questionSchema).min(1, ValidationMessage.QUESTION_NUMBER_VALIDATION),
  })
  .superRefine((data, ctx) => {
    data.questions.forEach((question, index) => {
      if (question.type !== 'CHECKBOX') {
        return;
      }

      if (!question.options.some((option) => option.isCorrect)) {
        ctx.addIssue({
          code: 'custom',
          message: ValidationMessage.CORRECT_OPTION_VALIDATION,
          path: ['questions', index, 'options'],
        });
      }
    });
  });

type CreateQuizFormValues = z.infer<typeof createQuizSchema>;

export { createQuizSchema };
export type { CreateQuizFormValues };
