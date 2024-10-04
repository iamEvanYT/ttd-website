"use client"

import { useState } from 'react';
import Link from 'next/link';
import { Cross1Icon } from '@radix-ui/react-icons';
import { Ghost, Home, Package, Sparkle } from 'lucide-react';

const navItems = {
  '/database': {
    name: 'Home',
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
};

export function DatabaseTopbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="pt-2 px-5">
      <div className="sticky top-0 rounded-3xl bg-gradient-to-b from-green-700 to-green-500 text-gray-900 dark:text-gray-100">
        <header className="px-4 lg:px-6 h-14 flex items-center justify-center relative">
          {/* Hamburger Menu Button */}
          <button
            onClick={toggleMenu}
            className="absolute sm:hidden focus:outline-none text-white font-semibold hover:underline underline-offset-4"
            aria-label="Toggle Menu"
          >
            Open Database Navigation
          </button>

          {/* Navigation Menu */}
          <nav className="hidden sm:flex gap-4 sm:gap-6">
            {Object.entries(navItems).map(([path, { name, icon, newTab }]) => (
              <Link
                key={path}
                href={path}
                target={newTab ? '_blank' : undefined}
                rel={newTab ? 'noopener noreferrer' : undefined}
                className="text-white font-medium hover:underline underline-offset-4 flex gap-1.5"
              >
                {icon}
                {name}
              </Link>
            ))}
          </nav>

          <div className="hidden sm:block w-6" /> {/* Adjust width as needed */}
        </header>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="relative inset-0 bg-black bg-opacity-50 z-50">
            <div className="bg-ghost-accent-color h-full w-full p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-white font-bold">Menu</span>
                <button
                  onClick={toggleMenu}
                  className="focus:outline-none"
                  aria-label="Close Menu"
                >
                  <Cross1Icon className="h-6 w-6 text-white" />
                </button>
              </div>
              <nav className="flex flex-col gap-4">
                {Object.entries(navItems).map(([path, { name, icon, newTab }]) => (
                  <Link
                    key={path}
                    href={path}
                    target={newTab ? '_blank' : undefined}
                    rel={newTab ? 'noopener noreferrer' : undefined}
                    onClick={toggleMenu}
                    className="text-white font-medium hover:underline underline-offset-4 flex flex-row gap-2"
                  >
                    {icon}
                    {name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
