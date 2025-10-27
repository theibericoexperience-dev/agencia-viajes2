"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

interface MediaItem {
  type: 'video' | 'image';
  src: string;
  alt?: string;
}

interface CarouselProps {
  media: MediaItem[];
  className?: string;
}

function Carousel({ media, className = '' }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + media.length) % media.length);
  };

  const currentMedia = media[currentIndex];

  // Intersection Observer to detect when carousel is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Play video when it changes and is visible
  useEffect(() => {
    if (currentMedia.type === 'video' && videoRef.current && isVisible) {
      videoRef.current.play().catch(() => {
        // Silently handle autoplay failures
      });
    }
  }, [currentIndex, currentMedia, isVisible]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden rounded-xl hover:scale-105 hover:shadow-lg transition-all duration-300 aspect-video ${className}`}>
      {currentMedia.type === 'video' ? (
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted
          loop
          playsInline
          preload="metadata"
          controls={false}
          disablePictureInPicture
        >
          <source src={currentMedia.src} type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
      ) : (
        <img
          src={currentMedia.src}
          alt={currentMedia.alt || ''}
          className="w-full h-full object-cover"
        />
      )}
      
      {/* Navigation Arrows */}
      {media.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white px-3 py-4 rounded-full transition-all duration-200 text-xl"
          >
            ‹
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white px-3 py-4 rounded-full transition-all duration-200 text-xl"
          >
            ›
          </button>
        </>
      )}

      {/* Indicators */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {media.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white scale-125' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function HistoriaPage() {
  const [isHeaderOpaque, setIsHeaderOpaque] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      // Change header to opaque when scrolled past 100px
      setIsHeaderOpaque(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-black">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 p-8 transition-all duration-300 ${
        isHeaderOpaque 
          ? 'bg-white shadow-lg backdrop-blur-lg' 
          : 'bg-transparent backdrop-blur-none'
      }`} style={isHeaderOpaque ? {} : { backgroundColor: 'transparent' }}>
        <nav className="flex justify-between items-center">
          <Link href="/" className={`text-2xl font-light tracking-widest no-underline transition-colors duration-300 ${
            isHeaderOpaque ? 'text-black' : 'text-white'
          }`}>
            IBERO TOURS
          </Link>
          <div className="flex gap-8 items-center">
            <Link href="/gallery" className={`hover:text-gray-300 transition-colors text-sm uppercase tracking-wider no-underline ${
              isHeaderOpaque ? 'text-black hover:text-gray-600' : 'text-white'
            }`}>
              Gallery
            </Link>
            <Link href="/destinations" className={`hover:text-gray-300 transition-colors text-sm uppercase tracking-wider no-underline ${
              isHeaderOpaque ? 'text-black hover:text-gray-600' : 'text-white'
            }`}>
              Destinations
            </Link>
            <Link href="/behind" className={`text-sm uppercase tracking-wider no-underline transition-colors duration-300 ${
              isHeaderOpaque ? 'text-black' : 'text-white'
            }`}>
              Behind
            </Link>
            <Link href="/contact" className={`hover:text-gray-300 transition-colors text-sm uppercase tracking-wider no-underline ${
              isHeaderOpaque ? 'text-black hover:text-gray-600' : 'text-white'
            }`}>
              Contact
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-32">
        <div className="absolute inset-0">
          <Image
            src="/hero-historia.jpg"
            alt="IBERO Historia - Haruna"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Texto y flecha sutil en el hero - Mejor integración con la imagen */}
        <div className="absolute top-1/4 right-8 text-right z-10">
          <div className="text-white max-w-sm">
          </div>
        </div>

        {/* 2021 en margen inferior */}
        <div className="absolute top-[80%] left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-white text-5xl uppercase tracking-widest font-light">
            2021
          </p>
        </div>

        {/* Elemento que rebota en margen inferior */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
          <div className="w-6 h-6 border-l-transparent border-r-transparent border-t-2 border-white transform rotate--25 animate-bounce" />
        </div>
      </section>

      {/* 2021 Section Below Hero */}
      <section className="bg-white text-black py-24 px-8">
        <div className="">
          <div className="flex items-center">
            <div className="w-1/2 flex flex-col justify-center px-16">
              <div className="space-y-6 text-gray-700 leading-relaxed text-lg text-left">
                <p>Este proyecto nace en Seúl, Corea del Sur, en junio de 2021. Su fundador, Ramiro, de origen extremeño, ha dedicado años a formarse en entornos de emprendimiento y desarrollo de equipos de alto rendimiento. Tras vivir en Seattle, Shanghái, Bilbao y Seúl, decide apostar por lo que mejor conoce y valora desde una perspectiva única: su tierra.</p>
                <p>Consciente del reconocimiento internacional de la gastronomía extremeña, surge una pregunta clave: <strong>¿por qué no poner en valor también el potencial de un turismo auténtico, sostenible y de calidad, que enriquezca a todos los agentes implicados?</strong></p>
              </div>
            </div>
            <div className="w-px bg-gray-300 mx-6"></div>
            <div className="w-1/2 flex justify-center items-center">
              <div className="relative w-3/4 overflow-hidden rounded-xl hover:scale-105 hover:shadow-lg transition-all duration-300">
                <video
                  className="w-full h-auto object-cover"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  controls={false}
                  disablePictureInPicture
                >
                  <source src="/videos/QJOU0223.mp4" type="video/mp4" />
                  Tu navegador no soporta el elemento de video.
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contenido Cronológico - Layout Alternado */}
      <div className="bg-white text-black">
        {/* AÑO 2022 Media izquierda, texto derecha (año par) */}
        <section className="py-16 px-8">
          <div className="">
            <div className="flex items-center">
              <div className="w-1/2 flex justify-center items-center">
                {/* Media - Carousel */}
                <Carousel
                  media={[
                    { type: 'video', src: '/carousel-2022-1.mp4', alt: 'Historia 2022 - White Car' },
                    { type: 'video', src: '/carousel-2022-2.mp4', alt: 'Historia 2022 - Green Car' }
                  ]}
                  className="w-4/5"
                />
              </div>
              <div className="w-px bg-gray-300 mx-6"></div>
              <div className="w-1/2 flex flex-col justify-center items-end px-16">
                <h2 className="text-5xl md:text-6xl font-light tracking-wider text-gray-800 mb-8 text-center">
                  2022
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed text-right">
                  <ul className="space-y-3">
                    <li className="text-right">
                      <span>Formación para liderar tours educativos en Europa a Estudiantes Norteamericanos</span>
                    </li>
                    <li className="text-right">
                      <span>Liderazgo de dos tours con los clubes automovilísticos Jaguar y Rolls Royce<br /> de Suiza y Reino Unido desde Santander a Cuenca.</span>
                    </li>
                    <li className="text-right">
                      <span>Liderazgo de tour educativo de Lisboa a Barcelona, rodeando la costa mediterránea</span>
                    </li>
                    <li className="text-right">
                      <span>Tour educativo de Madrid a Lisboa</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AÑO 2023 Texto izquierda, media derecha (año impar) */}
        <section className="py-16 px-8">
          <div className="">
            <div className="flex items-center">
              <div className="w-1/2 flex flex-col justify-center px-16">
                <h2 className="text-5xl md:text-6xl font-light tracking-wider text-gray-800 mb-8 text-left">
                  2023
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed text-left">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span>Colaboración con la Agencia estadounidense I, like you, Tours. Especializada en viajes a Marruecos. Se crea un viaje para dos grupos en 2024.</span>
                    </li>
                    <li className="flex items-start">
                      <span>Tour educacional en Roma, Florencia, Barcelona y Madrid.</span>
                    </li>
                    <li className="flex items-start">
                      <span>3 meses guiando diferentes tours en Laponia durante la temporada de invierno. Desde expediciones de auroras boreales en moto de nieve a rutas con raquetas por blancos paisajes, pasando por expediciones al rompehielos en Suecia.</span>
                    </li>
                    <li className="flex items-start">
                      <span>A esta aventura se une un amigo de la escuela de Ramiro, Carlos, que acaba de graduarse como farmaceútico.</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="w-px bg-gray-300 mx-6"></div>
              <div className="w-1/2 flex justify-center items-center">
                <Carousel
                  media={[
                    { type: 'image', src: '/historia-2023.jpg', alt: 'Historia 2023' }
                  ]}
                  className="w-3/5"
                />
              </div>
            </div>
          </div>
        </section>

        {/* AÑO 2024 Media izquierda, texto derecha (año par) */}
        <section className="py-16 px-8">
          <div className="">
            <div className="flex items-center">
              <div className="w-1/2 flex justify-center items-center">
                {/* Media - Carousel */}
                <Carousel media={[
                  { type: 'image', src: '/carousel-2024-1.JPG', alt: 'Historia 2024 - Howard 1' },
                  { type: 'image', src: '/historia-2024.jpg', alt: 'Historia 2024' },
                  { type: 'image', src: '/carousel-2024-2.JPG', alt: 'Historia 2024 - Howard 2' },
                  { type: 'image', src: '/carousel-2024-3.JPG', alt: 'Historia 2024 - Howard 3' },
                  { type: 'image', src: '/carousel-2024-4.JPG', alt: 'Historia 2024 - Howard 4' },
                  { type: 'image', src: '/carousel-2024-5.JPG', alt: 'Historia 2024 - Howard 5' }
                ]} />
              </div>
              <div className="w-px bg-gray-300 mx-6"></div>
              <div className="w-1/2 flex flex-col justify-center items-end px-16">
                <h2 className="text-5xl md:text-6xl font-light tracking-wider text-gray-800 mb-8 text-center">
                  2024
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed text-right">
                  <ul className="space-y-3">
                    <li className="text-right">
                      <span>Colaboración internacional con I, like you, Tours para la creación de un viaje único a medida en Marruecos.</span>
                    </li>
                    <li className="text-right">
                      <span>Desarrollo de nuevas rutas y experiencias en España, enfocadas en la sostenibilidad y el turismo responsable.</span>
                    </li>
                    <li className="text-right">
                      <span>Participación en ferias internacionales de turismo para promover la marca IBERO TOURS.</span>
                    </li>
                    <li className="text-right">
                      <span>Expansión de la red de colaboradores y proveedores en destinos clave.</span>
                    </li>
                    <li className="text-right">
                      <span>Extensiones opcionales a Lisboa y Azores posteriores al tour principal.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AÑO 2025 - Texto izquierda, media derecha (año impar) */}
        <section className="py-16 px-8">
          <div className="">
            <div className="flex items-center">
              <div className="w-1/2 flex flex-col justify-center px-16">
                <h2 className="text-5xl md:text-6xl font-light tracking-wider text-gray-800 mb-8 text-left">
                  2025
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed text-left">
                  <ul className="space-y-3">
                    <li className="text-left">
                      <span>Extensión opcional a Madrid previa al tour principal.</span>
                    </li>
                    <li className="text-left">
                      <span>Viaje educativo en Barcelona y Cataluña</span>
                    </li>
                    <li className="text-left">
                      <span>Ibero diseña y ejecuta por segundo año consecutivo la ruta Madrid - Lisboa por Extremadura y Alentejo</span>
                    </li>
                    <li className="text-left">
                      <span>Ibero comienza a desarrollar nuevos paquetes para 2026 y 2027, y valora nuevas colaboraciones dentro del mercado Europeo y Asiático</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="w-px bg-gray-300 mx-6"></div>
              <div className="w-1/2 flex justify-center items-center">
                <Carousel
                  media={[
                    { type: 'image', src: '/carousel-2025-1.JPG', alt: 'Historia 2025 - Tours 1' },
                    { type: 'image', src: '/IMG_4352.JPG', alt: 'Historia 2025' },
                    { type: 'image', src: '/carousel-2025-2.JPG', alt: 'Historia 2025 - Tours 2' },
                    { type: 'image', src: '/carousel-2025-3.JPG', alt: 'Historia 2025 - Tours 3' },
                    { type: 'image', src: '/carousel-2025-4.JPG', alt: 'Historia 2025 - Tours 4' },
                    { type: 'image', src: '/carousel-2025-5.JPG', alt: 'Historia 2025 - Tours 5' }
                  ]}
                  className="w-3/4"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">
                © 2023 IBERO TOURS. Todos los derechos reservados.
              </p>
            </div>
            <div className="flex gap-4">
              <Link href="/privacy" className="text-sm">
                Política de privacidad
              </Link>
              <Link href="/terms" className="text-sm">
                Términos y condiciones
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}