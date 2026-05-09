import type { MatchUserSummary } from '../../types/match';

type RecommendationCardProps = {
  user?: MatchUserSummary;
  onClick?: (userId: string) => void;
  className?: string;
};

export function RecommendationCard({
  user,
  onClick,
  className,
}: RecommendationCardProps) {
  if (!user) {
    return (
      <div
        className={`w-[321px] h-[80px] bg-white border border-[#E6EBF3] rounded-[12px] flex items-center justify-between px-[16px] ${className ?? ''}`}
      >
        <div className="flex items-center gap-[12px]">
          <span
            className="w-[48px] h-[48px] rounded-full bg-[#D7E6FF]"
            aria-hidden="true"
          />
          <span className="text-[14px] text-[#8E8E8E]">
            추천이 곧 도착합니다
          </span>
        </div>
        <span aria-hidden="true" className="text-[#8E8E8E]">
          →
        </span>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onClick?.(user.userId)}
      className={`w-[321px] h-[80px] bg-white border border-[#E6EBF3] rounded-[12px] flex items-center justify-between px-[16px] text-left ${className ?? ''}`}
    >
      <div className="flex items-center gap-[12px]">
        <span
          className="w-[48px] h-[48px] rounded-full bg-[#D7E6FF]"
          aria-hidden="true"
        />
        <div>
          <p className="text-[16px] font-bold text-black">{user.name}</p>
          <p className="text-[12px] text-[#8E8E8E]">{user.jobTitle}</p>
        </div>
      </div>
      <span aria-hidden="true" className="text-[#8E8E8E]">
        →
      </span>
    </button>
  );
}
