"use client"

import { useState } from 'react';
import Link from 'next/link';
import { ToiletIcon } from './icons';
import { HamburgerMenuIcon, Cross1Icon } from '@radix-ui/react-icons';
import { ThemeToggle } from './ui/theme-toggle';

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
  '/game': {
    name: "Game",
    newTab: true,
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

export function Topbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="sticky top-0 z-50 bg-ghost-accent-color text-gray-900 dark:text-gray-100">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="/">
          <ToiletIcon className="h-8 w-8 mr-2" color='#fff' />
          <span className="topbar-title font-bold text-white">Toilet Tower Defense</span>
        </Link>
        <nav className="ml-auto hidden sm:flex gap-4 sm:gap-6">
          {Object.entries(navItems).map(([path, { name, newTab }]) => (
            <Link
              className="text-white font-medium hover:underline underline-offset-4"
              key={path}
              href={path}
              target={newTab ? '_blank' : undefined}
            >
              {name}
            </Link>
          ))}
        </nav>
        <button onClick={toggleMenu} className="ml-auto sm:hidden">
          <HamburgerMenuIcon className="h-6 w-6" color='#fff' />
        </button>

        <div className='py-4 pl-6 text-white'>
          <ThemeToggle />
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="bg-ghost-accent-color h-full w-64 p-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-white font-bold">Menu</span>
              <button onClick={toggleMenu}>
                <Cross1Icon className="h-6 w-6" color='#fff' />
              </button>
            </div>
            <nav className="flex flex-col gap-4">
              {Object.entries(navItems).map(([path, { name }]) => (
                <Link
                  className="text-white font-medium hover:underline underline-offset-4"
                  key={path}
                  href={path}
                  onClick={toggleMenu}
                >
                  {name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}