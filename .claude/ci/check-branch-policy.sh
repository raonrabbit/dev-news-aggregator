#!/usr/bin/env bash
set -euo pipefail

echo "[ci-branch-policy] start"

if [ "${GITHUB_EVENT_NAME:-}" != "pull_request" ]; then
  echo "[ci-branch-policy] non-PR event; skip"
  exit 0
fi

branch="${GITHUB_HEAD_REF:-}"
if [ -z "$branch" ]; then
  echo "[ci-branch-policy][error] GITHUB_HEAD_REF is empty on pull_request event"
  exit 1
fi

if [[ "$branch" =~ ^(feature|fix|chore|refactor|docs)/[a-z0-9._-]+$ ]]; then
  echo "[ci-branch-policy] passed: $branch"
  exit 0
fi

echo "[ci-branch-policy][error] invalid branch name: $branch"
echo "[ci-branch-policy][hint] use one of: feature/*, fix/*, chore/*, refactor/*, docs/*"
exit 1
