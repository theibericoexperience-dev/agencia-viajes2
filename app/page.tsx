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

  const carouselImages = [
    '/images/carousel/IMG_3951.JPG',
    '/images/carousel/IMG_4008.JPG',
    '/images/carousel/IMG_4015.JPG',
    '/images/carousel/IMG_4326.JPG',
    '/images/carousel/IMG_4446.JPG',
    '/images/carousel/IMG_4447.JPG',
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setShowHeader(true), 800);
    const timer2 = setTimeout(() => setShowScrollHint(true), 2000);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Hero Background - Always visible */}
      <div 
        className="fixed inset-0 w-full h-screen z-0"
        style={{
          backgroundImage: 'url(/hero.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Header Elements - High z-index */}
      <div className="fixed inset-0 z-50 pointer-events-none">
        {/* IBERO TOURS Header */}
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

        {/* Navigation Menu */}
        <AnimatePresence>
          {showHeader && (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
              className="absolute top-8 right-8 pointer-events-auto"
            >
              <nav className="flex items-center gap-6">
                <Link 
                  href="/gallery" 
                  className="text-black hover:text-gray-700 transition-all duration-300 text-sm uppercase tracking-wider font-light hover:scale-105 no-underline"
                  style={{ textShadow: '0 2px 10px rgba(255,255,255,0.8)', textDecoration: 'none' }}
                >
                  Gallery
                </Link>
                <Link 
                  href="/destinations" 
                  className="text-black hover:text-gray-700 transition-all duration-300 text-sm uppercase tracking-wider font-light hover:scale-105 no-underline"
                  style={{ textShadow: '0 2px 10px rgba(255,255,255,0.8)', textDecoration: 'none' }}
                >
                  Destinations
                </Link>
                <button
                  onClick={() => setShowSidebar(true)}
                  className="text-black hover:text-gray-700 transition-all duration-300 text-sm uppercase tracking-wider font-light hover:scale-105"
                  style={{ textShadow: '0 2px 10px rgba(255,255,255,0.8)' }}
                >
                  Menu
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Scroll Down Invitation */}
        <AnimatePresence>
          {showScrollHint && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
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

      {/* Sidebar */}
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 200, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-20 right-8 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-4 z-50"
            style={{ minWidth: '200px' }}
          >
            {/* Close button */}
            <button
              onClick={() => setShowSidebar(false)}
              className="absolute top-2 right-2 text-black hover:text-gray-700 transition-colors p-1"
              style={{ textShadow: '0 1px 5px rgba(255,255,255,0.6)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <nav className="space-y-3 mt-4">
              <Link
                href="/contact"
                className="block text-black hover:text-gray-700 transition-colors text-sm font-light tracking-wide"
                style={{ textShadow: '0 1px 5px rgba(255,255,255,0.6)' }}
                onClick={() => setShowSidebar(false)}
              >
                Contacto
              </Link>
              
              <button
                className="block text-black hover:text-gray-700 transition-colors text-sm font-light tracking-wide text-left w-full"
                style={{ textShadow: '0 1px 5px rgba(255,255,255,0.6)' }}
                onClick={() => {
                  alert('Book a Call feature coming soon!');
                  setShowSidebar(false);
                }}
              >
                Book a Call
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Carousel that slides up */}
      <div 
        className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-md border-t border-white/20 z-40"
        style={{
          height: '40vh',
          transform: scrollY > 100 ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.6s ease-out'
        }}
      >
        <div className="p-4 border-b border-white/10">
          <h3 className="text-white text-lg font-light tracking-wider text-center">
            Explore Our Experiences
          </h3>
        </div>
        
        {/* Carousel Content with Images */}
        <div className="px-4 py-3 h-full overflow-hidden">
          <motion.div
            className="flex gap-4 h-full"
            animate={{ x: [0, -1000] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ width: 'fit-content' }}
          >
            {[...carouselImages, ...carouselImages, ...carouselImages].map((image, index) => (
              <div key={index} className="relative w-64 h-32 flex-shrink-0">
                <Image
                  src={image}
                  alt={`Experience ${index + 1}`}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="relative z-10 mt-screen">
        <section className="h-screen bg-transparent"></section>
        <section className="py-32 bg-gray-900">
          <div className="max-w-4xl mx-auto px-8 text-center">
            <h2 className="text-5xl font-light text-white mb-12 tracking-wider">
              Authentic Experiences
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
              Immerse yourself in the genuine culture, gastronomy, and landscapes of the Iberian Peninsula.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}