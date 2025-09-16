


"use client";
import { useState } from "react";
import Header from './components/Header';

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
      return;
    }

    setStatus("sending");
    setMessage(null);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'booking', payload: data, createdAt: new Date().toISOString() }),
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
    <main className="relative min-h-screen w-full flex flex-col justify-start items-center overflow-hidden bg-gradient-to-b from-black/50 to-black/70">
      {/* Background image */}
      <div className="fixed inset-0 w-full h-full -z-10" aria-hidden>
        <picture>
          <source srcSet="/images/IMG_3241.JPG" type="image/jpeg" />
          <img src="/images/IMG_3241.JPG" alt="Iberico Experience landscape" className="object-cover w-full h-full" draggable="false" />
        </picture>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Header */}
      <Header />

      {/* Hero */}
      <section className="w-full flex items-center justify-center pt-28 pb-8 px-4">
        <div className="bg-white/90 dark:bg-black/60 rounded-xl shadow-2xl p-8 max-w-3xl w-full text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">Discover Iberico Experience</h1>
          <p className="text-gray-700 mb-6">Small-group bespoke trips connecting you with local culture, gastronomy and nature in Spain & Portugal.</p>
          <div className="flex items-center justify-center gap-4">
            <a href="/gallery" className="px-5 py-2 bg-amber-600 text-white rounded-full font-semibold hover:bg-amber-700">Gallery</a>
            <a href="/destinations" className="px-5 py-2 border border-amber-600 text-amber-200 rounded-full font-semibold hover:bg-white/10">Destinations</a>
            <a href="#booking" className="px-5 py-2 bg-emerald-600 text-white rounded-full font-semibold hover:bg-emerald-700">Request Booking</a>
          </div>
        </div>
      </section>

      {/* Gallery Teaser */}
      <section id="gallery-teaser" className="w-full max-w-5xl mx-auto py-12 px-4">
        <h2 className="text-2xl text-white font-bold mb-4">Gallery</h2>
        <p className="text-white/90 mb-6">A few moments from our trips — small groups, real experiences.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <img src="/images/IMG_3241.JPG" alt="Gallery 1" className="w-full h-36 object-cover rounded" loading="lazy" />
          <img src="/images/IMG_3241.JPG" alt="Gallery 2" className="w-full h-36 object-cover rounded" loading="lazy" />
          <img src="/images/IMG_3241.JPG" alt="Gallery 3" className="w-full h-36 object-cover rounded" loading="lazy" />
          <img src="/images/IMG_3241.JPG" alt="Gallery 4" className="w-full h-36 object-cover rounded" loading="lazy" />
        </div>
        <div className="mt-4">
          <a href="/gallery" className="text-amber-200 font-medium hover:underline">See the full gallery</a>
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
          <a href="/destinations" className="text-amber-200 font-medium hover:underline">View all destinations</a>
        </div>
      </section>

      {/* Booking CTA */}
      <section id="booking" className="w-full max-w-3xl mx-auto py-12 px-4">
        <h2 className="text-2xl text-white font-bold mb-4">Request a Booking</h2>
        <p className="text-white/90 mb-4">Fill the form below to request a tour. We'll contact you to confirm details and payment by bank transfer.</p>
        <form onSubmit={handleSubmit} className="bg-white/90 rounded p-6 grid grid-cols-1 gap-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input name="name" required placeholder="Full name" className="px-3 py-2 rounded border" />
            <input name="email" type="email" required placeholder="Email" className="px-3 py-2 rounded border" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input name="phone" placeholder="Phone" className="px-3 py-2 rounded border" />
            <input name="travelers" type="number" min={1} defaultValue={2} placeholder="Number of travellers" className="px-3 py-2 rounded border" />
          </div>
          <input name="preferredDate" type="date" className="px-3 py-2 rounded border" />
          <input name="billingAddress" placeholder="Billing address" className="px-3 py-2 rounded border" />
          <textarea name="notes" placeholder="Notes" className="px-3 py-2 rounded border" rows={4} />
          <div className="flex items-center gap-3">
            <button type="submit" className="px-4 py-2 bg-amber-600 text-white rounded">Send request</button>
            {status === 'sending' && <span className="text-sm text-gray-700">Sending...</span>}
            {status === 'sent' && <span className="text-sm text-emerald-700">{message || "Request sent — we'll contact you soon."}</span>}
            {status === 'error' && <span className="text-sm text-red-600">{message || 'Error sending request. Try again later.'}</span>}
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
