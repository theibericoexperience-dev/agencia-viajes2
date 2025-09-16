"use client";
import React from 'react';
import Header from '../../app/components/Header';

export default function GalleryPage() {
  const images = ['/images/IMG_3241.JPG','/images/IMG_3241.JPG','/images/IMG_3241.JPG','/images/IMG_3241.JPG'];
  return (
    <main className="min-h-screen p-8 bg-black/80 text-white">
      <Header />
      <h1 className="text-3xl font-bold mb-4">Gallery</h1>
      <p className="mb-6">Moments from our trips.</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((src, i) => (
          <img key={i} src={src} alt={`gallery-${i}`} className="w-full h-44 object-cover rounded" loading="lazy" />
        ))}
      </div>
    </main>
  );
}
