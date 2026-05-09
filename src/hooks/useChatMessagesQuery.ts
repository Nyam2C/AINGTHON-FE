import { useQuery } from '@tanstack/react-query';

import { getChatMessages } from '../api/chat';
import type { ChatMessage } from '../types/chat';

export function useChatMessagesQuery(roomId: number | null) {
  return useQuery<ChatMessage[]>({
    queryKey: ['chat', 'messages', roomId],
    queryFn: () => getChatMessages(roomId as number),
    enabled: roomId != null,
    staleTime: 0,
    refetchInterval: 5000,
  });
}
