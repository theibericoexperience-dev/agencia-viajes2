


"use client";
import { useState, useEffect, useRef } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Page() {
  const [scrollY, setScrollY] = useState(0);
  const [carouselSpeed, setCarouselSpeed] = useState(1);
  const [showHeader, setShowHeader] = useState(false);
  const [showNavigation, setShowNavigation] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const carouselImages = [
    '/images/carousel/IMG_3951.JPG',
    '/images/carousel/IMG_4008.JPG',
    '/images/carousel/IMG_4015.JPG',
    '/images/carousel/IMG_4326.JPG',
    '/images/carousel/IMG_4446.JPG',
    '/images/carousel/IMG_4447.JPG',
  ];

  const experienceVideos = [
    { src: '/images/experience-1.mp4', title: 'Authentic Experiences' },
    { src: '/images/experience-2.mp4', title: 'Cultural Immersion' },
    { src: '/images/experience-3.mp4', title: 'Historic Moments' },
  ];

  useEffect(() => {
    // Sequence of animations
    const timer1 = setTimeout(() => setShowHeader(true), 800); // Header appears after 0.8s
    const timer2 = setTimeout(() => setShowNavigation(true), 1200); // Navigation after 1.2s
    const timer3 = setTimeout(() => setShowScrollHint(true), 2000); // Scroll hint after 2s

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleCarouselMouseEnter = () => {
    setCarouselSpeed(0.1);
  };

  const handleCarouselMouseLeave = () => {
    setCarouselSpeed(1);
  };



  return (
    <>
      {/* Fixed Hero Background - Never moves, always visible */}
      <section className="fixed inset-0 w-full h-screen overflow-hidden z-10">
        <Image
          src="/hero-landscape.jpg"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />

        {/* Ibero Tours - Top Left without black background - Updated */}
        <AnimatePresence>
          {showHeader && (
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute top-8 left-8 z-30"
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

        {/* Navigation Menu - Top Right */}
        <AnimatePresence>
          {showHeader && (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
              className="absolute top-8 right-8 z-30"
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



        {/* Enhanced Scroll Down Invitation - No Background */}
        <AnimatePresence>
          {showScrollHint && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-30"
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
      </section>

      {/* Simple Sidebar Menu - No backdrop, slides from right */}
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
                  Registrarse
                </Link>
                
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
                    alert('Funcionalidad de videollamada próximamente');
                    setShowSidebar(false);
                  }}
                >
                  Reservar Videollamada
                </button>
              </nav>
            </motion.div>
        )}
      </AnimatePresence>

      {/* VectorThree Style Carousel - Slides up with scroll */}
      <div 
        className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-md border-t border-white/20 z-40"
        style={{
          height: '40vh',
          transform: scrollY > 100 ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.6s ease-out'
        }}
      >
        {/* Carousel Header */}
        <div className="p-4 border-b border-white/10">
          <h3 className="text-white text-lg font-light tracking-wider text-center">
            Explore Our Experiences
          </h3>
        </div>
        
        {/* Carousel Content */}
        <div className="px-4 py-3 h-full">
          <motion.div
            ref={carouselRef}
            className="relative overflow-hidden h-full"
            onMouseEnter={handleCarouselMouseEnter}
            onMouseLeave={handleCarouselMouseLeave}
          >
            <motion.div
              className="flex gap-6 h-full"
              animate={{ x: [0, -1000] }}
              transition={{
                duration: 20 / carouselSpeed,
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
            
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 pointer-events-none"></div>
          </motion.div>
        </div>
      </div>

      {/* Content Section to Enable Scroll */}
      <section className="py-32 bg-gray-900 relative z-20">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-light text-white mb-12 tracking-wider"
          >
            Authentic Experiences
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed mb-16"
          >
            Immerse yourself in the genuine culture, gastronomy, and landscapes of the Iberian Peninsula. 
            Every moment is carefully curated to create lasting memories.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="grid md:grid-cols-3 gap-8 mt-20"
          >
            <div className="text-center">
              <h3 className="text-xl font-light text-white mb-4">Cultural Immersion</h3>
              <p className="text-white/60">Deep connections with local traditions</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-light text-white mb-4">Culinary Excellence</h3>
              <p className="text-white/60">Authentic flavors and hidden gems</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-light text-white mb-4">Small Groups</h3>
              <p className="text-white/60">Intimate experiences, maximum 8 travelers</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-6xl mx-auto px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-light text-white text-center mb-16 tracking-wider"
          >
            Captured Moments
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {experienceVideos.map((video, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-video overflow-hidden rounded">
                  <video
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    autoPlay
                    muted
                    loop
                    playsInline
                  >
                    <source src={video.src} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                </div>
                <h3 className="text-white text-lg font-light mt-4 tracking-wide">{video.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call-to-Action */}
      <section className="py-24 bg-black">
        <div className="text-center px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-light text-white mb-8 tracking-wider"
          >
            Begin Your Journey
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/80 mb-12 max-w-xl mx-auto"
          >
            Discover the essence of the Iberian Peninsula through carefully curated experiences 
            that connect you with local culture, gastronomy, and breathtaking landscapes.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link 
              href="/contact" 
              className="inline-block border border-white/30 px-12 py-4 text-white hover:bg-white hover:text-black transition-all text-sm uppercase tracking-widest"
            >
              Start Planning
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-white/60 text-sm tracking-wider">© 2025 Ibero Tours. Authentic experiences across the Iberian Peninsula.</p>
        </div>
      </footer>

      {/* Extra content to enable scroll */}
      <div className="h-screen bg-transparent relative z-10"></div>

    </>
  );
}
