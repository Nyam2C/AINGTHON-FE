import { useMutation, useQueryClient } from '@tanstack/react-query';

import { proposeSchedule } from '../api/match';
import type { ScheduleRequest, ScheduleResponse } from '../types/schedule';

type Variables = { matchId: number; body: ScheduleRequest };

export function useProposeScheduleMutation() {
  const queryClient = useQueryClient();

  return useMutation<ScheduleResponse, Error, Variables>({
    mutationFn: ({ matchId, body }) => proposeSchedule(matchId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
    },
  });
}
