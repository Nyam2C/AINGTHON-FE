import { useMutation, useQueryClient } from '@tanstack/react-query';

import { endMatch } from '../api/matches';

export function useEndMatchMutation() {
  const queryClient = useQueryClient();

  return useMutation<{ ok: true }, Error, string>({
    mutationFn: endMatch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matches'] });
    },
  });
}
