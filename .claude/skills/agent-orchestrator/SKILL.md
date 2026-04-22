# Skill: Agent Orchestrator

## 역할
- 에이전트 협업 조정 담당.
- 구현과 검증을 분리하고 결과를 합의 가능한 형태로 통합합니다.

## 표준 워크플로
1. Dev Implementer에 기능 구현 요청
2. QA Lint Verifier에 정적 검증 요청
3. Performance Guardian에 성능 검증 요청
4. 실패 항목을 Dev Implementer에 재할당
5. 통과 시 기능 브랜치에서 커밋/푸시
6. PR 생성 후 리뷰 대기
7. reject 또는 CI fail 시 PR 수정 루프 모드 실행

## 세션 운영 규칙
- 작은 변경(파일 3개 이하, 로직 변경 1기능)은 단일 세션으로 처리합니다.
- 중간 이상 변경(파일 4개 이상, API+UI 동시 변경, 오류 루프 2회 이상)은 역할 분리 세션으로 전환합니다.
- 기능 단위 세션 종료 시 다음을 기록합니다:
  - 변경 파일
  - 검증 결과
  - 잔여 리스크
- 기능별 진행상황 파일 `docs/progress/<feature>.md`를 갱신합니다.
- 형식은 `docs/progress/TEMPLATE.md`를 따릅니다.

## 커뮤니케이션 규칙
- 각 에이전트는 입력/출력을 짧은 템플릿으로 작성
- 추측 대신 증거(명령 결과, 파일 변경) 기반으로 판단
- 같은 실패를 반복하지 않고 원인 중심 수정

## 브랜치/PR 실행 규칙
- 기본 브랜치에서 직접 작업하지 않습니다.
- 브랜치 이름은 `feature/*`, `fix/*`, `chore/*`, `refactor/*`, `docs/*` 중 하나를 사용합니다.
- 예시 순서:
  1. `git checkout -b feature/rss-ingestion`
  2. 구현/검증
  3. `git add ... && git commit ...`
  4. `git push -u origin HEAD`
  5. `gh pr create --title ... --body ...`
- PR 생성 후에는 자동 merge하지 않고 사용자 리뷰를 기다립니다.
- 리뷰 reject 또는 CI fail이면 `docs/PR_LOOP.md` 순서로 자동 전환합니다.
- 피드백 수집 시 `bash .claude/tools/pr-loop-helper.sh <pr-number>`를 사용합니다.

## 핸드오프 템플릿
- Task:
- Constraints:
- Files:
- Validation:
- Risks:
