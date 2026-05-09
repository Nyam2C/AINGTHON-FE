import type { Grade } from '../../types/onboarding';
import { GRADE_OPTIONS } from '../../types/onboarding';

type GradeSelectorProps = {
  value: Grade | null;
  onChange: (value: Grade) => void;
  className?: string;
};

export function GradeSelector({
  value,
  onChange,
  className,
}: GradeSelectorProps) {
  return (
    <div className={`grid grid-cols-4 gap-[8px] ${className ?? ''}`}>
      {GRADE_OPTIONS.map((grade) => {
        const selected = value === grade;
        const stateClass = selected
          ? 'bg-blue-500 text-white border-blue-500'
          : 'bg-white text-black border-[#E6EBF3]';
        return (
          <button
            key={grade}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(grade)}
            className={`h-[44px] rounded-[8px] border ${stateClass} text-[14px] font-medium transition-colors`}
          >
            {grade}
          </button>
        );
      })}
    </div>
  );
}
