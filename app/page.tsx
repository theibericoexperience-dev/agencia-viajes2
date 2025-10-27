"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Header from '../components/Header';
import VideoSequence from '../components/VideoSequence';

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Header />
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <VideoSequence className="w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        </div>
      </section>

      {/* (Re) Discover Group Travel Section */}
      <section className="py-20 bg-[#eef4ed] relative z-60">
        <div className="max-w-5xl mx-auto px-8 text-center">
          <h2 className="text-4xl font-light text-gray-900 mb-6 tracking-wider">
            (Re) Discover Group Travel
          </h2>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed mb-8">
            Group travel reimagined — handcrafted itineraries, trusted partners, and truly personal service.
          </p>

          {/* Four cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
            <div className="bg-gray-800 p-6 rounded-lg text-left">
              <h4 className="text-white text-lg mb-3 font-semibold">Hand Crafted Itineraries</h4>
              <p className="text-white/70 text-sm">We take accountability for every detail.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg text-left">
              <h4 className="text-white text-lg mb-3 font-semibold">Trusted by 200+ global customers</h4>
              <p className="text-white/70 text-sm">From classic car tours to US High Schools.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg text-left">
              <h4 className="text-white text-lg mb-3 font-semibold">We take it personal</h4>
              <p className="text-white/70 text-sm">Your experience is our priority.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg text-left">
              <h4 className="text-white text-lg mb-3 font-semibold">Authentic providers</h4>
              <p className="text-white/70 text-sm">The opposite to what general wholesalers offer.</p>
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-2xl text-white/90 font-medium">Quality vs Quantity</h3>
          </div>
        </div>
      </section>

      {/* Begin Your Journey Section (two cards) */}
      <section className="py-20 bg-[#eef4ed]">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h3 className="text-2xl font-light text-gray-900 mb-6 tracking-wider">Begin Your Journey</h3>

          <div className="grid sm:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h4 className="text-white text-lg mb-3 font-semibold">Open Tours</h4>
              <p className="text-white/70 text-sm mb-4">2-3 week ready to sign up tours. Get to meet new friends for future adventures!</p>
              <Link href="/destinations" className="inline-block bg-white text-black px-5 py-2 rounded hover:bg-gray-200 transition-colors">Explore Open Tours</Link>
            </div>

              <div className="bg-gray-800 p-6 rounded-lg">
                <h4 className="text-white text-lg mb-3 font-semibold">On request</h4>
                <p className="text-white/70 text-sm mb-4">Choose from our destinations for a personalized proposal. From honeymoon trips to family escapes, we will provide the type of trip you are looking for!</p>
                <button onClick={() => setIsModalOpen(true)} className="inline-block bg-transparent border border-white text-white px-5 py-2 rounded hover:bg-white/5 transition-colors">On request</button>
              </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-lg p-8 max-w-sm text-center">
            <h4 className="text-xl font-semibold mb-4">Coming soon!</h4>
            <p className="text-sm text-gray-700 mb-6">On request feature will be available shortly.</p>
            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-black text-white rounded">Close</button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <p className="text-white/60 text-sm">© 2025 Ibero Tours. Authentic experiences across the Iberian Peninsula.</p>
        </div>
      </footer>
    </>
  );
}