import { apiClient } from './client';
import { getMockEndMatch, getMockMatches } from './matches.mock';
import type { Meeting, MeetingStatus } from '../types/meeting';

function warnFallback(label: string, error: unknown) {
  console.warn(`${label} fallback to mocks (backend unavailable)`, error);
}

export async function getMatches(status: MeetingStatus): Promise<Meeting[]> {
  try {
    const { data } = await apiClient.get<Meeting[]>('/matches', {
      params: { status },
    });
    return data;
  } catch (error) {
    warnFallback('getMatches', error);
    return getMockMatches(status);
  }
}

export async function endMatch(matchId: string): Promise<{ ok: true }> {
  try {
    const { data } = await apiClient.post<{ ok: true }>(
      `/matches/${encodeURIComponent(matchId)}/end`,
    );
    return data;
  } catch (error) {
    warnFallback('endMatch', error);
    return getMockEndMatch(matchId);
  }
}
