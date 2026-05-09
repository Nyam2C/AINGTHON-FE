import { useQuery } from '@tanstack/react-query';

import { getWrittenReviews } from '../api/review';
import type { ReviewResponse } from '../types/review';

export function useWrittenReviewsQuery() {
  return useQuery<ReviewResponse[], Error>({
    queryKey: ['reviews', 'written'],
    queryFn: getWrittenReviews,
  });
}
