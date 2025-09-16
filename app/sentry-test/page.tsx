"use client";
import React from 'react';

export default function SentryTestPage() {
  return (
    <main style={{padding: 24}}>
      <h1>Sentry Test</h1>
      <p>This page intentionally throws in a button click to test Sentry client captures.</p>
      <button onClick={() => { /* @ts-ignore */ window.myUndefinedFunction(); }} className="btn">
        Trigger client error
      </button>
    </main>
  );
}
