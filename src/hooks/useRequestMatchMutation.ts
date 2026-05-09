import { useMutation } from '@tanstack/react-query';

import { requestMatch } from '../api/match';
import type { MatchRequestPayload, MatchResponse } from '../types/match';

export function useRequestMatchMutation() {
  return useMutation<MatchResponse, Error, MatchRequestPayload>({
    mutationFn: requestMatch,
  });
}
