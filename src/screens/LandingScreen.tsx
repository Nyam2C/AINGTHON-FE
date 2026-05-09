import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { CodemateLogo } from '../components/landing/CodemateLogo';
import { CodemateWordmark } from '../components/landing/CodemateWordmark';

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
      <div className="relative mx-auto h-[844px] w-[390px] bg-blue-500">
        <div className="absolute left-1/2 top-[280px] flex -translate-x-1/2 flex-col items-center gap-4">
          <CodemateLogo
            width={142}
            height={139}
            className="text-white motion-safe:animate-fade-in-up motion-reduce:animate-none"
          />
          <CodemateWordmark className="text-white motion-safe:animate-fade-in-delayed motion-reduce:animate-none" />
        </div>
      </div>
    </div>
  );
}
