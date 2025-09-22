


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
        {/* Subtle Animated Background */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          animate={{
            x: [0, -20, 0, 15, 0],
            y: [0, 10, -15, 5, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
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

        {/* Elegant Header Animation - Left Aligned */}
        <AnimatePresence>
          {showHeader && (
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute top-16 left-8 z-30"
            >
              <h1 
                className="text-6xl md:text-8xl font-light text-white tracking-widest"
                style={{
                  textShadow: '0 4px 20px rgba(0,0,0,0.5)',
                }}
              >
                IBERO TOURS
              </h1>
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

        {/* Scroll Down Invitation - Fixed Position */}
        <AnimatePresence>
          {showScrollHint && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-30"
            >
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="text-center text-white"
              >
                <div className="w-px h-20 bg-white/40 mx-auto mb-6"></div>
                <p className="text-sm uppercase tracking-widest font-light mb-4" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                  Discover More
                </p>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1"
                    className="mx-auto"
                    style={{ filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.5))' }}
                  >
                    <polyline points="6,9 12,15 18,9"></polyline>
                  </svg>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Photo Carousel with Pull Effect */}
      <motion.section 
        className="py-24 bg-black relative"
        initial={{ y: 150, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {/* Smooth transition overlay */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black to-transparent z-10" />
        
        <motion.div
          ref={carouselRef}
          className="relative overflow-hidden"
          onMouseEnter={handleCarouselMouseEnter}
          onMouseLeave={handleCarouselMouseLeave}
        >
          <motion.div
            className="flex gap-8"
            animate={{ x: [0, -1000] }}
            transition={{
              duration: 20 / carouselSpeed,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ width: 'fit-content' }}
          >
            {[...carouselImages, ...carouselImages, ...carouselImages].map((image, index) => (
              <div key={index} className="relative w-96 h-64 flex-shrink-0">
                <Image
                  src={image}
                  alt={`Experience ${index + 1}`}
                  fill
                  className="object-cover rounded"
                />
              </div>
            ))}
          </motion.div>
          
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black pointer-events-none"></div>
        </motion.div>
        
        <div className="text-center mt-16 px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-light text-white mb-8 tracking-wider"
          >
            Authentic Experiences
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-white/80 max-w-2xl mx-auto leading-relaxed"
          >
            Immerse yourself in the genuine culture, gastronomy, and landscapes of the Iberian Peninsula. 
            Every moment is carefully curated to create lasting memories.
          </motion.p>
        </div>
      </motion.section>

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
