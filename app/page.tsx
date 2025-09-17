


"use client";
import { useState, useEffect } from "react";
import Image from 'next/image';
import Header from './components/Header';
import { Button } from './components/ui/button';
import { motion } from 'framer-motion';

export default function Page() {
  const [status, setStatus] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // enable parallax on mount
  useParallax();

  const listVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } }
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
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
    <main id="content" className="relative min-h-screen w-full flex flex-col justify-start items-center overflow-hidden bg-gradient-to-b from-black/50 to-black/70">
      {/* Background image */}
      <div className="fixed inset-0 w-full h-full -z-10" aria-hidden>
        <div className="absolute inset-0 -z-10">
            <div className="relative w-full h-full">
            <Image src="/_optimized/IMG_3241.JPG-w1600.webp" alt="Iberico Experience landscape" fill className="object-cover" priority={true} quality={75} sizes="100vw" draggable={false} />
          </div>
        </div>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Header */}
      <Header />

      {/* Hero CTA (minimal — header holds main hero) */}
      <section className="w-full flex items-center justify-center pt-20 pb-4 px-4">
        <div className="max-w-3xl w-full text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">Discover Iberico Experience</h2>
          <p className="text-white/90 mb-4">Small-group bespoke trips connecting you with local culture, gastronomy and nature in Spain & Portugal.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button variant="duotone" className="w-full sm:w-auto">Gallery</Button>
            <a href="/destinations" className="w-full sm:w-auto text-center px-5 py-2 border border-white/20 text-white rounded-full font-semibold hover:bg-white/5">Destinations</a>
            <a href="#booking" className="w-full sm:w-auto text-center px-5 py-2 bg-emerald-600 text-white rounded-full font-semibold hover:bg-emerald-700">Request Booking</a>
          </div>
        </div>
      </section>

      {/* Gallery Teaser — Image-first alternating sections */}
      <section id="gallery-teaser" className="w-full py-8 px-0">
        <h2 className="sr-only">Gallery</h2>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={listVariants} className="">
        {[
          { id: 1, title: 'Small groups', img: '/images/hero-extras/IMG_3578.JPG', overlay: 'magenta' },
          { id: 2, title: 'Local food', img: '/images/hero-extras/IMG_3582.JPG', overlay: 'cyan' },
          { id: 3, title: 'Coastal hikes', img: '/images/hero-extras/IMG_3604.JPG', overlay: 'magenta' },
        ].map((s, i) => (
          <motion.a key={s.id} href="/gallery" variants={itemVariant} className={`block section-image-first ${i % 2 === 0 ? 'section-odd' : 'section-even'} full-bleed`} aria-label={s.title}>
            <div className="section-image-inner parallax" data-parallax="0.25">
              <div className="bg-img" style={{position:'absolute', inset:0}}>
                <Image src={s.img} alt={s.title} fill className="object-cover" priority={false} sizes="100vw" />
              </div>
            </div>
            <div className={`section-content-overlay section-overlay-${s.overlay}`}>
              <div className="section-text section-text-minimal">
                <h3 className="text-2xl font-semibold mb-1">{s.title}</h3>
              </div>
            </div>
          </motion.a>
        ))}
        </motion.div>
      </section>

      {/* Destinations Teaser */}
      <section id="destinations-teaser" className="w-full max-w-5xl mx-auto py-12 px-4">
        <h2 className="text-2xl text-white font-bold mb-6">Destinations</h2>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={listVariants} className="space-y-6">
          {[{id: 'extremadura', title: 'Extremadura', img:'/images/hero-extras/IMG_3578.JPG', overlay:'magenta'}, {id:'alentejo', title:'Alentejo', img:'/images/hero-extras/IMG_3582.JPG', overlay:'cyan'}, {id:'sierradegata', title:'Sierra de Gata', img:'/images/hero-extras/IMG_3604.JPG', overlay:'magenta'}].map((d, i) => (
            <motion.a key={d.id} href={`/destinations#${d.id}`} className={`block section-image-first ${i % 2 === 0 ? 'section-odd' : 'section-even'} full-bleed`} variants={itemVariant} aria-label={d.title}>
              <div className="section-image-inner parallax" data-parallax="0.16">
                <div className="bg-img" style={{position:'absolute', inset:0}}>
                  <Image src={d.img} alt={d.title} fill className="object-cover" priority={false} sizes="100vw" />
                </div>
              </div>
              <div className={`section-content-overlay section-overlay-${d.overlay}`}>
                <div className="section-text section-text-minimal">
                  <h3 className="text-xl font-semibold mb-0">{d.title}</h3>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </section>

      {/* Booking CTA */}
      <section id="booking" className="w-full max-w-3xl mx-auto py-12 px-4">
        <h2 className="text-2xl text-white font-bold mb-4">Request a Booking</h2>
        <p className="text-white/90 mb-4">Fill the form below to request a tour. We'll contact you to confirm details and payment by bank transfer.</p>
  <form onSubmit={handleSubmit} className="bg-black/40 rounded p-6 grid grid-cols-1 gap-3 backdrop-blur-sm" aria-describedby="booking-status">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className="flex flex-col">
              <span className="text-sm font-medium text-gray-700">Full name</span>
              <input name="name" required aria-required="true" placeholder="Full name" className="px-3 py-2 rounded border mt-1" />
            </label>
            <label className="flex flex-col">
              <span className="text-sm font-medium text-gray-700">Email</span>
              <input name="email" type="email" required aria-required="true" placeholder="Email" className="px-3 py-2 rounded border mt-1" />
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className="flex flex-col">
              <span className="text-sm font-medium text-gray-700">Phone</span>
              <input name="phone" placeholder="Phone" aria-required="false" className="px-3 py-2 rounded border mt-1" />
            </label>
            <label className="flex flex-col">
              <span className="text-sm font-medium text-gray-700">Number of travellers</span>
              <input name="travelers" type="number" min={1} defaultValue={2} placeholder="Number of travellers" aria-required="true" className="px-3 py-2 rounded border mt-1" />
            </label>
          </div>
          <label className="flex flex-col">
            <span className="text-sm font-medium text-gray-700">Preferred date</span>
            <input name="preferred_date" type="date" className="px-3 py-2 rounded border mt-1" aria-required="false" />
          </label>
          <label className="flex flex-col">
            <span className="text-sm font-medium text-gray-700">Billing address</span>
            <input name="billing_address" placeholder="Billing address" className="px-3 py-2 rounded border mt-1" aria-required="false" />
          </label>
          <label className="flex flex-col">
            <span className="text-sm font-medium text-gray-700">Notes</span>
            <textarea name="notes" placeholder="Notes" className="px-3 py-2 rounded border mt-1" rows={4} aria-required="false" />
          </label>
          <div className="flex items-center gap-3">
            <Button type="submit" className="w-full sm:w-auto" disabled={status === 'sending'}>Send request</Button>
            <span id="booking-status" className="sr-only" aria-live="polite">
              {status === 'sending' ? 'Sending request' : status === 'sent' ? (message || "Request sent — we'll contact you soon.") : status === 'error' ? (message || 'Error sending request. Try again later.') : ''}
            </span>
            {status === 'sending' && <span className="text-sm text-gray-700" aria-hidden>Sending...</span>}
            {status === 'sent' && <span className="text-sm text-emerald-700" aria-hidden>{message || "Request sent — we'll contact you soon."}</span>}
            {status === 'error' && <span className="text-sm text-red-600" aria-hidden>{message || 'Error sending request. Try again later.'}</span>}
          </div>
        </form>
      </section>

      {/* Contact / Footer */}
      <section id="contact" className="w-full max-w-3xl mx-auto py-8 px-4">
        <h3 className="text-white font-bold mb-2">Contact</h3>
        <p className="text-white/80">Email: info@ibericoexperience.com</p>
        <p className="text-white/80">© 2025 Iberico Experience</p>
      </section>
    </main>
  );
}

  // small parallax effect for desktop: transform background layers based on scroll
  function useParallax() {
    useEffect(() => {
      if (typeof window === 'undefined') return;
      let raf = 0;
      const handlers = () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const els = document.querySelectorAll<HTMLElement>('[data-parallax]');
          const sc = window.scrollY;
          els.forEach((el) => {
            const factor = parseFloat(el.getAttribute('data-parallax') || '0.12');
            const rect = el.getBoundingClientRect();
            // compute a subtle offset based on element center relative to viewport
            const centerY = rect.top + rect.height / 2 - window.innerHeight / 2;
            const offset = Math.max(Math.min(centerY * factor * -0.02, 40), -40); // clamp
            el.style.transform = `translateY(${offset}px)`;
          });
        });
      };
      window.addEventListener('scroll', handlers, { passive: true });
      handlers();
      return () => { window.removeEventListener('scroll', handlers); cancelAnimationFrame(raf); };
    }, []);
  }
