"use client";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useWishlist } from '../lib/useWishlist';
import WishlistButton from './WishlistButton';

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

interface ContinentSelectorProps {
  capitalCities: Country[];
  onCountryClick: (country: Country) => void;
}

const continents = [
  { name: 'Europe', countries: ['Spain', 'Portugal', 'Switzerland', 'Finland', 'Sweden'] },
  { name: 'Asia', countries: ['India', 'China', 'Laos', 'Vietnam', 'Thailand'] },
  { name: 'Americas', countries: ['Colombia', 'Mexico', 'Chile', 'Argentina'] },
  { name: 'Africa', countries: [] },
  { name: 'Oceania', countries: [] }
];

export default function ContinentSelector({ capitalCities, onCountryClick }: ContinentSelectorProps) {
  const [selectedContinent, setSelectedContinent] = useState<string>('Europe');
  const { isInWishlist, toggleWishlist } = useWishlist();

  const getFilteredCountries = () => {
    const continent = continents.find(c => c.name === selectedContinent);
    if (!continent) return [];

    return capitalCities.filter(country =>
      continent.countries.includes(country.name)
    );
  };

  const filteredCountries = getFilteredCountries();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Continent Selector */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-6">Explore by Continent</h2>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {continents.map((continent) => (
            <button
              key={continent.name}
              onClick={() => setSelectedContinent(continent.name)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                selectedContinent === continent.name
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                  : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'
              }`}
            >
              {continent.name}
            </button>
          ))}
        </div>
      </div>

      {/* Countries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCountries.map((country) => (
          <div
            key={country.name}
            onClick={() => onCountryClick(country)}
            className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 border border-white/20"
          >
            <div className="relative h-48">
              <Image
                src={country.image}
                alt={country.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              {/* Wishlist Button */}
              <div className="absolute top-4 right-4 z-10">
                <WishlistButton
                  itemId={country.name.toLowerCase()}
                  itemName={country.name}
                  itemImage={country.image}
                  itemLocation={country.capital}
                  isInWishlist={isInWishlist(country.name.toLowerCase())}
                  onToggle={toggleWishlist}
                  size="md"
                />
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-bold text-white mb-1">{country.name}</h3>
                <p className="text-sm text-gray-200">{country.capital}</p>
              </div>
            </div>
            <div className="p-4">
              <div className="flex flex-wrap gap-2 mb-3">
                {country.highlights.slice(0, 2).map((highlight, index) => (
                  <span
                    key={index}
                    className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
              <Link
                href={country.name === 'Spain' ? '/destinations/madrid-lisboa' : `/destinations/${country.name.toLowerCase()}`}
                className="inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 no-underline"
                onClick={(e) => e.stopPropagation()}
              >
                Explore {country.name}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredCountries.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white/70 text-lg">No destinations available for this continent yet.</p>
          <p className="text-white/50 mt-2">Check back soon for new adventures!</p>
        </div>
      )}
    </div>
  );
}