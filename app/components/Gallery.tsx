import React from "react";

export default function Gallery(){
  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6">Galería</h2>
        <p className="text-gray-600 mb-8">Álbumes y enlaces a tours. Añade tus imágenes en <code>public/images</code>.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map(i => (
            <a key={i} className="block rounded-lg overflow-hidden shadow hover:scale-[1.01] transition" href="#">
              <div className="aspect-[4/3] bg-gray-200 flex items-center justify-center text-gray-400">Album {i}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
