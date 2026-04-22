# Quality

## Definition of Done
- 타입 검사 통과
- 린트 통과
- 성능 가드(CI) 통과
- 인증/비인증 경로 테스트 확인

## Review Checklist
- 실패 케이스 에러 처리 포함 여부
- env 누락 시 명확한 오류 메시지
- 신규 규칙 추가 시 문서와 CI 동시 갱신 여부

## Agent Review Flow
1. Dev Implementer 구현
2. QA Lint Verifier 검증
3. Performance Guardian 검증
4. 실패 항목 재수정 후 재검증

## PR Fix Loop
- 리뷰 reject 또는 CI 실패 시 `docs/PR_LOOP.md` 절차를 따릅니다.
- 수정 내역은 PR 코멘트에 요약하고 같은 브랜치로 재푸시합니다.

## Commit Message Convention
- 형식: `<type>: <한국어 요약>`
- 예시: `feat: 기사 목록 페이지 및 API route 구현`
- 제목은 한국어로 작성하고 종결 어미를 사용하지 않습니다.
- 자동 트레일러(`Made-with: Cursor`)를 커밋 메시지에 포함하지 않습니다.
