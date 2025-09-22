"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function GalleryPage() {
  const galleryImages = [
    '/images/carousel/IMG_3951.JPG',
    '/images/carousel/IMG_4008.JPG',
    '/images/carousel/IMG_4015.JPG',
    '/images/carousel/IMG_4326.JPG',
    '/images/carousel/IMG_4446.JPG',
    '/images/carousel/IMG_4447.JPG',
    '/images/destinations/madrid-lisboa/IMG_4335.JPG',
    '/images/destinations/madrid-lisboa/IMG_4337.JPG',
    '/images/destinations/madrid-lisboa/IMG_4342.JPG',
  ];

  return (
    <main className="min-h-screen bg-black">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 p-8">
        <nav className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-light text-white tracking-widest">
            IBERO TOURS
          </Link>
          <div className="flex gap-8 items-center">
            <Link href="/gallery" className="text-white border-b border-white text-sm uppercase tracking-wider">
              Gallery
            </Link>
            <Link href="/destinations" className="text-white hover:text-gray-300 transition-colors text-sm uppercase tracking-wider">
              Destinations
            </Link>
            <Link href="/contact" className="text-white hover:text-gray-300 transition-colors text-sm uppercase tracking-wider">
              Contact
            </Link>
          </div>
        </nav>
      </header>

      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-8">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-light text-white text-center mb-16 tracking-wider"
          >
            Gallery
          </motion.h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
