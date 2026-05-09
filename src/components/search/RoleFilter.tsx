import type { RoleFilter as RoleFilterValue } from '../../types/match';

type RoleFilterProps = {
  value: RoleFilterValue;
  onChange: (v: RoleFilterValue) => void;
  className?: string;
};

const OPTIONS: ReadonlyArray<{ value: RoleFilterValue; label: string }> = [
  { value: 'all', label: '전체' },
  { value: 'mentor', label: '멘토' },
  { value: 'mentee', label: '멘티' },
];

export function RoleFilter({ value, onChange, className }: RoleFilterProps) {
  return (
    <div
      role="radiogroup"
      aria-label="역할 필터"
      className={`flex gap-[8px] ${className ?? ''}`}
    >
      {OPTIONS.map(opt => {
        const selected = value === opt.value;
        const stateClass = selected
          ? 'bg-blue-500 text-white border-blue-500'
          : 'bg-white text-blue-500 border-blue-500';
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(opt.value)}
            className={`px-[20px] h-[36px] rounded-full border text-[14px] font-medium transition-colors ${stateClass}`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
