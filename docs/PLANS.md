# Plans

## Active Execution Order
1. 프로젝트 초기화
2. Supabase/Auth 연결
3. 스키마 작성
4. RSS 수집/저장
5. 기사 목록/로그인/북마크
6. 다이제스트/스케줄러

## Planning Rule
- 큰 작업은 기능 단위로 세션을 분리합니다.
- 각 세션은 다음 3가지를 남깁니다.
  - 변경 파일
  - 검증 결과
  - 잔여 리스크
- 세션 종료 전 `docs/progress/<feature>.md`를 갱신합니다.
- 진행상황 공유 형식은 `docs/progress/TEMPLATE.md`를 따릅니다.

## Branch And PR Rule
- 기능 단위로 브랜치를 분리합니다.
- 브랜치 네이밍: `feature/*`, `fix/*`, `chore/*`, `refactor/*`, `docs/*`
- PR 단위로 리뷰하고 사용자 승인 후 merge 합니다.
- 한 PR에는 하나의 기능 목표만 포함합니다.
