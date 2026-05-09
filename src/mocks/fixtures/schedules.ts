import type { ScheduleRequest, ScheduleResponse } from '../../types/schedule';

const now = new Date();
const isoNow = now.toISOString();

function addDays(base: Date, days: number): string {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export const mockSchedules: ScheduleResponse[] = [
  {
    id: 1,
    matchId: 2, // approved (me sent → 4)
    applicantId: 1,
    receiverId: 4,
    scheduledDate: addDays(now, 5),
    scheduledTime: { hour: 19, minute: 0, second: 0, nano: 0 },
    location: '강남역 카페',
    createdAt: isoNow,
  },
  {
    id: 2,
    matchId: 4, // approved (5 → me)
    applicantId: 5,
    receiverId: 1,
    scheduledDate: addDays(now, 10),
    scheduledTime: { hour: 14, minute: 30, second: 0, nano: 0 },
    location: 'Zoom',
    createdAt: isoNow,
  },
  {
    id: 3,
    matchId: 2,
    applicantId: 1,
    receiverId: 4,
    scheduledDate: addDays(now, -10),
    scheduledTime: { hour: 18, minute: 0, second: 0, nano: 0 },
    location: '온라인 (Discord)',
    createdAt: isoNow,
  },
];

let nextScheduleId = 4;

export function addSchedule(
  matchId: number,
  applicantId: number,
  receiverId: number,
  body: ScheduleRequest,
): ScheduleResponse {
  const s: ScheduleResponse = {
    id: nextScheduleId++,
    matchId,
    applicantId,
    receiverId,
    scheduledDate: body.scheduledDate,
    scheduledTime: body.scheduledTime,
    location: body.location,
    createdAt: new Date().toISOString(),
  };
  mockSchedules.push(s);
  return s;
}

export function updateScheduleByMatch(
  matchId: number,
  body: ScheduleRequest,
): ScheduleResponse | undefined {
  const idx = mockSchedules.findIndex(s => s.matchId === matchId);
  if (idx < 0) return undefined;
  mockSchedules[idx] = {
    ...mockSchedules[idx],
    scheduledDate: body.scheduledDate,
    scheduledTime: body.scheduledTime,
    location: body.location,
  };
  return mockSchedules[idx];
}

export function isUpcoming(s: ScheduleResponse): boolean {
  const today = new Date().toISOString().slice(0, 10);
  return s.scheduledDate >= today;
}
