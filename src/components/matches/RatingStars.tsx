type RatingStarsProps = {
  value: number; // 0~5
  onChange: (v: number) => void;
  size?: number;
  className?: string;
};

export function RatingStars({
  value,
  onChange,
  size = 48,
  className,
}: RatingStarsProps) {
  return (
    <div
      role="radiogroup"
      aria-label="별점"
      className={`flex gap-[8px] ${className ?? ''}`}
    >
      {[1, 2, 3, 4, 5].map(n => {
        const filled = n <= value;
        return (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={filled}
            aria-label={`${n}점`}
            onClick={() => onChange(value === n ? 0 : n)}
            className="flex items-center justify-center"
          >
            <svg
              width={size}
              height={size}
              viewBox="0 0 24 24"
              fill={filled ? '#3B82F6' : '#E6EBF3'}
              aria-hidden="true"
            >
              <path d="M12 2 L15 9 L22 10 L17 15 L18 22 L12 18 L6 22 L7 15 L2 10 L9 9 Z" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}
