import axios, { AxiosError, type AxiosResponse } from 'axios';

type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Request: Bearer JWT 자동 부착 (token 출처는 추후 — 임시 localStorage)
apiClient.interceptors.request.use(config => {
  const token =
    typeof window !== 'undefined' ? window.localStorage.getItem('jwt') : null;
  if (token) {
    config.headers.set?.('Authorization', `Bearer ${token}`);
  }
  return config;
});

// Response: ApiResponse<T> wrapper unwrap (success=false → throw)
apiClient.interceptors.response.use(
  (response: AxiosResponse<ApiResponse<unknown>>) => {
    const body = response.data;
    if (body && typeof body === 'object' && 'success' in body) {
      if (body.success === false) {
        throw new Error(body.message ?? 'API request failed');
      }
      response.data = body.data as never;
    }
    return response;
  },
  (error: AxiosError<ApiResponse<unknown>>) => {
    const message = error.response?.data?.message ?? error.message;
    return Promise.reject(new Error(message));
  },
);
