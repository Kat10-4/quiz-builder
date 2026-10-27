'use client';

import {
  useFieldArray,
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from 'react-hook-form';
import { getOptionsErrorMessage } from '@/components/create/getOptionsErrorMessage';
import { FormButton } from '@/components/create/FormButton';
import type { CreateQuizFormValues } from '@/lib/validation/createQuizSchema';

type CheckboxOptionsProps = {
  questionIndex: number;
  control: Control<CreateQuizFormValues>;
  register: UseFormRegister<CreateQuizFormValues>;
  errors: FieldErrors<CreateQuizFormValues>;
};

function CheckboxOptions({ questionIndex, control, register, errors }: CheckboxOptionsProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${questionIndex}.options`,
  });

  const optionsErrorMessage = getOptionsErrorMessage(errors, questionIndex);

  return (
    <div className="mt-4">
      <p className="mb-2 text-sm font-medium">Options</p>
      <div className="flex flex-col gap-3">
        {fields.map((field, optionIndex) => (
          <div key={field.id} className="flex flex-wrap items-center gap-3">
            <input
              className="min-w-0 flex-1"
              placeholder={`Option ${optionIndex + 1}`}
              {...register(`questions.${questionIndex}.options.${optionIndex}.text`)}
            />
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                {...register(`questions.${questionIndex}.options.${optionIndex}.isCorrect`)}
              />
              Correct
            </label>
            {fields.length > 2 ? (
              <FormButton
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => remove(optionIndex)}
              >
                Remove
              </FormButton>
            ) : null}
          </div>
        ))}
      </div>
      <FormButton
        type="button"
        variant="secondary"
        size="sm"
        className="mt-3"
        onClick={() => append({ text: '', isCorrect: false })}
      >
        Add option
      </FormButton>
      {optionsErrorMessage ? (
        <p className="mt-2 text-sm text-[var(--danger)]">{optionsErrorMessage}</p>
      ) : null}
    </div>
  );
}

export { CheckboxOptions };
export type { CheckboxOptionsProps };
