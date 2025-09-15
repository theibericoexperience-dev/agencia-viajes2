import React from "react";

export default function Hero({ image, title, subtitle }: { image: string; title?: string; subtitle?: string; }){
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <img src={image} alt="hero" className="absolute inset-0 w-full h-full object-cover object-center" />
      <div className="absolute inset-0 bg-black/25 backdrop-blur-sm" />
      <div className="relative z-10 max-w-3xl text-center px-6">
        <h1 className="text-4xl md:text-6xl text-white font-extrabold drop-shadow-lg">{title}</h1>
        <p className="mt-4 text-lg md:text-2xl text-white/90">{subtitle}</p>
      </div>
    </section>
  )
}
