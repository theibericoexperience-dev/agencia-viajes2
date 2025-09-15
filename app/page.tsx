
"use client";
import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { MapPin, UtensilsCrossed, Mountain, ChevronDown } from 'lucide-react';
import { Button } from './components/ui/button';
import PageTransition from './components/PageTransition';
import { useToast } from './components/ui/use-toast';

function Header() {
  return (
    <header className="w-full absolute top-0 left-0 z-30 bg-transparent">
      <nav className="container mx-auto flex items-center justify-between py-8 px-6">
        <span className="text-4xl md:text-6xl font-serif font-extrabold text-white">Iberico Experience</span>
        <ul className="flex gap-6 text-white font-bold text-lg md:text-2xl">
          <li><a href="#destinations" className="hover:text-amber-300 transition">Destinations</a></li>
          <li><a href="#contact" className="hover:text-amber-300 transition">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="w-full bg-amber-700 text-white py-6 text-center mt-20">
      <div className="container mx-auto px-4">
        <p className="font-serif font-semibold">&copy; 2025 Iberico Experience. All rights reserved.</p>
<p className="mt-2 text-sm">Contact: info@ibericoexperience.com</p>
      </div>
    </footer>
  );
}

export default function Page() {
  const { toast } = useToast();
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
  const handleNotImplemented = () => {
    toast({
      title: "Coming soon!",
      description: "🚧 This feature is not implemented yet, but you can request it in your next message! 🚀"
    });
  };
  return (
    <PageTransition>
      <Head>
        <title>Iberico Experience - Personalized Experiences</title>
        <meta name="description" content="Personalized trips in small groups that connect you with the culture, gastronomy, and nature of unique places." />
      </Head>
      <div>
        <div className="relative h-screen w-full overflow-hidden">
          <img className="absolute inset-0 w-full h-full object-cover object-center" alt="Extremadura dehesa landscape at sunset" src="https://horizons-cdn.hostinger.com/efe42c9e-5779-4ac1-9f1c-fde8a0f76af8/img_4355-oYESh.JPG" />
          <Header />
          <div className="relative z-20 flex flex-col items-end justify-center h-full text-right text-white p-8 md:p-16">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight leading-tight">
                Iberico Experience
              </h1>
              <p className="mt-4 text-lg md:text-xl text-stone-200">Personalized trips in small groups that connect you with the culture, gastronomy, and nature of unique places.</p>
              <Button onClick={handleNotImplemented} size="lg" className="mt-8 bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold">
                Discover your next trip
              </Button>
            </motion.div>
            <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2" animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
              <ChevronDown className="h-8 w-8 text-white/70" />
            </motion.div>
          </div>
        </div>
        <section id="destinations" className="bg-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                <img className="rounded-lg shadow-xl w-full h-auto object-cover aspect-[4/3]" alt="White village in Extremadura with cobbled streets" src="https://images.unsplash.com/photo-1596969366209-2903f6c6b3e7" />
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}>
                <h2 className="text-3xl md:text-4xl font-serif font-semibold text-stone-800">
                  Extremadura & Alentejo: Treasures to discover
                </h2>
                <p className="mt-4 text-lg text-stone-600">
                  We take you to the heart of a surprising land, where history is felt in every corner and nature embraces you. From endless dehesas to medieval villages, get ready for a unique experience.
                </p>
                <Button variant="link" className="mt-4 text-amber-600 font-bold p-0 text-lg">
                  Learn more about our destinations →
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
        <section id="contact" className="bg-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-stone-800">Contact</h2>
              <p className="mt-4 text-lg text-stone-600">Questions? Write to us and we will help you plan your ideal trip.</p>
              <form className="mt-8 flex flex-col gap-4 items-center bg-white p-8 rounded-lg shadow-lg">
                <input type="text" placeholder="Name" className="border border-stone-300 p-3 rounded w-full max-w-md focus:outline-none focus:ring-2 focus:ring-amber-500" />
                <input type="email" placeholder="Email" className="border border-stone-300 p-3 rounded w-full max-w-md focus:outline-none focus:ring-2 focus:ring-amber-500" />
                <textarea placeholder="Message" className="border border-stone-300 p-3 rounded w-full max-w-md focus:outline-none focus:ring-2 focus:ring-amber-500" rows={4}></textarea>
                <Button type="submit" className="bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold w-full max-w-md">Send</Button>
              </form>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </PageTransition>
  );
}
