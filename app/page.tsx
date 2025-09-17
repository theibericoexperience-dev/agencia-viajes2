


"use client";
import { useState } from "react";
import Image from 'next/image';
import Header from './components/Header';
import { Button } from './components/ui/button';

export default function Page() {
  const [status, setStatus] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

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

      {/* Hero */}
      <section className="w-full flex items-center justify-center pt-28 pb-8 px-4">
  <div className="bg-white/90 dark:bg-black/60 rounded-xl shadow-2xl p-6 md:p-8 max-w-3xl w-full text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">Discover Iberico Experience</h1>
          <p className="text-gray-700 mb-6">Small-group bespoke trips connecting you with local culture, gastronomy and nature in Spain & Portugal.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="/gallery" className="w-full sm:w-auto text-center px-5 py-2 bg-primary-500 text-white rounded-full font-semibold hover:bg-primary-600">Gallery</a>
            <a href="/destinations" className="w-full sm:w-auto text-center px-5 py-2 border border-primary-500 text-primary-500 rounded-full font-semibold hover:bg-white/10">Destinations</a>
            <a href="#booking" className="w-full sm:w-auto text-center px-5 py-2 bg-emerald-600 text-white rounded-full font-semibold hover:bg-emerald-700">Request Booking</a>
          </div>
        </div>
      </section>

      {/* Gallery Teaser */}
      <section id="gallery-teaser" className="w-full max-w-5xl mx-auto py-12 px-4">
        <h2 className="text-2xl text-white font-bold mb-4">Gallery</h2>
        <p className="text-white/90 mb-6">A few moments from our trips — small groups, real experiences.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="relative w-full h-36 rounded overflow-hidden"><Image src="/_optimized/IMG_3241.JPG-w800.webp" alt="Gallery 1" fill className="object-cover" priority={false} quality={60} sizes="(max-width: 640px) 100vw, 25vw" /></div>
          <div className="relative w-full h-36 rounded overflow-hidden"><Image src="/_optimized/IMG_3241.JPG-w800.webp" alt="Gallery 2" fill className="object-cover" priority={false} quality={60} sizes="(max-width: 640px) 100vw, 25vw" /></div>
          <div className="relative w-full h-36 rounded overflow-hidden"><Image src="/_optimized/IMG_3241.JPG-w800.webp" alt="Gallery 3" fill className="object-cover" priority={false} quality={60} sizes="(max-width: 640px) 100vw, 25vw" /></div>
          <div className="relative w-full h-36 rounded overflow-hidden"><Image src="/_optimized/IMG_3241.JPG-w800.webp" alt="Gallery 4" fill className="object-cover" priority={false} quality={60} sizes="(max-width: 640px) 100vw, 25vw" /></div>
        </div>
        <div className="mt-4">
          <a href="/gallery" className="text-primary-300 font-medium hover:underline">See the full gallery</a>
        </div>
      </section>

      {/* Destinations Teaser */}
      <section id="destinations-teaser" className="w-full max-w-5xl mx-auto py-12 px-4">
        <h2 className="text-2xl text-white font-bold mb-4">Destinations</h2>
        <p className="text-white/90 mb-6">Hand-picked regions where we run our tours.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a href="/destinations#extremadura" className="block bg-white/10 p-4 rounded">
            <h3 className="font-semibold">Extremadura</h3>
            <p className="text-sm mt-2 text-white/80">Wild landscapes, history and traditional gastronomy.</p>
          </a>
          <a href="/destinations#alentejo" className="block bg-white/10 p-4 rounded">
            <h3 className="font-semibold">Alentejo</h3>
            <p className="text-sm mt-2 text-white/80">Rolling hills, vineyards and quiet villages.</p>
          </a>
          <a href="/destinations#sierradegata" className="block bg-white/10 p-4 rounded">
            <h3 className="font-semibold">Sierra de Gata</h3>
            <p className="text-sm mt-2 text-white/80">Hiking, nature and charming hamlets.</p>
          </a>
        </div>
        <div className="mt-4">
          <a href="/destinations" className="text-primary-300 font-medium hover:underline">View all destinations</a>
        </div>
      </section>

      {/* Booking CTA */}
      <section id="booking" className="w-full max-w-3xl mx-auto py-12 px-4">
        <h2 className="text-2xl text-white font-bold mb-4">Request a Booking</h2>
        <p className="text-white/90 mb-4">Fill the form below to request a tour. We'll contact you to confirm details and payment by bank transfer.</p>
  <form onSubmit={handleSubmit} className="bg-white/90 rounded p-6 grid grid-cols-1 gap-3" aria-describedby="booking-status">
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
