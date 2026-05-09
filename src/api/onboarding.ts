import { apiClient } from './client';
import type {
  OnboardingPayload,
  OnboardingResponse,
} from '../types/onboarding';

export async function completeOnboarding(
  payload: OnboardingPayload,
): Promise<OnboardingResponse> {
  const { data } = await apiClient.post<OnboardingResponse>(
    '/onboarding/complete',
    payload,
  );
  return data;
}
