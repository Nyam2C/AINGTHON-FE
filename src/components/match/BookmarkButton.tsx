type BookmarkButtonProps = {
  bookmarked: boolean;
  onToggle: () => void;
  className?: string;
};

export function BookmarkButton({
  bookmarked,
  onToggle,
  className,
}: BookmarkButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={bookmarked}
      aria-label={bookmarked ? '북마크 해제' : '북마크'}
      className={`w-[145px] h-[52px] rounded-[9px] border border-blue-500 bg-white text-blue-500 text-[16px] font-medium flex items-center justify-center gap-[8px] ${className ?? ''}`}
    >
      <span aria-hidden="true">{bookmarked ? '★' : '☆'}</span>
      <span>북마크</span>
    </button>
  );
}
