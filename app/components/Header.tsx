"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header(){
  const path = usePathname() || '/';
  const isActive = (p: string) => path === p;
  const [open, setOpen] = useState(false);

  // close on ESC
  React.useEffect(() => {
    function onKey(e: KeyboardEvent){ if(e.key === 'Escape') setOpen(false); }
    if(open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="w-full flex items-center justify-between px-4 md:px-6 py-3 bg-transparent fixed top-0 left-0 z-40">
      <div className="flex items-center gap-4">
        <h1 className="text-xl md:text-2xl font-bold"><Link href="/">Agencia Viajes</Link></h1>
      </div>

  <button aria-label="Toggle menu" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)} className="md:hidden p-2 rounded bg-black/30 text-white">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          {open ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
        </svg>
      </button>

      <nav className={`hidden md:flex items-center gap-6`} aria-label="Main navigation">
        <Link href="/" className={isActive('/')? 'text-amber-300 font-semibold' : 'text-white'}>Home</Link>
        <Link href="/gallery" className={isActive('/gallery')? 'text-amber-300 font-semibold' : 'text-white'}>Gallery</Link>
        <Link href="/destinations" className={isActive('/destinations')? 'text-amber-300 font-semibold' : 'text-white'}>Destinations</Link>
        <a href="#contact" className={isActive('/contact')? 'text-amber-300 font-semibold' : 'text-white'}>Contact</a>
      </nav>

      {open && (
        <div id="mobile-menu" className="absolute top-full left-0 right-0 bg-black/80 p-4 md:hidden">
          <nav className="flex flex-col gap-3" aria-label="Mobile navigation">
            <Link href="/" onClick={() => setOpen(false)} className="text-white">Home</Link>
            <Link href="/gallery" onClick={() => setOpen(false)} className="text-white">Gallery</Link>
            <Link href="/destinations" onClick={() => setOpen(false)} className="text-white">Destinations</Link>
            <a href="#contact" onClick={() => setOpen(false)} className="text-white">Contact</a>
          </nav>
        </div>
      )}
    </header>
  )
}
