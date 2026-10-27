type PageHeaderProps = {
  title: string;
  description: string;
};

function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
      <p className="mt-2 text-[var(--muted)]">{description}</p>
    </div>
  );
}

export { PageHeader };
export type { PageHeaderProps };
