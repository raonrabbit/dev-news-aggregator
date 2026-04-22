#!/usr/bin/env bash
set -euo pipefail

if [ $# -lt 1 ]; then
  echo "usage: bash .claude/tools/pr-loop-helper.sh <pr-number>"
  exit 1
fi

pr_number="$1"

if ! command -v gh >/dev/null 2>&1; then
  echo "[pr-loop-helper][error] gh CLI is required"
  exit 1
fi

echo "[pr-loop-helper] PR #${pr_number} summary"
gh pr view "${pr_number}" --json number,title,state,headRefName,reviewDecision \
  --template 'title: {{.title}}{{"\n"}}state: {{.state}}{{"\n"}}branch: {{.headRefName}}{{"\n"}}reviewDecision: {{.reviewDecision}}{{"\n"}}'

echo
echo "[pr-loop-helper] review comments"
gh api "repos/{owner}/{repo}/pulls/${pr_number}/comments" --jq '.[] | "- " + (.user.login // "unknown") + ": " + (.body | gsub("\n"; " "))' || true

echo
echo "[pr-loop-helper] issue comments"
gh api "repos/{owner}/{repo}/issues/${pr_number}/comments" --jq '.[] | "- " + (.user.login // "unknown") + ": " + (.body | gsub("\n"; " "))' || true

echo
echo "[pr-loop-helper] check runs"
gh pr checks "${pr_number}" || true
