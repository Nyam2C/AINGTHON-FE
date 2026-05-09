import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { CodemateLogo } from '../components/landing/CodemateLogo';
import { CodemateWordmark } from '../components/landing/CodemateWordmark';
import { IPhoneHomeIndicator } from '../components/landing/IPhoneHomeIndicator';
import { IPhoneStatusBar } from '../components/landing/IPhoneStatusBar';

export function LandingScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timerId = setTimeout(() => {
      navigate('/onboarding', { replace: true });
    }, 1000);
    return () => clearTimeout(timerId);
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="relative mx-auto flex h-[844px] w-[390px] flex-col bg-blue-500">
        <IPhoneStatusBar className="text-white" />
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <CodemateLogo
            width={142}
            height={139}
            className="text-white motion-safe:animate-fade-in-up motion-reduce:animate-none"
          />
          <CodemateWordmark className="text-white motion-safe:animate-fade-in-delayed motion-reduce:animate-none" />
        </div>
        <IPhoneHomeIndicator className="text-black" />
      </div>
    </div>
  );
}
