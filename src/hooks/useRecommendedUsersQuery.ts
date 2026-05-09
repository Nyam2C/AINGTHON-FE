import { useQuery } from '@tanstack/react-query';

import { getRecommendedUsers } from '../api/match';
import type { MatchUserSummary } from '../types/match';

export function useRecommendedUsersQuery() {
  return useQuery<MatchUserSummary[]>({
    queryKey: ['match', 'recommendations'],
    queryFn: getRecommendedUsers,
    staleTime: 60_000,
  });
}
