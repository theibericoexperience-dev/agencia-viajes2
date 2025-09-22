"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '../../components/ui/button';

export default function SoutheastAsiaPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen w-full bg-gradient-to-b from-orange-50 to-orange-100 flex items-center justify-center">
        <div className="text-center max-w-4xl px-6">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <h1 className="text-6xl md:text-8xl font-light tracking-wider mb-6 text-orange-900">
              SOUTHEAST
              <br />
              ASIA
            </h1>
            <p className="text-xl md:text-2xl font-light tracking-wide opacity-80 mb-8 text-orange-800">
              Exotic Wanderings • Coming Soon
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#contact">
                <Button className="bg-orange-900 text-white hover:bg-orange-800 px-8 py-3">
                  Get Notified When Available
                </Button>
              </Link>
              <Link href="/" className="text-orange-700 hover:text-orange-900 underline underline-offset-4 py-3">
                Explore Available Destinations
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Back to destinations */}
        <div className="absolute top-8 left-8">
          <Link href="/" className="text-orange-700 hover:text-orange-900 flex items-center gap-2">
            <span>←</span> Back to Destinations
          </Link>
        </div>
      </section>

      {/* Coming Soon Details */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="text-4xl font-light mb-8 text-gray-900">
              Beyond Our Borders
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto mb-8">
              Expanding our carefully curated experiences beyond the Iberian Peninsula, we're developing 
              an exceptional Southeast Asian journey. From ancient temples to pristine beaches, 
              this adventure will showcase the diverse cultures and breathtaking landscapes of this enchanting region.
            </p>
            <div className="grid md:grid-cols-2 gap-8 text-left mt-16">
              <div>
                <h3 className="text-2xl font-light mb-4 text-gray-900">Planned Destinations</h3>
                <ul className="text-gray-700 space-y-3">
                  <li>• Thailand: Bangkok & Chiang Mai</li>
                  <li>• Vietnam: Hanoi & Ho Chi Minh City</li>
                  <li>• Cambodia: Siem Reap & Angkor</li>
                  <li>• Indonesia: Bali & Java</li>
                  <li>• Myanmar: Yangon & Bagan</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-light mb-4 text-gray-900">Unique Experiences</h3>
                <ul className="text-gray-700 space-y-3">
                  <li>• Private temple ceremonies</li>
                  <li>• Authentic cooking masterclasses</li>
                  <li>• Artisan workshop encounters</li>
                  <li>• Traditional performance shows</li>
                  <li>• Sunrise temple explorations</li>
                </ul>
              </div>
            </div>
            <div className="mt-12 text-center">
              <p className="text-gray-600">Expected Launch: Late 2025</p>
              <p className="text-gray-600 mt-2">
                Our first venture beyond Europe, crafted with the same attention to detail and cultural immersion.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}