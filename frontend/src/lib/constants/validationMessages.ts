const ValidationMessage = {
  TITLE_REQUIRED: 'Title is required',
  TITLE_MAX: 'Title must be at most 200 characters',
  QUESTION_NUMBER_VALIDATION: 'At least one question is required',
  TEXT_REQUIRED: 'Text is required',
  CORRECT_ANSWER_REQUIRED: 'Correct answer is required',
  OPTION_NUMBER_VALIDATION: 'At least two options are required',
  CORRECT_OPTION_VALIDATION: 'At least one option must be correct',
} as const;

export { ValidationMessage };
