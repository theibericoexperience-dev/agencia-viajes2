# Sentry setup

This repository includes lightweight Sentry initialization files. To enable Sentry in production, follow the steps below.

1. Create an Auth Token in Sentry
   - Go to Settings → Developer → Auth Tokens in your Sentry org.
   - Create a token with `project:releases` and `org:read` scopes.
   - Copy the token value.

2. Add `SENTRY_AUTH_TOKEN` to GitHub Secrets
   - Repository Settings → Secrets and variables → Actions → New repository secret
   - Name: `SENTRY_AUTH_TOKEN`
   - Value: token from step 1

3. Add `SENTRY_DSN` to Vercel Environment Variables
   - Vercel Project → Settings → Environment Variables
   - Key: `SENTRY_DSN` (or `NEXT_PUBLIC_SENTRY_DSN` for client-only)
   - Paste your DSN value

4. CI and source maps
   - Workflows include an optional step that runs `sentry-cli` to upload source maps.
   - The step runs only when `SENTRY_AUTH_TOKEN` is present as a GitHub secret.

5. Optional: Run Sentry wizard locally
   - You can run:

```bash
npx @sentry/wizard@latest -i nextjs --saas --org iberico-experience --project javascript-nextjs
```

This may create or modify files; review changes before committing.
