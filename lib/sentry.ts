// Minimal no-op Sentry wrapper.
// Purpose: avoid runtime Sentry initialization errors on deployed serverless
// functions while keeping the same interface used throughout the app.

export function initSentry(): void {
  // Intentionally empty — Sentry is disabled in this simplified build.
}

export function captureException(_e: any): string | null {
  // No-op capture; return null to indicate no event was sent.
  return null;
}
// Minimal no-op Sentry wrapper.
// Purpose: avoid runtime Sentry initialization errors on deployed serverless
// functions while keeping the same interface used throughout the app.

export function initSentry(): void {
  // Intentionally empty — Sentry is disabled in this simplified build.
}

export function captureException(_e: any): string | null {
  // No-op capture; return null to indicate no event was sent.
  return null;
}
// Removed unused import

// Minimal no-op Sentry wrapper.
// Purpose: avoid runtime Sentry initialization errors on deployed serverless
// functions while keeping the same interface used throughout the app.

export function initSentry(): void {
  // Intentionally empty — Sentry is disabled in this simplified build.
}

export function captureException(_e: any): string | null {
  // No-op capture; return null to indicate no event was sent.
  return null;
}
