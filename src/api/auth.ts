/**
 * Spring Security OAuth2 default redirect endpoint.
 * 백엔드는 Google 인증 완료 후 frontend의 `/auth/callback?token=<JWT>`로 redirect한다.
 *
 * Mock 모드(VITE_USE_MOCK=true)에서는 실제 Google으로 redirect하지 않고
 * 가짜 JWT를 즉석 발급하여 `/auth/callback`으로 직접 이동한다.
 */
export function getGoogleLoginUrl(): string {
  if (import.meta.env.VITE_USE_MOCK === 'true') {
    const token = makeMockJwt({ userId: 1, sub: '1' });
    return `${window.location.origin}/auth/callback?token=${token}`;
  }
  const base = import.meta.env.VITE_API_BASE_URL ?? '';
  return `${base}/oauth2/authorization/google`;
}

function makeMockJwt(payload: { userId: number; sub: string }): string {
  const header = btoa(JSON.stringify({ alg: 'none', typ: 'JWT' }));
  const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24; // 24h
  const body = btoa(JSON.stringify({ ...payload, exp }));
  return `${header}.${body}.`;
}
