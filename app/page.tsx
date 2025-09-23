


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
    const timer1 = setTimeout(() => setShowHeader(true), 1500); // Header appears after 1.5s
    const timer2 = setTimeout(() => setShowNavigation(true), 2500); // Navigation after 2.5s
    const timer3 = setTimeout(() => setShowScrollHint(true), 3500); // Scroll hint after 3.5s

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
    <main className="min-h-screen overflow-x-hidden">
      {/* Hero Section with 3D Parallax Effect */}
      <section className="relative h-screen w-full bg-black overflow-hidden">
        {/* Smooth Floating Background */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          animate={{
            x: [0, -4, 0, 3, 0],
            y: [0, 2, -3, 1.5, 0],
            scale: [1.02, 1.03, 1.02, 1.025, 1.02],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: [0.4, 0, 0.6, 1],
            times: [0, 0.25, 0.5, 0.75, 1],
          }}
        >
          <Image 
            src="/hero.jpg" 
            alt="Ibero Tours" 
            fill 
            className="object-cover"
            priority 
            quality={95}
            sizes="100vw"
            unoptimized
            style={{
              transform: `scale(1.05)`,
            }}
          />
          {/* Subtle depth overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
        </motion.div>

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
                className="text-2xl md:text-3xl font-light text-white tracking-widest"
                style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}
              >
                IBERO TOURS
              </h1>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero - Top Right */}
        <AnimatePresence>
          {showHeader && (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
              className="absolute top-8 right-8 z-30"
            >
              <h2 
                className="text-xl md:text-2xl font-light text-white tracking-widest"
                style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}
              >
                HERO
              </h2>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Menu - Fixed Position */}
        <AnimatePresence>
          {showNavigation && (
            <motion.nav
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              className="absolute top-32 left-1/2 transform -translate-x-1/2 z-30 mt-16"
            >
              <div className="flex gap-12 items-center justify-center">
                <Link 
                  href="/gallery" 
                  className="text-white hover:text-gray-300 transition-all duration-300 text-lg uppercase tracking-widest font-light hover:scale-105 no-underline"
                  style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)', textDecoration: 'none' }}
                >
                  Gallery
                </Link>
                <Link 
                  href="/destinations" 
                  className="text-white hover:text-gray-300 transition-all duration-300 text-lg uppercase tracking-widest font-light hover:scale-105 no-underline"
                  style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)', textDecoration: 'none' }}
                >
                  Destinations
                </Link>
                <Link 
                  href="/contact" 
                  className="text-white hover:text-gray-300 transition-all duration-300 text-lg uppercase tracking-widest font-light hover:scale-105 no-underline"
                  style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)', textDecoration: 'none' }}
                >
                  Contact
                </Link>
              </div>
            </motion.nav>
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
                <div className="w-1 h-20 bg-white mx-auto mb-6 rounded-full" style={{ boxShadow: '0 0 10px rgba(255,255,255,0.5)' }}></div>
                <p className="text-white text-base uppercase tracking-widest font-semibold mb-4"
                   style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8)', fontWeight: '600' }}>
                  Discover More
                </p>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <svg 
                  width="32" 
                  height="32" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="white" 
                  strokeWidth="3"
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

      {/* Overlay Carousel that pulls up from bottom */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-md border-t border-white/20 z-40"
        initial={{ y: "100%" }}
        animate={{ y: scrollY > 300 ? "0%" : "100%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ height: "40vh" }}
      >
        {/* Carousel Header */}
        <div className="p-6 border-b border-white/10">
          <h3 className="text-white text-xl font-light tracking-wider text-center">
            Explore Our Experiences
          </h3>
        </div>
        
        {/* Carousel Content */}
        <div className="px-6 py-4 h-full">
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
                <div key={index} className="relative w-72 h-40 flex-shrink-0">
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
      </motion.div>

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
    </main>
  );
}
