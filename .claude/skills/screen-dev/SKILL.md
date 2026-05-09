---
name: screen-dev
description: 화면 1장과 사용자 시나리오를 받아 plan → todo → implement → review 파이프라인으로 React 화면을 개발하는 프론트엔드 개발 오케스트레이터. "화면 만들어줘", "이 시나리오대로 화면 개발", "{화면이름} 페이지 추가", "로그인/회원가입/상세/목록 화면 만들어", 시나리오와 함께 화면 명세를 던질 때 반드시 사용. 후속 작업("이 화면 다시", "{화면}만 수정", "review 결과 반영해서 다시")에도 사용.
---

# screen-dev — 화면 개발 오케스트레이터

화면 1개 + 시나리오를 받아 plan(설계) → todo(코드 사전 명세) → implement(구현) → review(리팩토링) 4단계로 자동 진행한다. 사용자에게는 review 보고서만 최종 출력한다.

## 트리거

다음과 같은 사용자 입력에서 트리거한다:

- "이 화면 만들어줘" + 화면 명세/이미지/시나리오
- "로그인 화면 추가" / "{화면이름}Screen 만들어"
- "이 시나리오대로 개발해줘" + 시나리오 텍스트
- "이전에 만든 {화면} 다시 작업" / "{화면}의 review 보고 수정해줘"

## 입력 파라미터

사용자에게서 추출 (불명확하면 질문 1회):
- `screen_name`: kebab-case 식별자 (예: `login`, `post-detail`). 사용자가 명시 안 하면 화면 묘사에서 도출 후 확인.
- `screen_description`: 화면 1장의 묘사 (이미지가 있으면 이미지, 없으면 텍스트)
- `scenario`: 사용자 행동 시나리오 (순서 있는 단계)

이 셋 중 하나라도 빠지면 사용자에게 질문한다. **다른 정보(컴포넌트 분해, API 등)는 묻지 않는다 — 그건 planner가 한다.**

## Phase 0: 컨텍스트 확인

워크플로우 시작 전 실행 모드 결정.

```
if _workspace/{screen_name}/ 가 없음:
    → 초기 실행 (Phase 1부터 전체)

elif _workspace/{screen_name}/ 가 있고 사용자가 부분 수정 요청:
    예) "todo만 수정", "review 다시"
    → 부분 재실행 (해당 단계부터 시작)

elif _workspace/{screen_name}/ 가 있고 사용자가 새 시나리오/명세 제공:
    → 전체 재실행. 이전 _workspace/{screen_name}/ 을
       _workspace/{screen_name}_prev_{YYYYMMDD}/ 로 백업 후 새로 시작
```

부분 재실행 시작점 매핑:
- "plan부터" → Phase 1
- "todo만" → Phase 2 (이전 plan 재사용)
- "구현만" → Phase 3
- "review만" → Phase 4

## Phase 1: 설계 (planner)

```
Agent({
  description: "화면 설계",
  subagent_type: "general-purpose",
  model: "opus",
  prompt: `
    .claude/agents/planner.md 의 역할에 따라 작업하라.
    screen_name: {screen_name}
    screen_description: {screen_description}
    scenario: {scenario}

    출력: _workspace/{screen_name}/01_plan.md

    먼저 다음을 읽어라:
    - .claude/agents/planner.md (역할 정의)
    - .claude/skills/screen-dev/references/architecture.md (폴더/명명/데이터 흐름 규칙)
    - plan.md (프로젝트 아키텍처)
    - src/api/client.ts, src/app/router.tsx, src/app/QueryProvider.tsx (기존 자산)
  `
})
```

검증: `_workspace/{screen_name}/01_plan.md` 존재 + "9. 미해결 질문" 섹션이 비어있는지 확인. 미해결 질문이 있으면 사용자에게 질문 후 답을 반영해 1회 재실행.

## Phase 2: 코드 사전 명세 (todo-author)

```
Agent({
  description: "코드 스켈레톤 작성",
  subagent_type: "general-purpose",
  model: "opus",
  prompt: `
    .claude/agents/todo-author.md 의 역할에 따라 작업하라.
    입력: _workspace/{screen_name}/01_plan.md
    출력: _workspace/{screen_name}/02_todo.md

    먼저 다음을 읽어라:
    - .claude/agents/todo-author.md
    - .claude/skills/screen-dev/references/architecture.md
    - _workspace/{screen_name}/01_plan.md
  `
})
```

검증: `_workspace/{screen_name}/02_todo.md` 존재 + "행동 명세" 섹션이 비어있지 않은지 확인. 행동 명세는 review 단계의 수동 검수 체크리스트로 사용된다.

## Phase 3: 구현 (implementer)

```
Agent({
  description: "구현",
  subagent_type: "general-purpose",
  model: "opus",
  prompt: `
    .claude/agents/implementer.md 의 역할에 따라 작업하라.
    입력:
    - _workspace/{screen_name}/01_plan.md
    - _workspace/{screen_name}/02_todo.md

    출력:
    - src/ 하위 구현 파일들
    - _workspace/{screen_name}/03_implementation_summary.md

    먼저 다음을 읽어라:
    - .claude/agents/implementer.md
    - .claude/skills/screen-dev/references/architecture.md
    - 위 입력 파일들

    todo의 행동 명세를 모두 만족하는 코드를 작성하라.
    완료 후 pnpm typecheck 와 pnpm lint 를 실행해 결과를 03_implementation_summary.md 에 기록한다.
  `
})
```

검증: 03_implementation_summary.md 존재 + typecheck/lint 결과 포함. typecheck 실패가 있으면 Phase 3을 1회 재실행. 그래도 실패면 사용자에게 보고하고 review로 진행 (review가 보류로 처리).

## Phase 4: review (reviewer)

```
Agent({
  description: "review + 리팩토링",
  subagent_type: "general-purpose",
  model: "opus",
  prompt: `
    .claude/agents/reviewer.md 의 역할에 따라 작업하라.
    입력:
    - _workspace/{screen_name}/03_implementation_summary.md
    - _workspace/{screen_name}/02_todo.md (행동 명세를 수동 검수 체크리스트로 사용)
    - 변경된 모든 src/ 파일
    출력:
    - 리팩토링이 적용된 src/ 파일들
    - _workspace/{screen_name}/04_review.md

    먼저 다음을 읽어라:
    - .claude/agents/reviewer.md
    - .claude/skills/screen-dev/references/code-style.md
    - .claude/skills/screen-dev/references/architecture.md
    - CLAUDE.md (4대 원칙)
    - 변경된 파일 전체

    각 리팩토링 적용 후 pnpm typecheck 로 회귀 확인.
    실패하면 즉시 되돌리고 "보류"로 분류.
    최종 검증: pnpm typecheck, pnpm lint
    동작 확인은 자동 검증이 아닌 사용자가 dev 서버에서 수행한다 — 04_review.md에 권장 수동 시나리오를 명시한다.
  `
})
```

검증: 04_review.md 존재.

## 최종 출력

Phase 4 완료 후 사용자에게 보여줄 것:

1. `_workspace/{screen_name}/04_review.md` 의 핵심 섹션 (요약, 적용한 리팩토링, 보류 항목, 검증 결과, 변경 요약, 권장 수동 검수 시나리오, 다음 단계 제안)을 본문으로 출력
2. 화면 이름과 추가된 라우트 경로
3. 작성된 파일 수와 typecheck/lint 결과
4. 보류 항목이 있으면 사용자에게 결정 요청

## 데이터 흐름

| Phase | 입력 | 출력 | 다음에 전달 |
|-------|------|------|-------------|
| 1 plan | screen_description, scenario | 01_plan.md | 모든 다음 단계 |
| 2 todo | 01_plan.md | 02_todo.md | 3, 4 |
| 3 implement | 01, 02 | src/ 파일들 + 03_implementation_summary.md | 4 |
| 4 review | 02, 03 + src/ 파일들 | 갱신된 src/ + 04_review.md | 사용자 |

## 에러 핸들링

| 에러 유형 | 처리 |
|-----------|------|
| Phase 1 미해결 질문 발생 | 사용자에게 질문 → 답 반영해 Phase 1만 재실행 (1회) |
| Phase 3 typecheck 실패 지속 (5회 후) | 03_implementation_summary.md "미해결" 기록, Phase 4로 진행 (review가 처리) |
| Phase 4 리팩토링 후 typecheck 깨짐 | 즉시 되돌리고 "보류"로 분류 |
| Phase 4 lint 실패 | 04_review.md에 기록, 사용자에게 보고 |

각 Phase 시작 전 이전 Phase의 출력 파일이 존재하는지 확인. 없으면 해당 Phase부터 재실행.

## 작업 디렉토리 규칙

- 중간 산출물: `_workspace/{screen_name}/` (보존, 사후 검증/감사용)
- 실제 코드: `src/` (사용자 프로젝트 정상 위치)
- 백업: `_workspace/{screen_name}_prev_{YYYYMMDD}/` (전체 재실행 시)

## 후속 작업 패턴

사용자가 "이 화면 다시", "{단계}만 다시" 라고 하면:

1. `_workspace/{screen_name}/` 존재 확인
2. 어느 단계부터 다시 할지 결정 (사용자 발화 분석 + Phase 0 매핑)
3. 해당 단계만 재실행 (이전 단계 산출물은 입력으로 재사용)
4. 영향받는 후속 단계도 자동 재실행

예: "review 다시" → Phase 4만 재실행 (1~3의 산출물 그대로 사용)
예: "todo부터 다시" → Phase 2~4 재실행
예: "plan을 이렇게 바꿔서 다시" → Phase 0이 사용자 입력 감지 → 전체 재실행 (이전을 _prev_로 백업)

## 테스트 시나리오

### 정상 흐름
사용자: "로그인 화면 만들어줘. 이메일/비밀번호 입력하고 버튼 누르면 백엔드에 POST /auth/login 호출. 성공하면 홈으로 가고 실패하면 에러 메시지."

→ screen_name: `login`, screen_description: 텍스트, scenario: 명시됨
→ Phase 1~4 자동 진행
→ 최종 산출물: src/screens/LoginScreen.tsx, src/components/auth/LoginForm.tsx, src/hooks/useLoginMutation.ts, src/api/auth.ts, src/types/auth.ts, router 수정
→ 사용자에게 04_review.md 요약 출력

### 후속 흐름
사용자: "로그인 화면 review 다시 — 폼 검증 추가됐으면 좋겠어"

→ Phase 0이 _workspace/login/ 존재 + "review 다시" 키워드 감지
→ 사용자 추가 요구는 review로 충분하지 않음 (plan에 검증 규칙 없음) → todo부터 재실행 결정
→ Phase 2~4 재실행
