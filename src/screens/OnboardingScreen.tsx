import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { CodemateLogo } from '../components/landing/CodemateLogo';
import { CodemateWordmark } from '../components/landing/CodemateWordmark';

export function OnboardingScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timerId = setTimeout(() => {
      navigate('/onboarding/intro', { replace: true });
    }, 1500);
    return () => clearTimeout(timerId);
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="relative mx-auto h-[844px] w-[390px] bg-white">
        <div className="absolute left-1/2 top-[280px] flex -translate-x-1/2 flex-col items-center gap-4">
          <CodemateLogo width={142} height={139} className="text-blue-500" />
          <CodemateWordmark className="text-blue-500" />
          <p className="onboarding-rise-1 whitespace-nowrap text-center font-inter text-[20px] font-bold leading-[28px] text-black">
            AI 시대, 불안은 나누고
            <br />
            성장은 함께,
          </p>
        </div>
        <div className="absolute bottom-[60px] left-1/2 -translate-x-1/2">
          <p className="onboarding-rise-2 whitespace-nowrap text-center font-inter text-[20px] font-bold leading-[28px] text-blue-500">
            대학생 개발자를 위한
            <br />
            멘토링 커뮤니티
          </p>
        </div>
      </div>
    </div>
  );
}
