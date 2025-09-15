import React from "react";
import Hero from "./components/Hero";
import Gallery from "./components/Gallery";

export default function Page(){
  return (
    <main>
      <Hero image="/images/hero.jpg" title="Explora con nosotros" subtitle="Viajes y tours exclusivos" />
      <section className="relative -mt-20 z-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white/80 backdrop-blur-md rounded-xl p-8 shadow-lg -translate-y-10">
            <h3 className="text-2xl font-semibold">Sobre el tour</h3>
            <p className="mt-3 text-gray-700">Información breve y clara sobre el tour. La foto predomina, el texto es transparente sobre la imagen.</p>
          </div>
        </div>
      </section>

      <Gallery />
    </main>
  )
}
