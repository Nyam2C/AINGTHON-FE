/**
 * Spring Security OAuth2 default redirect endpoint.
 * 백엔드는 Google 인증 완료 후 frontend의 `/auth/callback?token=<JWT>`로 redirect한다.
 */
export function getGoogleLoginUrl(): string {
  const base = import.meta.env.VITE_API_BASE_URL ?? '';
  return `${base}/oauth2/authorization/google`;
}
