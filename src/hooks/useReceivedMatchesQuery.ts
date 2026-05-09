import { useQuery } from '@tanstack/react-query';

import { getReceivedMatches } from '../api/match';
import type { MatchResponse } from '../types/match';

export function useReceivedMatchesQuery() {
  return useQuery<MatchResponse[]>({
    queryKey: ['matches', 'received'],
    queryFn: getReceivedMatches,
    staleTime: 30_000,
  });
}
