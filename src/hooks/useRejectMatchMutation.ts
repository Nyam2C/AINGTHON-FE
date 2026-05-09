import { useMutation, useQueryClient } from '@tanstack/react-query';

import { rejectMatch } from '../api/match';
import type { MatchResponse } from '../types/match';

export function useRejectMatchMutation() {
  const queryClient = useQueryClient();

  return useMutation<MatchResponse, Error, number>({
    mutationFn: rejectMatch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matches', 'received'] });
      queryClient.invalidateQueries({ queryKey: ['matches', 'sent'] });
    },
  });
}
