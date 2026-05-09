import { useQuery } from '@tanstack/react-query';

import { getChatRooms } from '../api/chat';
import { useAuthStore } from '../store/useAuthStore';
import type { ChatRoom } from '../types/chat';

export function useChatRoomsQuery() {
  const userId = useAuthStore(s => s.userId);

  return useQuery<ChatRoom[]>({
    queryKey: ['chat', 'rooms', userId],
    queryFn: () => getChatRooms(userId as number),
    enabled: userId != null,
    staleTime: 30_000,
  });
}
