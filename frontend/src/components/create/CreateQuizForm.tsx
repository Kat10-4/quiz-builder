'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { QuestionFields } from '@/components/create/QuestionFields';
import { FormButton } from '@/components/create/FormButton';
import { api } from '@/lib/api/api';
import { createQuizSchema, type CreateQuizFormValues } from '@/lib/validation/createQuizSchema';

const defaultQuestion: CreateQuizFormValues['questions'][number] = {
  type: 'BOOLEAN',
  text: '',
  correctAnswer: 'true',
};

function CreateQuizForm() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateQuizFormValues>({
    resolver: zodResolver(createQuizSchema),
    defaultValues: {
      title: '',
      questions: [defaultQuestion],
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'questions',
  });

  async function onSubmit(values: CreateQuizFormValues) {
    setSubmitError(null);
    try {
      const quiz = await api.createQuiz(values);
      router.push(`/quizzes/${quiz.id}`);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to create quiz');
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <div>
        <label htmlFor="title" className="mb-2 block font-medium">
          Quiz title
        </label>
        <input id="title" className="w-full" {...register('title')} />
        {errors.title ? (
          <p className="mt-2 text-sm text-[var(--danger)]">{errors.title.message}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-4">
        {fields.map((field, index) => (
          <QuestionFields
            key={field.id}
            index={index}
            canRemove={fields.length > 1}
            control={control}
            register={register}
            watch={watch}
            errors={errors}
            update={update}
            onRemove={() => remove(index)}
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <FormButton
          type="button"
          variant="secondary"
          onClick={() => append({ ...defaultQuestion })}
        >
          Add question
        </FormButton>
        <FormButton type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? 'Saving…' : 'Create quiz'}
        </FormButton>
      </div>

      {submitError ? <p className="text-sm text-[var(--danger)]">{submitError}</p> : null}
    </form>
  );
}

export { CreateQuizForm };
