"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <main className="min-h-screen bg-black">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 p-8">
        <nav className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-light text-white tracking-widest">
            IBERO TOURISM
          </Link>
          <div className="flex gap-8 items-center">
            <Link href="/gallery" className="text-white hover:text-gray-300 transition-colors text-sm uppercase tracking-wider">
              Gallery
            </Link>
            <Link href="/destinations" className="text-white hover:text-gray-300 transition-colors text-sm uppercase tracking-wider">
              Destinations
            </Link>
            <Link href="/contact" className="text-white border-b border-white text-sm uppercase tracking-wider">
              Contact
            </Link>
          </div>
        </nav>
      </header>

      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-8">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-light text-white text-center mb-16 tracking-wider"
          >
            Contact
          </motion.h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl font-light text-white mb-8 tracking-wide">
                Get in Touch
              </h2>
              <div className="space-y-6 text-white/80">
                <div>
                  <h3 className="text-xl font-light text-white mb-2">Email</h3>
                  <p>info@iberotourism.com</p>
                </div>
                <div>
                  <h3 className="text-xl font-light text-white mb-2">Phone</h3>
                  <p>+34 123 456 789</p>
                </div>
                <div>
                  <h3 className="text-xl font-light text-white mb-2">Address</h3>
                  <p>Madrid, España</p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-transparent border-b border-white/30 text-white placeholder-white/50 py-3 focus:border-white focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-transparent border-b border-white/30 text-white placeholder-white/50 py-3 focus:border-white focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={5}
                    className="w-full bg-transparent border-b border-white/30 text-white placeholder-white/50 py-3 focus:border-white focus:outline-none transition-colors resize-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-white text-black py-3 px-6 font-light tracking-wider uppercase hover:bg-white/90 transition-colors duration-300"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
