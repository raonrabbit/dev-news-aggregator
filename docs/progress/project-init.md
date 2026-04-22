## Meta
- Feature: project-init
- Branch: feature/project-init
- Owner Session: 2026-04-22
- Last Updated: 2026-04-22

## Goal
Next.js 프로젝트 초기화 + Supabase 클라이언트 설정 + DB 스키마 작성

## Done
- [x] package.json (Next.js 15, React 19, Supabase, Tailwind)
- [x] tsconfig.json, next.config.ts, tailwind.config.ts, postcss.config.mjs, eslint.config.mjs
- [x] app/layout.tsx, app/globals.css, app/page.tsx (→ redirect /articles)
- [x] lib/supabase.ts (browser client, createBrowserClient)
- [x] lib/supabase-server.ts (server client, cookie-based)
- [x] lib/db.ts (PAGE_SIZE=20, typed query functions, service role)
- [x] supabase/schema.sql (articles, bookmarks, subscriptions + RLS)

## Validation
- 명령: `npm run typecheck && npm run lint`
- 결과: 통과
- 명령: `bash .claude/ci/enforce-static-guards.sh && bash .claude/ci/enforce-architecture.sh && bash .claude/ci/check-doc-drift.sh`
- 결과: 모두 passed

## Risks
- .env.local 미작성 시 런타임 오류 (requireEnv가 명확한 메시지로 fail fast)
- Supabase schema.sql은 수동으로 SQL 에디터에서 실행 필요

## Next
- feature/rss-fetch: lib/rss.ts + scripts/fetch-rss.ts + GitHub Actions cron
- feature/articles-ui: app/articles/page.tsx + API route
- feature/auth-bookmarks: OAuth, /login, /bookmarks

## Scope Guard
- MVP 4기능 준비 완료, AI 요약/랭킹 없음
