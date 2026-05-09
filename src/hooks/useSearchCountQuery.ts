import { useQuery } from '@tanstack/react-query';

import { searchUsersCount } from '../api/match';
import type { SearchCountResponse, SearchUsersParams } from '../types/match';

export function useSearchCountQuery(params: SearchUsersParams) {
  return useQuery<SearchCountResponse>({
    queryKey: ['match', 'search', 'count', params],
    queryFn: () => searchUsersCount(params),
    staleTime: 5_000,
  });
}
