type PrimaryButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  width?: 287 | 321;
  className?: string;
};

export function PrimaryButton({
  label,
  onClick,
  disabled = false,
  width = 287,
  className,
}: PrimaryButtonProps) {
  const widthClass = width === 321 ? 'w-[321px]' : 'w-[287px]';
  const stateClass = disabled
    ? 'bg-gray-300 cursor-not-allowed'
    : 'bg-blue-500';

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${widthClass} h-[52px] rounded-[9px] ${stateClass} font-inter text-[16px] font-medium leading-[21px] tracking-[-0.01em] text-white transition-colors ${className ?? ''}`}
    >
      {label}
    </button>
  );
}
