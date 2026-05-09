import type { Field, GradeEnum } from '../types/profile';

/** 백엔드 Field enum → 한글 UI 라벨 */
export const FIELD_LABELS: Record<Field, string> = {
  BACKEND: '백엔드',
  FRONTEND: '프론트엔드',
  UI_UX: 'UXUI',
  AI_AGENT: 'AI 에이전트',
  PLANNING_PM: '기획/PM',
  EMBEDDED: '임베디드',
  ANDROID: '안드로이드',
  IOS: 'iOS',
  GAME: '게임',
  GRAPHICS: '그래픽',
};

/** FieldChipsSection의 options 인자로 그대로 전달. 백엔드 enum 순서 보존 */
export const FIELD_OPTIONS: ReadonlyArray<Field> = [
  'BACKEND',
  'FRONTEND',
  'UI_UX',
  'AI_AGENT',
  'PLANNING_PM',
  'EMBEDDED',
  'ANDROID',
  'IOS',
  'GAME',
  'GRAPHICS',
];

/** 백엔드 GradeEnum → 한글 UI 라벨 */
export const GRADE_LABELS: Record<GradeEnum, string> = {
  YEAR_1: '1학년',
  YEAR_2: '2학년',
  YEAR_3: '3학년',
  YEAR_4_OR_MORE: '4학년 이상',
};

/**
 * 헤더 부제 계산기.
 * fields[0]을 FIELD_LABELS로 변환한 뒤 ' 개발자' 접미사를 붙인다.
 * fields가 비어있으면 빈 문자열.
 */
export function buildSubtitleFromFields(fields: Field[]): string {
  const first = fields[0];
  if (!first) return '';
  return `${FIELD_LABELS[first]} 개발자`;
}
