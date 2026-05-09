import type { ReviewCreateRequest, ReviewResponse } from '../../types/review';

const isoNow = new Date().toISOString();

export const mockReviews: ReviewResponse[] = [
  // me(1)가 작성 → 4 (최유나) 에 대한 후기
  {
    id: 1,
    scheduleId: 3,
    reviewerId: 1,
    reviewerName: '김민준',
    revieweeId: 4,
    revieweeName: '최유나',
    satisfaction: 5,
    oneLineReview: '디자인 시스템 인사이트 최고였습니다.',
    mainContent:
      'Figma Variables 활용법과 토큰 명명 규칙 잡는 법을 자세히 알려주셨습니다.',
    createdAt: isoNow,
  },
  // 4 → me(1) 가 받은 후기
  {
    id: 2,
    scheduleId: 3,
    reviewerId: 4,
    reviewerName: '최유나',
    revieweeId: 1,
    revieweeName: '김민준',
    satisfaction: 4,
    oneLineReview: '준비를 잘 해오셔서 깊이 있는 대화 가능했어요.',
    mainContent: '질문이 명확해서 시간 효율적으로 진행됐습니다.',
    createdAt: isoNow,
  },
];

let nextReviewId = 3;

export function addReview(
  body: ReviewCreateRequest,
  reviewerId: number,
  reviewerName: string,
  revieweeId: number,
  revieweeName: string,
): ReviewResponse {
  const r: ReviewResponse = {
    id: nextReviewId++,
    scheduleId: body.scheduleId,
    reviewerId,
    reviewerName,
    revieweeId,
    revieweeName,
    satisfaction: body.satisfaction,
    oneLineReview: body.oneLineReview,
    mainContent: body.mainContent,
    createdAt: new Date().toISOString(),
  };
  mockReviews.push(r);
  return r;
}
