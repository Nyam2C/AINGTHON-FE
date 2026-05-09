import type { MouseEvent } from 'react';

import { RatingDisplay } from './RatingDisplay';
import { useBookmarkStore } from '../../store/useBookmarkStore';
import type { ProfileResponse } from '../../types/profile';
import { fieldLabel, gradeLabel } from '../../utils/profileLabel';

type MatchCandidateCardProps = {
  user: ProfileResponse;
  onViewProfile: (profileId: number) => void;
  className?: string;
};

export function MatchCandidateCard({
  user,
  onViewProfile,
  className,
}: MatchCandidateCardProps) {
  const isBookmarked = useBookmarkStore(s => s.ids.has(user.id));
  const toggleBookmark = useBookmarkStore(s => s.toggle);

  const handleView = () => {
    onViewProfile(user.id);
  };

  const handleBookmark = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    toggleBookmark(user.id);
  };

  const subtitle = user.grade ? gradeLabel(user.grade) : '';
  const fieldLine = user.fields.map(fieldLabel).join(', ');

  return (
    <article
      className={`relative w-[321px] min-h-[92px] py-[16px] border-b border-[#E6EBF3] flex items-start gap-[12px] ${className ?? ''}`}
    >
      {user.profileImageUrl ? (
        <img
          src={user.profileImageUrl}
          alt=""
          className="w-[56px] h-[56px] rounded-full object-cover shrink-0"
        />
      ) : (
        <span
          className="w-[56px] h-[56px] rounded-full bg-[#D7E6FF] shrink-0"
          aria-hidden="true"
        />
      )}
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-bold text-black truncate">{user.name}</p>
        {subtitle && (
          <p className="text-[12px] text-[#8E8E8E] truncate">{subtitle}</p>
        )}
        {fieldLine && (
          <p className="text-[12px] text-[#5C6470] truncate">{fieldLine}</p>
        )}
        <RatingDisplay
          rating={user.averageRating}
          count={user.reviewCount}
          className="mt-[4px]"
        />
      </div>
      <div className="absolute right-[8px] bottom-[16px] flex items-center gap-[6px]">
        <button
          type="button"
          onClick={handleBookmark}
          aria-label={isBookmarked ? '북마크 해제' : '북마크'}
          aria-pressed={isBookmarked}
          className="w-[32px] h-[36px] flex items-center justify-center text-blue-500"
        >
          <BookmarkIcon filled={isBookmarked} />
        </button>
        <button
          type="button"
          onClick={handleView}
          className="w-[100px] h-[36px] bg-blue-500 text-white text-[13px] rounded-[8px]"
        >
          프로필 보기
        </button>
      </div>
    </article>
  );
}

function BookmarkIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.6"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M5 3h10a1 1 0 0 1 1 1v13l-6-3.5L4 17V4a1 1 0 0 1 1-1Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
