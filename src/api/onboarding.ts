import { apiClient } from './client';
import type { OnboardingPayload } from '../types/onboarding';
import { FIELD_MAP, GRADE_MAP } from '../types/onboarding';
import type { ProfileCreateRequest, ProfileResponse } from '../types/profile';

export function buildProfileCreateRequest(
  payload: OnboardingPayload,
): ProfileCreateRequest {
  return {
    name: payload.name,
    introduction: payload.bio || undefined,
    fields: payload.interests.map(i => FIELD_MAP[i]),
    major: payload.major === 'major',
    techStacks: payload.techStack.length ? payload.techStack : undefined,
    university: payload.university || undefined,
    grade: payload.grade ? GRADE_MAP[payload.grade] : undefined,
    careers: payload.career
      ? payload.career
          .split('\n')
          .map(s => s.trim())
          .filter(Boolean)
      : undefined,
    projectExperiences: payload.projects
      ? payload.projects
          .split('\n')
          .map(s => s.trim())
          .filter(Boolean)
      : undefined,
    goal: payload.goals || undefined,
  };
}

export async function completeOnboarding(
  payload: OnboardingPayload,
): Promise<ProfileResponse> {
  const body = buildProfileCreateRequest(payload);
  const { data } = await apiClient.post<ProfileResponse>(
    '/api/profiles',
    body,
  );
  return data;
}
