#!/usr/bin/env bash
# Trigger a Vercel deployment for the current project via API.
# Usage: VERCEL_TOKEN=... VERCEL_PROJECT=... ./scripts/trigger_vercel_deploy.sh

if [ -z "$VERCEL_TOKEN" ] || [ -z "$VERCEL_PROJECT" ]; then
  echo "Set VERCEL_TOKEN and VERCEL_PROJECT environment variables"
  exit 1
fi

curl -s -X POST "https://api.vercel.com/v13/now/deployments?projectId=$VERCEL_PROJECT" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"auto-deploy","target":"production"}' | jq .
