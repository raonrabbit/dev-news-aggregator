# Email Policy

## Provider And Adapter
- 이메일 전송은 Resend MCP adapter를 사용합니다.
- 앱 로직은 `lib/email.ts`의 단일 전송 함수만 호출합니다.
- provider 세부 호출은 adapter 내부로 캡슐화합니다.

## Digest Rule
- 다이제스트 대상은 최근 24시간 신규 기사만 포함합니다.
- 제목은 `Daily Dev News`를 기본으로 사용합니다.
- 항목은 `title + url` 최소 포맷으로 구성합니다.

## Failure Handling
- 전송 실패는 호출부에서 재시도/로그 처리할 수 있도록 에러를 전파합니다.
- 소스별 실패는 다른 사용자/다른 작업을 전체 중단시키지 않도록 분리 처리합니다.

## Secret Policy
- 키는 `.env.local` 또는 GitHub Secrets로만 주입합니다.
- 코드/문서에 실제 키를 기록하지 않습니다.
