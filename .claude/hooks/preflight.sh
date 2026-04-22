#!/usr/bin/env bash
set -euo pipefail

echo "[preflight] starting checks..."

required_dirs=(
  "app"
  "lib"
  "scripts"
)

missing_dirs=0
for dir in "${required_dirs[@]}"; do
  if [ ! -d "$dir" ]; then
    echo "[preflight][warn] missing directory: $dir"
    missing_dirs=1
  fi
done

if [ ! -f ".env.local" ]; then
  echo "[preflight][warn] .env.local not found"
  echo "[preflight][hint] copy .env.example to .env.local and fill required keys"
  exit 0
fi

required_env_keys=(
  "NEXT_PUBLIC_SUPABASE_URL"
  "NEXT_PUBLIC_SUPABASE_ANON_KEY"
  "SUPABASE_SERVICE_ROLE_KEY"
  "SUPABASE_PROJECT_URL"
  "RESEND_API_KEY"
  "RESEND_FROM_EMAIL"
  "GOOGLE_CLIENT_ID"
  "GOOGLE_CLIENT_SECRET"
)

missing_keys=0
for key in "${required_env_keys[@]}"; do
  if ! grep -Eq "^${key}=" .env.local; then
    echo "[preflight][warn] missing env key: ${key}"
    missing_keys=1
  fi
done

if [ "$missing_dirs" -eq 1 ] || [ "$missing_keys" -eq 1 ]; then
  echo "[preflight] completed with warnings"
  exit 0
fi

echo "[preflight] all checks passed"
