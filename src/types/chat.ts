import type { Role } from './onboarding';

/** 채팅방 카드용 요약 */
export type ChatRoom = {
  matchId: string; // 채팅방 식별자 = 매칭 ID로 단순화
  partnerUserId: string;
  partnerName: string;
  partnerRole: Role;
  responseHint: string; // "보통 10분 이내 응답"
  lastMessage?: string;
  lastMessageAt?: string; // ISO datetime
  avatarUrl?: string;
};

/** 일정 카드의 일정 정보 */
export type Schedule = {
  scheduleId: string;
  title: string; // "첫 번째 미팅 커피챗"
  date: string; // 'YYYY-MM-DD'
  startTime: string; // 'HH:mm'
  endTime: string; // 'HH:mm'
  location: string; // "스타벅스 강남역점" 또는 "온라인 (Google Meet)"
  status: 'proposed' | 'confirmed' | 'completed' | 'cancelled';
};

/** 메시지 베이스 */
type ChatMessageBase = {
  messageId: string;
  matchId: string;
  senderId: string;
  createdAt: string; // ISO datetime
};

export type TextMessage = ChatMessageBase & {
  type: 'text';
  text: string;
};

export type ScheduleCardMessage = ChatMessageBase & {
  type: 'schedule';
  schedule: Schedule;
};

/** 메시지 유니온 */
export type ChatMessage = TextMessage | ScheduleCardMessage;

export type SendMessagePayload = {
  matchId: string;
  text: string;
};

export type UpdateSchedulePayload = {
  matchId: string;
  scheduleId: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
};

/** MVP 멘티 식별 상수 (인증 미구현 — 추후 useAuthStore.userId로 대체) */
export const MENTEE_USER_ID = 'me';
