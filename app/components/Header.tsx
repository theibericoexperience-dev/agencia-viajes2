"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header(){
  const path = usePathname() || '/';
  const isActive = (p: string) => path === p;

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-transparent fixed top-0 left-0 z-30">
      <h1 className="text-2xl font-bold"><Link href="/">Agencia Viajes</Link></h1>
      <nav className="flex gap-6" aria-label="Main navigation">
        <Link href="/" className={isActive('/')? 'text-amber-300 font-semibold' : 'text-white'}>Home</Link>
        <a href="#contact" className={isActive('/contact')? 'text-amber-300 font-semibold' : 'text-white'}>Contact</a>
      </nav>
    </header>
  )
}
