"use client";
import { useState, useEffect } from "react";
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  const [scrollY, setScrollY] = useState(0);
  const [showSidebar, setShowSidebar] = useState(false);

  const carouselImages = [
    '/images/carousel/IMG_3951.JPG',
    '/images/carousel/IMG_4008.JPG',
    '/images/carousel/IMG_4015.JPG',
    '/images/carousel/IMG_4326.JPG',
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  return (
    <>
      {/* Hero Background - Fixed initially, then becomes scrollable */}
      <div 
        className={scrollY > 400 ? "absolute top-0 w-full h-screen z-0" : "fixed inset-0 w-full h-screen z-0"}
        style={{
          backgroundImage: 'url(/hero.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Header with Menu - Always visible */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-6 bg-black/30 backdrop-blur-sm">
        <div className="flex items-center">
          <h1 
            className="text-2xl md:text-3xl font-bold text-white tracking-wider"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}
          >
            IBERO TOURS
          </h1>
        </div>
        
        {/* Menu Button */}
        <button 
          onClick={() => setShowSidebar(!showSidebar)}
          className="flex flex-col space-y-1 p-2 hover:bg-white/10 rounded-md transition-colors z-50"
        >
          <span className="w-6 h-0.5 bg-white rounded-full"></span>
          <span className="w-6 h-0.5 bg-white rounded-full"></span>
          <span className="w-6 h-0.5 bg-white rounded-full"></span>
        </button>
      </header>

      {/* Sidebar Menu */}
      {showSidebar && (
        <div className="fixed top-0 right-0 h-full w-80 bg-black/95 backdrop-blur-md z-60 border-l border-white/20 transition-transform duration-300 ease-in-out">
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-white">Menú</h2>
              <button 
                onClick={() => setShowSidebar(false)}
                className="text-white text-2xl hover:bg-white/10 rounded-full w-8 h-8 flex items-center justify-center"
              >
                ×
              </button>
            </div>
            
            <nav className="space-y-4">
              <Link href="/destinations" className="block text-white/80 hover:text-white text-lg py-2 border-b border-white/10">
                Destinos
              </Link>
              <Link href="/gallery" className="block text-white/80 hover:text-white text-lg py-2 border-b border-white/10">
                Galería
              </Link>
              <Link href="/contact" className="block text-white/80 hover:text-white text-lg py-2 border-b border-white/10">
                Contacto
              </Link>
            </nav>
          </div>
        </div>
      )}



      {/* Scroll Down Invitation */}
      {scrollY < 100 && (
        <div className="fixed bottom-12 left-1/2 transform -translate-x-1/2 z-30">
          <div className="text-center">
            <p className="text-white text-sm uppercase tracking-widest font-medium mb-3"
               style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8)', fontWeight: '500' }}>
              Scroll Down
            </p>
            <div>
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
            </div>
          </div>
        </div>
      )}



      {/* Carousel - Appears on scroll and covers hero bottom */}
      <div 
        className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md z-40"
        style={{
          height: '40vh',
          transform: scrollY > 150 ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.6s ease-out'
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
          <div className="flex gap-6 h-full animate-scroll">
            {carouselImages.map((image, index) => (
              <div key={index} className="relative w-96 h-48 flex-shrink-0 group cursor-pointer">
                <Image
                  src={image}
                  alt={`Experience ${index + 1}`}
                  fill
                  className="object-cover rounded-lg transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 rounded-lg group-hover:bg-black/10 transition-colors"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-medium text-lg">Destino {index + 1}</h4>
                  <p className="text-sm text-white/80">Experiencia auténtica</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="relative z-10">
        {/* Hero view with space for carousel to appear */}
        <div className="h-screen bg-transparent"></div>
        
        {/* Extra space for smooth scroll transition */}
        <div className="h-96 bg-transparent"></div>
        
        {/* Carousel covers hero, then normal scroll starts */}
        <section className="py-20 bg-gray-900 relative z-60 min-h-screen">
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