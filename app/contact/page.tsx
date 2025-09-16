"use client";
import React, { useState } from 'react';
import Header from '../../app/components/Header';

export default function ContactPage(){
  const [status, setStatus] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    const fd = new FormData(e.currentTarget) as any;
    const data = Object.fromEntries(fd);
    if(!data.name || !data.email){
      setStatus('error'); setMessage('Please provide name and email.');
      return;
    }
    setStatus('sending'); setMessage(null);
    try{
      const payload = {
        type: 'contact',
        createdAt: new Date().toISOString(),
        name: data.name,
        email: data.email,
        message: data.message || null,
      };
      const res = await fetch('/api/orders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const json = await res.json().catch(()=>null);
      if(res.ok){ setStatus('sent'); setMessage('Thanks — we will reply soon.'); e.currentTarget.reset(); }
      else { setStatus('error'); setMessage(json?.error || 'Server error.'); if(json?.error_id) setMessage((m)=> (m? m+` (id: ${json.error_id})` : `Error id: ${json.error_id}`)); }
    }catch(err){ setStatus('error'); setMessage('Network error.'); }
  }

  return (
  <main id="content" className="min-h-screen p-8 bg-black/80 text-white">
      <Header />
      <div className="max-w-3xl mx-auto mt-24">
        <h1 className="text-3xl font-bold mb-4">Contact</h1>
        <p className="mb-6">Email us at <a className="text-amber-200" href="mailto:info@ibericoexperience.com">info@ibericoexperience.com</a> or use the form below.</p>
        <form onSubmit={handleSubmit} className="bg-white/90 p-6 rounded text-black grid gap-3">
          <label className="flex flex-col"><span className="text-sm font-medium">Name</span><input name="name" className="px-3 py-2 rounded border mt-1" required aria-required="true" /></label>
          <label className="flex flex-col"><span className="text-sm font-medium">Email</span><input name="email" type="email" className="px-3 py-2 rounded border mt-1" required aria-required="true" /></label>
          <label className="flex flex-col"><span className="text-sm font-medium">Message</span><textarea name="message" rows={5} className="px-3 py-2 rounded border mt-1" aria-required="false" /></label>
          <div className="flex items-center gap-3">
            <button type="submit" className="px-4 py-2 bg-amber-600 text-white rounded" disabled={status==='sending'}>Send</button>
            <span aria-live="polite" className="sr-only">{status==='sending' ? 'Sending' : status==='sent' ? (message||'Sent') : status==='error' ? (message||'Error') : ''}</span>
            {status==='sent' && <span className="text-emerald-700">{message}</span>}
            {status==='error' && <span className="text-red-600">{message}</span>}
          </div>
        </form>
      </div>
    </main>
  );
}
