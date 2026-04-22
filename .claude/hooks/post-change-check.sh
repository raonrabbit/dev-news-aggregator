#!/usr/bin/env bash
set -euo pipefail

echo "[post-change-check] starting..."

if [ ! -f "package.json" ]; then
  echo "[post-change-check][info] package.json not found yet; skipping checks"
  exit 0
fi

run_if_script_exists() {
  local script_name="$1"
  if node -e "const p=require('./package.json'); process.exit(p.scripts && p.scripts['${script_name}'] ? 0 : 1)"; then
    echo "[post-change-check] running npm run ${script_name}"
    npm run "${script_name}"
  else
    echo "[post-change-check][info] npm script '${script_name}' not defined; skipping"
  fi
}

run_if_script_exists "typecheck"
run_if_script_exists "lint"

has_match() {
  local pattern="$1"
  shift
  if command -v rg >/dev/null 2>&1; then
    rg -n "${pattern}" "$@" >/dev/null 2>&1
  else
    grep -R -n -E "${pattern}" "$@" >/dev/null 2>&1
  fi
}

run_performance_guards() {
  local target_dirs=()
  [ -d "app" ] && target_dirs+=("app")
  [ -d "lib" ] && target_dirs+=("lib")
  [ -d "scripts" ] && target_dirs+=("scripts")

  if [ "${#target_dirs[@]}" -eq 0 ]; then
    echo "[post-change-check][info] no target directories for performance guards"
    return
  fi

  local scan_path="${target_dirs[*]}"
  echo "[post-change-check] running performance static guards"

  if has_match "select\(\s*['\"]\*['\"]\s*\)" ${scan_path}; then
    echo "[post-change-check][warn] detected wildcard select(*). prefer explicit columns"
  fi

  if has_match "from\(\s*['\"][^'\"]+['\"]\s*\)" ${scan_path}; then
    if ! has_match "range\(|limit\(" ${scan_path}; then
      echo "[post-change-check][warn] table query found without visible range/limit usage"
    fi
  fi

  if has_match "fetch\(" app lib; then
    if ! has_match "revalidate|cache:\s*['\"]force-cache['\"]|unstable_cache" app lib; then
      echo "[post-change-check][warn] fetch usage found without visible caching strategy"
    fi
  fi
}

run_performance_guards

echo "[post-change-check] completed"
