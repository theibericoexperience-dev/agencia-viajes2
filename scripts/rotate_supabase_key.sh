#!/usr/bin/env bash
# Usage: VERCEL_TOKEN=token PROJECT_ID=prj_xxx NEW_KEY="sk..." ./scripts/rotate_supabase_key.sh
set -euo pipefail
if [ -z "${VERCEL_TOKEN:-}" ] || [ -z "${PROJECT_ID:-}" ] || [ -z "${NEW_KEY:-}" ]; then
  echo "Usage: VERCEL_TOKEN=token PROJECT_ID=prj_xxx NEW_KEY=service_role_key $0"
  exit 1
fi

echo "Rotating SUPABASE_SERVICE_ROLE_KEY in Vercel project $PROJECT_ID"
API="https://api.vercel.com/v9/projects/$PROJECT_ID/env"

# Create a new encrypted env var (type=encrypted)
resp=$(curl -s -X POST "$API" -H "Authorization: Bearer $VERCEL_TOKEN" -H "Content-Type: application/json" -d \
  "{\"key\":\"SUPABASE_SERVICE_ROLE_KEY\",\"value\":\"$NEW_KEY\",\"target\":[\"production\",\"preview\"],\"type\":\"encrypted\"}")

echo "$resp"
echo "If successful, the new key has been added. Remove the old key manually from the Vercel dashboard if desired."
