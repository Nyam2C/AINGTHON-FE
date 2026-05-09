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
    ? 'bg-[#EAF2FF] border-blue-500'
    : 'bg-white border-transparent';

  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={`w-[321px] min-h-[110px] rounded-[16px] shadow-md ${stateClass} border px-[20px] py-[18px] text-left transition-colors duration-200 ${className ?? ''}`}
    >
      <span className="block font-bold text-[18px] text-black">{title}</span>
      <span className="block mt-[12px] text-[14px] text-[#8E8E8E]">
        {description}
      </span>
    </button>
  );
}
