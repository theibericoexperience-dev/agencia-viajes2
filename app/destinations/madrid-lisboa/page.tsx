"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../../components/ui/button';

export default function MadridLisboaPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  };

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } }
  };

  const gallery = [
    { src: '/images/destinations/madrid-lisboa/IMG_4335.JPG', alt: 'Historic architecture in Madrid' },
    { src: '/images/destinations/madrid-lisboa/IMG_4337.JPG', alt: 'Lisboa viewpoint' },
    { src: '/images/destinations/madrid-lisboa/IMG_4342.JPG', alt: 'Cultural heritage' },
    { src: '/images/destinations/madrid-lisboa/IMG_4416.JPG', alt: 'Urban landscape' },
    { src: '/images/destinations/madrid-lisboa/gastronomy/IMG_3379.JPG', alt: 'Local gastronomy' },
    { src: '/images/destinations/madrid-lisboa/gastronomy/IMG_3380.JPG', alt: 'Traditional cuisine' },
  ];

  const testimonials = [
    {
      name: 'Sarah & Michael',
      location: 'London, UK', 
      text: 'The Madrid-Lisboa experience exceeded all our expectations. From the private flamenco show in Madrid to the intimate fado performance in Lisboa, every moment was carefully curated. The local guides became friends, and the hidden restaurants they showed us were incredible.',
      image: '/images/destinations/madrid-lisboa/IMG_3565.JPG'
    },
    {
      name: 'Emma Johnson',
      location: 'Melbourne, Australia',
      text: 'What struck me most was how this journey connected two cultures so beautifully. The transition from Spanish tapas culture to Portuguese seafood traditions felt like a masterclass in Iberian heritage. The small group size made it feel exclusive and personal.',
      image: '/images/destinations/madrid-lisboa/IMG_4875.JPG'
    },
    {
      name: 'David & Claire',
      location: 'Toronto, Canada',
      text: 'We\'ve traveled extensively, but this was different. The attention to detail, from the boutique hotels to the private museum tours, showed real expertise. The photography workshop in Lisboa\'s Alfama district was an unexpected highlight.',
      image: '/images/destinations/madrid-lisboa/IMG_4884.JPG'
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen w-full">
        <Image 
          src="/images/destinations/madrid-lisboa/IMG_4335.JPG" 
          alt="Madrid & Lisboa journey" 
          fill 
          className="object-cover" 
          priority 
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 h-full flex items-center justify-center text-white">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center max-w-4xl px-6">
            <h1 className="text-6xl md:text-8xl font-light tracking-wider mb-6">
              MADRID
              <br />
              <span className="text-4xl md:text-6xl">&</span>
              <br />
              LISBOA
            </h1>
            <p className="text-xl md:text-2xl font-light tracking-wide opacity-90 mb-8">
              Two capitals, one unforgettable journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#gallery">
                <Button className="bg-white text-black hover:bg-gray-100 px-8 py-3">
                  View Gallery
                </Button>
              </Link>
              <Link href="#booking" className="text-white hover:text-gray-300 underline underline-offset-4 py-3">
                Request This Journey
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Back to destinations */}
        <div className="absolute top-8 left-8 z-20">
          <Link href="/" className="text-white hover:text-gray-300 flex items-center gap-2">
            <span>←</span> Back to Destinations
          </Link>
        </div>
      </section>

      {/* Experience Overview */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="text-4xl font-light text-center mb-12 text-gray-900">
              The Experience
            </h2>
            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <h3 className="text-2xl font-light mb-6 text-gray-900">Madrid: The Heart of Spain</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Begin your journey in Spain's vibrant capital, where royal palaces meet avant-garde art. 
                  Wander through the Prado's masterpieces, savor tapas in century-old taverns, and witness 
                  the passion of authentic flamenco in intimate venues known only to locals.
                </p>
                <ul className="text-gray-700 space-y-2">
                  <li>• Private Prado Museum tour with art historian</li>
                  <li>• Exclusive flamenco performance in historic tablao</li>
                  <li>• Guided culinary tour through Malasaña district</li>
                  <li>• Behind-the-scenes Royal Palace experience</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-light mb-6 text-gray-900">Lisboa: Poetry in Stone</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Continue to Portugal's soulful capital, where melancholic fado melodies echo through 
                  cobbled streets. Experience the warmth of Portuguese hospitality, taste the finest wines 
                  from the Douro Valley, and lose yourself in the maze-like Alfama quarter.
                </p>
                <ul className="text-gray-700 space-y-2">
                  <li>• Private fado performance in traditional casa</li>
                  <li>• Artisan workshop in authentic tile atelier</li>
                  <li>• Sunset sailing on the Tagus River</li>
                  <li>• Portuguese wine tasting with sommelier</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section id="gallery" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="text-4xl font-light text-center mb-16 text-gray-900">
              Journey Highlights
            </h2>
          </motion.div>
          
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {gallery.map((image, index) => (
              <motion.div key={index} variants={fadeInUp} className="group">
                <div className="aspect-square overflow-hidden">
                  <Image 
                    src={image.src} 
                    alt={image.alt}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="text-4xl font-light text-center mb-16 text-gray-900">
              Traveler Stories
            </h2>
          </motion.div>
          
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            variants={staggerContainer}
            className="space-y-16"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index} 
                variants={fadeInUp}
                className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'md:grid-flow-col-dense' : ''}`}
              >
                <div className={index % 2 === 1 ? 'md:col-start-2' : ''}>
                  <div className="aspect-[4/3] overflow-hidden">
                    <Image 
                      src={testimonial.image} 
                      alt={`${testimonial.name} experience`}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className={index % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}>
                  <blockquote className="text-xl text-gray-700 leading-relaxed mb-6 italic">
                    "{testimonial.text}"
                  </blockquote>
                  <div>
                    <p className="font-medium text-gray-900">{testimonial.name}</p>
                    <p className="text-gray-600">{testimonial.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Booking CTA */}
      <section id="booking" className="bg-gray-900 text-white py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="text-4xl font-light mb-8">
              Ready for Your Madrid & Lisboa Adventure?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              This 7-day curated experience includes luxury accommodations, private transportation, 
              all meals, and expert local guides. Limited to 8 travelers for an intimate experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#contact">
                <Button className="bg-white text-black hover:bg-gray-100 px-8 py-4 text-lg">
                  Request This Journey
                </Button>
              </Link>
              <Link href="/" className="text-white hover:text-gray-300 underline underline-offset-4 py-4">
                Explore Other Destinations
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}