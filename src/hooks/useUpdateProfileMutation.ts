import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateMyProfile } from '../api/profile';
import type {
  ProfileResponse,
  ProfileUpdateRequest,
} from '../types/profile';

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient();
  return useMutation<ProfileResponse, Error, ProfileUpdateRequest>({
    mutationFn: updateMyProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', 'me'] });
    },
  });
}
