import React from "react";
import Hero from "./components/Hero";
import Gallery from "./components/Gallery";

export default function Page(){
  return (
    <main>
      <Hero image="/images/iberico-hero.jpg" title="Explora con nosotros" subtitle="Viajes y tours exclusivos" />

      {/* Seamless transition: image section with overlayed translucent info box */}
      <section className="relative -mt-32 z-10">
        <picture>
          <source srcSet="/images/IMG_3241.JPG" type="image/jpeg" />
          <img src="/images/IMG_3241.png" alt="Monfragüe" className="w-full h-[60vh] object-cover object-center" />
        </picture>
        <div className="max-w-5xl mx-auto px-6 -mt-40 relative z-20">
          <div className="bg-white/70 backdrop-blur-md rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-semibold">Sobre el tour</h3>
            <p className="mt-3 text-gray-700">Información breve y clara sobre el tour. La foto predomina; el texto se muestra en un recuadro translúcido para respetar la imagen.</p>
          </div>
        </div>
      </section>

      <Gallery />
    </main>
  )
}
