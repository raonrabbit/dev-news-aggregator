#!/usr/bin/env bash
set -euo pipefail

echo "[ci-architecture] start"

has_match() {
  local pattern="$1"
  shift
  if command -v rg >/dev/null 2>&1; then
    rg -n "${pattern}" "$@" >/dev/null 2>&1
  else
    grep -R -n -E "${pattern}" "$@" >/dev/null 2>&1
  fi
}

failed=0

# Rule 1: lib must not depend on app.
if [ -d "lib" ]; then
  if has_match "from ['\"][.]{1,2}/.*app/|from ['\"]@/app/" lib; then
    echo "[ci-architecture][error] lib cannot import app"
    failed=1
  fi
fi

# Rule 2: scripts must not depend on app.
if [ -d "scripts" ]; then
  if has_match "from ['\"][.]{1,2}/.*app/|from ['\"]@/app/" scripts; then
    echo "[ci-architecture][error] scripts cannot import app"
    failed=1
  fi
fi

# Rule 3: when route files exist, page-size guard constant should exist somewhere.
if [ -d "app" ]; then
  if has_match "route\.ts|page\.tsx" app; then
    if ! has_match "PAGE_SIZE|DEFAULT_PAGE_SIZE|limit" app lib; then
      echo "[ci-architecture][error] route/page exists but no visible pagination guard"
      failed=1
    fi
  fi
fi

if [ "$failed" -ne 0 ]; then
  echo "[ci-architecture] failed"
  exit 1
fi

echo "[ci-architecture] passed"
