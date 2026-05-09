import type { Grade } from '../../types/onboarding';
import { GRADE_OPTIONS } from '../../types/onboarding';

type GradeFilterProps = {
  value: Grade[];
  onChange: (v: Grade[]) => void;
  className?: string;
};

export function GradeFilter({ value, onChange, className }: GradeFilterProps) {
  const handleToggle = (grade: Grade) => {
    if (value.includes(grade)) {
      onChange(value.filter(g => g !== grade));
    } else {
      onChange([...value, grade]);
    }
  };

  return (
    <div
      role="group"
      aria-label="학년 필터"
      className={`grid grid-cols-4 gap-[8px] ${className ?? ''}`}
    >
      {GRADE_OPTIONS.map(g => {
        const selected = value.includes(g);
        const stateClass = selected
          ? 'border-blue-500 text-blue-500 bg-white'
          : 'border-[#E6EBF3] text-[#8E8E8E] bg-white';
        return (
          <button
            key={g}
            type="button"
            role="checkbox"
            aria-checked={selected}
            onClick={() => handleToggle(g)}
            className={`w-[72px] h-[44px] rounded-[10px] border text-[14px] font-medium transition-colors ${stateClass}`}
          >
            {g}
          </button>
        );
      })}
    </div>
  );
}
