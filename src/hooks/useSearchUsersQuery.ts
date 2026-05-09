import { useQuery } from '@tanstack/react-query';

import { searchUsers } from '../api/match';
import type { SearchUsersParams, SearchUsersResponse } from '../types/match';

export function useSearchUsersQuery(params: SearchUsersParams) {
  return useQuery<SearchUsersResponse>({
    queryKey: ['match', 'search', params],
    queryFn: () => searchUsers(params),
    staleTime: 5_000,
  });
}
