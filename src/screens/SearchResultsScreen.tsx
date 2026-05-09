import { useNavigate } from 'react-router-dom';

import { BottomNav } from '../components/common/BottomNav';
import { LoadingAnimation } from '../components/common/LoadingAnimation';
import { MatchCandidateCard } from '../components/match/MatchCandidateCard';
import { useSearchProfilesQuery } from '../hooks/useSearchProfilesQuery';
import { useSearchFilterStore } from '../store/useSearchFilterStore';

const PAGE_SIZE = 20;

export function SearchResultsScreen() {
  const navigate = useNavigate();
  const keyword = useSearchFilterStore(s => s.keyword);
  const techStack = useSearchFilterStore(s => s.techStack);
  const sameUniversity = useSearchFilterStore(s => s.sameUniversity);
  const grade = useSearchFilterStore(s => s.grade);
  const page = useSearchFilterStore(s => s.page);
  const setPage = useSearchFilterStore(s => s.setPage);

  const { data, isLoading, isError } = useSearchProfilesQuery({
    keyword: keyword || undefined,
    techStack: techStack || undefined,
    sameUniversity: sameUniversity || undefined,
    grade: grade ?? undefined,
    page,
    size: PAGE_SIZE,
  });

  const handleBack = () => navigate(-1);
  const handleViewProfile = (profileId: number) =>
    navigate(`/match/${profileId}`);

  const total = data?.totalElements ?? 0;
  const items = data?.content ?? [];
  const hasMore = data ? !data.last : false;

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="relative mx-auto w-[390px] min-h-[844px] bg-white pt-[20px] pb-[100px]">
        <header className="px-[34px] flex items-center gap-[12px]">
          <button
            type="button"
            onClick={handleBack}
            aria-label="뒤로 가기"
            className="w-[40px] h-[40px] flex items-center justify-center"
          >
            ←
          </button>
          <span className="font-inter text-[16px] font-bold">
            전체 {total}명
          </span>
        </header>

        <div className="mt-[16px] px-[34px]">
          {isLoading && (
            <div className="flex justify-center mt-[80px]">
              <LoadingAnimation />
            </div>
          )}
          {isError && (
            <p className="mt-[80px] text-center text-[14px] text-[#8E8E8E]">
              결과를 불러올 수 없습니다.
            </p>
          )}
          {data && items.length === 0 && (
            <p className="mt-[80px] text-center text-[14px] text-[#8E8E8E]">
              조건에 맞는 사용자가 없습니다.
            </p>
          )}
          {items.length > 0 && (
            <ul className="flex flex-col">
              {items.map(u => (
                <li key={u.id}>
                  <MatchCandidateCard
                    user={u}
                    onViewProfile={handleViewProfile}
                  />
                </li>
              ))}
            </ul>
          )}
          {hasMore && (
            <div className="mt-[16px] flex justify-center">
              <button
                type="button"
                onClick={() => setPage(page + 1)}
                className="h-[40px] px-[20px] rounded-[8px] border border-[#E6EBF3] text-[14px] text-[#5C6470]"
              >
                다음 페이지
              </button>
            </div>
          )}
        </div>

        <BottomNav active="search" />
      </div>
    </div>
  );
}
