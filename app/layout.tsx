// app/layout.tsx
import React from "react";
import "./globals.css";

  const title = 'Iberico Experience — Small-group tours in Spain & Portugal';
  const description = 'Bespoke small-group trips focused on local food, culture and nature across Spain and Portugal.';
  const siteUrl = 'https://agencia-viajes2.vercel.app';
  const ogImage = '/images/og-default.jpg';

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
      </body>
    </html>
  );
}
