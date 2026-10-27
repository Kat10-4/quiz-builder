import { z } from 'zod';
import { ValidationMessage } from '../constants/validationMessages';

const booleanQuestionSchema = z.object({
  type: z.literal('BOOLEAN'),
  text: z
    .string({ required_error: ValidationMessage.TEXT_REQUIRED })
    .trim()
    .min(1, ValidationMessage.TEXT_REQUIRED),
  correctAnswer: z.enum(['true', 'false'], {
    required_error: ValidationMessage.CORRECT_ANSWER_REQUIRED,
    invalid_type_error: ValidationMessage.CORRECT_ANSWER_REQUIRED,
  }),
});

const inputQuestionSchema = z.object({
  type: z.literal('INPUT'),
  text: z
    .string({ required_error: ValidationMessage.TEXT_REQUIRED })
    .trim()
    .min(1, ValidationMessage.TEXT_REQUIRED),
  correctAnswer: z
    .string({ required_error: ValidationMessage.CORRECT_ANSWER_REQUIRED })
    .trim()
    .min(1, ValidationMessage.CORRECT_ANSWER_REQUIRED),
});

const checkboxQuestionSchema = z.object({
  type: z.literal('CHECKBOX'),
  text: z
    .string({ required_error: ValidationMessage.TEXT_REQUIRED })
    .trim()
    .min(1, ValidationMessage.TEXT_REQUIRED),
  options: z
    .array(
      z.object({
        text: z
          .string({ required_error: ValidationMessage.TEXT_REQUIRED })
          .trim()
          .min(1, ValidationMessage.TEXT_REQUIRED),
        isCorrect: z.boolean({ required_error: ValidationMessage.CORRECT_OPTION_VALIDATION }),
      }),
      { required_error: ValidationMessage.OPTION_NUMBER_VALIDATION },
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
      .string({ required_error: ValidationMessage.TITLE_REQUIRED })
      .trim()
      .min(1, ValidationMessage.TITLE_REQUIRED)
      .max(200),
    questions: z
      .array(questionSchema, {
        required_error: ValidationMessage.QUESTION_NUMBER_VALIDATION,
      })
      .min(1, ValidationMessage.QUESTION_NUMBER_VALIDATION),
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
