type RoleCardProps = {
  title: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
  className?: string;
};

export function RoleCard({
  title,
  description,
  selected,
  onSelect,
  className,
}: RoleCardProps) {
  const stateClass = selected
    ? 'bg-[#EAF2FF] border-blue-500 shadow-md'
    : 'bg-white border-[#E6EBF3] shadow-sm hover:border-[#B2C7E5] hover:shadow-md';

  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={`w-[288px] min-h-[180px] rounded-[16px] ${stateClass} border px-[20px] py-[20px] text-left transition-all duration-200 ${className ?? ''}`}
    >
      <span className="block font-bold text-[16px] text-black">{title}</span>
      <span className="mt-[16px] block whitespace-pre-line text-[14px] leading-[22px] text-[#8E8E8E]">
        {description}
      </span>
    </button>
  );
}
