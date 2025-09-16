import { NextResponse } from 'next/server';

export async function GET() {
  const base = 'https://agencia-viajes2.vercel.app';
  const pages = ['','gallery','destinations','contact'];
  const urls = pages.map(p => `${base}/${p}`.replace(/\/\/$/, '/'));
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u=>`  <url><loc>${u}</loc></url>`).join('\n')}\n</urlset>`;
  return new NextResponse(sitemap, { status: 200, headers: { 'Content-Type': 'application/xml' } });
}
