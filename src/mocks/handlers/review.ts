import { http, HttpResponse } from 'msw';

import { addReview, mockReviews } from '../fixtures/reviews';
import { findProfile, getMe } from '../fixtures/profiles';
import { mockSchedules } from '../fixtures/schedules';
import type { ReviewCreateRequest } from '../../types/review';

const ME_ID = 1;

function ok<T>(data: T) {
  return HttpResponse.json({ success: true, data });
}

function err(status: number, message: string) {
  return HttpResponse.json({ success: false, message }, { status });
}

export const reviewHandlers = [
  http.post('*/api/reviews', async ({ request }) => {
    const body = (await request.json()) as ReviewCreateRequest;
    const sched = mockSchedules.find(s => s.id === body.scheduleId);
    if (!sched) return err(404, '일정을 찾을 수 없습니다.');
    const me = getMe();
    const revieweeUserId =
      sched.applicantId === ME_ID ? sched.receiverId : sched.applicantId;
    const reviewee = findProfile(revieweeUserId);
    const created = addReview(
      body,
      ME_ID,
      me.name,
      revieweeUserId,
      reviewee?.name ?? '상대방',
    );
    return ok(created);
  }),

  http.get('*/api/reviews/written', () =>
    ok(mockReviews.filter(r => r.reviewerId === ME_ID)),
  ),

  http.get('*/api/reviews/received', () =>
    ok(mockReviews.filter(r => r.revieweeId === ME_ID)),
  ),
];
