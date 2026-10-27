'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { DesktopNav } from '@/components/header/DesktopNav';
import { MobileNav } from '@/components/header/MobileNav';

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 0);
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-[var(--bg)] transition-[box-shadow] duration-150 ease-linear ${
        scrolled || menuOpen ? 'shadow-[0_6px_14px_rgba(0,0,0,0.1)]' : 'shadow-none'
      }`}
    >
      <div className="bg-[var(--accent-green-soft)] px-4 py-2.5 text-center text-sm font-black break-words text-[var(--ink)]">
        Quiz Builder — create, list, and review quizzes
      </div>
      <div className="relative min-w-0">
        <div className="mx-auto flex w-full min-w-0 max-w-3xl items-center justify-between gap-4 px-4 py-6 md:py-8">
          <Link
            href="/quizzes"
            className="min-w-0 shrink text-lg font-semibold tracking-tight text-[var(--ink)] no-underline hover:no-underline"
          >
            <h1 className="text-lg font-semibold tracking-tight">Quiz Builder</h1>
          </Link>
          <DesktopNav />
          <MobileNav onOpenChange={setMenuOpen} />
        </div>
      </div>
    </header>
  );
}

export { Header };
