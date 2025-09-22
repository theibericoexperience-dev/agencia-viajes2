"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '../../components/ui/button';

export default function PortoGaliciaPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen w-full bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center">
        <div className="text-center max-w-4xl px-6">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <h1 className="text-6xl md:text-8xl font-light tracking-wider mb-6 text-gray-800">
              PORTO
              <br />
              <span className="text-4xl md:text-6xl">&</span>
              <br />
              GALICIA
            </h1>
            <p className="text-xl md:text-2xl font-light tracking-wide opacity-80 mb-8 text-gray-700">
              Atlantic Heritage • Coming Soon
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#contact">
                <Button className="bg-gray-800 text-white hover:bg-gray-700 px-8 py-3">
                  Get Notified When Available
                </Button>
              </Link>
              <Link href="/" className="text-gray-600 hover:text-gray-800 underline underline-offset-4 py-3">
                Explore Available Destinations
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Back to destinations */}
        <div className="absolute top-8 left-8">
          <Link href="/" className="text-gray-600 hover:text-gray-800 flex items-center gap-2">
            <span>←</span> Back to Destinations
          </Link>
        </div>
      </section>

      {/* Coming Soon Details */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="text-4xl font-light mb-8 text-gray-900">
              Launching Soon
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto mb-8">
              We're crafting an extraordinary journey through Portugal's cultural capital and Spain's mystical northwest. 
              From Porto's port wine cellars to Galicia's ancient pilgrim routes, this experience will showcase 
              the authentic Atlantic heritage of the Iberian Peninsula.
            </p>
            <div className="grid md:grid-cols-2 gap-8 text-left mt-16">
              <div>
                <h3 className="text-2xl font-light mb-4 text-gray-900">What to Expect</h3>
                <ul className="text-gray-700 space-y-3">
                  <li>• Historic Porto wine tastings</li>
                  <li>• Santiago de Compostela pilgrimage</li>
                  <li>• Atlantic coastal landscapes</li>
                  <li>• Traditional Galician gastronomy</li>
                  <li>• Artisan workshops and local encounters</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-light mb-4 text-gray-900">Expected Launch</h3>
                <p className="text-gray-700 mb-4">Spring 2025</p>
                <p className="text-gray-700">
                  Be among the first to experience this carefully curated journey when it becomes available. 
                  We'll notify you as soon as bookings open.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}