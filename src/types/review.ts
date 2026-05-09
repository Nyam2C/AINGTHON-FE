export type ReviewPayload = {
  matchId: string;
  rating: number; // 0~5 (검증 임시 해제, 0 허용)
  oneLineReview: string; // max 100, 빈값 허용
  detail: string; // textarea, 빈값 허용
};

export type ReviewResponse = { reviewId: string };
