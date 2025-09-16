"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header(){
  const path = usePathname() || '/';
  const isActive = (p: string) => path === p;

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-transparent fixed top-0 left-0 z-30">
      <Link href="/" className="text-2xl font-bold">Iberico Experience</Link>
      <nav className="flex gap-6">
        <Link href="/" className={isActive('/')? 'text-amber-300 font-semibold' : 'text-white'}>Home</Link>
        <Link href="/gallery" className={isActive('/gallery')? 'text-amber-300 font-semibold' : 'text-white'}>Gallery</Link>
        <Link href="/destinations" className={isActive('/destinations')? 'text-amber-300 font-semibold' : 'text-white'}>Destinations</Link>
        <a href="#contact" className="text-white">Contact</a>
      </nav>
    </header>
  )
}
