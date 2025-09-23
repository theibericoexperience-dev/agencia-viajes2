"use client";
import { useState, useEffect, useRef } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Page() {
  const [scrollY, setScrollY] = useState(0);
  const [showHeader, setShowHeader] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowHeader(true), 800);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer1);
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
            style={{ minWidth: '180px' }}
          >
            <nav className="space-y-3">
              <Link
                href="/contact"
                className="block text-black hover:text-gray-700 transition-colors text-sm font-light tracking-wide"
                style={{ textShadow: '0 1px 5px rgba(255,255,255,0.6)' }}
                onClick={() => setShowSidebar(false)}
              >
                Contacto
              </Link>
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