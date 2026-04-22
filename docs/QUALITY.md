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
