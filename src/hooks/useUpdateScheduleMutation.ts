import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateSchedule } from '../api/match';
import type { ScheduleRequest, ScheduleResponse } from '../types/schedule';

type Variables = { matchId: number; body: ScheduleRequest };

export function useUpdateScheduleMutation() {
  const queryClient = useQueryClient();

  return useMutation<ScheduleResponse, Error, Variables>({
    mutationFn: ({ matchId, body }) => updateSchedule(matchId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
    },
  });
}
