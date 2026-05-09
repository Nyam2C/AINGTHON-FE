import { useQuery } from '@tanstack/react-query';

import { getMatchUser } from '../api/match';
import type { MatchUser } from '../types/match';

export function useMatchUserQuery(userId: string) {
  return useQuery<MatchUser>({
    queryKey: ['match', 'user', userId],
    queryFn: () => getMatchUser(userId),
    enabled: Boolean(userId),
    staleTime: 60_000,
  });
}
