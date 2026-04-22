#!/usr/bin/env bash
set -euo pipefail

echo "[ci-doc-drift] start"

required_docs=(
  "docs/README.md"
  "docs/ARCHITECTURE.md"
  "docs/DATA.md"
  "docs/EMAIL.md"
  "docs/QUALITY.md"
  "docs/RELIABILITY.md"
  "docs/SECURITY.md"
  "docs/UI.md"
  "docs/PLANS.md"
  "docs/PR_LOOP.md"
  "docs/progress/README.md"
  "docs/progress/TEMPLATE.md"
)

for file in "${required_docs[@]}"; do
  if [ ! -f "$file" ]; then
    echo "[ci-doc-drift][error] missing required doc: $file"
    exit 1
  fi
done

if [ ! -f "CLAUDE.md" ]; then
  echo "[ci-doc-drift][error] missing CLAUDE.md"
  exit 1
fi

for ref in "${required_docs[@]}"; do
  if ! grep -F -n "${ref}" CLAUDE.md >/dev/null 2>&1; then
    echo "[ci-doc-drift][error] CLAUDE.md missing doc reference: ${ref}"
    exit 1
  fi
done

if grep -R -n -E "TODO|TBD|작성 예정" docs >/dev/null 2>&1; then
  echo "[ci-doc-drift][error] unresolved placeholder found in docs"
  exit 1
fi

echo "[ci-doc-drift] passed"
