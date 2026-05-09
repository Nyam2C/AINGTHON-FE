import { useMutation } from '@tanstack/react-query';

import { requestMatch } from '../api/match';
import type { MatchRequestPayload, MatchRequestResponse } from '../types/match';

export function useRequestMatchMutation() {
  return useMutation<MatchRequestResponse, Error, MatchRequestPayload>({
    mutationFn: requestMatch,
  });
}
