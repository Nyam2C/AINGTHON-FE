import { useMutation, useQueryClient } from '@tanstack/react-query';

import { sendMessage } from '../api/chat';
import type { ChatMessage, SendMessagePayload } from '../types/chat';

/**
 * REST 송신 미지원 — 백엔드는 STOMP `/pub/chat/message`만 지원.
 * 호출하면 mutationFn이 throw하므로 onError로 fallback UI 표시.
 * WebSocket 흐름이 추가되면 본 mutation은 제거 또는 STOMP publish로 교체.
 */
export function useSendMessageMutation() {
  const queryClient = useQueryClient();

  return useMutation<ChatMessage, Error, SendMessagePayload>({
    mutationFn: sendMessage,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['chat', 'messages', variables.roomId],
      });
    },
  });
}
