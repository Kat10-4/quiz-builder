import { ButtonLink } from '@/components/header/ButtonLink';

function NotFound() {
  return (
    <div className="py-16 text-center">
      <h2 className="text-2xl font-semibold text-[var(--ink)]">Page not found</h2>
      <p className="mt-2 text-[var(--muted)]">That route does not exist.</p>
      <div className="mt-6">
        <ButtonLink href="/quizzes">Back to quizzes</ButtonLink>
      </div>
    </div>
  );
}

export default NotFound;
