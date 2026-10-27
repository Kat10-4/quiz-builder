'use client';

import { ButtonLink } from '@/components/header/ButtonLink';
import { NavLink } from '@/components/header/NavLink';

function DesktopNav() {
  return (
    <nav className="nav-links hidden md:flex" aria-label="Main">
      <NavLink href="/quizzes">Quizzes</NavLink>
      <ButtonLink href="/create">Create</ButtonLink>
    </nav>
  );
}

export { DesktopNav };
