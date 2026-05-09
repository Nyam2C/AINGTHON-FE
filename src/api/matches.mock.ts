import type { Meeting, MeetingStatus } from '../types/meeting';

const MOCK_MEETINGS: Meeting[] = [
  {
    matchId: 'mock-chat-u-min',
    partnerUserId: 'u-min',
    partnerName: '차준호',
    partnerRole: 'mentor',
    title: '첫 번째 미팅 커피챗',
    date: '2026-05-09',
    time: '14:00',
    location: '스타벅스 강남역점',
    status: 'upcoming',
    reviewed: false,
    ended: false,
  },
  {
    matchId: 'mock-chat-u-yu',
    partnerUserId: 'u-yu',
    partnerName: '최유진',
    partnerRole: 'mentor',
    title: '백엔드 스터디',
    date: '2026-04-20',
    time: '19:00',
    location: '온라인 (Google Meet)',
    status: 'past',
    reviewed: false,
    ended: false,
  },
];

export function getMockMatches(status: MeetingStatus): Meeting[] {
  return MOCK_MEETINGS.filter(m => m.status === status);
}

export function getMockEndMatch(matchId: string): { ok: true } {
  console.log('[mock] endMatch', matchId);
  return { ok: true };
}
