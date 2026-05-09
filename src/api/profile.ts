import { apiClient } from './client';
import type { ProfileResponse, ProfileUpdateRequest } from '../types/profile';

export async function getMyProfile(): Promise<ProfileResponse> {
  const { data } = await apiClient.get<ProfileResponse>('/api/profiles/me');
  return data;
}

export async function updateMyProfile(
  body: ProfileUpdateRequest,
): Promise<ProfileResponse> {
  const { data } = await apiClient.put<ProfileResponse>(
    '/api/profiles/me',
    body,
  );
  return data;
}

export async function getProfile(profileId: number): Promise<ProfileResponse> {
  const { data } = await apiClient.get<ProfileResponse>(
    `/api/profiles/${profileId}`,
  );
  return data;
}

export async function uploadProfileImage(file: File): Promise<ProfileResponse> {
  const form = new FormData();
  form.append('file', file);
  const { data } = await apiClient.put<ProfileResponse>(
    '/api/profiles/me/image',
    form,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
  return data;
}
