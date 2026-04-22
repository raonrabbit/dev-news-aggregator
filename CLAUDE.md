# Dev News Aggregator Claude Harness

## 목적
- 한국 개발 뉴스 수집 MVP를 빠르고 안정적으로 개발합니다.
- 단순성, 무료 인프라, 재현 가능한 작업 흐름을 우선합니다.

## 문서 맵
- 상세 정책은 아래 문서를 참조합니다.
  - `docs/README.md`
  - `docs/ARCHITECTURE.md`
  - `docs/DATA.md`
  - `docs/EMAIL.md`
  - `docs/QUALITY.md`
  - `docs/RELIABILITY.md`
  - `docs/SECURITY.md`
  - `docs/UI.md`
  - `docs/PLANS.md`
  - `docs/progress/README.md`
  - `docs/progress/TEMPLATE.md`

## MVP 범위(고정)
- RSS 기사 수집
- Google OAuth 로그인(Supabase Auth)
- 기사 북마크
- 신규 기사 이메일 다이제스트

## 비범위
- AI 요약/랭킹/추천
- 과도한 개인화 기능
- MVP 목적을 벗어나는 고급 아키텍처

## 기술 스택(고정)
- Next.js(App Router, TypeScript), Next.js API Routes
- Supabase(PostgreSQL, Auth), Vercel
- GitHub Actions cron, rss-parser, Resend MCP adapter

## 협업 규칙
- 역할 분리: Dev / UI Implementer / UI Reviewer / QA-Lint / Performance / Orchestrator
- 검증 실패 항목이 있으면 완료로 처리하지 않습니다.
- 기능 단위 브랜치 + PR 단위 병합을 사용합니다.
- main 직접 커밋은 금지합니다.
- 세션 간 공유는 `docs/progress/<feature>.md`로 동기화합니다.
- progress 문서는 상태 공유 용도이며, 최종 판단 기준은 문서+코드+CI 결과입니다.

## Git/PR 규칙
- 브랜치 네이밍: `feature/*`, `fix/*`, `chore/*`, `refactor/*`, `docs/*`
- 기능 1개당 PR 1개 원칙
- PR에 변경 요약, 검증 결과, 리스크를 포함
- 최종 merge는 사용자(리뷰어)가 수행

## 성능 규칙(불변)
- 목록 조회는 페이지네이션 필수, 기본 페이지 크기 20~50
- 1000건 이상 단일 요청 반환 금지
- 명시 컬럼 조회 + DB 정렬/필터 우선
- 반복 조회 경로는 캐싱 전략 명시

## 보안 규칙(불변)
- 비밀값은 `.env.local`/GitHub Secrets만 사용
- 인증 필요 기능(북마크/구독 변경)은 세션 검증 후 처리

## 완료 기준
- 범위 준수, 타입/린트 통과, CI 가드 통과
- 핵심 경로(비인증 조회/인증 액션/중복 방지/24h 다이제스트) 검증
