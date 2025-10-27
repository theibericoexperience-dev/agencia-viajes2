"use client";
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../components/Header';

export default function AboutPage() {
  return (
    <>
      <Header />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/web-images/tour/dia 2/IMG_3653.JPG"
              alt="Iberian Coastline"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
            <h1 className="text-6xl lg:text-8xl font-light mb-6 tracking-wider">
              About IBERO
            </h1>
            <p className="text-xl lg:text-2xl font-light mb-12 leading-relaxed">
              Crafting authentic journeys through the Iberian Peninsula since 2020
            </p>
            <div className="w-24 h-px bg-white mx-auto mb-8" />
            <p className="text-lg font-light opacity-90">
              We believe travel should be transformative, not transactional
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-8">
                  Our Story
                </h2>
                <div className="space-y-6 text-lg text-gray-600 font-light leading-relaxed">
                  <p>
                    IBERO was born from a simple yet profound realization: the most meaningful travel
                    experiences come from genuine connections with people, places, and cultures.
                  </p>
                  <p>
                    Founded by travelers who fell in love with the Iberian Peninsula, we curate
                    journeys that go beyond sightseeing. Our approach combines deep local knowledge
                    with a commitment to sustainable, authentic travel.
                  </p>
                  <p>
                    Every itinerary is handcrafted, every experience personally vetted. We don't
                    just show you Spain and Portugal – we help you understand and connect with them.
                  </p>
                </div>
              </div>

              <div className="relative">
                <Image
                  src="/web-images/tour/dia 2/IMG_3582.JPG"
                  alt="Authentic Experience"
                  width={600}
                  height={800}
                  className="rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6">
                Our Values
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
                These principles guide every decision we make and every journey we create
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-light mb-4">Authenticity</h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  We seek out genuine experiences that reflect the true character of each destination,
                  avoiding tourist traps and commercialized attractions.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                  </svg>
                </div>
                <h3 className="text-2xl font-light mb-4">Sustainability</h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  We partner with local communities and businesses, ensuring our travel benefits
                  the places and people we visit while minimizing environmental impact.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-light mb-4">Community</h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  We foster meaningful connections between travelers and locals, creating
                  experiences that enrich both visitors and the communities they encounter.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 bg-black text-white">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-light mb-6">
                By the Numbers
              </h2>
              <p className="text-xl text-gray-400 font-light">
                Our commitment to authentic travel in numbers
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-5xl font-light mb-2">500+</div>
                <div className="text-gray-400 font-light">Happy Travelers</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-light mb-2">50+</div>
                <div className="text-gray-400 font-light">Local Partners</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-light mb-2">4</div>
                <div className="text-gray-400 font-light">Countries Served</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-light mb-2">100%</div>
                <div className="text-gray-400 font-light">Sustainable</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6">
              Ready for Your Journey?
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Join our community of discerning travelers and discover the authentic essence
              of the Iberian Peninsula through carefully curated experiences.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/booking"
                className="bg-black text-white px-12 py-4 text-lg font-light hover:bg-gray-800 transition-colors duration-300 rounded-lg"
              >
                Start Planning
              </Link>
              <Link
                href="/gallery"
                className="border border-gray-300 text-gray-900 px-12 py-4 text-lg font-light hover:bg-gray-50 transition-colors duration-300 rounded-lg"
              >
                View Gallery
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center">
              <h3 className="text-3xl font-light mb-4 tracking-wider">IBERO</h3>
              <p className="text-gray-400 font-light mb-8 max-w-md mx-auto">
                Authentic journeys through the Iberian Peninsula.
                Curated experiences for the discerning traveler.
              </p>
              <div className="flex justify-center space-x-8 text-sm text-gray-400">
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}