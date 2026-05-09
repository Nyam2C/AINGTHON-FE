import { useQuery } from '@tanstack/react-query';

import { getReceivedReviews } from '../api/review';
import type { ReviewResponse } from '../types/review';

export function useReceivedReviewsQuery() {
  return useQuery<ReviewResponse[], Error>({
    queryKey: ['reviews', 'received'],
    queryFn: getReceivedReviews,
  });
}
