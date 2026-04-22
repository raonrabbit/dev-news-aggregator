## Meta
- Feature: articles-ui
- Branch: feature/articles-ui
- Owner Session: 2026-04-22
- Last Updated: 2026-04-22

## Goal
기사 목록 페이지 + REST API route 구현 (비인증 열람 가능)

## Done
- [x] app/api/articles/route.ts: GET /api/articles?page=N, revalidate=60
- [x] app/articles/page.tsx: SSR 기사 목록, loading/empty/error 상태
- [x] app/articles/ArticleList.tsx: 클라이언트 컴포넌트, 페이지네이션 네비게이션

## Validation
- 명령: `npm run typecheck && npm run lint`
- 결과: 통과
- 명령: CI guards (static, architecture)
- 결과: passed

## Risks
- 실제 Supabase 없이 로컬 실행 시 error 상태로 표시됨 (의도된 동작)

## Next
- feature/auth-bookmarks: Google OAuth + /login + /bookmarks

## Scope Guard
- 비인증 조회만 구현, 북마크 UI는 다음 단계
