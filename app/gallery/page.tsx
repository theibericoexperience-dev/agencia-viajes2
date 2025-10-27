"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const galleryCategories = {
    all: 'All Images',
    destinations: 'Destinations',
    experiences: 'Experiences',
    architecture: 'Architecture',
    nature: 'Nature',
    culture: 'Culture'
  };

  const galleryImages = [
    // Hero & Main Images
    { src: '/images/hero-main.JPG', category: 'destinations', title: 'Barcelona Coastline', location: 'Barcelona, Spain' },
    { src: '/hero-landscape.jpg', category: 'nature', title: 'Mediterranean Landscape', location: 'Costa Brava, Spain' },
    { src: '/hero.jpg', category: 'architecture', title: 'Historic Architecture', location: 'Madrid, Spain' },
    { src: '/iberico-hero.jpg', category: 'culture', title: 'Iberian Heritage', location: 'Spain' },
    { src: '/IMG_3241.JPG', category: 'destinations', title: 'Urban Exploration', location: 'Barcelona, Spain' },

    // Hero Extras
    { src: '/images/hero-extras/IMG_3578.JPG', category: 'architecture', title: 'Modernist Building', location: 'Barcelona, Spain' },
    { src: '/images/hero-extras/IMG_3582.JPG', category: 'culture', title: 'Street Art & Culture', location: 'Barcelona, Spain' },
    { src: '/images/hero-extras/IMG_3604.JPG', category: 'experiences', title: 'Local Experience', location: 'Barcelona, Spain' },

    // Carousel Images
    { src: '/images/carousel/IMG_3582.JPG', category: 'architecture', title: 'Gothic Architecture', location: 'Barcelona, Spain' },
    { src: '/images/carousel/IMG_3586.JPG', category: 'culture', title: 'Cultural Heritage', location: 'Barcelona, Spain' },
    { src: '/images/carousel/IMG_3951.JPG', category: 'nature', title: 'Coastal Views', location: 'Costa Brava, Spain' },
    { src: '/images/carousel/IMG_4008.JPG', category: 'experiences', title: 'Adventure Activities', location: 'Pyrenees, Spain' },
    { src: '/images/carousel/IMG_4015.JPG', category: 'culture', title: 'Traditional Festivals', location: 'Andalusia, Spain' },
    { src: '/images/carousel/IMG_4326.JPG', category: 'architecture', title: 'Historic Monuments', location: 'Madrid, Spain' },
    { src: '/images/carousel/IMG_4335.JPG', category: 'destinations', title: 'Madrid-Lisboa Route', location: 'Madrid, Spain' },
    { src: '/images/carousel/IMG_4337.JPG', category: 'destinations', title: 'Iberian Journey', location: 'Spain-Portugal' },
    { src: '/images/carousel/IMG_4342.JPG', category: 'nature', title: 'Natural Landscapes', location: 'Galicia, Spain' },
    { src: '/images/carousel/IMG_4446.JPG', category: 'culture', title: 'Art & Culture', location: 'Barcelona, Spain' },
    { src: '/images/carousel/IMG_4447.JPG', category: 'experiences', title: 'Culinary Experiences', location: 'Basque Country, Spain' },
    { src: '/images/carousel/IMG_4919.JPG', category: 'architecture', title: 'Modern Architecture', location: 'Barcelona, Spain' },
    { src: '/images/carousel/IMG_4921.JPG', category: 'nature', title: 'Mountain Views', location: 'Pyrenees, Spain' },
    { src: '/images/carousel/IMG_4927.JPG', category: 'culture', title: 'Local Traditions', location: 'Andalusia, Spain' },

    // Madrid-Lisboa Destination Images
    { src: '/images/destinations/madrid-lisboa/IMG_3565.JPG', category: 'destinations', title: 'Madrid Skyline', location: 'Madrid, Spain' },
    { src: '/images/destinations/madrid-lisboa/IMG_4335.JPG', category: 'architecture', title: 'Royal Palace', location: 'Madrid, Spain' },
    { src: '/images/destinations/madrid-lisboa/IMG_4337.JPG', category: 'culture', title: 'Plaza Mayor', location: 'Madrid, Spain' },
    { src: '/images/destinations/madrid-lisboa/IMG_4342.JPG', category: 'experiences', title: 'Local Markets', location: 'Madrid, Spain' },
    { src: '/images/destinations/madrid-lisboa/IMG_4416.JPG', category: 'architecture', title: 'Historic Center', location: 'Madrid, Spain' },
    { src: '/images/destinations/madrid-lisboa/IMG_4875.JPG', category: 'nature', title: 'Urban Parks', location: 'Madrid, Spain' },
    { src: '/images/destinations/madrid-lisboa/IMG_4884.JPG', category: 'culture', title: 'Art Museums', location: 'Madrid, Spain' },
    { src: '/images/destinations/madrid-lisboa/IMG_4890.JPG', category: 'experiences', title: 'Tapas Culture', location: 'Madrid, Spain' },
    { src: '/images/destinations/madrid-lisboa/IMG_4905.JPG', category: 'architecture', title: 'Modern Madrid', location: 'Madrid, Spain' },
    { src: '/images/destinations/madrid-lisboa/IMG_4913.JPG', category: 'nature', title: 'Retiro Park', location: 'Madrid, Spain' }
  ];

  const filteredImages = selectedCategory === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <main className="min-h-screen bg-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <nav className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-light text-white tracking-widest hover:text-gray-300 transition-colors">
              IBERO
            </Link>
            <div className="flex gap-8 items-center">
              <Link href="/gallery" className="text-white border-b-2 border-white text-sm uppercase tracking-wider">
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
        </div>
      </header>

      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl lg:text-7xl font-light text-white mb-6 tracking-wider">
              Visual Journey
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Explore the beauty of Spain and Portugal through our curated collection of authentic experiences,
              stunning landscapes, and cultural moments captured across the Iberian Peninsula.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {Object.entries(galleryCategories).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === key
                    ? 'bg-white text-black'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {label}
              </button>
            ))}
          </motion.div>

          {/* Gallery Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredImages.map((image, index) => (
              <motion.div
                key={`${image.src}-${index}`}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-900">
                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-white font-medium text-lg mb-1">{image.title}</h3>
                      <p className="text-white/80 text-sm">{image.location}</p>
                      <span className="inline-block mt-2 px-3 py-1 bg-white/20 rounded-full text-xs text-white capitalize">
                        {image.category}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            <div>
              <div className="text-4xl font-light text-white mb-2">{galleryImages.length}+</div>
              <div className="text-white/60 text-sm uppercase tracking-wider">Images</div>
            </div>
            <div>
              <div className="text-4xl font-light text-white mb-2">6</div>
              <div className="text-white/60 text-sm uppercase tracking-wider">Categories</div>
            </div>
            <div>
              <div className="text-4xl font-light text-white mb-2">2</div>
              <div className="text-white/60 text-sm uppercase tracking-wider">Countries</div>
            </div>
            <div>
              <div className="text-4xl font-light text-white mb-2">∞</div>
              <div className="text-white/60 text-sm uppercase tracking-wider">Memories</div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
