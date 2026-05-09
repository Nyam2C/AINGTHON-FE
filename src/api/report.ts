import { apiClient } from './client';
import type { ReportPayload, ReportResponse } from '../types/report';

function warnFallback(label: string, error: unknown) {
  console.warn(`${label} fallback to mocks (backend unavailable)`, error);
}

export async function submitReport(
  matchId: string,
  payload: ReportPayload,
  files: File[],
): Promise<ReportResponse> {
  const form = new FormData();
  form.append('insights', payload.insights);
  form.append('nextGoals', payload.nextGoals);
  files.forEach(f => form.append('files', f));
  try {
    const { data } = await apiClient.post<ReportResponse>(
      `/matches/${encodeURIComponent(matchId)}/report`,
      form,
      { headers: { 'Content-Type': 'multipart/form-data' } },
    );
    return data;
  } catch (error) {
    warnFallback('submitReport', error);
    return {
      reportId: `mock-${Date.now()}`,
      fileNames: files.map(f => f.name),
    };
  }
}
