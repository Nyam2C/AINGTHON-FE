import { apiClient } from './client';
import type { ReviewPayload, ReviewResponse } from '../types/review';

function warnFallback(label: string, error: unknown) {
  console.warn(`${label} fallback to mocks (backend unavailable)`, error);
}

export async function submitReview(
  payload: ReviewPayload,
): Promise<ReviewResponse> {
  const { matchId, ...body } = payload;
  try {
    const { data } = await apiClient.post<ReviewResponse>(
      `/matches/${encodeURIComponent(matchId)}/review`,
      body,
    );
    return data;
  } catch (error) {
    warnFallback('submitReview', error);
    return { reviewId: `mock-${Date.now()}` };
  }
}
