import Link from 'next/link';
import type { ReactNode } from 'react';

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

function ButtonLink({ href, children, className = '', onClick }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={`bg-black px-8 py-3 text-base font-medium text-[#ffffff] no-underline hover:bg-[var(--accent-hover)] hover:text-[#ffffff] hover:no-underline${
        className ? ` ${className}` : ''
      }`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

export { ButtonLink };
export type { ButtonLinkProps };
