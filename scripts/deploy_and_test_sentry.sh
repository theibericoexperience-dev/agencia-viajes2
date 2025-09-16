#!/usr/bin/env bash
set -euo pipefail

if [ -z "${VERCEL_TOKEN:-}" ] || [ -z "${VERCEL_PROJECT:-}" ]; then
  echo "Set VERCEL_TOKEN and VERCEL_PROJECT environment variables first"
  exit 1
fi

echo "Triggering deployment for project $VERCEL_PROJECT..."
DEP_RESP=$(curl -s -X POST "https://api.vercel.com/v13/now/deployments?projectId=$VERCEL_PROJECT" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"agencia-viajes2\",\"target\":\"production\"}")

echo "Deployment response:"; echo "$DEP_RESP" | jq .
DEP_ID=$(echo "$DEP_RESP" | jq -r '.id // .deploymentId // .uid // empty')
if [ -z "$DEP_ID" ]; then
  echo "No deployment id returned; aborting"; exit 1
fi

echo "Polling deployment status (up to ~10 minutes)..."
DEP_URL=""
for i in $(seq 1 100); do
  sleep 6
  STATUS_JSON=$(curl -s -H "Authorization: Bearer $VERCEL_TOKEN" "https://api.vercel.com/v13/deployments/$DEP_ID")
  STATE=$(echo "$STATUS_JSON" | jq -r '.state // .readyState // .status // empty')
  echo " attempt=$i state=$STATE"
  if [ "$STATE" = "READY" ]; then
    DEP_URL=$(echo "$STATUS_JSON" | jq -r '.url // .meta.url // .alias[0] // .name')
    echo "Deployment ready: $DEP_URL"
    break
  fi
done

if [ -z "$DEP_URL" ]; then
  echo "Deployment did not produce a URL; aborting"; exit 1
fi

echo "Calling server test route to generate a Sentry event..."
HTTP_CODE=$(curl -s -o /tmp/sentry_test_resp.txt -w "%{http_code}" "https://$DEP_URL/api/sentry-test")
echo "GET /api/sentry-test -> $HTTP_CODE"
echo "Server response (first 200 chars):"; sed -n '1,40p' /tmp/sentry_test_resp.txt || true

echo "Saved HTML snapshot of client test page to /tmp/sentry_test_page.html"
curl -s -o /tmp/sentry_test_page.html "https://$DEP_URL/sentry-test" || true

echo "Done. If Sentry DSN is valid, you should see the server event in Sentry soon."
