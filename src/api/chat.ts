import { apiClient } from './client';
import type { ChatMessage, ChatRoom, SendMessagePayload } from '../types/chat';

/** 채팅방 목록 — 본인 userId 필요 (placeholder: useAuthStore.userId) */
export async function getChatRooms(userId: number): Promise<ChatRoom[]> {
  const { data } = await apiClient.get<ChatRoom[]>('/api/chat/rooms', {
    params: { userId },
  });
  return data;
}

/** 채팅방 생성/획득 (멱등) */
export async function createChatRoom(
  user1Id: number,
  user2Id: number,
): Promise<ChatRoom> {
  const { data } = await apiClient.post<ChatRoom>('/api/chat/rooms', null, {
    params: { user1Id, user2Id },
  });
  return data;
}

export async function getChatMessages(roomId: number): Promise<ChatMessage[]> {
  const { data } = await apiClient.get<ChatMessage[]>(
    `/api/chat/rooms/${roomId}/messages`,
  );
  return data;
}

/** 파일 업로드 — 응답은 GCS Signed URL(7일) 문자열 */
export async function uploadChatFile(
  roomId: number,
  file: File,
): Promise<string> {
  const form = new FormData();
  form.append('file', file);
  const { data } = await apiClient.post<string>(
    `/api/chat/rooms/${roomId}/files`,
    form,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
  return data;
}

/**
 * @deprecated 백엔드는 STOMP `/pub/chat/message`만 지원. 별도 WebSocket 작업 영역.
 * 호출 시 throw — 호출부는 안내 메시지 표기.
 */
export async function sendMessage(
  _payload: SendMessagePayload,
): Promise<ChatMessage> {
  throw new Error(
    'sendMessage REST is not supported by backend — use STOMP /pub/chat/message',
  );
}
