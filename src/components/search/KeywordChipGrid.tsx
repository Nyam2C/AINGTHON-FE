type KeywordChipGridProps = {
  keywords: readonly string[];
  onSelect: (kw: string) => void;
  className?: string;
};

export function KeywordChipGrid({
  keywords,
  onSelect,
  className,
}: KeywordChipGridProps) {
  return (
    <div className={`grid grid-cols-3 gap-[8px] ${className ?? ''}`}>
      {keywords.map(kw => (
        <button
          key={kw}
          type="button"
          onClick={() => onSelect(kw)}
          className="min-w-[103px] h-[35px] bg-[#E6EBF3] rounded-full text-[16px] text-black font-bold"
        >
          {kw}
        </button>
      ))}
    </div>
  );
}
