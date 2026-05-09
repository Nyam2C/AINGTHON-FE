import { apiClient } from './client';
import {
  getMockMatchUser,
  getMockRecommendedUsers,
  getMockSearchUsers,
} from './match.mock';
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

// 백엔드 미가동 환경에서도 플로우 검증이 가능하도록 read 호출 실패 시 mock으로 폴백.
// 백엔드 연동 후에는 각 함수의 try/catch와 fallback 분기를 제거한다.
function warnFallback(label: string, error: unknown) {
  console.warn(`${label} fallback to mocks (backend unavailable)`, error);
}

export async function getRecommendedUsers(): Promise<MatchUserSummary[]> {
  try {
    const { data } = await apiClient.get<MatchUserSummary[]>(
      '/match/recommendations',
    );
    return data;
  } catch (error) {
    warnFallback('getRecommendedUsers', error);
    return getMockRecommendedUsers();
  }
}

export async function searchUsers(
  params: SearchUsersParams,
): Promise<SearchUsersResponse> {
  try {
    const { data } = await apiClient.get<SearchUsersResponse>('/match/search', {
      params,
    });
    return data;
  } catch (error) {
    warnFallback('searchUsers', error);
    return getMockSearchUsers(params);
  }
}

export async function searchUsersCount(
  params: SearchUsersParams,
): Promise<SearchCountResponse> {
  try {
    const { data } = await apiClient.get<SearchCountResponse>(
      '/match/search/count',
      { params },
    );
    return data;
  } catch (error) {
    warnFallback('searchUsersCount', error);
    return { total: getMockSearchUsers(params).total };
  }
}

export async function getMatchUser(userId: string): Promise<MatchUser> {
  try {
    const { data } = await apiClient.get<MatchUser>(
      `/match/users/${encodeURIComponent(userId)}`,
    );
    return data;
  } catch (error) {
    warnFallback('getMatchUser', error);
    return getMockMatchUser(userId);
  }
}

export async function requestMatch(
  payload: MatchRequestPayload,
): Promise<MatchRequestResponse> {
  try {
    const { data } = await apiClient.post<MatchRequestResponse>(
      '/match/request',
      payload,
    );
    return data;
  } catch (error) {
    warnFallback('requestMatch', error);
    return {
      matchRequestId: `mock-${Date.now()}`,
      chatRoomId: `mock-chat-${payload.targetUserId}`,
    };
  }
}

export async function toggleBookmark(
  payload: BookmarkPayload,
): Promise<BookmarkResponse> {
  try {
    const { data } = await apiClient.post<BookmarkResponse>(
      '/match/bookmark',
      payload,
    );
    return data;
  } catch (error) {
    warnFallback('toggleBookmark', error);
    return { userId: payload.userId, bookmarked: payload.bookmark };
  }
}
