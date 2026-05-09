import type { Role } from './onboarding';

/** 채팅방 카드용 요약 */
export type ChatRoom = {
  roomId: number;
  partnerUserId: number;
  partnerName: string;
  partnerRole: Role;
  responseHint: string;
  lastMessage?: string;
  lastMessageAt?: string;
  avatarUrl?: string;
};

/** 채팅 메시지 (단순 텍스트 — 스케줄은 별도 도메인) */
export type ChatMessage = {
  id: number;
  roomId: number;
  senderId: number;
  content: string;
  sentAt: string;
};

export type SendMessagePayload = {
  roomId: number;
  content: string;
};
