import { z } from 'zod';
import { ValidationMessage } from '../constants/validationMessages';

const booleanQuestionSchema = z.object({
  type: z.literal('BOOLEAN'),
  text: z.string().trim().min(1, ValidationMessage.TEXT_REQUIRED),
  correctAnswer: z.enum(['true', 'false']),
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
    title: z.string().trim().min(1, ValidationMessage.TITLE_REQUIRED).max(200),
    questions: z.array(questionSchema).min(1, ValidationMessage.QUESTION_NUMBER_VALIDATION),
  })
  .superRefine((data, ctx) => {
    data.questions.forEach((question, index) => {
      if (question.type !== 'CHECKBOX') {
        return;
      }

      const hasCorrectOption = question.options.some((option) => option.isCorrect);
      if (!hasCorrectOption) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: ValidationMessage.CORRECT_OPTION_VALIDATION,
          path: ['questions', index, 'options'],
        });
      }
    });
  });

type CreateQuizInput = z.infer<typeof createQuizSchema>;
type QuestionInput = z.infer<typeof questionSchema>;

export { createQuizSchema };
export type { CreateQuizInput, QuestionInput };
