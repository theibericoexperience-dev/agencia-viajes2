import { NextResponse } from 'next/server';

export async function GET() {
  // Intentionally throw an error to validate Sentry server-side reporting
  throw new Error('Sentry test error from server route');
}
