import { useQuery } from '@tanstack/react-query';

import { getUpcomingSchedules } from '../api/match';
import type { ScheduleResponse } from '../types/schedule';

export function useUpcomingSchedulesQuery() {
  return useQuery<ScheduleResponse[]>({
    queryKey: ['schedules', 'upcoming'],
    queryFn: getUpcomingSchedules,
    staleTime: 30_000,
  });
}
