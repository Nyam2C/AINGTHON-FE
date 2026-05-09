import { useQuery } from '@tanstack/react-query';

import { getPastSchedules } from '../api/match';
import type { ScheduleResponse } from '../types/schedule';

export function usePastSchedulesQuery() {
  return useQuery<ScheduleResponse[]>({
    queryKey: ['schedules', 'past'],
    queryFn: getPastSchedules,
    staleTime: 30_000,
  });
}
