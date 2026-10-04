"use client"

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ToiletIcon } from '@/components/custom/icons';
import { HamburgerMenuIcon, Cross1Icon } from '@radix-ui/react-icons';
import { ArrowUpRight } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { cn } from '@/lib/utils';

const navItems = {
  '/': {
    name: 'Home',
    newTab: false,
  },
  '/database': {
    name: 'Database',
    newTab: false,
  },
  '/blog': {
    name: 'Blog',
    newTab: false,
  },
  '/faq': {
    name: "FAQ",
    newTab: false,
  },
  '/status': {
    name: "Status",
    newTab: false,
  }
};

function isActivePath(pathname: string, path: string) {
  if (path === '/') return pathname === '/';
  return pathname === path || pathname.startsWith(`${path}/`);
}

export function Topbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        isScrolled
          ? "bg-background/75 backdrop-blur-xl border-b border-border/60"
          : "bg-background/0 border-b border-transparent"
      )}
    >
      <header className="container mx-auto px-4 md:px-6 h-16 flex items-center gap-4">
        <Link className="flex items-center gap-2.5 shrink-0" href="/">
          <span className="grid place-items-center size-9 rounded-xl bg-primary text-primary-foreground shadow-sm shadow-primary/30">
            <ToiletIcon className="h-5 w-5" />
          </span>
          <span className="font-display font-bold text-lg tracking-tight hidden min-[360px]:inline">
            Toilet Tower Defense
          </span>
        </Link>

        <nav className="ml-auto hidden md:flex items-center gap-1 rounded-full border border-border/60 bg-card/60 p-1 backdrop-blur">
          {Object.entries(navItems).map(([path, { name, newTab }]) => (
            <Link
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                isActivePath(pathname, path)
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
              key={path}
              href={path}
              target={newTab ? '_blank' : undefined}
            >
              {name}
            </Link>
          ))}
        </nav>

        <div className="ml-auto md:ml-0 flex items-center gap-2">
          <Link
            href="/game"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1 h-9 rounded-full bg-foreground px-4 text-sm font-semibold text-background transition-transform hover:-translate-y-px"
          >
            Play
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <ThemeToggle />
          <button
            onClick={toggleMenu}
            className="md:hidden grid place-items-center size-9 rounded-full border border-border bg-card"
            aria-label="Open menu"
          >
            <HamburgerMenuIcon className="h-4 w-4" />
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden" onClick={toggleMenu}>
          <div
            className="absolute right-3 top-3 w-[min(20rem,calc(100vw-1.5rem))] rounded-2xl border bg-popover p-3 shadow-2xl animate-in fade-in zoom-in-95 slide-in-from-top-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center px-2 pb-2">
              <span className="font-display font-bold">Menu</span>
              <button onClick={toggleMenu} className="grid place-items-center size-8 rounded-full hover:bg-accent" aria-label="Close menu">
                <Cross1Icon className="h-4 w-4" />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {Object.entries(navItems).map(([path, { name }]) => (
                <Link
                  className={cn(
                    "rounded-xl px-3 py-2.5 font-medium transition-colors",
                    isActivePath(pathname, path) ? "bg-accent text-accent-foreground" : "hover:bg-accent"
                  )}
                  key={path}
                  href={path}
                  onClick={toggleMenu}
                >
                  {name}
                </Link>
              ))}
              <Link
                href="/game"
                target="_blank"
                onClick={toggleMenu}
                className="mt-2 flex items-center justify-center gap-1 rounded-xl bg-primary px-3 py-2.5 font-semibold text-primary-foreground"
              >
                Play on Roblox
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
