"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Ghost, Home, Package, Sparkle } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = {
  '/database': {
    name: 'Overview',
    icon: <Home />,
    newTab: false,
  },
  '/database/units': {
    name: 'Units',
    icon: <Ghost />,
    newTab: false,
  },
  '/database/crates': {
    name: 'Crates',
    icon: <Package />,
    newTab: false,
  },
  '/database/summons': {
    name: 'Summons',
    icon: <Sparkle />,
    newTab: false,
  },
  /*
  '/database/clans': {
    name: 'Clans',
    icon: <Shield />,
    newTab: false,
  },
  */
};

function isActivePath(pathname: string, path: string) {
  if (path === '/database') return pathname === path;
  return pathname === path || pathname.startsWith(`${path}/`);
}

export function DatabaseTopbar() {
  const pathname = usePathname();

  return (
    <div className="container mx-auto px-4 md:px-6 pt-4">
      <nav className="mx-auto flex w-fit max-w-full gap-1 overflow-x-auto rounded-full border bg-card p-1 shadow-sm [scrollbar-width:none]">
        {Object.entries(navItems).map(([path, { name, icon, newTab }]) => (
          <Link
            key={path}
            href={path}
            target={newTab ? '_blank' : undefined}
            rel={newTab ? 'noopener noreferrer' : undefined}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-full px-3 sm:px-4 py-2 text-sm font-medium transition-colors [&_svg]:size-4",
              isActivePath(pathname, path)
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
          >
            {icon}
            {name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
