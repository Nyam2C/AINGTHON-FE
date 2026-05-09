import type { Role } from './onboarding';

/** schedule 분류 의미 — upcoming / past 일정 */
export type MeetingStatus = 'upcoming' | 'past';

export type Meeting = {
  scheduleId: number;
  matchId: number;
  partnerUserId: number;
  partnerName: string;
  partnerRole: Role;
  title: string;
  date: string; // 'YYYY-MM-DD'
  time: string; // 'HH:mm'
  location: string;
  status: MeetingStatus;
  reviewed?: boolean;
};
