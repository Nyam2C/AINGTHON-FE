# AINGTHON-FE 아키텍처 설계서

## 기술 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | React Native |
| 언어 | TypeScript |
| 백엔드 | Spring (별도) |
| 상태관리 | Zustand |
| 스타일링 | NativeWind (Tailwind for RN) |
| 라우팅 | React Navigation |
| API 통신 | Axios + TanStack Query |
| 패키지 매니저 | pnpm |
| 린터 | oxlint |
| 포매터 | oxformat |
| Git 훅 | husky + lint-staged |
| CI/CD | GitHub Actions |
| 테스트 | Jest + React Native Testing Library |
| 환경변수 | react-native-config |

## 폴더 구조

```
src/
├── app/              # 네비게이션 설정, 앱 진입점
├── screens/          # 화면 단위 컴포넌트 (View)
├── components/
│   ├── common/       # 공통 UI 컴포넌트
│   └── [feature]/    # 기능별 UI 컴포넌트
├── hooks/            # 비즈니스 로직 (TanStack Query 등)
├── store/            # Zustand 전역 상태
├── api/              # Axios 인스턴스, API 함수
├── types/            # TypeScript 타입 정의
└── utils/            # 유틸 함수
```
