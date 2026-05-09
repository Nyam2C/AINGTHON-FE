import type { MouseEvent } from 'react';

import { RatingDisplay } from './RatingDisplay';
import type { MatchUserSummary } from '../../types/match';

type MatchCandidateCardProps = {
  user: MatchUserSummary;
  onBookmarkToggle: (userId: string, next: boolean) => void;
  onViewProfile: (userId: string) => void;
  className?: string;
};

export function MatchCandidateCard({
  user,
  onBookmarkToggle,
  onViewProfile,
  className,
}: MatchCandidateCardProps) {
  const handleBookmark = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onBookmarkToggle(user.userId, !user.bookmarked);
  };

  const handleView = () => {
    onViewProfile(user.userId);
  };

  return (
    <article
      className={`relative w-[321px] min-h-[92px] py-[16px] border-b border-[#E6EBF3] flex items-start gap-[12px] ${className ?? ''}`}
    >
      <span
        className="w-[60px] h-[60px] rounded-full bg-[#D7E6FF] shrink-0"
        aria-hidden="true"
      />
      <div className="flex-1 min-w-0">
        <p className="text-[16px] font-bold text-black truncate">{user.name}</p>
        <p className="text-[14px] text-[#8E8E8E] truncate">{user.jobTitle}</p>
        <RatingDisplay
          rating={user.rating}
          count={user.ratingCount}
          className="mt-[4px]"
        />
      </div>
      <button
        type="button"
        onClick={handleBookmark}
        aria-label={user.bookmarked ? '북마크 해제' : '북마크'}
        aria-pressed={user.bookmarked}
        className="absolute right-[8px] top-[16px] w-[24px] h-[24px] flex items-center justify-center text-blue-500"
      >
        <span aria-hidden="true" className="text-[20px] leading-none">
          {user.bookmarked ? '★' : '☆'}
        </span>
      </button>
      <button
        type="button"
        onClick={handleView}
        className="absolute right-[8px] bottom-[16px] w-[86px] h-[32px] bg-blue-500 text-white text-[14px] rounded-[8px]"
      >
        프로필 보기
      </button>
    </article>
  );
}
