# AINGTHON-FE 아키텍처 설계서

## 기술 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | React + Vite |
| 언어 | TypeScript |
| 백엔드 | Spring (별도) |
| 상태관리 | Zustand |
| 스타일링 | Tailwind CSS |
| 라우팅 | react-router-dom |
| API 통신 | Axios + TanStack Query |
| 패키지 매니저 | pnpm |
| 린터 | oxlint |
| 포매터 | Prettier |
| Git 훅 | husky + lint-staged |
| CI/CD | GitHub Actions |
| 테스트 | Vitest |
| 환경변수 | Vite (import.meta.env) |

## 폴더 구조

```
src/
├── app/              # 라우터, 전역 Provider
├── screens/          # 페이지 컴포넌트
├── components/
│   ├── common/       # 공통 UI 컴포넌트
│   └── [feature]/    # 기능별 UI 컴포넌트
├── hooks/            # 비즈니스 로직 (TanStack Query 등)
├── store/            # Zustand 전역 상태
├── api/              # Axios 인스턴스, API 함수
├── types/            # TypeScript 타입 정의
└── utils/            # 유틸 함수
```
