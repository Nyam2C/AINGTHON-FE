import type { MatchResponse, MatchStatus } from '../../types/match';

const now = new Date().toISOString();

export const mockMatches: MatchResponse[] = [
  {
    id: 1,
    applicantId: 1, // me sent
    receiverId: 2,
    reason: '백엔드 시니어 분께 코드리뷰 받고 싶어 신청드립니다.',
    requirements: '주 1회 30분, 온라인 가능',
    preferredMode: 'ONLINE',
    preferredDate: '2026-05-20',
    status: 'PENDING',
    chatRoomId: 101,
    createdAt: now,
  },
  {
    id: 2,
    applicantId: 1, // me sent
    receiverId: 4,
    reason: '디자인 시스템 구축 방법론을 듣고 싶습니다.',
    requirements: '한 달에 한 번이라도 좋아요',
    preferredMode: 'OFFLINE',
    preferredDate: '2026-05-25',
    status: 'APPROVED',
    chatRoomId: 102,
    createdAt: now,
  },
  {
    id: 3,
    applicantId: 3, // me received
    receiverId: 1,
    reason: '프론트엔드 입문자인데 React 페어프로그래밍 가능한가요?',
    requirements: '평일 저녁 가능',
    preferredMode: 'NO_PREFERENCE',
    preferredDate: '2026-05-22',
    status: 'PENDING',
    chatRoomId: 103,
    createdAt: now,
  },
  {
    id: 4,
    applicantId: 5, // me received
    receiverId: 1,
    reason: '게임 클라이언트도 React 같은 컴포넌트 개념 쓰는지 궁금합니다.',
    preferredMode: 'ONLINE',
    status: 'APPROVED',
    chatRoomId: 104,
    createdAt: now,
  },
];

let nextMatchId = 5;
let nextChatRoomId = 105;

export function addMatch(
  payload: Omit<MatchResponse, 'id' | 'status' | 'chatRoomId' | 'createdAt'>,
): MatchResponse {
  const newMatch: MatchResponse = {
    ...payload,
    id: nextMatchId++,
    status: 'PENDING',
    chatRoomId: nextChatRoomId++,
    createdAt: new Date().toISOString(),
  };
  mockMatches.push(newMatch);
  return newMatch;
}

export function findMatch(id: number): MatchResponse | undefined {
  return mockMatches.find(m => m.id === id);
}

export function setMatchStatus(
  id: number,
  status: MatchStatus,
): MatchResponse | undefined {
  const m = findMatch(id);
  if (!m) return undefined;
  m.status = status;
  if (status === 'APPROVED' && !m.chatRoomId) {
    m.chatRoomId = nextChatRoomId++;
  }
  return m;
}
