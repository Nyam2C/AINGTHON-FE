import type { Field, GradeEnum } from '../types/profile';

const FIELD_LABEL: Record<Field, string> = {
  BACKEND: '백엔드',
  FRONTEND: '프론트엔드',
  UI_UX: 'UI/UX',
  AI_AGENT: 'AI/에이전트',
  PLANNING_PM: 'PM/기획',
  EMBEDDED: '임베디드',
  ANDROID: 'Android',
  IOS: 'iOS',
  GAME: '게임',
  GRAPHICS: '그래픽스',
};

const GRADE_LABEL: Record<GradeEnum, string> = {
  YEAR_1: '1학년',
  YEAR_2: '2학년',
  YEAR_3: '3학년',
  YEAR_4_OR_MORE: '4학년 이상',
};

export const fieldLabel = (f: Field) => FIELD_LABEL[f];
export const gradeLabel = (g: GradeEnum) => GRADE_LABEL[g];
