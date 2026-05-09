import { useQuery } from '@tanstack/react-query';

import { getChatMessages } from '../api/chat';
import type { ChatMessage } from '../types/chat';

export function useChatMessagesQuery(matchId: string) {
  return useQuery<ChatMessage[]>({
    queryKey: ['chat', 'messages', matchId],
    queryFn: () => getChatMessages(matchId),
    enabled: Boolean(matchId),
    staleTime: 0,
    refetchInterval: 5000,
  });
}
