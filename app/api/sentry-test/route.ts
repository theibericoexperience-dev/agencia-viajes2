import { NextResponse } from next/server;
import { initSentry, captureException } from ../../../lib/sentry;

export async function GET() {
  // Intentionally throw an error to validate Sentry server-side reporting
  const diag: Record<string, any> = { errors: [] };
  try {
    throw new Error(Sentry
