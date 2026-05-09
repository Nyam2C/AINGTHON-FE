import type { GradeEnum, ProfileResponse } from './profile';

/** 매칭 상태 */
export type MatchStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

/** 매칭 신청 시 선호 방식 */
export type PreferredMode = 'ONLINE' | 'OFFLINE' | 'NO_PREFERENCE';

/** Spring Page 응답 */
export type Page<T> = {
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
  size: number;
  content: T[];
  number: number;
  numberOfElements: number;
  empty: boolean;
};

/** 검색 역할 필터 */
export type RoleFilter = 'all' | 'mentor' | 'mentee';

/** 검색 요청 파라미터 (백엔드 `/api/profiles` query) */
export type SearchProfilesParams = {
  keyword?: string;
  techStack?: string;
  role?: RoleFilter;
  sameUniversity?: boolean;
  grade?: GradeEnum;
  page?: number;
  size?: number;
  sort?: string[];
};

/** 검색 결과 응답 */
export type SearchProfilesResponse = Page<ProfileResponse>;

/** 호환을 위한 alias (점진 제거 — 화면은 ProfileResponse 직접 사용 권장) */
export type MatchUserSummary = ProfileResponse;
export type MatchUser = ProfileResponse;

/** 매칭 신청 폼 입력값 (서버 payload) */
export type MatchRequestPayload = {
  receiverId: number;
  reason: string;
  requirements?: string;
  preferredMode: PreferredMode;
  preferredDate?: string; // YYYY-MM-DD
};

/** 매칭 응답 */
export type MatchResponse = {
  id: number;
  applicantId: number;
  receiverId: number;
  reason: string;
  requirements?: string;
  preferredMode: PreferredMode;
  preferredDate?: string;
  status: MatchStatus;
  chatRoomId: number;
  createdAt: string;
};

/** 추천 키워드 — 검색 화면 정적 상수 */
export const SEARCH_RECOMMENDED_KEYWORDS: readonly string[] = [
  '취업',
  '프론트엔드',
  'AI',
  '포트폴리오',
  '백엔드',
  'UXUI',
] as const;
