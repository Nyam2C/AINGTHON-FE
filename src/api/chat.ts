import { apiClient } from './client';
import {
  getMockChatMessages,
  getMockChatRooms,
  getMockSendMessage,
  getMockUpdateSchedule,
} from './chat.mock';
import type {
  ChatMessage,
  ChatRoom,
  ScheduleCardMessage,
  SendMessagePayload,
  UpdateSchedulePayload,
} from '../types/chat';

// match.ts 패턴 계승: 백엔드 미가동 환경에서도 플로우 검증이 가능하도록
// 실패 시 mock fallback. 백엔드 연동 후 try/catch와 fallback 분기 제거.
function warnFallback(label: string, error: unknown) {
  console.warn(`${label} fallback to mocks (backend unavailable)`, error);
}

export async function getChatRooms(): Promise<ChatRoom[]> {
  try {
    const { data } = await apiClient.get<ChatRoom[]>('/chat/rooms');
    return data;
  } catch (error) {
    warnFallback('getChatRooms', error);
    return getMockChatRooms();
  }
}

export async function getChatMessages(matchId: string): Promise<ChatMessage[]> {
  try {
    const { data } = await apiClient.get<ChatMessage[]>(
      `/chat/rooms/${encodeURIComponent(matchId)}/messages`,
    );
    return data;
  } catch (error) {
    warnFallback('getChatMessages', error);
    return getMockChatMessages(matchId);
  }
}

export async function sendMessage(
  payload: SendMessagePayload,
): Promise<ChatMessage> {
  try {
    const { data } = await apiClient.post<ChatMessage>(
      `/chat/rooms/${encodeURIComponent(payload.matchId)}/messages`,
      { text: payload.text },
    );
    return data;
  } catch (error) {
    warnFallback('sendMessage', error);
    return getMockSendMessage(payload);
  }
}

export async function updateSchedule(
  payload: UpdateSchedulePayload,
): Promise<ScheduleCardMessage> {
  const { matchId, ...body } = payload;
  try {
    const { data } = await apiClient.patch<ScheduleCardMessage>(
      `/chat/rooms/${encodeURIComponent(matchId)}/schedule`,
      body,
    );
    return data;
  } catch (error) {
    warnFallback('updateSchedule', error);
    return getMockUpdateSchedule(payload);
  }
}
