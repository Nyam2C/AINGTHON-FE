import { useQuery } from '@tanstack/react-query';

import { getChatRooms } from '../api/chat';
import type { ChatRoom } from '../types/chat';

export function useChatRoomsQuery() {
  return useQuery<ChatRoom[]>({
    queryKey: ['chat', 'rooms'],
    queryFn: getChatRooms,
    staleTime: 30_000,
  });
}
