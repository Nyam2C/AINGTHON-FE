import { useQuery } from '@tanstack/react-query';

import { searchProfiles } from '../api/match';
import type {
  SearchProfilesParams,
  SearchProfilesResponse,
} from '../types/match';

export function useSearchProfilesQuery(params: SearchProfilesParams) {
  return useQuery<SearchProfilesResponse>({
    queryKey: ['profiles', 'search', params],
    queryFn: () => searchProfiles(params),
    staleTime: 5_000,
  });
}
