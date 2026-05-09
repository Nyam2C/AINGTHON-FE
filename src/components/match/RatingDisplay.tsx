type RatingDisplayProps = {
  rating: number;
  count: number;
  withArrow?: boolean;
  className?: string;
};

export function RatingDisplay({
  rating,
  count,
  withArrow = false,
  className,
}: RatingDisplayProps) {
  return (
    <div className={`flex items-center gap-[4px] ${className ?? ''}`}>
      <span aria-hidden="true" className="text-blue-500">
        ★
      </span>
      <span className="text-[14px] text-[#8E8E8E]">
        {rating.toFixed(1)} ({count})
      </span>
      {withArrow && (
        <span aria-hidden="true" className="text-[#8E8E8E]">
          →
        </span>
      )}
    </div>
  );
}
