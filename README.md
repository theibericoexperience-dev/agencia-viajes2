# Vercel cache bust

## Deployment notes

- **Checking server logs:** Use the Vercel dashboard or `vercel logs <deployment>` to inspect serverless logs for `/api/orders` failures. When the API returns an error, it will include a short `error_id` in the JSON response — use that to correlate with the server logs.
- **Rotate Supabase service key after testing:** The `SUPABASE_SERVICE_ROLE_KEY` is powerful and should be rotated after you've completed testing. Store the new key in Vercel's project environment variables and remove the old key.
