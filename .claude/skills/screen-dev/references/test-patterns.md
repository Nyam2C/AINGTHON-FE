# 테스트 패턴 (Vitest + Testing Library)

## 환경 가정

- 테스트 러너: Vitest
- DOM: `@testing-library/react` + `@testing-library/jest-dom`
- 테스트 파일 위치: 대상 옆 `*.test.tsx` / `*.test.ts`

## 처음 사용 시 셋업 체크리스트

`package.json` `devDependencies`에 다음이 없으면 추가가 필요하다:

```
vitest
@testing-library/react
@testing-library/jest-dom
@testing-library/user-event
jsdom
```

`vite.config.ts`에 test 설정:

```ts
/// <reference types="vitest" />
export default defineConfig({
  // ...
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
  },
});
```

`src/test/setup.ts`:

```ts
import '@testing-library/jest-dom/vitest';
```

> 위 파일/패키지가 없으면 implementer가 첫 화면 개발 시 셋업하고 그 사실을 review 보고서에 기록한다.

## 테스트 종류별 패턴

### 1. 컴포넌트 렌더링 테스트

```tsx
import { render, screen } from '@testing-library/react';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  it('이메일과 비밀번호 입력 필드를 렌더링한다', () => {
    render(<LoginForm onSubmit={() => {}} />);
    expect(screen.getByLabelText('이메일')).toBeInTheDocument();
    expect(screen.getByLabelText('비밀번호')).toBeInTheDocument();
  });
});
```

### 2. 사용자 인터랙션 테스트

```tsx
import userEvent from '@testing-library/user-event';

it('제출 버튼 클릭 시 onSubmit이 입력값과 함께 호출된다', async () => {
  const onSubmit = vi.fn();
  const user = userEvent.setup();
  render(<LoginForm onSubmit={onSubmit} />);

  await user.type(screen.getByLabelText('이메일'), 'a@b.c');
  await user.type(screen.getByLabelText('비밀번호'), 'pw1234');
  await user.click(screen.getByRole('button', { name: '로그인' }));

  expect(onSubmit).toHaveBeenCalledWith({ email: 'a@b.c', password: 'pw1234' });
});
```

### 3. TanStack Query 훅 테스트

```tsx
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUserQuery } from './useUserQuery';

function wrapper({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

it('userId로 사용자 정보를 가져온다', async () => {
  // api 함수 mock
  vi.mock('@/api/user', () => ({
    fetchUser: vi.fn().mockResolvedValue({ id: '1', name: '홍길동' }),
  }));

  const { result } = renderHook(() => useUserQuery('1'), { wrapper });

  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  expect(result.current.data).toEqual({ id: '1', name: '홍길동' });
});
```

### 4. Zustand 스토어 테스트

```ts
import { useAuthStore } from './useAuthStore';

beforeEach(() => {
  useAuthStore.setState({ token: null });
});

it('login 액션이 토큰을 저장한다', () => {
  useAuthStore.getState().login('abc123');
  expect(useAuthStore.getState().token).toBe('abc123');
});
```

## TDD 작성 순서 (실패→구현→통과)

1. **실패 테스트 작성**: 대상이 만족해야 할 행동을 테스트로 명시
2. **테스트 실행**: 의도한 이유로 실패하는지 확인 (`expect(...).toBeInTheDocument()` 등)
3. **최소 구현**: 테스트가 통과하는 최소 코드
4. **다음 테스트 추가**: 다음 행동을 테스트로 추가
5. **반복**

## 테스트 케이스 도출 규칙

화면/컴포넌트 하나당 다음 카테고리에서 케이스를 뽑는다:

| 카테고리 | 예 |
|----------|-----|
| 기본 렌더링 | 필수 요소가 화면에 있는가 |
| 사용자 입력 | 입력값이 반영되는가 |
| 핵심 인터랙션 | 클릭/제출 시 의도한 함수 호출 |
| 조건부 렌더링 | 로딩/에러/빈 상태 |
| 검증/제약 | 잘못된 입력 차단 |

훅 하나당:

| 카테고리 | 예 |
|----------|-----|
| 정상 케이스 | 성공 응답 → data 반영 |
| 실패 케이스 | API 실패 → error 상태 |
| 캐시/무효화 | invalidate 후 refetch |

## 안티 패턴

- **구현 세부사항 테스트 금지**: state 이름, className 등 내부 구현이 아니라 사용자가 보는 것 기준
- **getByTestId 남용 금지**: getByRole / getByLabelText / getByText 우선
- **여러 행동을 한 it에 묶지 않기**: 1 it = 1 행동
- **act 수동 호출 금지**: userEvent와 waitFor만으로 충분
