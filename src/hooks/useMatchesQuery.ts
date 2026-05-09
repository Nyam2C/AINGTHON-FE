import { useQuery } from '@tanstack/react-query';

import { getMatches } from '../api/matches';
import type { Meeting, MeetingStatus } from '../types/meeting';

export function useMatchesQuery(status: MeetingStatus) {
  return useQuery<Meeting[]>({
    queryKey: ['matches', { status }],
    queryFn: () => getMatches(status),
    staleTime: 30_000,
  });
}
