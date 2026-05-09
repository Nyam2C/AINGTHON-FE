import { useMutation, useQueryClient } from '@tanstack/react-query';

import { uploadChatFile } from '../api/chat';

type UploadChatFileVars = {
  roomId: number;
  file: File;
};

/**
 * 채팅방 파일 업로드 — 응답은 GCS Signed URL(7일).
 * 실제 메시지 송신은 STOMP 흐름이 필요하므로, URL을 받은 후 송신은 후속 작업.
 */
export function useUploadChatFileMutation() {
  const queryClient = useQueryClient();

  return useMutation<string, Error, UploadChatFileVars>({
    mutationFn: ({ roomId, file }) => uploadChatFile(roomId, file),
    onSuccess: (_url, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['chat', 'messages', variables.roomId],
      });
    },
  });
}
