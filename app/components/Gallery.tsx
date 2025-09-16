import React, { useState } from "react";
import Image from 'next/image';
import Modal from "./Modal";

const ALBUMS = [
  { id: 'monfrague', title: 'Monfragüe', cover: '/images/IMG_3241.JPG', link: '/checkout' },
  { id: 'album-2', title: 'Tour 2', cover: '/images/iberico-hero.jpg', link: '#' },
  { id: 'album-3', title: 'Tour 3', cover: '/images/IMG_3241.JPG', link: '#' },
]

export default function Gallery(){
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<any>(null);

  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6">Galería</h2>
        <p className="text-gray-600 mb-8">Álbumes y enlaces a tours. Haz click para ver el álbum o ir a la página del tour.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {ALBUMS.map(album => (
            <article key={album.id} className="rounded-lg overflow-hidden shadow" aria-labelledby={`album-${album.id}`}>
              <button onClick={() => { setActive(album); setOpen(true); }} className="block w-full text-left" aria-haspopup="dialog">
                <div className="aspect-[4/3] bg-gray-200 relative">
                  <Image src={album.cover} alt={`Portada del álbum ${album.title}`} fill className="object-cover" sizes="(max-width: 640px) 100vw, 33vw" />
                </div>
                <div className="p-4">
                  <h3 id={`album-${album.id}`} className="font-semibold">{album.title}</h3>
                  <div className="mt-2 text-sm text-gray-500">Ver álbum · <a className="text-blue-600" href={album.link}>Ir al tour</a></div>
                </div>
              </button>
            </article>
          ))}
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        {active ? (
          <div>
            <h3 className="text-xl font-bold mb-4">{active.title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative w-full h-64 rounded overflow-hidden"><Image src={active.cover} alt={`Imagen representativa de ${active.title}`} fill className="object-cover rounded" sizes="(max-width: 768px) 100vw, 50vw" /></div>
              <div>
                <p className="text-gray-700">Álbum {active.title}. Aquí podrás colgar fotos o enlaces a galerías externas (Google Photos, albums, etc.).</p>
                <div className="mt-4">
                  <a href={active.link} className="inline-block px-4 py-2 bg-blue-600 text-white rounded">Ver tour / Reservar</a>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </Modal>
    </section>
  )
}
