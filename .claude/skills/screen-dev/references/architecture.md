# 아키텍처 가이드 (AINGTHON-FE)

`plan.md`의 폴더 구조와 기술 스택을 코드 작성 시 강제하기 위한 참조 문서.

## 기술 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | React 19 + Vite |
| 언어 | TypeScript |
| 상태관리 | Zustand |
| 스타일링 | Tailwind CSS |
| 라우팅 | react-router-dom v7 |
| API 통신 | Axios + TanStack Query v5 |
| 테스트 | Vitest (+ @testing-library/react) |
| 패키지 매니저 | pnpm |

## 폴더 배치 규칙

```
src/
├── app/              # 라우터, 전역 Provider (RootProvider, router 등)
├── screens/          # 페이지 컴포넌트 (라우트 단위 1:1)
├── components/
│   ├── common/       # 2개 이상의 화면이 공유하는 UI
│   └── [feature]/    # 특정 화면/기능 전용 UI (예: components/auth/)
├── hooks/            # 비즈니스 로직 훅 (useXXXQuery, useXXXMutation, 폼 훅 등)
├── store/            # Zustand 전역 상태 (useAuthStore.ts 등)
├── api/              # Axios 인스턴스, API 호출 함수 (auth.ts, user.ts 등)
├── types/            # 도메인 타입 정의
└── utils/            # 순수 유틸 함수
```

### 배치 의사결정 트리

1. **라우트 단위 페이지인가?** → `screens/`
2. **2개 이상 화면에서 사용되는가?** → `components/common/`
3. **특정 화면 전용 UI인가?** → `components/[feature]/`
4. **API 호출/캐시 로직?** → `hooks/use*Query.ts` 또는 `hooks/use*Mutation.ts`
5. **순수 fetch 함수?** → `api/[domain].ts`
6. **앱 전역 상태?** → `store/use*Store.ts`
7. **컴포넌트 무관 순수 함수?** → `utils/`
8. **타입만?** → 단일 파일에서만 쓰면 해당 파일에, 도메인 공용이면 `types/`

## 명명 규칙

| 대상 | 규칙 | 예 |
|------|------|------|
| 컴포넌트 파일 | `PascalCase.tsx` | `LoginForm.tsx` |
| 화면 파일 | `*Screen.tsx` | `LoginScreen.tsx` |
| 훅 파일 | `useXxx.ts` | `useLoginMutation.ts` |
| 스토어 파일 | `useXxxStore.ts` | `useAuthStore.ts` |
| API 파일 | 도메인 단수/복수 그대로 | `api/auth.ts` |
| 타입 파일 | `xxx.ts` (소문자) | `types/user.ts` |
| 테스트 파일 | 대상 옆에 `.test.tsx` | `LoginForm.test.tsx` |

## 데이터 흐름 표준

```
View (screens / components)
   ↓ 호출
Hook (hooks/useXxxQuery, useXxxMutation)
   ↓ 호출
API 함수 (api/xxx.ts)
   ↓ HTTP
Backend (Spring)
```

- **컴포넌트는 axios를 직접 import 하지 않는다.** 항상 hook → api 함수 경유.
- **TanStack Query 사용:** 서버 상태는 `useQuery`/`useMutation`으로 관리. 컴포넌트 안에서 `useEffect + useState + axios` 조합 금지.
- **Zustand는 클라이언트 전역 상태만:** 인증 토큰, 모달 열림 여부 등. 서버 응답 캐시로 쓰지 말 것.

## 파일 골격 예시

### screens/LoginScreen.tsx

```tsx
import { LoginForm } from '@/components/auth/LoginForm';

export function LoginScreen() {
  return (
    <div className="...">
      <LoginForm />
    </div>
  );
}
```

### hooks/useLoginMutation.ts

```ts
import { useMutation } from '@tanstack/react-query';
import { login } from '@/api/auth';

export function useLoginMutation() {
  return useMutation({
    mutationFn: login,
    // onSuccess 등은 호출부에서 옵션으로 주입
  });
}
```

### api/auth.ts

```ts
import { client } from './client';
import type { LoginRequest, LoginResponse } from '@/types/auth';

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  const { data } = await client.post<LoginResponse>('/auth/login', payload);
  return data;
}
```

## 라우터 등록

`src/app/router.tsx`에 화면을 등록한다. 화면 추가 시:
1. `screens/XxxScreen.tsx` 생성
2. `router.tsx`에 `<Route path="..." element={<XxxScreen />} />` 추가

## TanStack Query 키 컨벤션

```ts
// 도메인을 첫 요소로
['user', userId]
['posts', { page, size }]
['auth', 'me']
```

같은 도메인에서 invalidate 가능하도록 첫 요소를 일관되게.

## 금지 사항

- 컴포넌트에서 `axios` 직접 import
- `useEffect`로 서버 데이터 fetch (TanStack Query 사용)
- `any` 타입 (`unknown` 후 narrowing)
- 인라인 스타일 (Tailwind 클래스 사용)
- 화면 옆에 비즈니스 로직 직접 작성 (반드시 hook으로 분리)
