# API 통합 가이드

프론트엔드 ↔ 백엔드(`http://localhost:8080`, OpenAPI 3.1) 연결 작업의 단일 참조 문서.

> 의사결정 원칙
>
> - **프론트엔드에 없고 백엔드에 있는 것** → 프론트엔드에 기능으로 추가
> - **백엔드에 없고 프론트엔드에 있는 것** → 프론트엔드에서 제거
> - 추가 확인 영역 4가지(인증/내 userId 출처/매칭 완료 처리/WebSocket 상세)는 본 작업 범위 외 — placeholder만 마련

## 0. 공통 인프라

### 0-1. baseURL & path prefix

- `apiClient.baseURL` = `import.meta.env.VITE_API_BASE_URL` (= `http://localhost:8080`)
- 모든 호출 path는 `/api/{domain}/...` 형식
- 결정: baseURL은 호스트만, 호출부에서 `/api/...` prefix를 명시 (디버깅 용이)

### 0-2. 응답 wrapper

백엔드 모든 응답은 `ApiResponse<T> = { success: boolean, data: T, message?: string }`.

→ axios response interceptor 한 곳에서 처리:

- `success === false` → `Error(message)` throw
- 정상 시 `response.data = response.data.data`로 unwrap (호출부에서 `.data`로 접근하면 `T` 직접 받음)

### 0-3. 인증 (Google OAuth2 → JWT)

- Spring Security 기본 흐름: `GET ${API}/oauth2/authorization/google` → Google → 백엔드 callback → frontend `/auth/callback?token=<JWT>` redirect
- `/auth/callback`이 token query param 파싱(`jwt-decode`)해 `useAuthStore.login(token)` 호출 → localStorage 저장 + state 갱신 → `/home` 이동
- request interceptor가 `useAuthStore.token`을 `Authorization: Bearer` 헤더로 자동 부착
- 401 응답 시 `useAuthStore.logout()` + `/login` redirect
- 앱 시작 시 `App.tsx`의 `useAuthStore.hydrate()`가 localStorage에서 토큰 복원, 만료 시 자동 logout

### 0-4. 내 userId

- JWT payload에서 추출 (`payload.userId` 우선, 없으면 `payload.sub` 숫자 변환)
- `useAuthStore.userId`로 노출 — `useChatRoomsQuery` 등에서 query disabled 가드

---

## 1. Profile (Onboarding 포함)

### 매핑 표

| Frontend                           | Backend                                                                    |
| ---------------------------------- | -------------------------------------------------------------------------- |
| (없음) `POST /onboarding/complete` | `POST /api/profiles`                                                       |
| (없음)                             | `GET /api/profiles/me`                                                     |
| (없음)                             | `PUT /api/profiles/me`                                                     |
| (없음)                             | `PUT /api/profiles/me/image` (multipart)                                   |
| (없음)                             | `GET /api/profiles/{profileId}`                                            |
| `searchUsers()` → `/match/search`  | `GET /api/profiles?keyword=&techStack=&sameUniversity=&grade=&page=&size=` |

### 타입 매핑 (`OnboardingProfile` → `ProfileCreateRequest`)

| Frontend 필드                       | Backend 필드                   | 비고                                                       |
| ----------------------------------- | ------------------------------ | ---------------------------------------------------------- |
| `name`                              | `name`                         | 동일                                                       |
| `bio`                               | `introduction`                 | 이름 변경                                                  |
| `interests: Interest[]` (한글)      | `fields: Field[]` (영문 enum)  | 매핑 테이블 필요                                           |
| `major: 'major'\|'non-major'\|null` | `major: boolean`               | 변환: `'major' → true`, `'non-major' → false`              |
| `techStack: string[]`               | `techStacks: string[]`         | 복수형                                                     |
| `school: string`                    | `university: string`           | 이름 변경                                                  |
| `grade: '1학년' \| ...`             | `grade: 'YEAR_1' \| ...`       | 매핑 테이블                                                |
| `career: string`                    | `careers: string[]`            | 줄바꿈/`,` split or 단일 원소 배열                         |
| `projects: string`                  | `projectExperiences: string[]` | 동상                                                       |
| `goals`                             | `goal`                         | 단수                                                       |
| (없음)                              | `link: string`                 | 옵션 — 선택 추가                                           |
| `role`                              | (없음)                         | 백엔드에 role 개념 없음 — store에는 보관, payload엔 미포함 |

### enum 매핑 테이블 (정확)

```ts
// Interest 한글 → Field 영문
const FIELD_MAP = {
  백엔드: 'BACKEND',
  프론트엔드: 'FRONTEND',
  'AI/에이전트': 'AI_AGENT',
  'UI/UX': 'UI_UX',
  'PM/기획': 'PLANNING_PM',
  임베디드: 'EMBEDDED',
  Android: 'ANDROID',
  iOS: 'IOS',
  게임: 'GAME',
  그래픽스: 'GRAPHICS',
} as const;

// Grade 한글 → 백엔드 enum
const GRADE_MAP = {
  '1학년': 'YEAR_1',
  '2학년': 'YEAR_2',
  '3학년': 'YEAR_3',
  '4학년 이상': 'YEAR_4_OR_MORE',
} as const;
```

### 추가 구현 (frontend에 없음)

- 내 프로필 조회/수정 화면
- 프로필 이미지 업로드 UI
- 다른 프로필 단건 조회 (`/api/profiles/{id}`) — `MatchDetailScreen` 보강

---

## 2. Match

### 매핑 표

| Frontend                                              | Backend                                                      |
| ----------------------------------------------------- | ------------------------------------------------------------ |
| `requestMatch()` → `/match/request`                   | `POST /api/matches`                                          |
| `getMatches('upcoming'\|'past')` → `/matches?status=` | `GET /api/matches/sent` + `GET /api/matches/received` (분리) |
| (없음)                                                | `PATCH /api/matches/{id}/approve` (수신자 승인)              |
| (없음)                                                | `PATCH /api/matches/{id}/reject` (수신자 거절)               |
| `getRecommendedUsers()` → `/match/recommendations`    | **백엔드 없음 — 제거**                                       |
| `toggleBookmark()` → `/match/bookmark`                | **백엔드 없음 — 제거**                                       |
| `endMatch()` → `/matches/{id}/end`                    | **백엔드 없음 — 제거**                                       |
| `searchUsersCount()` → `/match/search/count`          | **별도 endpoint 없음 — Page 응답의 `totalElements` 사용**    |

### `MatchRequest` payload

| Frontend (`MatchRequestPayload`)         | Backend (`MatchRequest`)                              |
| ---------------------------------------- | ----------------------------------------------------- |
| `targetUserId: string`                   | `receiverId: number`                                  |
| `reason: string`                         | `reason: string`                                      |
| `requirement: string`                    | `requirements: string` (복수)                         |
| `preference: 'online'\|'offline'\|'any'` | `preferredMode: 'ONLINE'\|'OFFLINE'\|'NO_PREFERENCE'` |
| `preferredDate: string\|null`            | `preferredDate: string` (옵션)                        |

### Status enum

- `Match.status`: `PENDING`, `APPROVED`, `REJECTED`
- 매칭 완료(COMPLETED) 처리는 백엔드 spec에 없음 — 추가 확인 영역
- Frontend의 `MeetingStatus: 'upcoming'\|'past'`는 사실 schedule 개념 → schedule API로 이동

### 응답 (`MatchResponse`)

`{ id, applicantId, receiverId, reason, requirements, preferredMode, preferredDate, status, chatRoomId, createdAt }`

### 추가 구현

- 받은 매칭 목록 화면 (sent/received 분리)
- 승인/거절 버튼 + mutation
- 매칭 신청 응답의 `chatRoomId`로 채팅방 진입 (이미 흐름 있음)

### 제거

- `useRecommendedUsersQuery` + 호출부(`HomeScreen` 추천 카드 영역)
- `useBookmarkMutation` + UI(`HomeScreen`/`SearchResultsScreen` 북마크 버튼)
- `useEndMatchMutation` + UI(`MatchesScreen` 매칭 종료 버튼/모달)
- `useSearchCountQuery` + 별도 호출 (검색 결과 응답에서 `totalElements` 추출)

---

## 3. Schedule (Match 일급 자원)

### 매핑 표

| Frontend                                                    | Backend                                    |
| ----------------------------------------------------------- | ------------------------------------------ |
| `updateSchedule()` → `/chat/rooms/{matchId}/schedule` PATCH | `POST/PUT /api/matches/{matchId}/schedule` |
| (없음)                                                      | `GET /api/matches/schedules/upcoming`      |
| (없음)                                                      | `GET /api/matches/schedules/past`          |

### `ScheduleRequest` payload (특이점)

- `scheduledTime` 은 `LocalTime` 객체: `{ hour, minute, second, nano }`
- 변환 헬퍼:
  ```ts
  function toLocalTime(hhmm: string): {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  } {
    const [h, m] = hhmm.split(':').map(Number);
    return { hour: h, minute: m, second: 0, nano: 0 };
  }
  ```

### 도메인 분리

- 채팅 메시지 안의 schedule card → schedule API 응답으로 별도 fetch + 채팅 위에 별도 영역 표시
- `ScheduleCardMessage` 메시지 타입 제거
- `Schedule.status` (`'proposed'\|'confirmed'\|'completed'\|'cancelled'`) — 백엔드에 없음 → 제거 또는 클라이언트 추정 로직

### 추가 구현

- 일정 제안/수정 UI를 `MatchDetailScreen`에 통합
- 다가오는 일정 / 지난 일정 목록 (`MatchesScreen` 또는 `HomeScreen`)

### 제거

- `src/api/chat.ts`의 `updateSchedule`
- `src/types/chat.ts`의 `ScheduleCardMessage`, `Schedule.status`

---

## 4. Chat

### 매핑 표

| Frontend                                                      | Backend                                                               |
| ------------------------------------------------------------- | --------------------------------------------------------------------- |
| `getChatRooms()` → `/chat/rooms` (no params)                  | `GET /api/chat/rooms?userId={내 userId}`                              |
| `getChatMessages(matchId)` → `/chat/rooms/{matchId}/messages` | `GET /api/chat/rooms/{roomId}/messages` (matchId ≠ roomId)            |
| `sendMessage()` → `/chat/rooms/{matchId}/messages` POST       | **REST 없음 — STOMP `/pub/chat/message`** (별도 작업)                 |
| (없음)                                                        | `POST /api/chat/rooms?user1Id=&user2Id=` (수동 생성, 멱등)            |
| (없음)                                                        | `POST /api/chat/rooms/{roomId}/files` (multipart, GCS 7일 Signed URL) |

### Chat 식별자 정정

- 현재: `matchId`를 채팅방 ID로 사용
- 백엔드: 채팅방은 별도 `roomId` (number). `MatchResponse.chatRoomId`로 받음

### 메시지 schema

| Frontend (`ChatMessage` union)                                 | Backend (`ChatMessageResponse`)         |
| -------------------------------------------------------------- | --------------------------------------- |
| `messageId, matchId, senderId, createdAt, type, text/schedule` | `id, roomId, senderId, content, sentAt` |
| union (text + schedule card)                                   | 단순 text — schedule은 별도 도메인      |

### 추가 구현

- 채팅방 파일 업로드 hook + UI(이미 `paperclip.svg` 추가됨)
- 채팅방 수동 생성 hook (드물지만 옵션)

### 제거

- `useSendMessageMutation`의 REST 구현 — STOMP 전환 대기로 표시(주석 + 미사용 처리)
- `src/api/chat.ts`의 `updateSchedule` (Match 도메인으로 이동, 위 §3 참조)

### 변경

- `ChatRoom.matchId` → `roomId: number`로 필드명/타입 변경
- 모든 chat hook param `matchId` → `roomId`로 변경
- `getChatRooms()` 시그니처에 본인 `userId` 인자 추가 (placeholder)

---

## 5. Review

### 매핑 표

| Frontend                                            | Backend                                            |
| --------------------------------------------------- | -------------------------------------------------- |
| `submitReview()` → `/matches/{matchId}/review` POST | `POST /api/reviews` (path 없음, body에 scheduleId) |
| (없음)                                              | `GET /api/reviews/written` (내가 쓴)               |
| (없음)                                              | `GET /api/reviews/received` (내가 받은)            |

### `ReviewCreateRequest` payload

| Frontend (`ReviewPayload`)           | Backend                                          |
| ------------------------------------ | ------------------------------------------------ |
| `matchId`                            | `scheduleId`                                     |
| `rating: number` (0~5)               | `satisfaction: number` (1~5, **min 1 required**) |
| `oneLineReview` (max 100, 빈값 허용) | `oneLineReview` (max 100, **required**)          |
| `detail`                             | `mainContent`                                    |

### UI 영향

- 평점 0 허용 분기 제거 (백엔드는 1~5 강제)
- 한 줄 리뷰 빈값 검증 추가
- `ReviewScreen.tsx`에서 `matchId` 대신 `scheduleId` 받도록 시그니처 변경 (라우팅도 수정)

### 추가 구현 (마이페이지 도입 시)

- 내가 쓴 리뷰 / 받은 리뷰 목록

---

## 6. ActivityReport

### 매핑 표

| Frontend                                                        | Backend                                                                                     |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `submitReport()` → `/matches/{matchId}/report` (multipart 한번) | `POST /api/reports` (JSON) → `POST /api/reports/{id}/attachment` (multipart, **단일 파일**) |
| (없음)                                                          | `GET /api/reports/my`                                                                       |
| (없음)                                                          | `GET /api/reports/{reportId}`                                                               |
| (없음)                                                          | `PUT /api/reports/{reportId}` (수정)                                                        |

### Payload 매핑

| Frontend         | Backend                                      |
| ---------------- | -------------------------------------------- |
| `matchId` (path) | `scheduleId` (body)                          |
| `insights`       | `insights`                                   |
| `nextGoals`      | `nextGoal` (단수)                            |
| `files: File[]`  | `file: File` (**단일**, attachment endpoint) |

### UI 영향

- `ReportScreen.tsx` 다중 파일 첨부 → 단일 파일 첨부로 축소
- 제출 흐름: `submitReport` → reportId → 파일 있으면 `uploadAttachment(reportId, file)` 2단계

### 추가 구현 (마이페이지 도입 시)

- 내 보고서 목록/상세/수정

---

## 7. Search 화면 정합

### 파라미터 매핑

| Frontend (`SearchUsersParams`)    | Backend (`/api/profiles` query)         |
| --------------------------------- | --------------------------------------- |
| `keyword`                         | `keyword`                               |
| `role: 'all'\|'mentor'\|'mentee'` | **백엔드에 role 개념 없음 — 제거**      |
| `techStack: string[]` (배열)      | `techStack: string` (단일)              |
| `grades: Grade[]` (배열)          | `grade: enum` (단일)                    |
| (없음)                            | `sameUniversity: boolean` (옵션)        |
| (없음)                            | `pageable: { page, size, sort }` (필수) |

### 응답

- 현재: `{ total, users[] }` 단순
- 백엔드: `Page<ProfileResponse>` (`totalPages, totalElements, content[], number, size, last, ...`)
- → frontend 타입을 `Page<MatchUserSummary>` 형태로 변경, infinite scroll 또는 페이지네이션 UI 결정 필요

### UI 영향

- 검색 필터에서 멘토/멘티 토글 제거 (백엔드 미지원)
- 기술스택/학년 다중선택 → 단일 선택 (또는 클라이언트 다중→첫 값만 전송)
- "같은 학교" 토글 추가
- 검색 결과 카운트는 응답의 `totalElements` 직접 사용 — 별도 count API 호출 제거

### 추가 보완

- `ProfileResponse`의 풍부한 필드(`fields`, `university`, `grade`, `averageRating`, `reviewCount` 등)를 검색 카드/상세에 반영

---

## 8. ID 타입 (전반)

- 거의 모든 ID가 `string`으로 처리 중 (mock 친화적)
- 백엔드 `integer/int64` (Java Long, 안전 범위 2^53 이내)
- 점진 마이그레이션 권장: 도메인 타입 `number`로, React Router URL param은 string ↔ number 변환

---

## 9. 작업 분담 (Agent Team)

| 에이전트           | 담당                                                                                                                                          |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **infra**          | §0 공통 인프라 (apiClient interceptor + auth/userId placeholder), 미사용 mock/hook 정리 (recommendations / bookmark / endMatch / searchCount) |
| **profile-domain** | §1 Profile (onboarding 매핑 + 내 프로필/이미지)                                                                                               |
| **match-schedule** | §2 + §3 Match + Schedule (sent/received 분리, approve/reject UI, schedule 도메인 분리, MatchDetailScreen 통합)                                |
| **chat-domain**    | §4 Chat (roomId 도입, 파일 업로드, sendMessage REST 제거 마킹)                                                                                |
| **review-report**  | §5 + §6 Review + Report (payload/endpoint 매핑, Report 2단계, satisfaction 검증)                                                              |
| **search-domain**  | §7 Search (Page 응답, 필터 정합, role 토글 제거, sameUniversity 추가)                                                                         |

infra가 먼저 완료되어야 다른 에이전트가 일관된 client 사용 가능. 나머지는 병렬 가능.

---

## 10. 검증 / 완료 기준

- `pnpm typecheck` ✓
- `pnpm lint` 0 errors
- 각 도메인별로 화면 동작 시나리오 확인 (mock fallback 제거 후에도 정상 동작 — 백엔드 미가동 시 적절 에러 표시)
- 본 문서가 코드와 끝까지 정합성 유지될 것 (변경 시 함께 갱신)

---

## 11. Mock 환경 (개발)

### 11-1. 활성 방법

`.env`에 `VITE_USE_MOCK=true` 설정 후 `pnpm dev`. 앱 마운트 전에 `src/main.tsx`가 동적 import로 MSW worker를 시작한다 (`onUnhandledRequest: 'bypass'`). 콘솔에 `[MSW] Mocking enabled.` 메시지가 뜨면 정상.

`VITE_USE_MOCK`이 `false`거나 미정의면 worker는 시작하지 않고 평소대로 `VITE_API_BASE_URL`로 호출한다.

### 11-2. 인증 흐름

Mock 모드에서는 실제 Google OAuth로 redirect하면 백엔드가 없어 진행 불가하므로, `/login` 버튼 클릭 시 `getGoogleLoginUrl()`이 즉석 가짜 JWT(`alg: none`, `userId: 1`, 24h exp)를 만들어 `${origin}/auth/callback?token=<jwt>`로 직접 navigate한다. 이후 `AuthCallbackScreen`이 토큰을 파싱하고 `useAuthStore.login`을 호출 → `/home` 진입.

### 11-3. Mock된 endpoint

| 도메인   | endpoint                                                   | 비고                         |
| -------- | ---------------------------------------------------------- | ---------------------------- |
| Profile  | `GET/PUT /api/profiles/me`, `PUT /api/profiles/me/image`   | me는 id=1 (`김민준`)         |
|          | `GET /api/profiles/{id}`, `GET /api/profiles?...`          | keyword/techStack/grade 필터 |
| Match    | `POST /api/matches`, `GET /api/matches/{sent,received}`    | me=1 기준 분리               |
|          | `PATCH /api/matches/{id}/{approve,reject}`                 |                              |
|          | `POST/PUT /api/matches/{id}/schedule`                      |                              |
| Schedule | `GET /api/matches/schedules/{upcoming,past}`               | 오늘 기준 분기               |
| Chat     | `GET /api/chat/rooms?userId=`, `POST /api/chat/rooms`      | 멱등                         |
|          | `GET /api/chat/rooms/{id}/messages`                        | 시간 오름차순                |
|          | `POST /api/chat/rooms/{id}/files` (multipart)              | 가짜 GCS URL                 |
| Review   | `POST /api/reviews`, `GET /api/reviews/{written,received}` |                              |
| Report   | `POST /api/reports`, `POST /api/reports/{id}/attachment`   |                              |
|          | `PUT /api/reports/{id}`, `GET /api/reports/{my,id}`        |                              |

응답은 모두 `ApiResponse<T>` wrapper 형태로 내려가며 `apiClient` interceptor가 자동 unwrap.

### 11-4. 한계

- 채팅 메시지 송신은 STOMP `/pub/chat/message` 영역이라 mock 안 됨 — `useSendMessageMutation` 호출 시 여전히 throw.
- 파일 업로드 응답 URL은 가짜(`https://example.com/file/<uuid>`)라 실제 파일 내려받기 불가.
- 데이터는 메모리 저장 → 새로고침 시 fixtures 초기 상태로 리셋.
- mock 모드 JWT는 `alg: none`이라 절대 prod에 노출되지 않게 — `VITE_USE_MOCK` 토글로만 제어.

### 11-5. `public/mockServiceWorker.js`

MSW가 요구하는 워커 스크립트로, 빌드 산출물이 아닌 **소스의 일부**로 commit한다 (gitignore X). MSW 버전 업그레이드 시 `pnpm exec msw init public/`로 재생성.
