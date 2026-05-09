import { http, HttpResponse } from 'msw';

import { isUpcoming, mockSchedules } from '../fixtures/schedules';

function ok<T>(data: T) {
  return HttpResponse.json({ success: true, data });
}

export const scheduleHandlers = [
  http.get('*/api/matches/schedules/upcoming', () =>
    ok(mockSchedules.filter(isUpcoming)),
  ),

  http.get('*/api/matches/schedules/past', () =>
    ok(mockSchedules.filter(s => !isUpcoming(s))),
  ),
];
