# Docs Map

이 디렉터리는 에이전트가 참조하는 기록 시스템입니다.
`CLAUDE.md`는 요약 규칙만 담고, 상세 정책은 아래 문서로 분리합니다.

## Index
- `docs/ARCHITECTURE.md`
- `docs/DATA.md`
- `docs/EMAIL.md`
- `docs/QUALITY.md`
- `docs/RELIABILITY.md`
- `docs/SECURITY.md`
- `docs/UI.md`
- `docs/PLANS.md`
- `docs/PR_LOOP.md`
- `docs/progress/README.md`
- `docs/progress/TEMPLATE.md`

## 운영 원칙
- 문서가 코드보다 늦으면 CI에서 실패해야 합니다.
- 아키텍처 제약은 문서로만 두지 않고 CI 스크립트로 강제합니다.
- 신규 규칙은 `CLAUDE.md` 요약 + `docs/*` 상세를 동시에 업데이트합니다.
