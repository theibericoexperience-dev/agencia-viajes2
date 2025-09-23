"use client";
import { useEffect, useState } from 'react';

export default function CookieConsent(){
  const [show, setShow] = useState(false);

  useEffect(()=>{
    try{ const c = document.cookie.split(';').map(s=>s.trim()).find(s=>s.startsWith('cookie_consent=')); if(!c) setShow(true); }
    catch(e){}
  },[]);

  function accept(){
    document.cookie = 'cookie_consent=yes; path=/; max-age=' + 60*60*24*365;
    setShow(false);
    // dispatch an event so layout can pick up and load analytics
    window.dispatchEvent(new Event('cookie-consent-accepted'));
  }

  if(!show) return null;
  return (
    <div className="fixed bottom-4 right-4 bg-black/80 backdrop-blur-sm p-3 rounded-lg text-white text-xs z-30 max-w-xs opacity-90" role="dialog" aria-live="polite">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs leading-tight">Analytics cookies help improve the site.</p>
        <div className="flex gap-2 shrink-0">
          <button className="text-xs underline hover:no-underline" onClick={()=>setShow(false)}>Dismiss</button>
          <button className="text-xs bg-white text-black px-2 py-1 rounded hover:bg-gray-200 transition-colors" onClick={accept}>Accept</button>
        </div>
      </div>
    </div>
  );
}
