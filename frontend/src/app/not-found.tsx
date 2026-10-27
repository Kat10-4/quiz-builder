import Link from 'next/link';

function NotFound() {
  return (
    <div className="py-16 text-center">
      <h1 className="text-2xl font-semibold text-[var(--ink)]">Page not found</h1>
      <p className="mt-2 text-[var(--muted)]">That route does not exist.</p>
      <Link
        href="/quizzes"
        className="mt-6 inline-block bg-black px-8 py-3 text-base font-medium text-[#ffffff] hover:bg-[var(--accent-hover)]"
      >
        Back to quizzes
      </Link>
    </div>
  );
}

export default NotFound;
