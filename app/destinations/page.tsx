"use client";
import React from 'react';
import Header from '../../app/components/Header';

const DESTINATIONS = [
  { id: 'extremadura', name: 'Extremadura', desc: "Wild landscapes and Roman history." },
  { id: 'alentejo', name: 'Alentejo', desc: "Vineyards and slow-paced life." },
  { id: 'sierradegata', name: 'Sierra de Gata', desc: "Hiking, nature and small villages." },
];

export default function DestinationsPage() {
  return (
    <main id="content" className="min-h-screen p-8 bg-black/80 text-white">
      <Header />
      <h1 className="text-3xl font-bold mb-4">Destinations</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {DESTINATIONS.map(d => (
          <section id={d.id} key={d.id} className="bg-white/5 p-4 rounded">
            <h2 className="font-semibold text-lg">{d.name}</h2>
            <p className="text-sm mt-2 text-white/80">{d.desc}</p>
            <a href="#booking" className="text-amber-200 mt-3 inline-block">Request this tour</a>
          </section>
        ))}
      </div>
    </main>
  );
}
