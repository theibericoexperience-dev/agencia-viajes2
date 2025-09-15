


"use client";
export default function Page() {
  return (
    <main className="relative min-h-screen w-full flex flex-col justify-start items-center overflow-hidden">
      {/* Hero Image Background */}
      <div className="absolute inset-0 w-full h-full -z-10">
        <img
          src="/hero-landscape.jpg"
          alt="Panoramic landscape with group of travelers"
          className="object-cover w-full h-full"
          draggable="false"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent" />
      </div>

      {/* Transparent Top Bar Header */}
      <header className="w-full flex items-center justify-between px-8 py-6 bg-transparent backdrop-blur-md fixed top-0 left-0 z-20">
        <h1 className="text-3xl font-bold text-white drop-shadow-lg tracking-tight">Iberico Experience</h1>
        <nav className="flex gap-8">
          <a href="#destinations" className="text-white font-medium hover:underline">Destinations</a>
          <a href="#culture" className="text-white font-medium hover:underline">Culture</a>
          <a href="#gastronomy" className="text-white font-medium hover:underline">Gastronomy</a>
          <a href="#nature" className="text-white font-medium hover:underline">Nature</a>
          <a href="#testimonials" className="text-white font-medium hover:underline">Testimonials</a>
          <a href="#contact" className="text-white font-medium hover:underline">Contact</a>
        </nav>
      </header>

      {/* Hero Section Overlay */}
      <section className="flex flex-col items-center justify-center w-full pt-40 pb-16 px-4">
        <div className="bg-white/80 rounded-xl shadow-2xl p-10 max-w-2xl w-full text-center backdrop-blur-md">
          <h2 className="text-5xl font-extrabold text-amber-700 mb-6 drop-shadow">Discover Iberico Experience</h2>
          <p className="text-lg text-gray-700 mb-8">Personalized trips in small groups that connect you with the culture, gastronomy, and nature of unique places in Spain and Portugal.</p>
          <a href="#destinations" className="inline-block px-8 py-3 bg-amber-600 text-white rounded-full font-semibold text-lg hover:bg-amber-700 transition">Start your journey</a>
        </div>
      </section>

      {/* Destinations Section */}
      <section id="destinations" className="w-full max-w-6xl mx-auto py-20 px-4">
        <h3 className="text-4xl font-bold text-amber-700 mb-8 text-center">Featured Destinations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Example destination cards with image spaces */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
            <div className="h-56 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">Destination Image</span>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <h4 className="text-2xl font-semibold text-amber-700 mb-2">Extremadura</h4>
              <p className="text-gray-600 mb-4">Explore the wild beauty and rich history of Spain's hidden gem.</p>
              <a href="#" className="text-amber-600 font-medium hover:underline">Learn more</a>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
            <div className="h-56 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">Destination Image</span>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <h4 className="text-2xl font-semibold text-amber-700 mb-2">Alentejo</h4>
              <p className="text-gray-600 mb-4">Discover rolling hills, vineyards, and authentic Portuguese charm.</p>
              <a href="#" className="text-amber-600 font-medium hover:underline">Learn more</a>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
            <div className="h-56 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">Destination Image</span>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <h4 className="text-2xl font-semibold text-amber-700 mb-2">Sierra de Gata</h4>
              <p className="text-gray-600 mb-4">Experience nature, hiking, and picturesque villages in a tranquil setting.</p>
              <a href="#" className="text-amber-600 font-medium hover:underline">Learn more</a>
            </div>
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section id="culture" className="w-full max-w-6xl mx-auto py-20 px-4">
        <h3 className="text-4xl font-bold text-amber-700 mb-8 text-center">Local Culture</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
            <div className="h-56 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">Culture Image</span>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <h4 className="text-2xl font-semibold text-amber-700 mb-2">Traditions & Towns</h4>
              <p className="text-gray-600">Immerse yourself in the traditions and life of charming towns.</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
            <div className="h-56 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">Culture Image</span>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <h4 className="text-2xl font-semibold text-amber-700 mb-2">Festivals & Events</h4>
              <p className="text-gray-600">Experience local festivals, music, and vibrant celebrations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gastronomy Section */}
      <section id="gastronomy" className="w-full max-w-6xl mx-auto py-20 px-4">
        <h3 className="text-4xl font-bold text-amber-700 mb-8 text-center">Authentic Gastronomy</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
            <div className="h-56 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">Gastronomy Image</span>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <h4 className="text-2xl font-semibold text-amber-700 mb-2">Local Products</h4>
              <p className="text-gray-600">Taste local products and dishes that tell stories.</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
            <div className="h-56 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">Gastronomy Image</span>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <h4 className="text-2xl font-semibold text-amber-700 mb-2">Signature Dishes</h4>
              <p className="text-gray-600">Enjoy authentic flavors and culinary experiences.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Nature Section */}
      <section id="nature" className="w-full max-w-6xl mx-auto py-20 px-4">
        <h3 className="text-4xl font-bold text-amber-700 mb-8 text-center">Pure Nature</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
            <div className="h-56 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">Nature Image</span>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <h4 className="text-2xl font-semibold text-amber-700 mb-2">Landscapes</h4>
              <p className="text-gray-600">Explore unique landscapes like the Extremadura dehesa and Alentejo.</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
            <div className="h-56 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">Nature Image</span>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <h4 className="text-2xl font-semibold text-amber-700 mb-2">Wildlife & Hiking</h4>
              <p className="text-gray-600">Discover nature trails, wildlife, and outdoor adventures.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="w-full max-w-4xl mx-auto py-20 px-4">
        <h3 className="text-4xl font-bold text-amber-700 mb-8 text-center">Testimonials</h3>
        <div className="space-y-8">
          <blockquote className="bg-white rounded-xl shadow p-6 text-lg text-gray-700 italic">
            “An unforgettable experience! The attention to detail and the local guides made our trip unique.”<br />
            <span className="block mt-2 text-right text-amber-700 font-semibold">Ana G.</span>
          </blockquote>
          <blockquote className="bg-white rounded-xl shadow p-6 text-lg text-gray-700 italic">
            “The gastronomy and landscapes were spectacular. Highly recommended for small groups.”<br />
            <span className="block mt-2 text-right text-amber-700 font-semibold">Carlos M.</span>
          </blockquote>
          <blockquote className="bg-white rounded-xl shadow p-6 text-lg text-gray-700 italic">
            “We felt truly immersed in the culture. Iberico Experience exceeded our expectations.”<br />
            <span className="block mt-2 text-right text-amber-700 font-semibold">Lucía P.</span>
          </blockquote>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full max-w-4xl mx-auto py-20 px-4">
        <h3 className="text-4xl font-bold text-amber-700 mb-8 text-center">Contact</h3>
        <form className="bg-white rounded-xl shadow-xl p-8 flex flex-col gap-4">
          <div className="flex gap-4">
            <input type="text" placeholder="Name" className="flex-1 px-4 py-2 rounded border border-gray-300" />
            <input type="email" placeholder="Email" className="flex-1 px-4 py-2 rounded border border-gray-300" />
          </div>
          <textarea placeholder="Message" className="w-full px-4 py-2 rounded border border-gray-300" rows={4} />
          <button type="submit" className="self-end px-8 py-2 bg-amber-600 text-white rounded-full font-semibold hover:bg-amber-700 transition">Send</button>
        </form>
        <footer className="mt-12 text-center text-gray-500">
          <p>© 2025 Iberico Experience</p>
          <p>info@ibericoexperience.com</p>
        </footer>
      </section>
    </main>
  );
}
