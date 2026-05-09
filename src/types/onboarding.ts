import type { Field, GradeEnum } from './profile';

/** 사용자 역할 */
export type Role = 'mentor' | 'mentee' | 'both';

/** 전공 여부 */
export type Major = 'major' | 'non-major';

/** 학년 */
export type Grade = '1학년' | '2학년' | '3학년' | '4학년 이상';

/** 관심 분야 (캡처 기반 10개) */
export type Interest =
  | '백엔드'
  | '프론트엔드'
  | 'AI/에이전트'
  | 'UI/UX'
  | 'PM/기획'
  | '임베디드'
  | 'Android'
  | 'iOS'
  | '게임'
  | '그래픽스';

/** 관심 분야 옵션 상수 (UI에서 순회 렌더 시 사용) */
export const INTEREST_OPTIONS: readonly Interest[] = [
  '백엔드',
  '프론트엔드',
  'AI/에이전트',
  'UI/UX',
  'PM/기획',
  '임베디드',
  'Android',
  'iOS',
  '게임',
  '그래픽스',
] as const;

/** 학년 옵션 상수 */
export const GRADE_OPTIONS: readonly Grade[] = [
  '1학년',
  '2학년',
  '3학년',
  '4학년 이상',
] as const;

/** Interest(한글) → Field(백엔드 enum) 매핑 */
export const FIELD_MAP: Record<Interest, Field> = {
  '백엔드': 'BACKEND',
  '프론트엔드': 'FRONTEND',
  'AI/에이전트': 'AI_AGENT',
  'UI/UX': 'UI_UX',
  'PM/기획': 'PLANNING_PM',
  '임베디드': 'EMBEDDED',
  Android: 'ANDROID',
  iOS: 'IOS',
  '게임': 'GAME',
  '그래픽스': 'GRAPHICS',
};

/** Grade(한글) → 백엔드 enum 매핑 */
export const GRADE_MAP: Record<Grade, GradeEnum> = {
  '1학년': 'YEAR_1',
  '2학년': 'YEAR_2',
  '3학년': 'YEAR_3',
  '4학년 이상': 'YEAR_4_OR_MORE',
};

/** 자기소개 폼 입력값 (draft 단계) */
export type OnboardingProfile = {
  name: string;
  bio: string;
  interests: Interest[];
  major: Major | null;
  techStack: string[];
  career: string;
  university: string;
  grade: Grade | null;
  projects: string;
  goals: string;
};

/** 서버 제출용 페이로드 */
export type OnboardingPayload = OnboardingProfile & {
  role: Role;
};
