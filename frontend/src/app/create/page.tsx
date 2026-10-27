import { ButtonLink } from '@/components/header/ButtonLink';
import { CreateQuizForm } from '@/components/create/CreateQuizForm';
import { PageHeader } from '@/components/PageHeader';

function CreateQuizPage() {
  return (
    <div>
      <div className="mb-8">
        <ButtonLink href="/quizzes">Back to quizzes</ButtonLink>
      </div>

      <PageHeader title="Create quiz" description="Add a title and at least one question" />
      <CreateQuizForm />
    </div>
  );
}

export default CreateQuizPage;
