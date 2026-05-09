type SectionHeaderProps = {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
};

export function SectionHeader({
  title,
  actionLabel,
  onAction,
  className,
}: SectionHeaderProps) {
  return (
    <div className={`flex items-center justify-between ${className ?? ''}`}>
      <h2 className="font-inter text-[18px] font-bold text-black">{title}</h2>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="font-inter text-[14px] text-[#8E8E8E]"
        >
          {actionLabel} →
        </button>
      )}
    </div>
  );
}
