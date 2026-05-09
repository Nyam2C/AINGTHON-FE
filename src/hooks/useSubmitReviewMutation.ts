import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createReview } from '../api/review';
import type { ReviewCreateRequest, ReviewResponse } from '../types/review';

export function useSubmitReviewMutation() {
  const queryClient = useQueryClient();

  return useMutation<ReviewResponse, Error, ReviewCreateRequest>({
    mutationFn: createReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
}
