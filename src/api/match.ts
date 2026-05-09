import { apiClient } from './client';
import type {
  MatchRequestPayload,
  MatchResponse,
  SearchProfilesParams,
  SearchProfilesResponse,
} from '../types/match';
import type { ProfileResponse } from '../types/profile';
import type { ScheduleRequest, ScheduleResponse } from '../types/schedule';

/** 프로필 검색 (§6 search-domain). 본 도메인은 인터페이스 정합만 유지 */
export async function searchProfiles(
  params: SearchProfilesParams,
): Promise<SearchProfilesResponse> {
  const { data } = await apiClient.get<SearchProfilesResponse>(
    '/api/profiles',
    { params },
  );
  return data;
}

export async function requestMatch(
  payload: MatchRequestPayload,
): Promise<MatchResponse> {
  const { data } = await apiClient.post<MatchResponse>('/api/matches', payload);
  return data;
}

/** 프로필 단건 조회 — `MatchDetailScreen`이 이 함수로 ProfileResponse를 받음 */
export async function getMatchUser(profileId: number): Promise<ProfileResponse> {
  const { data } = await apiClient.get<ProfileResponse>(
    `/api/profiles/${profileId}`,
  );
  return data;
}

export async function approveMatch(matchId: number): Promise<MatchResponse> {
  const { data } = await apiClient.patch<MatchResponse>(
    `/api/matches/${matchId}/approve`,
  );
  return data;
}

export async function rejectMatch(matchId: number): Promise<MatchResponse> {
  const { data } = await apiClient.patch<MatchResponse>(
    `/api/matches/${matchId}/reject`,
  );
  return data;
}

export async function getSentMatches(): Promise<MatchResponse[]> {
  const { data } = await apiClient.get<MatchResponse[]>('/api/matches/sent');
  return data;
}

export async function getReceivedMatches(): Promise<MatchResponse[]> {
  const { data } =
    await apiClient.get<MatchResponse[]>('/api/matches/received');
  return data;
}

export async function proposeSchedule(
  matchId: number,
  body: ScheduleRequest,
): Promise<ScheduleResponse> {
  const { data } = await apiClient.post<ScheduleResponse>(
    `/api/matches/${matchId}/schedule`,
    body,
  );
  return data;
}

export async function updateSchedule(
  matchId: number,
  body: ScheduleRequest,
): Promise<ScheduleResponse> {
  const { data } = await apiClient.put<ScheduleResponse>(
    `/api/matches/${matchId}/schedule`,
    body,
  );
  return data;
}

export async function getUpcomingSchedules(): Promise<ScheduleResponse[]> {
  const { data } = await apiClient.get<ScheduleResponse[]>(
    '/api/matches/schedules/upcoming',
  );
  return data;
}

export async function getPastSchedules(): Promise<ScheduleResponse[]> {
  const { data } = await apiClient.get<ScheduleResponse[]>(
    '/api/matches/schedules/past',
  );
  return data;
}
