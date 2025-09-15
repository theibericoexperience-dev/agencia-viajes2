


"use client";
export default function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-amber-50">
      <div className="bg-white rounded-xl shadow-xl p-10 max-w-lg w-full text-center">
        <h1 className="text-4xl font-bold text-amber-700 mb-4">Tailwind CSS is Working!</h1>
        <p className="text-gray-600 mb-6">If you see this box styled, Tailwind is correctly configured in your Next.js app.</p>
        <a href="https://tailwindcss.com" target="_blank" rel="noopener" className="inline-block px-6 py-2 bg-amber-600 text-white rounded-full font-semibold hover:bg-amber-700 transition">Learn Tailwind CSS</a>
      </div>
    </main>
  );
}
