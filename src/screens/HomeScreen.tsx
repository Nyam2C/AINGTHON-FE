import { useNavigate } from 'react-router-dom';

import { BottomNav } from '../components/common/BottomNav';
import { CodemateLogo } from '../components/landing/CodemateLogo';
import { CodemateWordmark } from '../components/landing/CodemateWordmark';
import { useMyProfileQuery } from '../hooks/useMyProfileQuery';

export function HomeScreen() {
  const navigate = useNavigate();
  const profileQuery = useMyProfileQuery();
  const userName = profileQuery.data?.name ?? 'OO';

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="relative mx-auto w-[390px] min-h-[844px] bg-white pb-[80px]">
        <header className="px-[24px] pt-[20px] flex items-center justify-between">
          <div className="flex items-center gap-[6px]">
            <CodemateLogo width={28} height={28} className="text-blue-500" />
            <CodemateWordmark className="!text-[20px] !leading-[24px]" />
          </div>
          <button
            type="button"
            onClick={() => navigate('/my')}
            aria-label="내 페이지로"
            className="text-black"
          >
            <ArrowRightIcon />
          </button>
        </header>

        <section className="mt-[16px] px-[24px]">
          <h1 className="text-[18px] font-medium leading-[26px] text-black">
            안녕하세요, {userName}님
            <br />
            오늘도 성장해볼까요?
          </h1>
        </section>

        <section className="mt-[20px] px-[24px] flex gap-[12px]">
          <button
            type="button"
            onClick={() => navigate('/search')}
            className="flex-1 h-[52px] rounded-[12px] bg-blue-500 text-white font-medium flex items-center justify-center gap-[8px]"
          >
            <SearchIcon />
            사람 찾기
          </button>
          <button
            type="button"
            onClick={() => navigate('/matches')}
            className="flex-1 h-[52px] rounded-[12px] bg-blue-500 text-white font-medium"
          >
            내 일정
          </button>
        </section>

        <section className="mt-[24px] px-[24px]">
          <div className="flex items-center justify-between">
            <h2 className="text-[18px] font-bold text-black">맞춤 추천</h2>
            <button
              type="button"
              onClick={() => navigate('/search')}
              className="text-[14px] text-[#8E8E8E]"
            >
              더보기
            </button>
          </div>
          <div className="mt-[16px] flex flex-col items-start">
            <span
              className="w-[40px] h-[40px] rounded-full bg-[#D7E6FF]"
              aria-hidden="true"
            />
          </div>
        </section>

        <BottomNav active="home" />
      </div>
    </div>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M5 12h14m0 0-6-6m6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="m17 17-3.5-3.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
