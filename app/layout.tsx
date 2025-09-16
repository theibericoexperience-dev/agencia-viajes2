// app/layout.tsx
import React from "react";
import "./globals.css";
import CookieConsent from './components/CookieConsent';

  const title = 'Iberico Experience — Small-group tours in Spain & Portugal';
  const description = 'Bespoke small-group trips focused on local food, culture and nature across Spain and Portugal.';
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
  <meta property="og:site_name" content="Iberico Experience" />
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
          "name": "Iberico Experience",
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
      </body>
    </html>
  );
}
