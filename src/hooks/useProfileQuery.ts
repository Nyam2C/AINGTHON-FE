import { useQuery } from '@tanstack/react-query';

import { getProfile } from '../api/profile';
import type { ProfileResponse } from '../types/profile';

export function useProfileQuery(profileId: number | null | undefined) {
  return useQuery<ProfileResponse>({
    queryKey: ['profile', profileId],
    queryFn: () => getProfile(profileId as number),
    enabled: profileId != null,
    staleTime: 60_000,
  });
}
