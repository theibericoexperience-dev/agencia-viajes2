# Agencia Viajes — Project

Commands

```bash
# install deps
npm install

# regenerate optimized images
npm run optimize:images

# build
npm run build

# start (production)
npx next start -p 3000
```

Continuous Performance: see `.github/workflows/lighthouse.yml` for Lighthouse CI integration.

Image workflow: source images in `public/images/` — run `npm run optimize:images` to emit `public/_optimized/` variants.

Sentry
------
To enable Sentry error reporting in production, set the `SENTRY_DSN` env var in Vercel (or your host). Example using Vercel CLI:

```bash
# requires VERCEL_TOKEN and VERCEL_PROJECT set
vercel env add SENTRY_DSN production
```

There is a helper script `scripts/set_vercel_env.sh` you can adapt to set env vars via the Vercel API.
# Vercel cache bust

## Deployment notes

- **Checking server logs:** Use the Vercel dashboard or `vercel logs <deployment>` to inspect serverless logs for `/api/orders` failures. When the API returns an error, it will include a short `error_id` in the JSON response — use that to correlate with the server logs.
- **Rotate Supabase service key after testing:** The `SUPABASE_SERVICE_ROLE_KEY` is powerful and should be rotated after you've completed testing. Store the new key in Vercel's project environment variables and remove the old key.

