"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Header from '../components/Header';

export default function Page() {
  const [selectedTour, setSelectedTour] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const tourTypes = [
    {
      id: 'cultural',
      title: 'Cultural Discovery',
      description: 'Immerse yourself in the rich heritage and traditions of Spain and Portugal',
      image: '/web-images/tour/dia 2/IMG_3582.JPG',
      duration: '7-10 days',
      highlights: ['Historic cities', 'Local festivals', 'Traditional cuisine'],
      price: 'From €2,850'
    },
    {
      id: 'nature',
      title: 'Natural Landscapes',
      description: 'Explore breathtaking landscapes from mountains to coastal wonders',
      image: '/web-images/tour/dia 2/IMG_3597.JPG',
      duration: '5-8 days',
      highlights: ['Mountain hiking', 'Coastal drives', 'Wildlife encounters'],
      price: 'From €1,950'
    },
    {
      id: 'gastronomic',
      title: 'Culinary Journey',
      description: 'Discover the authentic flavors and wine traditions of Iberia',
      image: '/web-images/comida/DSC_0014.JPG',
      duration: '6-9 days',
      highlights: ['Wine tasting', 'Cooking classes', 'Local markets'],
      price: 'From €2,450'
    },
    {
      id: 'coastal',
      title: 'Coastal Adventure',
      description: 'Experience the stunning Mediterranean and Atlantic coastlines',
      image: '/web-images/tour/dia 2/IMG_3653.JPG',
      duration: '8-12 days',
      highlights: ['Beach hopping', 'Boat excursions', 'Seafood dining'],
      price: 'From €3,200'
    }
  ];

  const featuredDestinations = [
    {
      name: 'Barcelona',
      description: 'Modernista architecture meets Mediterranean charm',
      image: '/web-images/tour/dia 2/IMG_3582.JPG',
      link: '/destinations/barcelona-bordeaux'
    },
    {
      name: 'Madrid',
      description: 'The vibrant heart of Spanish culture and art',
      image: '/web-images/tour/dia 2/IMG_3597.JPG',
      link: '/destinations/madrid-lisboa'
    },
    {
      name: 'Porto',
      description: 'Historic port wine traditions and Douro Valley',
      image: '/web-images/comida/DSC_0014.JPG',
      link: '/destinations/porto-galicia'
    },
    {
      name: 'Lisbon',
      description: 'Seven hills of history and Atlantic breezes',
      image: '/web-images/tour/dia 2/IMG_3653.JPG',
      link: '/destinations/madrid-lisboa'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Mitchell',
      location: 'New York, USA',
      text: 'An unforgettable journey through the authentic heart of Iberia. Every moment was carefully curated.',
      rating: 5
    },
    {
      name: 'Marcus Rodriguez',
      location: 'Barcelona, Spain',
      text: 'The attention to detail and genuine local connections made this trip truly special.',
      rating: 5
    },
    {
      name: 'Emma Thompson',
      location: 'London, UK',
      text: 'Beyond expectations. The cultural immersion and natural beauty were perfectly balanced.',
      rating: 5
    }
  ];

  const handleTourSelect = (tourId: string) => {
    setSelectedTour(tourId);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setSelectedTour(null);
      setEmail('');
    }, 3000);
  };

  return (
    <>
      <Header />

      {/* Hero Section - Video Background Style */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.jpg"
            alt="Iberian Landscape"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        </div>
      </section>

      {/* Featured Destinations - Nuba Style */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6">
              Featured Destinations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover the authentic essence of Spain and Portugal through our carefully
              selected destinations, each offering unique experiences and hidden treasures.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredDestinations.map((destination, index) => (
              <Link
                key={index}
                href={destination.link}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500">
                  <div className="aspect-[3/4] relative">
                    <Image
                      src={destination.image}
                      alt={destination.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-light mb-2">{destination.name}</h3>
                      <p className="text-white/90 text-sm leading-relaxed">
                        {destination.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Experiences Section - Nuba Style */}
      <section id="experiences" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6">
              Signature Experiences
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Each experience is meticulously designed to reveal the authentic essence
              of Spain and Portugal, connecting you with local communities and hidden gems.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 mb-20">
            {tourTypes.map((tour, index) => (
              <div
                key={tour.id}
                className="group cursor-pointer"
                onClick={() => handleTourSelect(tour.id)}
              >
                <div className="relative overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all duration-500">
                  <div className="aspect-[16/10] relative">
                    <Image
                      src={tour.image}
                      alt={tour.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-3xl font-light mb-2">{tour.title}</h3>
                          <p className="text-white/90 text-lg leading-relaxed max-w-md">
                            {tour.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-yellow-300 mb-1">{tour.price}</div>
                          <div className="text-white/70 text-sm">{tour.duration}</div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {tour.highlights.map((highlight, idx) => (
                          <span
                            key={idx}
                            className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-3 py-1 text-sm rounded-full"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="bg-gray-50 rounded-2xl p-12 text-center">
            <h3 className="text-3xl font-light text-gray-900 mb-4">
              Stay Connected with Iberia
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Be the first to know about exclusive experiences, insider tips, and special offers
              for your authentic Iberian journey.
            </p>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitted}
                  className="bg-black text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitted ? 'Subscribed!' : 'Subscribe'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6">
              What Our Travelers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Real experiences from real travelers who have discovered the authentic heart of Iberia.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-600 text-sm">{testimonial.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}