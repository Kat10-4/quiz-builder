import type { FieldErrors } from 'react-hook-form';
import type { CreateQuizFormValues } from '@/lib/validation/createQuizSchema';

function getOptionsErrorMessage(
  errors: FieldErrors<CreateQuizFormValues>,
  questionIndex: number,
): string | null {
  const questionError = errors.questions?.[questionIndex];
  const optionsError =
    questionError && 'options' in questionError ? questionError.options : undefined;

  if (!optionsError || typeof optionsError !== 'object') {
    return null;
  }

  if ('message' in optionsError && typeof optionsError.message === 'string') {
    return optionsError.message;
  }

  if (
    'root' in optionsError &&
    optionsError.root &&
    typeof optionsError.root === 'object' &&
    'message' in optionsError.root
  ) {
    return String(optionsError.root.message);
  }

  return null;
}

export { getOptionsErrorMessage };
