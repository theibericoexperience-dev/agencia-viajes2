"use client";
import { Suspense } from 'react';
import InteractiveMap from '../../components/InteractiveMap';
import ContinentSelector from '../../components/ContinentSelector';
import Header from '../../components/Header';

export const dynamic = 'force-dynamic';

interface Country {
  name: string;
  lat: number;
  lng: number;
  capital: string;
  highlights: string[];
  image: string;
  images?: string[];
  routes?: Route[];
}

interface Route {
  name: string;
  image: string;
  keywords: string[];
  path: string;
}

const capitalCities: Country[] = [
  {
    name: 'Spain',
    lat: 40.4168,
    lng: -3.7038,
    capital: 'Madrid',
    highlights: ['Madrid', 'Barcelona', 'Galicia'],
    image: '/images/destinations/madrid-lisboa/IMG_4335.JPG'
  },
  {
    name: 'Portugal',
    lat: 38.7223,
    lng: -9.1393,
    capital: 'Lisbon',
    highlights: ['Lisbon', 'Porto', 'Alentejo'],
    image: '/images/carousel/IMG_4008.JPG'
  },
  {
    name: 'Switzerland',
    lat: 46.9481,
    lng: 7.4474,
    capital: 'Bern',
    highlights: ['Alps', 'Lake Geneva', 'Zurich'],
    image: '/images/carousel/IMG_4326.JPG'
  },
  {
    name: 'Finland',
    lat: 60.1699,
    lng: 24.9384,
    capital: 'Helsinki',
    highlights: ['Northern Lights', 'Saunas', 'Nature'],
    image: '/images/carousel/IMG_4446.JPG'
  },
  {
    name: 'Sweden',
    lat: 59.3293,
    lng: 18.0686,
    capital: 'Stockholm',
    highlights: ['Stockholm', 'Fjords', 'Midnight Sun'],
    image: '/images/carousel/IMG_3951.JPG'
  }
];

export default function DestinationsPage() {
  const handleCountryClick = (country: Country) => {
    console.log('Country clicked:', country);
    // Aquí puedes agregar navegación o lógica adicional
  };

  return (
    <main className="min-h-screen bg-transparent">
      <Header leftLabel="Destinations" />

      <section className="h-screen">
        <Suspense fallback={<div className="h-full flex items-center justify-center">Loading map...</div>}>
          <InteractiveMap />
        </Suspense>
      </section>

      <section className="py-16 bg-transparent">
        <div className="max-w-7xl mx-auto px-8">
          <ContinentSelector
            capitalCities={capitalCities}
            onCountryClick={handleCountryClick}
          />
        </div>
      </section>

      {/* Footer kept from site global footer */}
      <footer className="py-8">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <p className="text-gray-600 text-sm">© 2025 Ibero Tours. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
