# Architecture

## 목표
에이전트가 구조를 예측 가능하게 이해하도록 최소 레이어 규칙을 정의합니다.

## Layer Rule
- `app`는 UI/API 진입점입니다.
- `app`은 `lib`를 사용할 수 있습니다.
- `lib`는 `app`을 import하면 안 됩니다.
- `scripts`는 `lib`를 사용할 수 있지만 `app`에 의존하면 안 됩니다.

## Data Access Rule
- DB 접근은 `lib/db.ts`(추후 생성) 경유를 기본으로 합니다.
- 상세 데이터 요구사항과 스키마는 `docs/DATA.md`를 참조합니다.

## API Rule
- 목록 응답은 페이지네이션 파라미터를 받습니다.
- 기본 정렬은 최신순(`published_at desc`)입니다.
