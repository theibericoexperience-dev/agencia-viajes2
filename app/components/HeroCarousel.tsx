"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const IMAGES = [
  '/images/hero-extras/IMG_3582.JPG',
  '/images/hero-extras/IMG_3578.JPG',
  '/images/hero-extras/IMG_3604.JPG'
];

export default function HeroCarousel({ className = '' }: { className?: string }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % IMAGES.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className={`relative w-full h-full ${className}`} aria-hidden>
      <Image src={IMAGES[idx]} alt="Hero carousel" fill className="object-cover transition-opacity duration-700" priority={true} sizes="100vw" />
    </div>
  );
}
