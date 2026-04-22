#!/usr/bin/env bash
set -euo pipefail

echo "[ci-guards] start"

has_match() {
  local pattern="$1"
  shift
  if command -v rg >/dev/null 2>&1; then
    rg -n "${pattern}" "$@" >/dev/null 2>&1
  else
    grep -R -n -E "${pattern}" "$@" >/dev/null 2>&1
  fi
}

target_dirs=()
[ -d "app" ] && target_dirs+=("app")
[ -d "lib" ] && target_dirs+=("lib")
[ -d "scripts" ] && target_dirs+=("scripts")

if [ "${#target_dirs[@]}" -eq 0 ]; then
  echo "[ci-guards] no app/lib/scripts directory yet; skip"
  exit 0
fi

scan_path="${target_dirs[*]}"
failed=0

# 1) Wildcard select is forbidden.
if has_match "select\(\s*['\"]\*['\"]\s*\)" ${scan_path}; then
  echo "[ci-guards][error] wildcard select(*) is forbidden. choose explicit columns."
  failed=1
fi

# 2) If Supabase table queries exist, at least one range/limit guard must be present.
if has_match "from\(\s*['\"][^'\"]+['\"]\s*\)" ${scan_path}; then
  if ! has_match "range\(|limit\(" ${scan_path}; then
    echo "[ci-guards][error] table queries detected without range/limit. add pagination guards."
    failed=1
  fi
fi

# 3) If fetch is used, visible caching strategy must exist.
if has_match "fetch\(" ${scan_path}; then
  if ! has_match "revalidate|cache:\s*['\"]force-cache['\"]|unstable_cache" ${scan_path}; then
    echo "[ci-guards][error] fetch usage detected without caching strategy."
    failed=1
  fi
fi

if [ "$failed" -ne 0 ]; then
  echo "[ci-guards] failed"
  exit 1
fi

echo "[ci-guards] passed"
