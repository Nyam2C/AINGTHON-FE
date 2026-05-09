type RatingSummaryProps = {
  averageRating: number;
  reviewCount: number;
  onClick: () => void;
};

/**
 * '★ 4.9 (23) →' 형태로 표시. 클릭 시 onClick 호출.
 */
export function RatingSummary({
  averageRating,
  reviewCount,
  onClick,
}: RatingSummaryProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-[4px] text-[14px] text-[#8E8E8E]"
    >
      <span aria-hidden="true">★</span>
      <span className="text-black font-medium">{averageRating.toFixed(1)}</span>
      <span>({reviewCount})</span>
      <span aria-hidden="true">→</span>
    </button>
  );
}
