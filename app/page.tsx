


"use client";
import { useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
import Header from './components/Header';
import { Button } from './components/ui/button';
import { motion } from 'framer-motion';

export default function Page() {
  const [status, setStatus] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const destinations = [
    {
      id: 'porto-galicia',
      name: 'Porto & Galicia',
      subtitle: 'Atlantic Heritage',
      image: null, // Placeholder for future content
      description: 'Discovering northern treasures',
      available: false
    },
    {
      id: 'madrid-lisboa',
      name: 'Madrid & Lisboa',
      subtitle: 'Iberian Capitals',
      image: '/images/destinations/madrid-lisboa/IMG_4335.JPG',
      description: 'Where tradition meets modernity',
      available: true
    },
    {
      id: 'barcelona-bordeaux',
      name: 'Barcelona & Bordeaux',
      subtitle: 'Mediterranean to Atlantic',
      image: null, // Placeholder for future content
      description: 'From Catalan culture to French elegance',
      available: false
    },
    {
      id: 'southeast-asia',
      name: 'Southeast Asia',
      subtitle: 'Exotic Wanderings',
      image: null, // Placeholder for future content
      description: 'Temples, beaches, and vibrant cultures',
      available: false
    }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  };

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form) as any;
    const data = Object.fromEntries(fd);

    // client validation
    if (!data.name || !data.email || !data.travelers) {
      setStatus('error');
      setMessage('Please fill name, email and number of travellers.');
      // focus first missing field
      if (!data.name) (form.querySelector('[name="name"]') as HTMLElement | null)?.focus();
      else if (!data.email) (form.querySelector('[name="email"]') as HTMLElement | null)?.focus();
      else if (!data.travelers) (form.querySelector('[name="travelers"]') as HTMLElement | null)?.focus();
      return;
    }

    setStatus("sending");
    setMessage(null);
    try {
      // send flat fields expected by server: name,email,phone,travelers,preferred_date,billing_address,notes
      const payload = {
        type: 'booking',
        createdAt: new Date().toISOString(),
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        travelers: Number(data.travelers || 1),
        preferred_date: data.preferred_date || null,
        billing_address: data.billing_address || null,
        notes: data.notes || null,
      };
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => null);
      if (res.ok) {
        setStatus('sent');
        setMessage('Request sent — we will contact you to confirm.');
        form.reset();
      } else {
        setStatus('error');
        setMessage(json?.error || 'Server error.');
        // show server-side error id if present
        if (json?.error_id) setMessage((m) => (m ? m + ` (id: ${json.error_id})` : `Error id: ${json.error_id}`));
      }
    } catch (err) {
      setStatus('error');
    }
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Full viewport with minimal overlay */}
      <section className="relative h-screen w-full flex items-center justify-center">
        <div className="absolute inset-0">
          <Image 
            src="/images/destinations/madrid-lisboa/IMG_4335.JPG" 
            alt="Travel experiences" 
            fill 
            className="object-cover" 
            priority 
            quality={90}
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <h1 className="text-6xl md:text-8xl font-light tracking-wider mb-6">
              IBERICO
              <br />
              <span className="font-normal">EXPERIENCE</span>
            </h1>
            <p className="text-xl md:text-2xl font-light tracking-wide opacity-90 mb-8 max-w-2xl mx-auto">
              Curated journeys through the heart of the Iberian Peninsula
            </p>
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="#destinations">
                <Button className="bg-white text-black hover:bg-gray-100 px-8 py-3 text-lg font-medium">
                  Explore Destinations
                </Button>
              </Link>
              <Link href="#contact" className="text-white hover:text-gray-300 underline underline-offset-4">
                Plan Your Journey
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section - Minimal text */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
              Beyond Luxury
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              We craft bespoke travel experiences that connect you with the authentic soul of Spain and Portugal. 
              Each journey is meticulously designed to reveal hidden treasures, local gastronomy, and cultural 
              encounters that transform the way you see the world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Destinations Grid - Photo-forward design */}
      <section id="destinations" className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="text-4xl font-light text-center mb-16 text-gray-900">Our Destinations</h2>
          </motion.div>
          
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {destinations.map((destination) => (
              <motion.div key={destination.id} variants={fadeInUp}>
                <Link href={destination.available ? `/destinations/${destination.id}` : '#'}>
                  <div className={`group relative h-96 overflow-hidden ${destination.available ? 'cursor-pointer' : 'cursor-default'}`}>
                    {destination.image ? (
                      <Image 
                        src={destination.image} 
                        alt={destination.name}
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <p className="text-gray-400 text-lg">Coming Soon</p>
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <h3 className="text-2xl font-light mb-2">{destination.name}</h3>
                      <p className="text-sm uppercase tracking-wider text-gray-300 mb-2">
                        {destination.subtitle}
                      </p>
                      <p className="text-gray-200 opacity-90">{destination.description}</p>
                      {!destination.available && (
                        <p className="text-yellow-400 text-sm mt-2">Available Soon</p>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-gray-50 py-24">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="text-4xl font-light text-center mb-16 text-gray-900">Plan Your Journey</h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input 
                      name="name" 
                      required 
                      className="w-full px-4 py-3 border border-gray-300 rounded-none focus:ring-2 focus:ring-gray-900 focus:border-transparent" 
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input 
                      name="email" 
                      type="email" 
                      required 
                      className="w-full px-4 py-3 border border-gray-300 rounded-none focus:ring-2 focus:ring-gray-900 focus:border-transparent" 
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input 
                      name="phone" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-none focus:ring-2 focus:ring-gray-900 focus:border-transparent" 
                      placeholder="+34 600 000 000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Travelers *
                    </label>
                    <input 
                      name="travelers" 
                      type="number" 
                      min={1} 
                      defaultValue={2} 
                      required 
                      className="w-full px-4 py-3 border border-gray-300 rounded-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Date
                  </label>
                  <input 
                    name="preferred_date" 
                    type="date" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tell us about your perfect journey
                  </label>
                  <textarea 
                    name="notes" 
                    rows={4} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none" 
                    placeholder="What experiences are you looking for? Any special requirements?"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={status === 'sending'}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 px-8 font-medium"
                >
                  {status === 'sending' ? 'Sending...' : 'Send Inquiry'}
                </Button>
                
                {status === 'sent' && (
                  <p className="text-green-600 text-center">{message || "Thank you! We'll be in touch soon."}</p>
                )}
                {status === 'error' && (
                  <p className="text-red-600 text-center">{message || 'Error sending message. Please try again.'}</p>
                )}
              </form>
            </motion.div>
            
            {/* Contact Information */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Get In Touch</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Ready to embark on an extraordinary journey? Our travel specialists are here 
                    to craft your perfect Iberian experience. Whether you're drawn to historic cities, 
                    culinary adventures, or hidden cultural gems, we'll design something uniquely yours.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">Email</h4>
                    <p className="text-gray-700">info@ibericoexperience.com</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900">Response Time</h4>
                    <p className="text-gray-700">Within 24 hours</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900">Languages</h4>
                    <p className="text-gray-700">English, Spanish, Portuguese</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-gray-600">© 2025 Iberico Experience. Crafted journeys through Spain & Portugal.</p>
        </div>
      </footer>
    </main>
  );
}
