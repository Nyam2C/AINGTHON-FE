import { apiClient } from './client';
import type {
  ActivityReportCreateRequest,
  ActivityReportResponse,
  ActivityReportUpdateRequest,
} from '../types/report';

export async function createReport(
  body: ActivityReportCreateRequest,
): Promise<ActivityReportResponse> {
  const { data } = await apiClient.post<ActivityReportResponse>(
    '/api/reports',
    body,
  );
  return data;
}

export async function uploadReportAttachment(
  reportId: number,
  file: File,
): Promise<ActivityReportResponse> {
  const form = new FormData();
  form.append('file', file);
  const { data } = await apiClient.post<ActivityReportResponse>(
    `/api/reports/${reportId}/attachment`,
    form,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
  return data;
}

export async function updateReport(
  reportId: number,
  body: ActivityReportUpdateRequest,
): Promise<ActivityReportResponse> {
  const { data } = await apiClient.put<ActivityReportResponse>(
    `/api/reports/${reportId}`,
    body,
  );
  return data;
}

export async function getMyReports(): Promise<ActivityReportResponse[]> {
  const { data } = await apiClient.get<ActivityReportResponse[]>(
    '/api/reports/my',
  );
  return data;
}

export async function getReport(
  reportId: number,
): Promise<ActivityReportResponse> {
  const { data } = await apiClient.get<ActivityReportResponse>(
    `/api/reports/${reportId}`,
  );
  return data;
}
