# Skill: MVP News Aggregator Builder

## 목적
이 스킬은 `dev-news-aggregator` MVP를 구현할 때 일관된 작업 순서와 최소 구현 패턴을 제공합니다.

## 범위
- RSS 수집 및 DB 저장
- Google OAuth 로그인
- 북마크 저장/조회
- 신규 기사 일일 이메일 다이제스트

## 협업 스킬 연결
- 구현: `dev-implementer`
- UI 구현: `ui-implementer`
- UI 검증: `ui-reviewer`
- 품질 검증: `qa-lint-verifier`
- 성능 검증: `performance-guardian`
- 조정/핸드오프: `agent-orchestrator`

## 비범위
- AI 요약, AI 랭킹, AI 추천 기능
- 과도한 설계 패턴/추상화

## 필수 순서
1. Supabase 클라이언트/환경 변수 확인
2. DB 스키마 확인(`articles`, `bookmarks`, `subscriptions`)
3. RSS 파서 구현 및 URL unique 기반 중복 방지
4. `/articles` 렌더링
5. `/login` Google OAuth
6. `/bookmarks` 저장/조회
7. 메일 다이제스트 스크립트
8. GitHub Actions cron

## 파일 템플릿 가이드
- `lib/db.ts`: 서버 측 DB 접근 유틸(환경 변수 검증 포함)
- `lib/rss.ts`: 피드 목록 순회, `rss-parser` 파싱, 정규화된 article 반환
- `lib/email.ts`: 아래 adapter 인터페이스를 따르는 전송 함수
- `scripts/fetch-rss.ts`: 피드 fetch + insert/upsert
- `scripts/send-digest.ts`: 최근 24시간 기사 조회 + 구독자 메일 발송

## Supabase 접근 패턴
- DB 쓰기 작업은 명시적 에러 처리 포함
- article 저장 시 `url` unique 충돌은 무해하게 처리
- 북마크 생성 시 사용자/기사 id 유효성 확인

## RSS upsert 패턴
1. 고정 피드 목록 순회
2. 각 item에서 `title`, `link(url)`, `pubDate` 추출
3. source 이름 정규화
4. DB insert 또는 upsert
5. 중복 URL은 스킵

## Email Adapter 규약(Resend MCP 전제)
앱 코드에서는 provider 세부 구현을 숨기고 아래 단일 인터페이스를 사용합니다.

```ts
export type DigestItem = { title: string; url: string };

export async function sendDailyDigest(input: {
  to: string;
  items: DigestItem[];
}): Promise<void> {
  // provider-specific call (MCP) lives only here
}
```

규칙:
- `sendDailyDigest` 외부에서 MCP 전송 툴을 직접 호출하지 않습니다.
- 발송 데이터는 title/url 최소 필드만 사용합니다.
- 전송 실패 시 호출부에서 재시도/로그 처리 가능하도록 에러를 throw 합니다.

## 구현 체크리스트
- env 누락 시 빠르게 실패(fail fast)
- 인증 없는 북마크 요청은 로그인 유도
- `/articles`는 비로그인 열람 가능
- 최근 24시간 기사만 다이제스트 포함
- 목록 조회는 페이지네이션 필수(기본 20~50)
- 캐싱 없이 반복 조회하지 않음
- 타입 검사 및 린트 통과

## 완료 조건
- MVP 기능 4가지가 end-to-end로 동작
- CI/cron 기준 스크립트가 독립 실행 가능
- 코드가 단순하고 수정 지점이 명확함
