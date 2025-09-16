#!/usr/bin/env bash
# Simple helper to set a Vercel env var via the Vercel API.
# Usage: VERCEL_TOKEN=... VERCEL_PROJECT=... ./scripts/set_vercel_env.sh NAME VALUE

if [ -z "$VERCEL_TOKEN" ] || [ -z "$VERCEL_PROJECT" ]; then
  echo "Set VERCEL_TOKEN and VERCEL_PROJECT environment variables first"
  exit 1
fi
if [ -z "$1" ] || [ -z "$2" ]; then
  echo "Usage: $0 NAME VALUE"
  exit 1
fi
NAME=$1
VALUE=$2

curl -s -X POST "https://api.vercel.com/v9/projects/$VERCEL_PROJECT/env" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"key\":\"$NAME\",\"value\":\"$VALUE\",\"target\":[\"production\"]}" |
jq .
