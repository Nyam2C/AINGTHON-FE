type PaginationDotsProps = {
  currentIndex: 0 | 1 | 2;
  total?: number;
  className?: string;
};

export function PaginationDots({
  currentIndex,
  total = 3,
  className,
}: PaginationDotsProps) {
  return (
    <div
      role="tablist"
      className={`flex items-center justify-center gap-[13px] ${className ?? ''}`}
    >
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === currentIndex;
        return (
          <span
            key={index}
            aria-current={isActive ? 'step' : undefined}
            className={`h-[13px] w-[13px] rounded-full ${
              isActive ? 'bg-blue-500' : 'bg-[#B2B2B2]'
            }`}
          />
        );
      })}
    </div>
  );
}
