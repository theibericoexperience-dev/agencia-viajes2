

"use client";
import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { MapPin, UtensilsCrossed, Mountain } from 'lucide-react';
import { Button } from './components/ui/button';
import PageTransition from './components/PageTransition';

function Header() {
  return (
    <header className="w-full bg-white/80 backdrop-blur-lg shadow-sm fixed top-0 left-0 z-30">
      <nav className="container mx-auto flex items-center justify-between py-6 px-4">
        <span className="text-3xl md:text-5xl font-serif font-extrabold text-gray-900">Iberico Experience</span>
        <ul className="flex gap-6 text-gray-700 font-bold text-lg md:text-xl">
          <li><a href="#destinations" className="hover:text-amber-600 transition">Destinations</a></li>
          <li><a href="#testimonials" className="hover:text-amber-600 transition">Testimonials</a></li>
          <li><a href="#contact" className="hover:text-amber-600 transition">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-white py-6 text-center mt-20">
      <div className="container mx-auto px-4">
        <p className="font-serif font-semibold">&copy; 2025 Iberico Experience</p>
        <p className="mt-2 text-sm">info@ibericoexperience.com</p>
      </div>
    </footer>
  );
}

function Feature({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center text-center gap-2 p-6">
      <div>{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mt-2">{title}</h3>
      <p className="text-gray-500 text-base">{description}</p>
    </div>
  );
}

function Testimonial({ name, text }: { name: string; text: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <p className="text-gray-700 italic">“{text}”</p>
      <span className="block mt-4 text-sm font-bold text-amber-700">{name}</span>
    </div>
  );
}

export default function Page() {
  const features = [
    {
      icon: <MapPin className="h-10 w-10 text-amber-600" />,
      title: 'Local Culture',
      description: 'Immerse yourself in the traditions and life of charming towns.'
    },
    {
      icon: <UtensilsCrossed className="h-10 w-10 text-amber-600" />,
      title: 'Authentic Gastronomy',
      description: 'Taste local products and dishes that tell stories.'
    },
    {
      icon: <Mountain className="h-10 w-10 text-amber-600" />,
      title: 'Pure Nature',
      description: 'Explore unique landscapes like the Extremadura dehesa and Alentejo.'
    }
  ];
  const testimonials = [
    {
      name: 'Ana G.',
      text: 'An unforgettable experience! The attention to detail and the local guides made our trip unique.'
    },
    {
      name: 'Carlos M.',
      text: 'The gastronomy and landscapes were spectacular. Highly recommended for small groups.'
    },
    {
      name: 'Lucía P.',
      text: 'We felt truly immersed in the culture. Iberico Experience exceeded our expectations.'
    }
  ];
  return (
    <PageTransition>
      <Head>
        <title>Iberico Experience - Unique Group Travel</title>
        <meta name="description" content="Minimalist, professional travel experiences in Spain and Portugal." />
      </Head>
      <Header />
      <main className="pt-32 pb-10 bg-gray-50 min-h-screen">
        <section className="container mx-auto px-4 text-center flex flex-col items-center justify-center gap-8">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-4">Discover Iberico Experience</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-6">Personalized trips in small groups that connect you with the culture, gastronomy, and nature of unique places in Spain and Portugal.</p>
          <Button className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-8 py-3 rounded-full text-lg shadow-md">Start your journey</Button>
        </section>
        <section className="container mx-auto px-4 py-16 grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <Feature key={i} {...f} />
          ))}
        </section>
        <section id="testimonials" className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-serif font-semibold text-gray-900 text-center mb-8">Testimonials</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <Testimonial key={i} {...t} />
            ))}
          </div>
        </section>
        <section id="contact" className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-serif font-semibold text-gray-900 text-center mb-8">Contact</h2>
          <form className="max-w-xl mx-auto flex flex-col gap-4 bg-white p-8 rounded-lg shadow-md">
            <input type="text" placeholder="Name" className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-amber-600" />
            <input type="email" placeholder="Email" className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-amber-600" />
            <textarea placeholder="Message" className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-amber-600" rows={4}></textarea>
            <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white font-bold w-full">Send</Button>
          </form>
        </section>
      </main>
      <Footer />
    </PageTransition>
  );
}
