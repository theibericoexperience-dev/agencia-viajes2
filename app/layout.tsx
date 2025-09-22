// app/layout.tsx
import React from "react";
import "./globals.css";
import CookieConsent from './components/CookieConsent';
import SentryInitClient from './components/SentryInitClient';
import HeroCarousel from './components/HeroCarousel';

  const title = 'Ibero Tours — Authentic travels across Spain & Portugal';
  const description = 'Authentic small-group travels focused on local food, culture and nature across Spain and Portugal.';
  const siteUrl = 'https://agencia-viajes2.vercel.app';
  const ogImage = '/_optimized/og-default-w1200.webp';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>{title}</title>
        <meta name="description" content={description} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Ibero Tours" />
  <meta property="og:url" content={siteUrl} />
  <meta property="og:image" content={`${siteUrl}${ogImage}`} />
  <link rel="canonical" href={siteUrl} />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet" />
  <link rel="preload" as="image" href="/_optimized/IMG_3241.JPG-w1600.webp" fetchPriority="high" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <link rel="icon" href="/favicon.ico" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TravelAgency",
          "name": "Ibero Tours",
          "url": siteUrl,
          "description": description,
          "sameAs": [
            "https://www.facebook.com/your-page",
            "https://www.instagram.com/your-page"
          ]
        }) }} />
      </head>
      <body>
        <a href="#content" className="skip-link">Skip to content</a>
        <header className="duotone-hero" role="banner">
          <div className="w-full h-[420px] rounded-hero overflow-hidden">
            {/* Carousel rotates hero images on the client */}
            <HeroCarousel />
          </div>
          <div className="duotone-overlay" />
          <div className="hero-inner site-container">
            <div>
              <h1 className="hero-title">Ibero Tours</h1>
              <p className="hero-sub">Bespoke small-group trips focused on local food, culture and nature across Spain and Portugal.</p>
              <div style={{marginTop: '1.25rem', display: 'flex', gap: '0.75rem'}}>
                <a href="/contact" className="btn-duotone" role="button">Book a trip</a>
                <a href="/destinations" className="btn btn-ghost" style={{marginLeft: '0'}} role="button">Explore</a>
              </div>
            </div>
            <div aria-hidden className="hidden md:block">
              <img src="/images/hero-extras/IMG_3578.JPG" alt="Decorative" className="w-64 rounded-hero shadow-lg" />
            </div>
          </div>
        </header>
        {children}
        <CookieConsent />
        <script dangerouslySetInnerHTML={{ __html: `(function(){
          function loadGA(){
            var id = window.__NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ''}';
            if(!id) return;
            if(document.querySelector('[data-ga]')) return;
            var s = document.createElement('script'); s.src = 'https://www.googletagmanager.com/gtag/js?id='+id; s.async = true; s.setAttribute('data-ga', '1'); document.head.appendChild(s);
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);} window.gtag = gtag; gtag('js', new Date()); gtag('config', id);
          }
          if(document.cookie.indexOf('cookie_consent=yes') !== -1) loadGA();
          window.addEventListener('cookie-consent-accepted', loadGA);
        })();`}} />

        <SentryInitClient />
      </body>
    </html>
  );
}
