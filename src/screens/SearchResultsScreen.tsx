import { useNavigate } from 'react-router-dom';

import { BottomNav } from '../components/common/BottomNav';
import { LoadingAnimation } from '../components/common/LoadingAnimation';
import { MatchCandidateCard } from '../components/match/MatchCandidateCard';
import { useBookmarkMutation } from '../hooks/useBookmarkMutation';
import { useSearchUsersQuery } from '../hooks/useSearchUsersQuery';
import { useSearchFilterStore } from '../store/useSearchFilterStore';

export function SearchResultsScreen() {
  const navigate = useNavigate();
  const keyword = useSearchFilterStore(s => s.keyword);
  const role = useSearchFilterStore(s => s.role);
  const techStack = useSearchFilterStore(s => s.techStack);
  const grades = useSearchFilterStore(s => s.grades);

  const { data, isLoading, isError } = useSearchUsersQuery({
    keyword,
    role,
    techStack,
    grades,
  });
  const bookmarkMutation = useBookmarkMutation();

  const handleBack = () => navigate(-1);
  const handleViewProfile = (userId: string) => navigate(`/match/${userId}`);
  const handleBookmarkToggle = (userId: string, next: boolean) => {
    bookmarkMutation.mutate(
      { userId, bookmark: next },
      {
        onError: err => console.error('toggleBookmark failed', err),
      },
    );
  };

  return (
    <div className="flex min-h-screen items-start justify-center bg-black">
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
            전체 {data?.total ?? 0}명
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
          {data && data.users.length === 0 && (
            <p className="mt-[80px] text-center text-[14px] text-[#8E8E8E]">
              조건에 맞는 사용자가 없습니다.
            </p>
          )}
          {data && data.users.length > 0 && (
            <ul className="flex flex-col">
              {data.users.map(u => (
                <li key={u.userId}>
                  <MatchCandidateCard
                    user={u}
                    onBookmarkToggle={handleBookmarkToggle}
                    onViewProfile={handleViewProfile}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        <BottomNav active="search" />
      </div>
    </div>
  );
}
