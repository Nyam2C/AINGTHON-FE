// stub 단계: axios 인스턴스 import는 유지하되 호출 라인은 주석 처리한다.
// 실제 백엔드 연동 시점에 주석을 풀어 apiClient.post(...)를 활성화한다.
import { apiClient } from './client';
import type {
  OnboardingPayload,
  OnboardingResponse,
} from '../types/onboarding';

// apiClient가 stub 단계에서 미사용 경고를 내지 않도록 void 처리.
// 실제 호출 활성화 시 이 라인은 제거한다.
void apiClient;

export async function completeOnboarding(
  payload: OnboardingPayload,
): Promise<OnboardingResponse> {
  // TODO: 실제 연동 시 아래 한 줄을 활성화하고 stub 블록을 제거한다.
  // const { data } = await apiClient.post<OnboardingResponse>('/onboarding/complete', payload);
  // return data;

  // stub: payload는 시그니처 호환을 위해 받지만 사용하지 않는다.
  void payload;
  return Promise.resolve({ ok: true } satisfies OnboardingResponse);
}
