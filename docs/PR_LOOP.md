# PR Fix Loop

## Goal
PR reject 또는 CI 실패가 발생하면 에이전트가 수정 루프 모드로 자동 전환합니다.

## Entry Conditions
- PR 리뷰 상태가 `changes requested`
- PR 체크(CI) 중 하나라도 실패

## Loop Steps
1. PR 피드백/실패 체크 수집
2. 수정 계획 작성(최대 3~5개 작업)
3. 최소 변경으로 수정
4. 로컬 검증(`typecheck`, `lint`, 관련 테스트)
5. 같은 브랜치에 커밋/푸시
6. PR 코멘트에 반영 내역 기록
7. 미해결 항목이 남아있으면 반복

## Exit Conditions
- Changes requested 해소
- CI green
- 남은 리스크를 PR 코멘트로 명시

## Operator Prompts
- `PR #123 수정 루프 모드로 진행해. 코멘트/CI 실패를 먼저 수집하고 수정 후 다시 푸시해.`
- `PR #123 CI 실패 수정 루프 모드로 진행해. 실패 로그 요약과 수정 내역을 코멘트로 남겨.`
