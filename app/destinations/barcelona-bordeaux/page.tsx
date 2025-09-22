"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '../../components/ui/button';

export default function BarcelonaBordeauxPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen w-full bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-center max-w-4xl px-6">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <h1 className="text-6xl md:text-8xl font-light tracking-wider mb-6 text-blue-900">
              BARCELONA
              <br />
              <span className="text-4xl md:text-6xl">&</span>
              <br />
              BORDEAUX
            </h1>
            <p className="text-xl md:text-2xl font-light tracking-wide opacity-80 mb-8 text-blue-800">
              Mediterranean to Atlantic • Coming Soon
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#contact">
                <Button className="bg-blue-900 text-white hover:bg-blue-800 px-8 py-3">
                  Get Notified When Available
                </Button>
              </Link>
              <Link href="/" className="text-blue-700 hover:text-blue-900 underline underline-offset-4 py-3">
                Explore Available Destinations
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Back to destinations */}
        <div className="absolute top-8 left-8">
          <Link href="/" className="text-blue-700 hover:text-blue-900 flex items-center gap-2">
            <span>←</span> Back to Destinations
          </Link>
        </div>
      </section>

      {/* Coming Soon Details */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="text-4xl font-light mb-8 text-gray-900">
              A Journey Between Two Worlds
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto mb-8">
              From Gaudí's architectural masterpieces to the grand châteaux of Bordeaux, 
              this journey bridges Catalonian creativity with French sophistication. 
              Experience the Mediterranean joie de vivre and the refined elegance of French wine culture.
            </p>
            <div className="grid md:grid-cols-2 gap-8 text-left mt-16">
              <div>
                <h3 className="text-2xl font-light mb-4 text-gray-900">Barcelona Highlights</h3>
                <ul className="text-gray-700 space-y-3">
                  <li>• Private Sagrada Família tours</li>
                  <li>• Catalan culinary workshops</li>
                  <li>• Gothic Quarter explorations</li>
                  <li>• Contemporary art scene immersion</li>
                  <li>• Mediterranean coastal experiences</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-light mb-4 text-gray-900">Bordeaux Experiences</h3>
                <ul className="text-gray-700 space-y-3">
                  <li>• Exclusive château wine tastings</li>
                  <li>• French gastronomy masterclasses</li>
                  <li>• Historic Bordeaux architecture</li>
                  <li>• Vineyard cycling adventures</li>
                  <li>• Artisan market discoveries</li>
                </ul>
              </div>
            </div>
            <div className="mt-12 text-center">
              <p className="text-gray-600">Expected Launch: Summer 2025</p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}