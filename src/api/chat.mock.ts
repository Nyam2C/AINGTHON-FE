import { MENTEE_USER_ID } from '../types/chat';
import type {
  ChatMessage,
  ChatRoom,
  ScheduleCardMessage,
  SendMessagePayload,
  UpdateSchedulePayload,
} from '../types/chat';

const MOCK_ROOMS: ChatRoom[] = [
  {
    matchId: 'mock-chat-u-min',
    partnerUserId: 'u-min',
    partnerName: '차준호',
    partnerRole: 'mentor',
    responseHint: '보통 10분 이내 응답',
    lastMessage: '다음 미팅은 강남역에서 어떠세요?',
    lastMessageAt: '2026-05-09T09:30:00',
  },
];

/** matchId별 메시지 목록 (없으면 빈 배열) */
const MOCK_MESSAGES: Record<string, ChatMessage[]> = {
  'mock-chat-u-min': [
    {
      messageId: 'm-1',
      matchId: 'mock-chat-u-min',
      senderId: 'u-min',
      type: 'text',
      text: '안녕하세요! 신청 잘 받았어요.',
      createdAt: '2026-05-09T09:25:00',
    },
    {
      messageId: 'm-2',
      matchId: 'mock-chat-u-min',
      senderId: MENTEE_USER_ID,
      type: 'text',
      text: '감사합니다! 잘 부탁드려요.',
      createdAt: '2026-05-09T09:26:00',
    },
    {
      messageId: 'm-3',
      matchId: 'mock-chat-u-min',
      senderId: 'u-min',
      type: 'schedule',
      schedule: {
        scheduleId: 's-1',
        title: '첫 번째 미팅 커피챗',
        date: '2026-05-09',
        startTime: '14:00',
        endTime: '15:00',
        location: '스타벅스 강남역점',
        status: 'proposed',
      },
      createdAt: '2026-05-09T09:27:00',
    },
  ],
};

export function getMockChatRooms(): ChatRoom[] {
  return MOCK_ROOMS;
}

export function getMockChatMessages(matchId: string): ChatMessage[] {
  return MOCK_MESSAGES[matchId] ?? [];
}

export function getMockSendMessage(payload: SendMessagePayload): ChatMessage {
  return {
    messageId: `mock-${Date.now()}`,
    matchId: payload.matchId,
    senderId: MENTEE_USER_ID,
    type: 'text',
    text: payload.text,
    createdAt: new Date().toISOString(),
  };
}

export function getMockUpdateSchedule(
  payload: UpdateSchedulePayload,
): ScheduleCardMessage {
  return {
    messageId: `mock-${Date.now()}`,
    matchId: payload.matchId,
    senderId: MENTEE_USER_ID,
    type: 'schedule',
    schedule: {
      scheduleId: payload.scheduleId,
      title: 'mock 일정',
      date: payload.date,
      startTime: payload.startTime,
      endTime: payload.endTime,
      location: payload.location,
      status: 'confirmed',
    },
    createdAt: new Date().toISOString(),
  };
}
