"use client";
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const IMAGES = [
  '/images/hero-extras/IMG_3582.JPG',
  '/images/hero-extras/IMG_3578.JPG',
  '/images/hero-extras/IMG_3604.JPG'
];

export default function HeroCarousel({ className = '' }: { className?: string }) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const start = () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      intervalRef.current = window.setInterval(() => setIdx((i) => (i + 1) % IMAGES.length), 4500);
    };
    if (!paused) start();
    return () => { if (intervalRef.current) window.clearInterval(intervalRef.current); };
  }, [paused]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space') { e.preventDefault(); setPaused((p) => !p); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className={`relative w-full h-full ${className}`}>
      <Image src={IMAGES[idx]} alt="Hero carousel" fill className="object-cover transition-opacity duration-700" priority={true} sizes="100vw" />
      <button
        aria-pressed={paused}
        aria-label={paused ? 'Play carousel' : 'Pause carousel'}
        onClick={() => setPaused((p) => !p)}
        className="absolute top-3 right-3 z-30 bg-black/40 text-white rounded-full p-2 hover:bg-black/60 focus:outline-none"
      >
        {paused ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M3 2.5v11L14 8 3 2.5z"/></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M5.5 3.5A1.5 1.5 0 0 0 4 5v6a1.5 1.5 0 0 0 1.5 1.5H6A1.5 1.5 0 0 0 7.5 12V4A1.5 1.5 0 0 0 6 2.5h-.5zM10.5 3.5A1.5 1.5 0 0 0 9 5v6a1.5 1.5 0 0 0 1.5 1.5H11A1.5 1.5 0 0 0 12.5 12V4A1.5 1.5 0 0 0 11 2.5h-.5z"/></svg>
        )}
      </button>
    </div>
  );
}
