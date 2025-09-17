import { NextResponse } from 'next/server';
import { initSentry, captureException } from '../../../lib/sentry';

export async function GET() {
  initSentry();

  try {
    // Intentionally throw to validate Sentry server-side reporting
    throw new Error('Sentry test error from server route');
  } catch (err: any) {
    const eventId = captureException(err) || null;
    return NextResponse.json({ ok: false, error: err?.message || String(err), error_id: eventId }, { status: 500 });
  }
}
import { NextResponse } from 'next/server';
import { initSentry, captureException } from '../../../lib/sentry';

export async function GET() {
  initSentry();

  try {
    // Intentionally throw to validate Sentry server-side reporting
    throw new Error('Sentry test error from server route');
  } catch (err: any) {
    const eventId = captureException(err) || null;
    return NextResponse.json({ ok: false, error: err?.message || String(err), error_id: eventId }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { initSentry, captureException } from '../../../lib/sentry';

export async function GET() {
  // Intentionally throw an error to validate Sentry server-side reporting
  const diag: Record<string, any> = { errors: [] };
  try {
    throw new Error(Sentry
import { NextResponse } from 'next/server';
import { initSentry, captureException } from '../../../lib/sentry';

export async function GET() {
  initSentry();

  try {
    // Intentionally throw to validate Sentry server-side reporting
    throw new Error('Sentry test error from server route');
  } catch (err: any) {
    const eventId = captureException(err) || null;
    return NextResponse.json({ ok: false, error: err?.message || String(err), error_id: eventId }, { status: 500 });
  }
}
import { NextResponse } from next/server;
import { initSentry, captureException } from ../../../lib/sentry;

export async function GET() {
  // Intentionally throw an error to validate Sentry server-side reporting
  const diag: Record<string, any> = { errors: [] };
  try {
    throw new Error(Sentry
