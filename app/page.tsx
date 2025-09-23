"use client";
import { useState, useEffect, useRef } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Page() {
  const [scrollY, setScrollY] = useState(0);
  const [showHeader, setShowHeader] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const [carouselSpeed, setCarouselSpeed] = useState(1);

  const carouselImages = [
    '/images/carousel/IMG_3951.JPG',
    '/images/carousel/IMG_4008.JPG',
    '/images/carousel/IMG_4015.JPG',
    '/images/carousel/IMG_4326.JPG',
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setShowHeader(true), 500);
    const timer2 = setTimeout(() => setShowScrollHint(true), 1500);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
      console.log('ScrollY:', window.scrollY); // Debug
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleCarouselMouseEnter = () => {
    setCarouselSpeed(0.2);
  };

  const handleCarouselMouseLeave = () => {
    setCarouselSpeed(1);
  };

  return (
    <>
      {/* Hero Background - Fixed initially, then moves up on scroll */}
      <div 
        className="fixed inset-0 w-full h-screen z-0"
        style={{
          backgroundImage: 'url(/hero.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transform: scrollY > 1400 ? `translateY(-${scrollY - 1400}px)` : 'translateY(0)',
          transition: 'transform 0.3s ease-out'
        }}
      />

      {/* Header Elements - Fixed initially, then moves up on scroll */}
      <div 
        className="fixed inset-0 z-50 pointer-events-none"
        style={{
          transform: scrollY > 1400 ? `translateY(-${scrollY - 1400}px)` : 'translateY(0)',
          transition: 'transform 0.3s ease-out'
        }}
      >
        {/* IBERO TOURS Header - Simple and Fixed */}
        <AnimatePresence>
          {showHeader && (
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute top-8 left-8 pointer-events-auto"
            >
              <h1 
                className="text-3xl md:text-4xl lg:text-5xl font-medium text-black tracking-widest"
                style={{ textShadow: '0 2px 10px rgba(255,255,255,0.8)' }}
              >
                IBERO TOURS
              </h1>
            </motion.div>
          )}
        </AnimatePresence>



        {/* Enhanced Scroll Down Invitation - Disappears on scroll */}
        <AnimatePresence>
          {showScrollHint && scrollY < 100 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute bottom-12 left-1/2 transform -translate-x-1/2 pointer-events-auto"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                className="text-center"
              >
                <div className="w-0.5 h-18 bg-white mx-auto mb-5 rounded-full" style={{ boxShadow: '0 0 8px rgba(255,255,255,0.4)' }}></div>
                <p className="text-white text-sm uppercase tracking-widest font-medium mb-3"
                   style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8)', fontWeight: '500' }}>
                  Discover More
                </p>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <svg 
                    width="28" 
                    height="28" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="white" 
                    strokeWidth="2.5"
                    className="mx-auto"
                    style={{ filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.6))' }}
                  >
                    <polyline points="6,9 12,15 18,9"></polyline>
                  </svg>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>



      {/* Carousel that slides up and then moves up with scroll */}
      <div 
        className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-md border-t border-white/20 z-40"
        style={{
          height: '50vh',
          transform: scrollY > 200 && scrollY <= 1400 
            ? 'translateY(0)' 
            : scrollY > 1400 
              ? `translateY(-${scrollY - 1400}px)` 
              : 'translateY(100%)',
          transition: scrollY <= 1400 ? 'transform 0.8s ease-out' : 'transform 0.3s ease-out'
        }}
      >
        <div className="p-6 border-b border-white/10">
          <h3 className="text-white text-2xl font-light tracking-wider text-center">
            Nuestros Destinos
          </h3>
          <p className="text-white/70 text-center mt-2 text-sm">
            Explora experiencias auténticas
          </p>
        </div>
        
        {/* Carousel Content with Images */}
        <div className="px-6 py-4 h-full overflow-hidden">
          <motion.div
            className="flex gap-6 h-full"
            animate={{ x: [0, -1200] }}
            transition={{
              duration: 15 / carouselSpeed,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ width: 'fit-content' }}
            onMouseEnter={handleCarouselMouseEnter}
            onMouseLeave={handleCarouselMouseLeave}
          >
            {[...carouselImages, ...carouselImages].map((image, index) => (
              <div key={index} className="relative w-96 h-48 flex-shrink-0 group cursor-pointer">
                <Image
                  src={image}
                  alt={`Experience ${index + 1}`}
                  fill
                  className="object-cover rounded-lg transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 rounded-lg group-hover:bg-black/10 transition-colors"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-medium text-lg">Destino {(index % 4) + 1}</h4>
                  <p className="text-sm text-white/80">Experiencia auténtica</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="relative z-10">
        {/* First empty screen for initial hero view */}
        <div className="h-screen bg-transparent"></div>
        
        {/* Second screen for carousel interaction */}
        <div className="h-screen bg-transparent"></div>
        
        {/* Third screen for transition to normal content */}
        <div className="h-96 bg-transparent"></div>
        
        {/* Authentic Experiences section - appears when hero moves up */}
        <section className="py-20 bg-gray-900 relative z-20 min-h-screen">
          <div className="max-w-4xl mx-auto px-8 text-center">
            <h2 className="text-4xl font-light text-white mb-8 tracking-wider">
              Authentic Experiences
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
              Immerse yourself in the genuine culture, gastronomy, and landscapes of the Iberian Peninsula.
            </p>
            
            {/* Add some content cards */}
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h4 className="text-white text-lg mb-3">Cultural Immersion</h4>
                <p className="text-white/70 text-sm">Deep connections with local traditions and customs.</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h4 className="text-white text-lg mb-3">Culinary Excellence</h4>
                <p className="text-white/70 text-sm">Authentic flavors and hidden gastronomic gems.</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h4 className="text-white text-lg mb-3">Small Groups</h4>
                <p className="text-white/70 text-sm">Intimate experiences, maximum 8 travelers.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Extra content to make it scrollable */}
        <section className="py-20 bg-black">
          <div className="max-w-4xl mx-auto px-8 text-center">
            <h3 className="text-2xl font-light text-white mb-6 tracking-wider">
              Begin Your Journey
            </h3>
            <p className="text-white/60 text-base max-w-xl mx-auto leading-relaxed mb-8">
              Discover the essence of the Iberian Peninsula through carefully curated experiences.
            </p>
            <button className="bg-white text-black px-8 py-3 rounded-lg hover:bg-gray-200 transition-colors">
              Start Planning
            </button>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="bg-gray-900 py-8">
          <div className="max-w-4xl mx-auto px-8 text-center">
            <p className="text-white/60 text-sm">© 2025 Ibero Tours. Authentic experiences across the Iberian Peninsula.</p>
          </div>
        </footer>
      </div>
    </>
  );
}