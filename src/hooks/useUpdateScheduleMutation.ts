import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateSchedule } from '../api/chat';
import type { ScheduleCardMessage, UpdateSchedulePayload } from '../types/chat';

export function useUpdateScheduleMutation() {
  const queryClient = useQueryClient();

  return useMutation<ScheduleCardMessage, Error, UpdateSchedulePayload>({
    mutationFn: updateSchedule,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['chat', 'messages', variables.matchId],
      });
    },
  });
}
