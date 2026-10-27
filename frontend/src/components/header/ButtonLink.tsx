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
      className={`form-button form-button--primary form-button--md inline-block no-underline hover:no-underline${
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
