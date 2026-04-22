## Meta
- Feature: rss-fetch
- Branch: feature/rss-fetch
- Owner Session: 2026-04-22
- Last Updated: 2026-04-22

## Goal
RSS 피드 수집 + DB 저장 + GitHub Actions cron 구성

## Done
- [x] lib/rss.ts: 9개 한국 개발 블로그 피드, Promise.allSettled로 소스 단위 실패 격리
- [x] scripts/fetch-rss.ts: fetch → upsertArticles 호출, idempotent
- [x] .github/workflows/rss-cron.yml: 매 시간 정각 실행, SUPABASE_* secrets 주입
- [x] tsx devDependency 추가

## Validation
- 명령: `npm run typecheck && npm run lint`
- 결과: 통과
- 명령: CI guards (static, architecture)
- 결과: passed

## Risks
- RSS 피드 URL 변경 시 lib/rss.ts의 FEEDS 배열 수동 업데이트 필요
- GitHub Actions cron 최소 주기 1분 제한; 현재 1시간 주기로 설정

## Next
- feature/articles-ui: /articles 목록 페이지 + API route

## Scope Guard
- RSS 수집만 처리, AI 요약 없음
