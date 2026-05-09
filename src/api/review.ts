import { apiClient } from './client';
import type { ReviewCreateRequest, ReviewResponse } from '../types/review';

export async function createReview(
  body: ReviewCreateRequest,
): Promise<ReviewResponse> {
  const { data } = await apiClient.post<ReviewResponse>('/api/reviews', body);
  return data;
}

export async function getWrittenReviews(): Promise<ReviewResponse[]> {
  const { data } = await apiClient.get<ReviewResponse[]>(
    '/api/reviews/written',
  );
  return data;
}

export async function getReceivedReviews(): Promise<ReviewResponse[]> {
  const { data } = await apiClient.get<ReviewResponse[]>(
    '/api/reviews/received',
  );
  return data;
}
