import type { ChatMessage, ChatRoom } from '../../types/chat';

const isoNow = new Date().toISOString();

function minutesAgo(n: number): string {
  const d = new Date();
  d.setMinutes(d.getMinutes() - n);
  return d.toISOString();
}

/** Room 101 (me ↔ 이서연=2) and 102 (me ↔ 최유나=4) — match된 방 일부만 */
export const mockChatRooms: ChatRoom[] = [
  {
    roomId: 101,
    partnerUserId: 2,
    partnerName: '이서연',
    partnerRole: 'mentor',
    responseHint: '평소 1시간 내 응답',
    lastMessage: '네, 일정 확정되면 말씀드릴게요!',
    lastMessageAt: minutesAgo(15),
    avatarUrl: 'https://i.pravatar.cc/150?u=2',
  },
  {
    roomId: 102,
    partnerUserId: 4,
    partnerName: '최유나',
    partnerRole: 'mentor',
    responseHint: '오후에 자주 활동',
    lastMessage: '강남역에서 뵐게요.',
    lastMessageAt: minutesAgo(120),
    avatarUrl: 'https://i.pravatar.cc/150?u=4',
  },
];

export const mockChatMessages: Record<number, ChatMessage[]> = {
  101: [
    {
      id: 1001,
      roomId: 101,
      senderId: 1,
      content: '안녕하세요! 매칭 신청드린 김민준입니다.',
      sentAt: minutesAgo(120),
    },
    {
      id: 1002,
      roomId: 101,
      senderId: 2,
      content: '네 안녕하세요. 어떤 부분 멘토링을 원하세요?',
      sentAt: minutesAgo(115),
    },
    {
      id: 1003,
      roomId: 101,
      senderId: 1,
      content: '백엔드 코드리뷰랑 시스템 설계 질문이 많습니다.',
      sentAt: minutesAgo(110),
    },
    {
      id: 1004,
      roomId: 101,
      senderId: 2,
      content: '좋습니다. 일정은 다음주 화 저녁 어떠세요?',
      sentAt: minutesAgo(60),
    },
    {
      id: 1005,
      roomId: 101,
      senderId: 1,
      content: '가능합니다!',
      sentAt: minutesAgo(40),
    },
    {
      id: 1006,
      roomId: 101,
      senderId: 2,
      content: '네, 일정 확정되면 말씀드릴게요!',
      sentAt: minutesAgo(15),
    },
  ],
  102: [
    {
      id: 2001,
      roomId: 102,
      senderId: 1,
      content: '디자인 시스템 빌드하실 때 어떤 토큰 구조 쓰셨어요?',
      sentAt: minutesAgo(300),
    },
    {
      id: 2002,
      roomId: 102,
      senderId: 4,
      content: 'Figma Variables + Style Dictionary 조합이요.',
      sentAt: minutesAgo(290),
    },
    {
      id: 2003,
      roomId: 102,
      senderId: 1,
      content: '오 그거 자료 공유 가능할까요?',
      sentAt: minutesAgo(280),
    },
    {
      id: 2004,
      roomId: 102,
      senderId: 4,
      content: '만나서 보여드릴게요. 다음주 일정 잡으시죠.',
      sentAt: minutesAgo(200),
    },
    {
      id: 2005,
      roomId: 102,
      senderId: 1,
      content: '강남역 근처 어떨까요?',
      sentAt: minutesAgo(150),
    },
    {
      id: 2006,
      roomId: 102,
      senderId: 4,
      content: '강남역에서 뵐게요.',
      sentAt: minutesAgo(120),
    },
  ],
};

let nextRoomId = 103;
let nextMessageId = 9000;

export function findOrCreateRoom(
  user1Id: number,
  user2Id: number,
  partnerName = '상대방',
): ChatRoom {
  const existing = mockChatRooms.find(
    r =>
      (r.partnerUserId === user2Id && user1Id === 1) ||
      (r.partnerUserId === user1Id && user2Id === 1),
  );
  if (existing) return existing;
  const partnerUserId = user1Id === 1 ? user2Id : user1Id;
  const room: ChatRoom = {
    roomId: nextRoomId++,
    partnerUserId,
    partnerName,
    partnerRole: 'mentor',
    responseHint: '응답 패턴 데이터 부족',
    avatarUrl: `https://i.pravatar.cc/150?u=${partnerUserId}`,
  };
  mockChatRooms.push(room);
  mockChatMessages[room.roomId] = [];
  return room;
}

export function getMessages(roomId: number): ChatMessage[] {
  return mockChatMessages[roomId] ?? [];
}

export function nextMsgId(): number {
  return nextMessageId++;
}

void isoNow;
