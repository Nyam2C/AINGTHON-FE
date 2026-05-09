type ResultCountButtonProps = {
  count: number;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
};

export function ResultCountButton({
  count,
  onClick,
  disabled = false,
  className,
}: ResultCountButtonProps) {
  const isDisabled = disabled || count === 0;
  const stateClass = isDisabled
    ? 'bg-gray-300 cursor-not-allowed'
    : 'bg-blue-500';
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      className={`w-[321px] h-[52px] rounded-[12px] text-white text-[16px] font-medium ${stateClass} ${className ?? ''}`}
    >
      {count}명의 사용자 보기
    </button>
  );
}
