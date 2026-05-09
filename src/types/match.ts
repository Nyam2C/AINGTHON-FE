import type { Grade, Role } from './onboarding';

/** 검색 필터 역할 (전체 포함) */
export type RoleFilter = 'all' | 'mentor' | 'mentee';

/** 매칭 신청 시 선호 방식 */
export type MatchPreference = 'online' | 'offline' | 'any';

/** 후보 목록(섹션 7) / 추천(섹션 5) 요약 정보 */
export type MatchUserSummary = {
  userId: string;
  name: string;
  role: Role;
  jobTitle: string;
  rating: number;
  ratingCount: number;
  bookmarked: boolean;
  avatarUrl?: string;
};

/** 상대 상세(섹션 8) 응답 */
export type MatchUser = MatchUserSummary & {
  introLink: string;
  goal: string;
  techStack: string[];
  projects: string;
  career: string;
  interests: string[];
};

/** 검색 요청 파라미터 */
export type SearchUsersParams = {
  keyword?: string;
  role?: RoleFilter;
  techStack?: string[];
  grades?: Grade[];
};

/** 매칭 신청 폼 입력값 (서버 payload) */
export type MatchRequestPayload = {
  targetUserId: string;
  reason: string;
  requirement: string;
  preference: MatchPreference;
  preferredDate: string | null;
};

/** 매칭 신청 응답 */
export type MatchRequestResponse = {
  matchRequestId: string;
  chatRoomId?: string;
};

/** 북마크 토글 */
export type BookmarkPayload = { userId: string; bookmark: boolean };
export type BookmarkResponse = { userId: string; bookmarked: boolean };

/** 검색 결과 응답 */
export type SearchUsersResponse = {
  total: number;
  users: MatchUserSummary[];
};

export type SearchCountResponse = { total: number };

/** 추천 키워드 — 검색 화면 정적 상수 */
export const SEARCH_RECOMMENDED_KEYWORDS: readonly string[] = [
  '취업',
  '프론트엔드',
  'AI',
  '포트폴리오',
  '백엔드',
  'UXUI',
] as const;
