'use client';

import type {
  Control,
  FieldErrors,
  UseFieldArrayUpdate,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';
import { CheckboxOptions } from '@/components/create/CheckboxOptions';
import { FormButton } from '@/components/create/FormButton';
import type { CreateQuizFormValues } from '@/lib/validation/createQuizSchema';

type QuestionType = CreateQuizFormValues['questions'][number]['type'];

type QuestionFieldsProps = {
  index: number;
  canRemove: boolean;
  control: Control<CreateQuizFormValues>;
  register: UseFormRegister<CreateQuizFormValues>;
  watch: UseFormWatch<CreateQuizFormValues>;
  errors: FieldErrors<CreateQuizFormValues>;
  update: UseFieldArrayUpdate<CreateQuizFormValues, 'questions'>;
  onRemove: () => void;
};

function QuestionFields({
  index,
  canRemove,
  control,
  register,
  watch,
  errors,
  update,
  onRemove,
}: QuestionFieldsProps) {
  const type = watch(`questions.${index}.type`);
  const questionError = errors.questions?.[index];
  const textError = questionError && 'text' in questionError ? questionError.text : undefined;

  function changeType(nextType: QuestionType) {
    const text = watch(`questions.${index}.text`) ?? '';

    if (nextType === 'BOOLEAN') {
      update(index, { type: 'BOOLEAN', text, correctAnswer: 'true' });
      return;
    }

    if (nextType === 'INPUT') {
      update(index, { type: 'INPUT', text, correctAnswer: '' });
      return;
    }

    update(index, {
      type: 'CHECKBOX',
      text,
      options: [
        { text: '', isCorrect: true },
        { text: '', isCorrect: false },
      ],
    });
  }

  return (
    <fieldset className="border border-[var(--border)] px-4 py-4">
      <legend className="px-1 text-sm text-[var(--muted)]">Question {index + 1}</legend>

      <div className="mt-2 flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <label className="text-sm font-medium" htmlFor={`question-type-${index}`}>
            Type
          </label>
          <select
            id={`question-type-${index}`}
            className="form-select"
            value={type}
            onChange={(e) => changeType(e.target.value as QuestionType)}
          >
            <option value="BOOLEAN">Boolean</option>
            <option value="INPUT">Input</option>
            <option value="CHECKBOX">Checkbox</option>
          </select>
        </div>

        {canRemove ? (
          <FormButton
            type="button"
            variant="secondary"
            aria-label="Remove question"
            className="!inline-flex items-center justify-center !p-3 md:!px-8 md:!py-3"
            onClick={onRemove}
          >
            <span className="inline-flex md:hidden" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
            </span>
            <span className="hidden md:inline">Remove question</span>
          </FormButton>
        ) : null}
      </div>

      <div className="mt-4">
        <label className="mb-2 block text-sm font-medium">Question text</label>
        <input className="w-full" {...register(`questions.${index}.text`)} />
        {textError?.message ? (
          <p className="mt-2 text-sm text-[var(--danger)]">{textError.message}</p>
        ) : null}
      </div>

      {type === 'BOOLEAN' ? (
        <div className="mt-4 flex gap-4">
          <label className="flex items-center gap-2">
            <input type="radio" value="true" {...register(`questions.${index}.correctAnswer`)} />
            True
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" value="false" {...register(`questions.${index}.correctAnswer`)} />
            False
          </label>
        </div>
      ) : null}

      {type === 'INPUT' ? (
        <div className="mt-4">
          <label className="mb-2 block text-sm font-medium">Correct answer</label>
          <input className="w-full" {...register(`questions.${index}.correctAnswer`)} />
        </div>
      ) : null}

      {type === 'CHECKBOX' ? (
        <CheckboxOptions
          questionIndex={index}
          control={control}
          register={register}
          errors={errors}
        />
      ) : null}
    </fieldset>
  );
}

export { QuestionFields };
export type { QuestionFieldsProps };
