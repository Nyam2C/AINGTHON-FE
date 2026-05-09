import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useAuthStore } from '../store/useAuthStore';

export function AuthCallbackScreen() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const login = useAuthStore(s => s.login);

  useEffect(() => {
    const token = searchParams.get('token');
    const error = searchParams.get('error');

    if (error || !token) {
      navigate('/login', { replace: true });
      return;
    }

    login(token);
    navigate('/home', { replace: true });
  }, [searchParams, login, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="relative mx-auto h-[844px] w-[390px] bg-white">
        <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-center font-inter text-[16px] font-medium text-[#8E8E8E]">
          로그인 처리 중...
        </p>
      </div>
    </div>
  );
}
