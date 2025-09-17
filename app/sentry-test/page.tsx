"use client";
import React from 'react';
import { Button } from '../components/ui/button';

export default function SentryTestPage() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Sentry Test</h1>
      <p>This page intentionally throws in a button click to test Sentry client captures.</p>
      <Button onClick={() => { (window as any).myUndefinedFunction(); }}>
        Trigger client error
      </Button>
    </main>
  );
}
