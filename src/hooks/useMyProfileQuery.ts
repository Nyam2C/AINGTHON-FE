import { useQuery } from '@tanstack/react-query';

import { getMyProfile } from '../api/profile';
import type { ProfileResponse } from '../types/profile';

export function useMyProfileQuery() {
  return useQuery<ProfileResponse>({
    queryKey: ['profile', 'me'],
    queryFn: getMyProfile,
    staleTime: 60_000,
  });
}
