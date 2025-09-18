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
      <div className="flex items-center gap-6">
        <nav className="hidden md:flex items-center gap-6 uppercase tracking-widest text-sm" aria-label="Main navigation">
          <Link href="/destinations" className={isActive('/destinations')? 'text-white font-semibold' : 'text-white/90'}>destinations</Link>
          <Link href="/contact" className={isActive('/contact')? 'text-white font-semibold' : 'text-white/90'}>contact</Link>
          <Link href="/more" className={isActive('/more')? 'text-white font-semibold' : 'text-white/90'}>más</Link>
        </nav>
      </div>

  <button aria-label="Toggle menu" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)} className="md:hidden p-2 rounded bg-black/30 text-white">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          {open ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
        </svg>
      </button>

      <div className="hidden md:block ml-auto mr-4 font-bold text-white text-lg md:text-xl" style={{fontFamily: 'Verdana, Geneva, sans-serif', textTransform: 'uppercase'}}>
        IBERO Tours
      </div>

      {open && (
        <div id="mobile-menu" className="absolute top-full left-0 right-0 bg-black/80 p-4 md:hidden">
          <nav className="flex flex-col gap-3" aria-label="Mobile navigation">
            <Link href="/destinations" onClick={() => setOpen(false)} className="text-white">destinations</Link>
            <Link href="/contact" onClick={() => setOpen(false)} className="text-white">contact</Link>
            <Link href="/more" onClick={() => setOpen(false)} className="text-white">más</Link>
          </nav>
        </div>
      )}
    </header>
  )
}
