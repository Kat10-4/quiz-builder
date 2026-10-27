'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

type NavLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

function NavLink({ href, children, className = '', onClick }: NavLinkProps) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={`nav-link${active ? ' nav-link--active' : ''}${className ? ` ${className}` : ''}`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

export { NavLink };
export type { NavLinkProps };
