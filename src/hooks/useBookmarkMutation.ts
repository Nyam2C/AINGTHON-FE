import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toggleBookmark } from '../api/match';
import type { BookmarkPayload, BookmarkResponse } from '../types/match';

export function useBookmarkMutation() {
  const queryClient = useQueryClient();

  return useMutation<BookmarkResponse, Error, BookmarkPayload>({
    mutationFn: toggleBookmark,
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({ queryKey: ['match', 'search'] });
      void queryClient.invalidateQueries({
        queryKey: ['match', 'user', variables.userId],
      });
      void queryClient.invalidateQueries({
        queryKey: ['match', 'recommendations'],
      });
    },
  });
}
