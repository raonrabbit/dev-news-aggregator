# Reliability

## Runtime Guardrails
- 외부 RSS fetch 실패 시 전체 중단 대신 소스 단위 실패 처리
- 이메일 발송 실패는 재시도 가능한 형태로 에러 전파
- 스케줄러 작업은 idempotent하게 설계
- 상세 이메일 정책은 `docs/EMAIL.md`를 참조

## Operational Constraints
- RSS 수집은 시간 범위/중복 방지를 기본으로 처리
- 다이제스트는 최근 24시간 범위만 포함
- 장애 시 원인 추적을 위해 최소 로그를 남김
