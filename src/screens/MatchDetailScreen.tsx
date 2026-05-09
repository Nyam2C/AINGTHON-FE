import { useNavigate, useParams } from 'react-router-dom';

import { BottomNav } from '../components/common/BottomNav';
import { LoadingAnimation } from '../components/common/LoadingAnimation';
import { CodemateLogo } from '../components/landing/CodemateLogo';
import { ProfileField } from '../components/match/ProfileField';
import { RatingDisplay } from '../components/match/RatingDisplay';
import { useMatchUserQuery } from '../hooks/useMatchUserQuery';

export function MatchDetailScreen() {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const profileId = userId ? Number(userId) : null;
  const { data: user, isLoading, isError } = useMatchUserQuery(profileId);

  const handleRequest = () => {
    if (profileId == null) return;
    navigate(`/match/${profileId}/request`);
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
                  {user.major ? '전공자' : '비전공자'}
                </span>
              </div>

              <span
                className="block mt-[16px] w-[100px] h-[100px] rounded-full bg-[#D7E6FF]"
                aria-hidden="true"
              />
              <h1 className="mt-[16px] font-inter text-[24px] font-medium text-black">
                {user.name}
              </h1>
              {user.university && (
                <p className="mt-[4px] text-[14px] text-[#8E8E8E]">
                  {user.university}
                </p>
              )}
              <RatingDisplay
                rating={user.averageRating}
                count={user.reviewCount}
                withArrow
                className="mt-[8px]"
              />
            </div>

            <div className="mt-[24px] px-[34px] flex flex-col gap-[20px]">
              {user.link && (
                <ProfileField
                  label="소개 링크"
                  value={user.link}
                  trailingIcon={<span>🔗</span>}
                />
              )}
              {user.goal && (
                <ProfileField label="목표" value={user.goal} multiline />
              )}
              {user.techStacks.length > 0 && (
                <div>
                  <span className="block font-bold text-[16px] text-black mb-[8px]">
                    기술 스택
                  </span>
                  <div className="flex flex-wrap gap-[8px]">
                    {user.techStacks.map(t => (
                      <span
                        key={t}
                        className="px-[14px] py-[8px] bg-[#D8E6FF] text-blue-600 rounded-full text-[14px]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {user.projectExperiences.length > 0 && (
                <ProfileField
                  label="프로젝트"
                  value={user.projectExperiences.join('\n')}
                  multiline
                />
              )}
              {user.careers.length > 0 && (
                <ProfileField
                  label="경력"
                  value={user.careers.join('\n')}
                  multiline
                />
              )}
            </div>

            <div className="mt-[32px] px-[34px] flex justify-center">
              <button
                type="button"
                onClick={handleRequest}
                className="w-[280px] h-[52px] rounded-[9px] bg-blue-500 font-inter text-[16px] font-medium leading-[21px] tracking-[-0.01em] text-white transition-colors"
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
