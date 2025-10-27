'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const images = [
  '/images/hero-main.JPG',
  '/images/hero-extras/IMG_3578.JPG',
  '/images/hero-extras/IMG_3582.JPG',
  '/images/hero-extras/IMG_3604.JPG',
  '/images/carousel/IMG_3582.JPG',
  '/images/carousel/IMG_3586.JPG',
  '/images/carousel/IMG_3951.JPG',
  '/images/carousel/IMG_4008.JPG',
  '/images/carousel/IMG_4015.JPG',
  '/images/carousel/IMG_4326.JPG',
  '/images/carousel/IMG_4335.JPG',
  '/images/carousel/IMG_4337.JPG',
  '/images/carousel/IMG_4342.JPG',
  '/images/carousel/IMG_4446.JPG',
  '/images/carousel/IMG_4447.JPG',
  '/images/carousel/IMG_4919.JPG',
  '/images/carousel/IMG_4921.JPG',
  '/images/carousel/IMG_4927.JPG',
  '/images/destinations/madrid-lisboa/IMG_3565.JPG',
  '/images/destinations/madrid-lisboa/IMG_4335.JPG',
  '/images/destinations/madrid-lisboa/IMG_4337.JPG',
  '/images/destinations/madrid-lisboa/IMG_4342.JPG',
  '/images/destinations/madrid-lisboa/IMG_4416.JPG',
  '/images/destinations/madrid-lisboa/IMG_4875.JPG',
  '/images/destinations/madrid-lisboa/IMG_4884.JPG',
  '/images/destinations/madrid-lisboa/IMG_4890.JPG',
  '/images/destinations/madrid-lisboa/IMG_4905.JPG',
  '/images/destinations/madrid-lisboa/IMG_4913.JPG',
  '/hero-landscape.jpg',
  '/hero.jpg',
  '/iberico-hero.jpg',
  '/IMG_3241.JPG'
];

const carouselContent = [
  {
    title: "The Art of Iberian Travel",
    subtitle: "Discover authentic experiences in Spain and Portugal with unparalleled luxury and cultural immersion",
    cta: "Start Your Journey",
    category: "Luxury Travel"
  },
  {
    title: "Mediterranean Coastlines",
    subtitle: "Explore the stunning beaches and cliffs of the Costa Brava, where turquoise waters meet rugged mountains",
    cta: "Coastal Adventures",
    category: "Nature & Adventure"
  },
  {
    title: "Historic Madrid",
    subtitle: "Wander through the vibrant streets of Spain's capital, from the Royal Palace to the bohemian Malasaña district",
    cta: "Madrid Discovery",
    category: "Cultural Heritage"
  },
  {
    title: "Barcelona's Gothic Quarter",
    subtitle: "Step back in time through the labyrinthine streets of the Barri Gòtic, where history comes alive",
    cta: "Explore Gothic Quarter",
    category: "Historic Architecture"
  },
  {
    title: "Portuguese Wine Country",
    subtitle: "Journey through the Douro Valley's terraced vineyards, tasting world-class ports and experiencing rural hospitality",
    cta: "Wine Experiences",
    category: "Gastronomy & Wine"
  },
  {
    title: "Northern Spain's Green Coast",
    subtitle: "Discover the wild beauty of Galicia's Rías Altas, where Celtic heritage meets Atlantic storms",
    cta: "Galician Adventures",
    category: "Coastal Exploration"
  },
  {
    title: "Andalusian Flamenco",
    subtitle: "Immerse yourself in the passionate rhythms of flamenco in Seville, Granada, and the heart of Andalusia",
    cta: "Flamenco Journey",
    category: "Arts & Culture"
  },
  {
    title: "Basque Culinary Excellence",
    subtitle: "Experience the pinnacle of Spanish gastronomy in San Sebastián, with Michelin-starred pintxos and txakoli wine",
    cta: "Culinary Discovery",
    category: "Fine Dining"
  },
  {
    title: "Castilian Plains & Castles",
    subtitle: "Traverse the vast plains of Castile, visiting medieval castles and discovering Spain's imperial history",
    cta: "Castilian Heritage",
    category: "Historical Tours"
  },
  {
    title: "Balearic Island Paradise",
    subtitle: "Escape to the Mediterranean's most beautiful islands, from Ibiza's vibrant culture to Menorca's tranquility",
    cta: "Island Hopping",
    category: "Island Getaways"
  },
  {
    title: "Catalan Modernisme",
    subtitle: "Marvel at Gaudí's architectural masterpieces and the genius of Barcelona's modernist movement",
    cta: "Modernist Barcelona",
    category: "Architectural Wonders"
  },
  {
    title: "Extremadura's Hidden Gems",
    subtitle: "Explore Spain's least touristy region, with prehistoric cave art and medieval monasteries",
    cta: "Hidden Spain",
    category: "Off the Beaten Path"
  },
  {
    title: "Rioja Wine Route",
    subtitle: "Follow the prestigious Rioja wine route through picturesque villages and world-renowned vineyards",
    cta: "Wine Route Tour",
    category: "Wine Tourism"
  },
  {
    title: "Canary Islands Adventure",
    subtitle: "Discover volcanic landscapes, black sand beaches, and year-round spring weather in Spain's Atlantic paradise",
    cta: "Canary Discovery",
    category: "Volcanic Islands"
  },
  {
    title: "Spanish Royal Heritage",
    subtitle: "Visit the Royal Palace of Madrid, El Escorial monastery, and other symbols of Spain's royal legacy",
    cta: "Royal Spain",
    category: "Royal History"
  },
  {
    title: "Mediterranean Gastronomy",
    subtitle: "Savor the flavors of the Mediterranean diet, from fresh seafood to olive oil tastings in Andalusia",
    cta: "Culinary Journey",
    category: "Food & Wine"
  },
  {
    title: "Pyrenees Mountain Adventures",
    subtitle: "Experience the dramatic Pyrenees mountains with hiking, skiing, and discovering ancient mountain villages",
    cta: "Mountain Exploration",
    category: "Adventure Sports"
  },
  {
    title: "Levantine Coast Charm",
    subtitle: "Discover the relaxed Mediterranean lifestyle along Spain's eastern coastline, from Valencia to Alicante",
    cta: "Levantine Discovery",
    category: "Coastal Living"
  },
  {
    title: "Spanish Colonial Legacy",
    subtitle: "Explore the architectural and cultural influences of Spain's colonial past in cities like Cádiz and Seville",
    cta: "Colonial Heritage",
    category: "Historical Legacy"
  },
  {
    title: "Northern Spain's Celtic Roots",
    subtitle: "Connect with Spain's Celtic heritage in Galicia and Asturias, with ancient hórreos and traditional festivals",
    cta: "Celtic Spain",
    category: "Cultural Heritage"
  },
  {
    title: "Spanish Moorish Heritage",
    subtitle: "Discover the beautiful legacy of Al-Andalus in the Alhambra, Mezquita, and other architectural marvels",
    cta: "Moorish Spain",
    category: "Islamic Heritage"
  },
  {
    title: "Iberian Wildlife Experiences",
    subtitle: "Observe Spain's diverse wildlife, from wolves in the north to flamingos in the south, with expert local guides",
    cta: "Wildlife Safari",
    category: "Nature Conservation"
  },
  {
    title: "Spanish Festival Culture",
    subtitle: "Immerse yourself in Spain's vibrant festival culture, from La Tomatina to the Fallas of Valencia",
    cta: "Festival Experience",
    category: "Cultural Festivals"
  },
  {
    title: "Mediterranean Wellness",
    subtitle: "Rejuvenate with Spanish wellness traditions, from thermal baths to Mediterranean diet retreats",
    cta: "Wellness Journey",
    category: "Health & Wellness"
  },
  {
    title: "Spanish Artisan Crafts",
    subtitle: "Learn about Spain's rich artisan traditions, from ceramics in Talavera to leatherwork in Córdoba",
    cta: "Artisan Discovery",
    category: "Traditional Crafts"
  },
  {
    title: "Atlantic Coastal Wonders",
    subtitle: "Explore Spain's wild Atlantic coastline, from the dramatic cliffs of the Costa da Morte to the beaches of Huelva",
    cta: "Atlantic Adventure",
    category: "Coastal Exploration"
  },
  {
    title: "Spanish Literary Heritage",
    subtitle: "Follow in the footsteps of Cervantes, Lorca, and other literary giants through Spain's cultural landscape",
    cta: "Literary Journey",
    category: "Arts & Literature"
  },
  {
    title: "Iberian Peninsula Highlights",
    subtitle: "Experience the best of both Spain and Portugal in one unforgettable journey across the Iberian Peninsula",
    cta: "Peninsula Tour",
    category: "Grand Tour"
  },
  {
    title: "Spanish Sustainable Tourism",
    subtitle: "Discover eco-friendly travel experiences that support local communities and preserve Spain's natural beauty",
    cta: "Sustainable Travel",
    category: "Eco-Tourism"
  },
  {
    title: "Mediterranean Art & Culture",
    subtitle: "Explore Spain's artistic heritage, from Picasso's Málaga to Dalí's Catalonia and Miró's Barcelona",
    cta: "Artistic Journey",
    category: "Arts & Culture"
  }
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative h-screen overflow-hidden bg-black">
      {/* Background Images with Parallax Effect */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentIndex
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-105'
            }`}
          >
            <Image
              src={image}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex items-center justify-center h-full px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          {/* Category Badge */}
          <div className="inline-block mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <span className="text-white/80 text-sm font-light tracking-wider uppercase">
              {carouselContent[currentIndex]?.category || 'Luxury Travel'}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl lg:text-7xl font-light text-white mb-6 leading-tight tracking-tight">
            {carouselContent[currentIndex]?.title || 'The Art of Iberian Travel'}
          </h1>

          {/* Subtitle */}
          <p className="text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed font-light">
            {carouselContent[currentIndex]?.subtitle || 'Discover authentic experiences in Spain and Portugal'}
          </p>

          {/* CTA Button */}
          <button className="inline-flex items-center px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group">
            <span className="mr-2">{carouselContent[currentIndex]?.cta || 'Start Your Journey'}</span>
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 group"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 group"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Progress Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {images.slice(0, 10).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex % 10
                ? 'bg-white scale-125'
                : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-1 bg-black/20">
        <div
          className="h-full bg-white transition-all duration-300 ease-linear"
          style={{ width: `${((currentIndex % images.length) / (images.length - 1)) * 100}%` }}
        ></div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 right-6 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}