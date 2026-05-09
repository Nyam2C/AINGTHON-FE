import type { Role } from './onboarding';

export type MeetingStatus = 'upcoming' | 'past';

export type Meeting = {
  matchId: string;
  partnerUserId: string;
  partnerName: string;
  partnerRole: Role;
  title: string; // "커피챗", "백엔드 스터디"
  date: string; // 'YYYY-MM-DD'
  time: string; // 'HH:mm'
  location: string;
  status: MeetingStatus;
  reviewed?: boolean; // 과거 카드 — 리뷰 작성 여부
  ended?: boolean; // 매칭 종료 여부
};
