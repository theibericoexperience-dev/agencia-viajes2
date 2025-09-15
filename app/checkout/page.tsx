"use client";
import { useState } from "react";

export default function Checkout(){
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tour, setTour] = useState("");
  const [sent, setSent] = useState(false);

  async function submit(e: any){
    e.preventDefault();
    const res = await fetch(/api/orders, { method: POST, headers: { content-type: application/json }, body: JSON.stringify({ name, email, tour, payment: transfer }) });
    const data = await res.json();
    if(data.ok) setSent(true);
  }

  if(sent) return <div className="p-8 max-w-xl mx-auto"><h2 className="text-2xl font-bold">Reserva enviada</h2><p>Te contactaremos para la transferencia.</p></div>

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Reserva Tour</h2>
      <form onSubmit={submit} className="space-y-4">
        <input className="w-full p-3 border rounded" placeholder="Nombre" value={name} onChange={e=>setName(e.target.value)} required />
        <input className="w-full p-3 border rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input className="w-full p-3 border rounded" placeholder="Tour (ej: MONFRAGUE)" value={tour} onChange={e=>setTour(e.target.value)} required />
        <div className="text-sm text-gray-600">Pago: transferencia bancaria. Recibirás instrucciones por email.</div>
        <button className="px-4 py-2 bg-green-600 text-white rounded">Reservar</button>
      </form>
    </div>
  )
}
