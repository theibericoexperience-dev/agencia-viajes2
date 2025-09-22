"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function DestinationsPage() {
  const destinations = [
    {
      title: "Madrid & Lisboa",
      subtitle: "Dos capitales ibéricas llenas de historia",
      image: "/images/destinations/madrid-lisboa/IMG_4335.JPG",
      href: "/destinations/madrid-lisboa"
    },
    {
      title: "Porto & Galicia", 
      subtitle: "Costa atlántica con sabor tradicional",
      image: "/images/carousel/IMG_4008.JPG",
      href: "/destinations/porto-galicia"
    },
    {
      title: "Barcelona & Bordeaux",
      subtitle: "Arte, arquitectura y vinos excepcionales",
      image: "/images/carousel/IMG_4326.JPG", 
      href: "/destinations/barcelona-bordeaux"
    },
    {
      title: "Southeast Asia",
      subtitle: "Aventura tropical y culturas milenarias",
      image: "/images/carousel/IMG_4446.JPG",
      href: "/destinations/southeast-asia"
    }
  ];

  return (
    <main className="min-h-screen bg-black">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 p-8">
        <nav className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-light text-white tracking-widest">
            IBERO TOURISM
          </Link>
          <div className="flex gap-8 items-center">
            <Link href="/gallery" className="text-white hover:text-gray-300 transition-colors text-sm uppercase tracking-wider">
              Gallery
            </Link>
            <Link href="/destinations" className="text-white border-b border-white text-sm uppercase tracking-wider">
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
            Destinations
          </motion.h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {destinations.map((destination, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="group cursor-pointer"
              >
                <Link href={destination.href}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={destination.image}
                      alt={destination.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
                    <div className="absolute bottom-8 left-8">
                      <h2 className="text-3xl font-light text-white mb-2 tracking-wide">
                        {destination.title}
                      </h2>
                      <p className="text-white/80 text-lg">
                        {destination.subtitle}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
