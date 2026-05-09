import { RatingDisplay } from './RatingDisplay';
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
  const handleView = () => {
    onViewProfile(user.id);
  };

  const subtitle = [
    user.university,
    user.grade ? gradeLabel(user.grade) : null,
  ]
    .filter(Boolean)
    .join(' · ');

  const fieldLine = user.fields.map(fieldLabel).join(', ');

  return (
    <article
      className={`relative w-[321px] min-h-[92px] py-[16px] border-b border-[#E6EBF3] flex items-start gap-[12px] ${className ?? ''}`}
    >
      {user.profileImageUrl ? (
        <img
          src={user.profileImageUrl}
          alt=""
          className="w-[60px] h-[60px] rounded-full object-cover shrink-0"
        />
      ) : (
        <span
          className="w-[60px] h-[60px] rounded-full bg-[#D7E6FF] shrink-0"
          aria-hidden="true"
        />
      )}
      <div className="flex-1 min-w-0">
        <p className="text-[16px] font-bold text-black truncate">{user.name}</p>
        {subtitle && (
          <p className="text-[14px] text-[#8E8E8E] truncate">{subtitle}</p>
        )}
        {fieldLine && (
          <p className="text-[13px] text-[#5C6470] truncate">{fieldLine}</p>
        )}
        <RatingDisplay
          rating={user.averageRating}
          count={user.reviewCount}
          className="mt-[4px]"
        />
      </div>
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
