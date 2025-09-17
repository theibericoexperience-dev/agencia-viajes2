#!/usr/bin/env bash
set -euo pipefail

PROJECT=${VERCEL_PROJECT:-prj_qlAOMPFXPNaZKDHcqseah6tq8b7c}
VERCEL_TOKEN=${VERCEL_TOKEN:-}
if [ -z "$VERCEL_TOKEN" ]; then
  echo "VERCEL_TOKEN is not set"
  exit 1
fi

if [ -f /tmp/last_deploy_commit.sha ]; then
  COMMIT=$(cat /tmp/last_deploy_commit.sha)
else
  echo "/tmp/last_deploy_commit.sha not found"
  exit 2
fi

echo "Waiting for Vercel deployment for commit $COMMIT (project $PROJECT)"
for i in {1..60}; do
  echo "poll attempt $i"
  res=$(curl -sS -H "Authorization: Bearer $VERCEL_TOKEN" "https://api.vercel.com/v6/deployments?projectId=$PROJECT&meta-githubCommitSha=$COMMIT") || true
  count=$(echo "$res" | jq -r '.deployments | length' 2>/dev/null || echo 0)
  if [ "$count" -gt 0 ]; then
    id=$(echo "$res" | jq -r '.deployments[0].uid')
    state=$(echo "$res" | jq -r '.deployments[0].state')
    url=$(echo "$res" | jq -r '.deployments[0].url')
    echo "Found deployment $id state=$state url=$url"
    if [ "$state" = "READY" ]; then
      echo "Deployment READY: $url"
      echo "$url" > /tmp/last_deploy_url.txt
      exit 0
    fi
  fi
  sleep 15
done

echo "Timed out waiting for deployment to become READY"
exit 3
