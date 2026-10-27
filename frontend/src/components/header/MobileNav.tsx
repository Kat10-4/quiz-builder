'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ButtonLink } from '@/components/header/ButtonLink';
import { NavLink } from '@/components/header/NavLink';

type MobileNavProps = {
  onOpenChange?: (open: boolean) => void;
};

function MobileNav({ onOpenChange }: MobileNavProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  function setOpen(open: boolean) {
    setMenuOpen(open);
    onOpenChange?.(open);
  }

  useEffect(() => {
    setMenuOpen(false);
    onOpenChange?.(false);
  }, [pathname, onOpenChange]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        onOpenChange?.(false);
      }
    }

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen, onOpenChange]);

  return (
    <>
      <button
        type="button"
        className="inline-flex h-11 w-11 items-center justify-center bg-transparent text-black md:hidden"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        aria-controls="mobile-nav"
        onClick={() => setOpen(!menuOpen)}
      >
        {menuOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="square"
            />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M4 7h16M4 12h16M4 17h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="square"
            />
          </svg>
        )}
      </button>

      {menuOpen ? (
        <nav
          id="mobile-nav"
          className="absolute left-0 right-0 top-full border-t border-[var(--border)] bg-[var(--bg)] px-4 py-6 md:hidden"
          aria-label="Mobile"
        >
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <NavLink href="/quizzes" onClick={() => setOpen(false)}>
              Quizzes
            </NavLink>
            <ButtonLink href="/create" onClick={() => setOpen(false)}>
              Create
            </ButtonLink>
          </div>
        </nav>
      ) : null}
    </>
  );
}

export { MobileNav };
export type { MobileNavProps };
