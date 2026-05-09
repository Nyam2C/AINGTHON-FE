import { useNavigate, useParams } from 'react-router-dom';

import { BottomNav } from '../components/common/BottomNav';
import { LoadingAnimation } from '../components/common/LoadingAnimation';
import { CodemateLogo } from '../components/landing/CodemateLogo';
import { BookmarkButton } from '../components/match/BookmarkButton';
import { InterestTagRow } from '../components/match/InterestTagRow';
import { ProfileField } from '../components/match/ProfileField';
import { RatingDisplay } from '../components/match/RatingDisplay';
import { useBookmarkMutation } from '../hooks/useBookmarkMutation';
import { useMatchUserQuery } from '../hooks/useMatchUserQuery';
import type { Role } from '../types/onboarding';

const ROLE_BADGE_LABEL: Record<Role, string> = {
  mentor: '멘토',
  mentee: '멘티',
  both: '멘토·멘티',
};

export function MatchDetailScreen() {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const { data: user, isLoading, isError } = useMatchUserQuery(userId ?? '');
  const bookmarkMutation = useBookmarkMutation();

  const handleRequest = () => {
    if (!userId) return;
    navigate(`/match/${userId}/request`);
  };

  const handleBookmarkToggle = () => {
    if (!user) return;
    bookmarkMutation.mutate(
      { userId: user.userId, bookmark: !user.bookmarked },
      { onError: err => console.error('toggleBookmark failed', err) },
    );
  };

  return (
    <div className="flex min-h-screen items-start justify-center bg-black">
      <div className="relative mx-auto w-[390px] min-h-[844px] bg-white pt-[20px] pb-[100px]">
        {isLoading && (
          <div className="flex justify-center mt-[80px]">
            <LoadingAnimation />
          </div>
        )}
        {isError && (
          <p className="mt-[80px] text-center text-[14px] text-[#8E8E8E]">
            정보를 불러올 수 없습니다.
          </p>
        )}
        {user && (
          <>
            <div className="px-[34px]">
              <div className="flex items-center gap-[6px]">
                <CodemateLogo
                  width={20}
                  height={20}
                  className="text-blue-500"
                />
                <span className="text-[14px] text-blue-500 font-medium">
                  {ROLE_BADGE_LABEL[user.role]}
                </span>
              </div>

              <span
                className="block mt-[16px] w-[100px] h-[100px] rounded-full bg-[#D7E6FF]"
                aria-hidden="true"
              />
              <h1 className="mt-[16px] font-inter text-[24px] font-medium text-black">
                {user.name}
              </h1>
              <p className="mt-[4px] text-[14px] text-[#8E8E8E]">
                {user.jobTitle}
              </p>
              <RatingDisplay
                rating={user.rating}
                count={user.ratingCount}
                withArrow
                className="mt-[8px]"
              />

              <InterestTagRow tags={user.interests} className="mt-[16px]" />
            </div>

            <div className="mt-[24px] px-[34px] flex flex-col gap-[20px]">
              <ProfileField
                label="소개 링크"
                value={user.introLink}
                trailingIcon={<span>🔗</span>}
              />
              <ProfileField label="목표" value={user.goal} multiline />
              <div>
                <span className="block font-bold text-[16px] text-black mb-[8px]">
                  기술 스택
                </span>
                <div className="flex flex-wrap gap-[8px]">
                  {user.techStack.map(t => (
                    <span
                      key={t}
                      className="px-[14px] py-[8px] bg-[#D8E6FF] text-blue-600 rounded-full text-[14px]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <ProfileField label="프로젝트" value={user.projects} multiline />
              <ProfileField label="경력" value={user.career} multiline />
            </div>

            <div className="mt-[32px] px-[34px] flex gap-[12px]">
              <BookmarkButton
                bookmarked={user.bookmarked}
                onToggle={handleBookmarkToggle}
              />
              <button
                type="button"
                onClick={handleRequest}
                className="w-[145px] h-[52px] rounded-[9px] bg-blue-500 font-inter text-[16px] font-medium leading-[21px] tracking-[-0.01em] text-white transition-colors"
              >
                매칭 신청
              </button>
            </div>
          </>
        )}

        <BottomNav active="search" />
      </div>
    </div>
  );
}
