# Security

## Secret Policy
- 비밀값은 `.env.local`과 GitHub Secrets에서만 주입
- 코드/문서에 실키 값 하드코딩 금지

## Auth Policy
- 북마크/구독 변경은 인증 사용자만 허용
- 비인증 사용자는 기사 읽기만 허용

## Data Policy
- 사용자 식별 정보는 최소한으로 저장
- 외부 API 호출 실패 시 민감 정보 로그 출력 금지
