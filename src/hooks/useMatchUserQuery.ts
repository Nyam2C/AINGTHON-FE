import { useQuery } from '@tanstack/react-query';

import { getMatchUser } from '../api/match';
import type { ProfileResponse } from '../types/profile';

export function useMatchUserQuery(profileId: number | null) {
  return useQuery<ProfileResponse>({
    queryKey: ['match', 'user', profileId],
    queryFn: () => getMatchUser(profileId as number),
    enabled: profileId != null && Number.isFinite(profileId),
    staleTime: 60_000,
  });
}
