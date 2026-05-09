type InterestTagRowProps = {
  tags: string[];
  className?: string;
};

export function InterestTagRow({ tags, className }: InterestTagRowProps) {
  return (
    <div className={`flex flex-wrap gap-[8px] ${className ?? ''}`}>
      {tags.map(tag => (
        <span
          key={tag}
          className="px-[14px] h-[35px] inline-flex items-center bg-[#E6EBF3] text-[#969FAC] rounded-[13px] text-[14px]"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
