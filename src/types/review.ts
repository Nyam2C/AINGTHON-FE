export type ReviewCreateRequest = {
  scheduleId: number;
  satisfaction: number; // 1~5 required
  oneLineReview: string; // max 100 required
  mainContent?: string;
};

export type ReviewResponse = {
  id: number;
  scheduleId: number;
  reviewerId: number;
  reviewerName: string;
  revieweeId: number;
  revieweeName: string;
  satisfaction: number;
  oneLineReview: string;
  mainContent?: string;
  createdAt: string;
};
