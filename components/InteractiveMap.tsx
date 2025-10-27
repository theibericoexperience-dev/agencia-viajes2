"use client";
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useWishlist } from '../lib/useWishlist';
import WishlistButton from './WishlistButton';
import { geoMercator, geoPath } from 'd3-geo';

interface Destination {
  id: string;
  name: string;
  country: string;
  coordinates: [number, number]; // [x, y] percentage on map
  image: string;
  description: string;
  highlights: string[];
  href: string;
  price?: string;
}

const destinations: Destination[] = [
  // España
  {
    id: 'madrid',
    name: 'Madrid',
    country: 'Spain',
    coordinates: [45, 35],
    image: '/images/destinations/madrid-lisboa/IMG_4335.JPG',
    description: 'La capital española combina historia, arte y modernidad en una ciudad vibrante llena de museos, parques y una gastronomía excepcional.',
    highlights: ['Museo del Prado', 'Parque del Retiro', 'Plaza Mayor', 'Gastronomía madrileña'],
    href: '/destinations/madrid-lisboa',
    price: 'Desde 150€'
  },
  {
    id: 'barcelona',
    name: 'Barcelona',
    country: 'Spain',
    coordinates: [42, 42],
    image: '/images/carousel/IMG_4326.JPG',
    description: 'Arquitectura modernista, playas mediterráneas y una escena cultural vibrante hacen de Barcelona un destino inolvidable.',
    highlights: ['Sagrada Familia', 'Park Güell', 'Las Ramblas', 'Barrio Gótico'],
    href: '/destinations/barcelona-bordeaux',
    price: 'Desde 180€'
  },
  {
    id: 'galicia',
    name: 'Galicia',
    country: 'Spain',
    coordinates: [35, 25],
    image: '/images/carousel/IMG_4008.JPG',
    description: 'Costa atlántica salvaje, pueblos pintorescos y una gastronomía única con el mejor marisco del mundo.',
    highlights: ['Rías Altas y Bajas', 'Catedral de Santiago', 'Paseo de la Senda', 'Mariscos gallegos'],
    href: '/destinations/porto-galicia',
    price: 'Desde 120€'
  },

  // Portugal
  {
    id: 'lisboa',
    name: 'Lisboa',
    country: 'Portugal',
    coordinates: [32, 38],
    image: '/images/destinations/madrid-lisboa/IMG_4335.JPG',
    description: 'La ciudad de las siete colinas ofrece una mezcla perfecta de historia, cultura y modernidad junto al río Tajo.',
    highlights: ['Torre de Belém', 'Alfama', 'Jerónimos', 'Tranvías históricos'],
    href: '/destinations/madrid-lisboa',
    price: 'Desde 140€'
  },
  {
    id: 'porto',
    name: 'Porto',
    country: 'Portugal',
    coordinates: [30, 32],
    image: '/images/carousel/IMG_4008.JPG',
    description: 'Ciudad vinícola por excelencia, con sus puentes icónicos, arquitectura histórica y el famoso vino de Oporto.',
    highlights: ['Río Duero', 'Puente Dom Luís I', 'Catedral de Porto', 'Vino de Oporto'],
    href: '/destinations/porto-galicia',
    price: 'Desde 130€'
  },

  // Francia
  {
    id: 'bordeaux',
    name: 'Burdeos',
    country: 'France',
    coordinates: [38, 40],
    image: '/images/carousel/IMG_4326.JPG',
    description: 'Capital mundial del vino, con arquitectura impresionante y una escena gastronómica de clase mundial.',
    highlights: ['Viñedos de Burdeos', 'Place de la Bourse', 'Cité du Vin', 'Arquitectura Haussmann'],
    href: '/destinations/barcelona-bordeaux',
    price: 'Desde 200€'
  },

  // Asia
  {
    id: 'southeast-asia',
    name: 'Sudeste Asiático',
    country: 'Asia',
    coordinates: [75, 55],
    image: '/images/carousel/IMG_4446.JPG',
    description: 'Aventura tropical con culturas milenarias, playas paradisíacas y experiencias inolvidables.',
    highlights: ['Templos antiguos', 'Playas tropicales', 'Mercados locales', 'Cocina exótica'],
    href: '/destinations/southeast-asia',
    price: 'Desde 250€'
  }
];

interface InteractiveMapProps {
  visibleDestinationIds?: string[];
  openDestinationId?: string | null;
}

export default function InteractiveMap({ visibleDestinationIds = [], openDestinationId = null }: InteractiveMapProps) {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [hoveredDestination, setHoveredDestination] = useState<Destination | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomCenter, setZoomCenter] = useState<[number, number]>([50, 50]);
  const searchParams = useSearchParams();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [landPaths, setLandPaths] = useState<string[]>([]);
  const [clipY, setClipY] = useState<number | null>(null);
  const mapContainerRef = useState<any>(null);
  const [modalPos, setModalPos] = useState<{ left: number; top: number } | null>(null);
  const [anchorPos, setAnchorPos] = useState<{ x: number; y: number } | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const modal = searchParams?.get('modal');
    if (modal) {
      const destination = destinations.find(d => d.country.toLowerCase() === modal);
      if (destination) {
        setSelectedDestination(destination);
        setZoomCenter(destination.coordinates);
        setIsZoomed(true);
      }
    }
  }, [searchParams]);

  // when parent requests opening a destination via id, open it
  useEffect(() => {
    if (!openDestinationId) return;
    const dest = destinations.find(d => d.id === openDestinationId);
    if (dest) {
      // trigger click behavior
      setSelectedDestination(dest);
      setZoomCenter(dest.coordinates);
      setIsZoomed(true);
      // compute anchor pos similarly to click
      try {
        const container = document.querySelector('.map-frame') || document.querySelector('.interactive-map-container');
        if (container) {
          const rect = (container as HTMLElement).getBoundingClientRect();
          const x = rect.left + (rect.width * dest.coordinates[0]) / 100;
          const y = rect.top + (rect.height * dest.coordinates[1]) / 100;
          setAnchorPos({ x, y });
          setModalPos(null);
        }
      } catch (err) {
        // ignore
      }
    }
  }, [openDestinationId]);

  // Load precomputed SVG path strings for lands (generated via scripts/generate-continents.js)
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/continents-paths.json');
        if (!res.ok) return;
        const paths: string[] = await res.json();
        if (mounted) setLandPaths(paths || []);
      } catch (err) {
        console.error('Failed to load continents-paths.json', err);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // load metadata (clipY)
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/continents-metadata.json');
        if (!res.ok) return;
        const meta = await res.json();
        if (mounted && meta?.clipY) setClipY(meta.clipY);
      } catch (err) {
        console.error('Failed to load continents-metadata.json', err);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const handleDestinationClick = (destination: Destination) => {
    setSelectedDestination(destination);
    setZoomCenter(destination.coordinates);
    setIsZoomed(true);
    // compute modal pixel position relative to viewport using container
    try {
      const container = document.querySelector('.map-frame') || document.querySelector('.interactive-map-container');
      if (container) {
        const rect = (container as HTMLElement).getBoundingClientRect();
        const x = rect.left + (rect.width * destination.coordinates[0]) / 100;
        const y = rect.top + (rect.height * destination.coordinates[1]) / 100;
        // store anchor coords and clear modalPos until we measure the modal
        setAnchorPos({ x, y });
        setModalPos(null);
      } else {
        setAnchorPos(null);
        setModalPos(null);
      }
    } catch (err) {
      setModalPos(null);
    }
  };

  // when modal is mounted, measure it and adjust position to avoid viewport overflow
  useEffect(() => {
    if (!selectedDestination || !anchorPos) return;
    const el = modalRef.current;
    if (!el) return;

    const margin = 12; // px
    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // prefer above the anchor; if not enough space, place below
    let top = anchorPos.y - height - 12;
    const placeAbove = top >= margin;
    if (!placeAbove) {
      top = anchorPos.y + 12; // below anchor
    }

    // clamp top so modal stays fully within viewport vertically
    const maxTop = window.innerHeight - margin - height;
    if (top < margin) top = margin;
    if (top > maxTop) top = Math.max(margin, maxTop);

    // center horizontally on anchor, but clamp so modal stays within viewport margins (we'll center via translateX)
    const minCenter = margin + width / 2;
    const maxCenter = window.innerWidth - margin - width / 2;
    let centerX = Math.min(Math.max(anchorPos.x, minCenter), maxCenter);

    setModalPos({ left: centerX, top });
  }, [selectedDestination, anchorPos]);

  const handleCloseModal = () => {
    setSelectedDestination(null);
    setIsZoomed(false);
    setZoomCenter([50, 50]);
    setModalPos(null);
  };

  const handleZoomToggle = () => {
    setIsZoomed(!isZoomed);
    if (!isZoomed && selectedDestination) {
      setZoomCenter(selectedDestination.coordinates);
    } else {
      setZoomCenter([50, 50]);
    }
  };

  return (
  <section className="relative w-screen left-1/2 -translate-x-1/2 bg-transparent overflow-hidden pt-[22.5rem] lg:pt-[27rem] interactive-map-container">

      {/* Map Container: centered responsive framed map inside the full-bleed section */}
  <div className="relative w-full h-full px-0">
  <div className="mx-auto w-[90%] sm:w-[720px] md:w-[900px] lg:w-[1000px] max-w-full aspect-[5/3] relative rounded-md overflow-hidden border border-white/20 map-frame">
          <div className="absolute inset-0 overflow-hidden">
            {/* SVG map: oceans left transparent, lands filled black */}
            {/* load metadata to get clipY */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <clipPath id="clip-south">
                  {/* default to full if metadata not loaded */}
                  {clipY ? <rect x="0" y="0" width="1000" height={clipY} /> : <rect x="0" y="0" width="1000" height="600" />}
                </clipPath>
              </defs>
              <g clipPath="url(#clip-south)" fill="#000" stroke="none">
                {landPaths.map((d, i) => (
                  <path key={i} d={d} />
                ))}
              </g>
            </svg>
          </div>

          <div className="absolute inset-0">
            {/* Destination Markers (positioned by percentage coords) */}
            <AnimatePresence>
              {destinations.map((destination, index) => (
                <motion.div
                  key={destination.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: hoveredDestination?.id === destination.id ? 1.2 : 1 }}
                  transition={{ delay: index * 0.05 }}
                  style={{ left: `${destination.coordinates[0]}%`, top: `${destination.coordinates[1]}%` }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => handleDestinationClick(destination)}
                  onMouseEnter={() => setHoveredDestination(destination)}
                  onMouseLeave={() => setHoveredDestination(null)}
                >
                  <div className="relative">
                    <div className="w-5 h-5 bg-white rounded-full shadow-lg border-2 border-blue-400" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

  {/* Destination Modal */}
      <AnimatePresence>
        {selectedDestination && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 p-4 bg-black/60 backdrop-blur-sm"
            onClick={handleCloseModal}
          >
            {/* modal box: positioned near marker when modalPos available */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={modalPos ? { position: 'absolute', left: modalPos.left, top: modalPos.top, transform: 'translate(-50%, 0)' } as any : undefined}
              className={`relative max-w-4xl w-full max-h-[90vh] overflow-hidden bg-white rounded-3xl shadow-2xl ${modalPos ? '' : 'mx-auto my-8'}`}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              ref={modalRef}
            >
              {/* Modal Header */}
              <div className="relative h-64 md:h-80">
                <Image
                  src={selectedDestination.image}
                  alt={selectedDestination.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="absolute bottom-6 left-6 text-white">
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">{selectedDestination.name}</h2>
                  <p className="text-lg opacity-90">{selectedDestination.country}</p>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">Sobre este destino</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {selectedDestination.description}
                    </p>

                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Lo que incluye:</h4>
                    <ul className="space-y-2 mb-6">
                      {selectedDestination.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-center text-gray-600">
                          <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col justify-between">
                    <div>
                      <div className="bg-blue-50 rounded-xl p-6 mb-6">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600 mb-2">
                            {selectedDestination.price}
                          </div>
                          <p className="text-gray-600">por persona</p>
                        </div>
                      </div>

                      <div className="space-y-3 text-sm text-gray-600">
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Transporte incluido
                        </div>
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Alojamiento premium
                        </div>
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Guía local experto
                        </div>
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Seguro de viaje
                        </div>
                      </div>
                    </div>

                    <Link
                      href={selectedDestination.href}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 text-center shadow-lg"
                    >
                      Explorar este destino
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}