## Meta
- Feature: email-digest
- Branch: feature/email-digest
- Owner Session: 2026-04-22
- Last Updated: 2026-04-22

## Goal
일일 이메일 다이제스트 발송 + GitHub Actions cron 구성

## Done
- [x] lib/email.ts: sendDailyDigest adapter (Resend SDK), HTML 템플릿
- [x] scripts/send-digest.ts: 최근 24h 기사 조회 → 구독자별 발송, 실패 격리
- [x] .github/workflows/digest-cron.yml: 매일 KST 10:00 실행

## Validation
- 명령: `npm run typecheck && npm run lint`
- 결과: 통과
- CI guards: all passed

## Risks
- Resend 무료 플랜: 100 emails/day 제한
- 구독자 테이블은 UI 없이 DB 직접 삽입만 가능 (subscription UI는 비범위)

## Next
- Supabase 프로젝트 생성 → schema.sql 실행
- GitHub Secrets 등록 (SUPABASE_*, RESEND_*)
- Vercel 배포

## Scope Guard
- MVP 4기능 완성 (RSS 수집, OAuth 로그인, 북마크, 이메일 다이제스트)
- AI 요약/랭킹 없음
