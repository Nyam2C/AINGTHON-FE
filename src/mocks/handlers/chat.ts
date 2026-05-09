import { http, HttpResponse } from 'msw';

import {
  findOrCreateRoom,
  getMessages,
  mockChatRooms,
} from '../fixtures/chats';
import { findProfile } from '../fixtures/profiles';

function ok<T>(data: T) {
  return HttpResponse.json({ success: true, data });
}

function err(status: number, message: string) {
  return HttpResponse.json({ success: false, message }, { status });
}

export const chatHandlers = [
  http.get('*/api/chat/rooms', ({ request }) => {
    const url = new URL(request.url);
    const userId = Number(url.searchParams.get('userId'));
    if (!userId) return err(400, 'userId 필요');
    // me=1 기준: partnerUserId 외 본인이 참여한 방 (mock에선 me가 모든 방 참여)
    if (userId === 1) return ok(mockChatRooms);
    const filtered = mockChatRooms.filter(r => r.partnerUserId === userId);
    return ok(filtered);
  }),

  http.post('*/api/chat/rooms', ({ request }) => {
    const url = new URL(request.url);
    const u1 = Number(url.searchParams.get('user1Id'));
    const u2 = Number(url.searchParams.get('user2Id'));
    const partner = findProfile(u1 === 1 ? u2 : u1);
    const room = findOrCreateRoom(u1, u2, partner?.name ?? '상대방');
    return ok(room);
  }),

  http.get('*/api/chat/rooms/:roomId/messages', ({ params }) => {
    const roomId = Number(params.roomId);
    const list = [...getMessages(roomId)].sort(
      (a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime(),
    );
    return ok(list);
  }),

  http.post('*/api/chat/rooms/:roomId/files', () => {
    const fakeUrl = `https://example.com/file/${crypto.randomUUID()}`;
    return ok(fakeUrl);
  }),
];
