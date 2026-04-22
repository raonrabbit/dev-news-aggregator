## Meta
- Feature: auth-bookmarks
- Branch: feature/auth-bookmarks
- Owner Session: 2026-04-22
- Last Updated: 2026-04-22

## Goal
Google OAuth 로그인 + 북마크 저장/조회

## Done
- [x] middleware.ts: 세션 갱신 (Supabase SSR cookie refresh)
- [x] app/login/page.tsx: 이미 로그인 시 /articles redirect
- [x] app/login/LoginButton.tsx: signInWithOAuth Google provider
- [x] app/auth/callback/route.ts: code exchange → /articles redirect
- [x] app/auth/signout/route.ts: POST signout
- [x] app/api/bookmarks/route.ts: GET/POST/DELETE, 세션 검증 필수
- [x] app/bookmarks/page.tsx: 비인증 시 /login redirect, 페이지네이션
- [x] app/articles/BookmarkButton.tsx: 즉시 피드백 토글, 401 시 /login 유도

## Validation
- 명령: `npm run typecheck && npm run lint`
- 결과: 통과
- CI guards: passed

## Risks
- Supabase Google OAuth provider는 Supabase 대시보드에서 수동 활성화 필요
- NEXT_PUBLIC_APP_URL 미설정 시 signout redirect가 localhost:3000으로 폴백

## Next
- feature/email-digest: lib/email.ts + scripts/send-digest.ts + digest cron

## Scope Guard
- MVP 범위: OAuth 로그인, 북마크 CRUD만 구현
