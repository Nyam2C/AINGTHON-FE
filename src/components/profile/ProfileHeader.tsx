import { AvatarUploader } from './AvatarUploader';
import { RatingSummary } from './RatingSummary';
import { RoleBadge } from './RoleBadge';

type ProfileHeaderProps = {
  name: string;
  subtitle: string;
  role: 'mentor' | 'mentee' | null;
  profileImageUrl?: string;
  averageRating: number;
  reviewCount: number;
  onAvatarChange: (file: File) => void;
  onRatingClick: () => void;
  isUploading: boolean;
};

/**
 * 캡처 상단 영역 — 배지 / 아바타 / 이름 / 부제 / 별점.
 */
export function ProfileHeader({
  name,
  subtitle,
  role,
  profileImageUrl,
  averageRating,
  reviewCount,
  onAvatarChange,
  onRatingClick,
  isUploading,
}: ProfileHeaderProps) {
  return (
    <header className="flex flex-col gap-[12px]">
      <RoleBadge role={role} />
      <div className="flex items-center gap-[16px]">
        <AvatarUploader
          profileImageUrl={profileImageUrl}
          onChange={onAvatarChange}
          isUploading={isUploading}
        />
        <div className="flex flex-col gap-[4px]">
          <h1 className="text-[24px] font-bold text-black">
            {name || '이름 없음'}
          </h1>
          <p className="text-[14px] text-[#8E8E8E]">{subtitle}</p>
          <RatingSummary
            averageRating={averageRating}
            reviewCount={reviewCount}
            onClick={onRatingClick}
          />
        </div>
      </div>
    </header>
  );
}
