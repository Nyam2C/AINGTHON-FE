import type { Interest } from '../../types/onboarding';

type InterestTagGroupProps = {
  value: Interest[];
  onChange: (next: Interest[]) => void;
  options: readonly Interest[];
  max?: number;
  className?: string;
};

export function InterestTagGroup({
  value,
  onChange,
  options,
  max = 3,
  className,
}: InterestTagGroupProps) {
  const handleClick = (option: Interest) => {
    const isSelected = value.includes(option);
    if (isSelected) {
      onChange(value.filter(v => v !== option));
      return;
    }
    if (value.length >= max) {
      return;
    }
    onChange([...value, option]);
  };

  return (
    <div className={`flex flex-wrap gap-[8px] ${className ?? ''}`}>
      {options.map(option => {
        const selected = value.includes(option);
        const stateClass = selected
          ? 'bg-[#D8E6FF] text-blue-600 border border-blue-500'
          : 'bg-[#EAEFF6] text-[#5C6470] border border-transparent';
        return (
          <button
            key={option}
            type="button"
            role="checkbox"
            aria-checked={selected}
            onClick={() => handleClick(option)}
            className={`${stateClass} rounded-full px-[14px] py-[8px] text-[14px] transition-colors`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
