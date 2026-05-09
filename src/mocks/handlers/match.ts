import { http, HttpResponse } from 'msw';

import {
  addMatch,
  findMatch,
  mockMatches,
  setMatchStatus,
} from '../fixtures/matches';
import {
  addSchedule,
  updateScheduleByMatch,
} from '../fixtures/schedules';
import type { MatchRequestPayload } from '../../types/match';
import type { ScheduleRequest } from '../../types/schedule';

const ME_ID = 1;

function ok<T>(data: T) {
  return HttpResponse.json({ success: true, data });
}

function err(status: number, message: string) {
  return HttpResponse.json({ success: false, message }, { status });
}

export const matchHandlers = [
  http.post('*/api/matches', async ({ request }) => {
    const body = (await request.json()) as MatchRequestPayload;
    const created = addMatch({
      applicantId: ME_ID,
      receiverId: body.receiverId,
      reason: body.reason,
      requirements: body.requirements,
      preferredMode: body.preferredMode,
      preferredDate: body.preferredDate,
    });
    return ok(created);
  }),

  http.get('*/api/matches/sent', () =>
    ok(mockMatches.filter(m => m.applicantId === ME_ID)),
  ),

  http.get('*/api/matches/received', () =>
    ok(mockMatches.filter(m => m.receiverId === ME_ID)),
  ),

  http.patch('*/api/matches/:id/approve', ({ params }) => {
    const id = Number(params.id);
    const updated = setMatchStatus(id, 'APPROVED');
    if (!updated) return err(404, '매칭을 찾을 수 없습니다.');
    return ok(updated);
  }),

  http.patch('*/api/matches/:id/reject', ({ params }) => {
    const id = Number(params.id);
    const updated = setMatchStatus(id, 'REJECTED');
    if (!updated) return err(404, '매칭을 찾을 수 없습니다.');
    return ok(updated);
  }),

  http.post('*/api/matches/:matchId/schedule', async ({ params, request }) => {
    const matchId = Number(params.matchId);
    const m = findMatch(matchId);
    if (!m) return err(404, '매칭을 찾을 수 없습니다.');
    const body = (await request.json()) as ScheduleRequest;
    const created = addSchedule(matchId, m.applicantId, m.receiverId, body);
    return ok(created);
  }),

  http.put('*/api/matches/:matchId/schedule', async ({ params, request }) => {
    const matchId = Number(params.matchId);
    const body = (await request.json()) as ScheduleRequest;
    const updated = updateScheduleByMatch(matchId, body);
    if (!updated) return err(404, '일정을 찾을 수 없습니다.');
    return ok(updated);
  }),
];
