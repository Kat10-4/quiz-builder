type PageHeaderProps = {
  title: string;
  description: string;
};

function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-8 min-w-0">
      <h2 className="break-words text-3xl font-semibold tracking-tight">{title}</h2>
      <p className="mt-2 break-words text-[var(--muted)]">{description}</p>
    </div>
  );
}

export { PageHeader };
export type { PageHeaderProps };
