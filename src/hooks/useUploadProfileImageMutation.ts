import { useMutation, useQueryClient } from '@tanstack/react-query';

import { uploadProfileImage } from '../api/profile';
import type { ProfileResponse } from '../types/profile';

export function useUploadProfileImageMutation() {
  const queryClient = useQueryClient();
  return useMutation<ProfileResponse, Error, File>({
    mutationFn: uploadProfileImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', 'me'] });
    },
  });
}
