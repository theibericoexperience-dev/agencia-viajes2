"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import UserMenu from './UserMenu';

type HeaderProps = {
  leftLabel?: string;
};

export default function Header({ leftLabel }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out py-5 lg:py-6 uppercase ${
        isScrolled ? 'bg-white/95 backdrop-blur-lg shadow-2xl border-b border-gray-200/50' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center">
          {/* Left: Open Tours */}
          <div className="flex items-center">
            <nav className="hidden lg:flex items-center">
              <Link
                href="/destinations"
                className={`text-base lg:text-lg font-medium tracking-wide transition-all duration-300 no-underline ${
                  isScrolled ? 'text-gray-800 hover:text-black' : 'text-white hover:text-gray-200'
                } hover:scale-105`}
              >
                {leftLabel ?? 'Open Tours'}
              </Link>
            </nav>
          </div>

          {/* Center: IBERO (non-clickable, larger) */}
          <div className="flex justify-center">
            <span
              className={`brand-display block tracking-widest text-gray-900 transition-all duration-500 text-center uppercase ${
                isScrolled ? 'text-2xl lg:text-3xl' : 'text-4xl lg:text-5xl'
              } font-extrabold`}
            >
              IBERO
            </span>
          </div>

          {/* Right: Behind (aligned within container) */}
          <div className="flex items-center justify-end space-x-6">
            <Link
              href="/behind"
              className={`text-base lg:text-lg font-medium tracking-wide transition-all duration-300 no-underline ${
                isScrolled ? 'text-gray-800 hover:text-black' : 'text-white hover:text-gray-200'
              } hover:scale-105`}
            >
              Behind
            </Link>
          </div>
        </div>
      </div>
      {/* User menu pinned to the very right edge of the header */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 mr-4">
        {session ? (
          <UserMenu />
        ) : (
          <button
            onClick={() => signIn()}
            disabled={status === 'loading'}
            className={`text-sm font-medium tracking-wide transition-all duration-300 ${
              isScrolled ? 'text-gray-800 hover:text-black' : 'text-white hover:text-gray-200'
            } hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full p-2 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {status === 'loading' ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                <span>Cargando...</span>
              </div>
            ) : (
              <span className="w-10 h-10 bg-gray-200 rounded-full inline-block" />
            )}
          </button>
        )}
      </div>
    </header>
  );
}