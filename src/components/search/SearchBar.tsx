type SearchBarProps = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  onSubmit?: () => void;
  className?: string;
};

export function SearchBar({
  value,
  onChange,
  placeholder = '이름, 키워드, 기술스택 검색',
  onSubmit,
  className,
}: SearchBarProps) {
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit?.();
      }}
      className={`relative w-[321px] h-[44px] ${className ?? ''}`}
    >
      <input
        type="search"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-full bg-[#F2F4F7] rounded-full pl-[44px] pr-[16px] text-[14px] text-black placeholder:text-[#8E8E8E] focus:outline-none"
        aria-label="검색"
      />
      <span
        aria-hidden="true"
        className="absolute left-[16px] top-1/2 -translate-y-1/2 text-[#8E8E8E]"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" strokeLinecap="round" />
        </svg>
      </span>
    </form>
  );
}
