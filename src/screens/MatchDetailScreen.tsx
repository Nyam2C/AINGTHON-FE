import { useNavigate, useParams } from 'react-router-dom';

import { BottomNav } from '../components/common/BottomNav';
import { LoadingAnimation } from '../components/common/LoadingAnimation';
import { CodemateLogo } from '../components/landing/CodemateLogo';
import { RatingDisplay } from '../components/match/RatingDisplay';
import { useMatchUserQuery } from '../hooks/useMatchUserQuery';
import { useBookmarkStore } from '../store/useBookmarkStore';
import { fieldLabel } from '../utils/profileLabel';

export function MatchDetailScreen() {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const profileId = userId ? Number(userId) : null;
  const { data: user, isLoading, isError } = useMatchUserQuery(profileId);

  const isBookmarked = useBookmarkStore(s =>
    profileId === null ? false : s.ids.has(profileId),
  );
  const toggleBookmark = useBookmarkStore(s => s.toggle);

  const handleRequest = () => {
    if (profileId == null) return;
    navigate(`/match/${profileId}/request`);
  };

  const handleBookmark = () => {
    if (profileId == null) return;
    toggleBookmark(profileId);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
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
            <div className="px-[34px] flex flex-col items-center">
              <div className="flex items-center gap-[6px]">
                <CodemateLogo
                  width={20}
                  height={20}
                  className="text-blue-500"
                />
                <span className="text-[14px] text-blue-500 font-medium">
                  멘토
                </span>
              </div>

              <div className="mt-[12px] w-[100px] h-[100px] rounded-full bg-[#D7E6FF] flex items-center justify-center overflow-hidden">
                {user.profileImageUrl ? (
                  <img
                    src={user.profileImageUrl}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <PersonSilhouette />
                )}
              </div>
              <h1 className="mt-[12px] font-inter text-[24px] font-bold text-black">
                {user.name}
              </h1>
              {user.introduction && (
                <p className="mt-[2px] text-[14px] text-[#8E8E8E]">
                  {user.introduction}
                </p>
              )}
              <RatingDisplay
                rating={user.averageRating}
                count={user.reviewCount}
                withArrow
                className="mt-[6px]"
              />
              {user.fields.length > 0 && (
                <div className="mt-[12px] flex flex-wrap justify-center gap-[8px]">
                  {user.fields.map(f => (
                    <span
                      key={f}
                      className="px-[16px] py-[6px] rounded-[10px] bg-[#EAEFF6] text-[#5C6470] text-[14px]"
                    >
                      {fieldLabel(f)}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-[24px] px-[34px] flex flex-col gap-[16px]">
              {user.link && (
                <LinkBox label="소개 링크" url={user.link} />
              )}
              {user.goal && <DetailBox label="목표">{user.goal}</DetailBox>}
              {user.techStacks.length > 0 && (
                <div>
                  <span className="block font-bold text-[16px] text-black mb-[8px]">
                    기술 스택
                  </span>
                  <div className="flex flex-wrap gap-[8px]">
                    {user.techStacks.map(t => (
                      <span
                        key={t}
                        className="px-[14px] py-[6px] rounded-[10px] bg-[#EAEFF6] text-[#5C6470] text-[14px]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <DetailBox label="프로젝트" multiline>
                {user.projectExperiences.length > 0
                  ? user.projectExperiences.join('\n')
                  : '—'}
              </DetailBox>
              <DetailBox label="경력" multiline>
                {user.careers.length > 0 ? user.careers.join('\n') : '—'}
              </DetailBox>
            </div>

            <div className="mt-[28px] px-[34px] flex gap-[12px]">
              <button
                type="button"
                onClick={handleBookmark}
                aria-pressed={isBookmarked}
                className={`flex-1 h-[52px] rounded-[9px] border text-[16px] font-medium transition-colors ${
                  isBookmarked
                    ? 'border-blue-500 bg-blue-500 text-white'
                    : 'border-blue-500 bg-white text-blue-500'
                }`}
              >
                북마크
              </button>
              <button
                type="button"
                onClick={handleRequest}
                className="flex-1 h-[52px] rounded-[9px] bg-blue-500 text-white text-[16px] font-medium"
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

function DetailBox({
  label,
  multiline = false,
  children,
}: {
  label: string;
  multiline?: boolean;
  children: string;
}) {
  return (
    <div>
      <span className="block font-bold text-[16px] text-black mb-[8px]">
        {label}
      </span>
      <div className="relative bg-white border border-[#94A3B8] rounded-[8px] px-[14px] py-[12px]">
        {multiline ? (
          <p className="text-[14px] text-black whitespace-pre-wrap">
            {children}
          </p>
        ) : (
          <p className="text-[14px] text-black truncate pr-[24px]">
            {children}
          </p>
        )}
      </div>
    </div>
  );
}

function ensureUrl(url: string): string {
  if (/^https?:\/\//i.test(url)) return url;
  if (/^[\w.+-]+@[\w.-]+\.[a-z]{2,}$/i.test(url)) return `mailto:${url}`;
  return `https://${url}`;
}

function LinkBox({ label, url }: { label: string; url: string }) {
  return (
    <div>
      <span className="block font-bold text-[16px] text-black mb-[8px]">
        {label}
      </span>
      <a
        href={ensureUrl(url)}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block bg-white border border-[#94A3B8] rounded-[8px] px-[14px] py-[12px] hover:border-blue-500 transition-colors"
      >
        <span className="text-[14px] text-black truncate pr-[24px] block">
          {url}
        </span>
        <span
          aria-hidden="true"
          className="absolute right-[12px] top-1/2 -translate-y-1/2 text-[#8E8E8E]"
        >
          <LinkIcon />
        </span>
      </a>
    </div>
  );
}

function PersonSilhouette() {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle
        cx="28"
        cy="20"
        r="9"
        stroke="#3B82F6"
        strokeWidth="3"
        fill="#3B82F6"
      />
      <path
        d="M10 50c0-9 8-16 18-16s18 7 18 16"
        stroke="#3B82F6"
        strokeWidth="3"
        strokeLinecap="round"
        fill="#3B82F6"
      />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M7.2 10.8a3.5 3.5 0 0 0 5.3 0l2.5-2.5a3.5 3.5 0 0 0-5-5l-1 1m-1 4.4a3.5 3.5 0 0 0-5.3 0L0.2 11.2a3.5 3.5 0 0 0 5 5l1-1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
