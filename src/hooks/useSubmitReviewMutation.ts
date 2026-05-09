import { useMutation, useQueryClient } from '@tanstack/react-query';

import { submitReview } from '../api/review';
import type { ReviewPayload, ReviewResponse } from '../types/review';

export function useSubmitReviewMutation() {
  const queryClient = useQueryClient();

  return useMutation<ReviewResponse, Error, ReviewPayload>({
    mutationFn: submitReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matches'] });
    },
  });
}
