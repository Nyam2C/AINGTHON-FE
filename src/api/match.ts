import { apiClient } from './client';
import type {
  BookmarkPayload,
  BookmarkResponse,
  MatchRequestPayload,
  MatchRequestResponse,
  MatchUser,
  MatchUserSummary,
  SearchCountResponse,
  SearchUsersParams,
  SearchUsersResponse,
} from '../types/match';

export async function getRecommendedUsers(): Promise<MatchUserSummary[]> {
  const { data } = await apiClient.get<MatchUserSummary[]>(
    '/match/recommendations',
  );
  return data;
}

export async function searchUsers(
  params: SearchUsersParams,
): Promise<SearchUsersResponse> {
  const { data } = await apiClient.get<SearchUsersResponse>('/match/search', {
    params,
  });
  return data;
}

export async function searchUsersCount(
  params: SearchUsersParams,
): Promise<SearchCountResponse> {
  const { data } = await apiClient.get<SearchCountResponse>(
    '/match/search/count',
    { params },
  );
  return data;
}

export async function getMatchUser(userId: string): Promise<MatchUser> {
  const { data } = await apiClient.get<MatchUser>(
    `/match/users/${encodeURIComponent(userId)}`,
  );
  return data;
}

export async function requestMatch(
  payload: MatchRequestPayload,
): Promise<MatchRequestResponse> {
  const { data } = await apiClient.post<MatchRequestResponse>(
    '/match/request',
    payload,
  );
  return data;
}

export async function toggleBookmark(
  payload: BookmarkPayload,
): Promise<BookmarkResponse> {
  const { data } = await apiClient.post<BookmarkResponse>(
    '/match/bookmark',
    payload,
  );
  return data;
}
