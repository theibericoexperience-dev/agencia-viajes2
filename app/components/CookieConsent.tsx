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
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded shadow text-black z-50" role="dialog" aria-live="polite">
      <div className="max-w-xs">
        <p className="text-sm">We use analytics to improve the site. By accepting you allow anonymous usage tracking. No personal data is sold.</p>
        <div className="mt-3 flex justify-end">
          <button className="px-3 py-1 mr-2" onClick={()=>setShow(false)}>Dismiss</button>
          <button className="px-3 py-1 bg-amber-600 text-white rounded" onClick={accept}>Accept</button>
        </div>
      </div>
    </div>
  );
}
