import { useMutation, useQueryClient } from '@tanstack/react-query';

import { approveMatch } from '../api/match';
import type { MatchResponse } from '../types/match';

export function useApproveMatchMutation() {
  const queryClient = useQueryClient();

  return useMutation<MatchResponse, Error, number>({
    mutationFn: approveMatch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matches', 'received'] });
      queryClient.invalidateQueries({ queryKey: ['matches', 'sent'] });
    },
  });
}
