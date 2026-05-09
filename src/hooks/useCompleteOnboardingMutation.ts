import { useMutation } from '@tanstack/react-query';

import { completeOnboarding } from '../api/onboarding';
import type { OnboardingPayload } from '../types/onboarding';
import type { ProfileResponse } from '../types/profile';

export function useCompleteOnboardingMutation() {
  return useMutation<ProfileResponse, Error, OnboardingPayload>({
    mutationFn: completeOnboarding,
  });
}
