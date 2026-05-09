import { useNavigate } from 'react-router-dom';

import { PaginationDots } from '../components/onboarding/PaginationDots';
import { PrimaryButton } from '../components/onboarding/PrimaryButton';

export function OnboardingIntroScreen() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/onboarding/loading?next=/onboarding/role&duration=700');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="relative mx-auto h-[844px] w-[390px] bg-white motion-safe:animate-fade-in motion-reduce:animate-none">
        <div className="absolute left-1/2 top-[240px] w-full -translate-x-1/2 px-[34px] text-center">
          <h1 className="font-inter text-[32px] font-bold leading-[40px] text-black">
            AI 시대,
            <br />
            혼자 고민하지 마세요.
          </h1>
          <p className="mt-[16px] font-inter text-[20px] font-medium leading-[28px] text-[#8E8E8E]">
            같은 고민을 가진 사람들과
            <br />
            함께 성장해 보세요.
          </p>
        </div>
        <PaginationDots
          currentIndex={0}
          className="absolute bottom-[150px] left-1/2 -translate-x-1/2"
        />
        <div className="absolute bottom-[70px] left-1/2 -translate-x-1/2">
          <PrimaryButton label="시작하기" width={287} onClick={handleStart} />
        </div>
      </div>
    </div>
  );
}
