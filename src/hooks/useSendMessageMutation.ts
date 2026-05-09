import { useMutation, useQueryClient } from '@tanstack/react-query';

import { sendMessage } from '../api/chat';
import type { ChatMessage, SendMessagePayload } from '../types/chat';

export function useSendMessageMutation() {
  const queryClient = useQueryClient();

  return useMutation<ChatMessage, Error, SendMessagePayload>({
    mutationFn: sendMessage,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['chat', 'messages', variables.matchId],
      });
    },
  });
}
