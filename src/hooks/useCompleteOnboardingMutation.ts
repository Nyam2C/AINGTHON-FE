import { useMutation } from '@tanstack/react-query';

import { completeOnboarding } from '../api/onboarding';
import type {
  OnboardingPayload,
  OnboardingResponse,
} from '../types/onboarding';

export function useCompleteOnboardingMutation() {
  return useMutation<OnboardingResponse, Error, OnboardingPayload>({
    mutationFn: completeOnboarding,
  });
}
