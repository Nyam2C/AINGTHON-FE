import { useQuery } from '@tanstack/react-query';

import { getSentMatches } from '../api/match';
import type { MatchResponse } from '../types/match';

export function useSentMatchesQuery() {
  return useQuery<MatchResponse[]>({
    queryKey: ['matches', 'sent'],
    queryFn: getSentMatches,
    staleTime: 30_000,
  });
}
