import { useNavigate } from 'react-router-dom';

import { BottomNav } from '../components/common/BottomNav';
import { WelcomeBanner } from '../components/home/WelcomeBanner';
import { CodemateWordmark } from '../components/landing/CodemateWordmark';

export function HomeScreen() {
  const navigate = useNavigate();

  const handleSearchClick = () => navigate('/search');

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="relative mx-auto w-[390px] min-h-[844px] bg-white pb-[80px]">
        <header className="px-[34px] pt-[20px] flex items-center justify-between">
          <CodemateWordmark className="!text-[20px] !leading-[24px]" />
          <span
            className="w-[40px] h-[40px] rounded-full bg-[#D7E6FF]"
            aria-hidden="true"
          />
        </header>

        <div className="mt-[20px] px-[34px]">
          <WelcomeBanner onSearchClick={handleSearchClick} />
        </div>

        <div className="mt-[40px] px-[34px] flex flex-col items-center justify-center text-center">
          <p className="text-[16px] font-semibold text-black">곧 만나요!</p>
          <p className="mt-[8px] text-[14px] text-[#8E8E8E]">
            맞춤 추천은 준비 중이에요. 검색으로 멘토를 찾아보세요.
          </p>
        </div>

        <BottomNav active="home" />
      </div>
    </div>
  );
}
