import type { GradeEnum } from '../../types/profile';
import { gradeLabel } from '../../utils/profileLabel';

const GRADE_VALUES: readonly GradeEnum[] = [
  'YEAR_1',
  'YEAR_2',
  'YEAR_3',
  'YEAR_4_OR_MORE',
] as const;

type GradeFilterProps = {
  value: GradeEnum | null;
  onChange: (v: GradeEnum | null) => void;
  className?: string;
};

export function GradeFilter({ value, onChange, className }: GradeFilterProps) {
  const handleToggle = (grade: GradeEnum) => {
    onChange(value === grade ? null : grade);
  };

  return (
    <div
      role="radiogroup"
      aria-label="학년 필터"
      className={`grid grid-cols-4 gap-[8px] ${className ?? ''}`}
    >
      {GRADE_VALUES.map(g => {
        const selected = value === g;
        const stateClass = selected
          ? 'border-blue-500 text-blue-500 bg-white'
          : 'border-[#E6EBF3] text-[#8E8E8E] bg-white';
        return (
          <button
            key={g}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => handleToggle(g)}
            className={`w-[72px] h-[44px] rounded-[10px] border text-[14px] font-medium transition-colors ${stateClass}`}
          >
            {gradeLabel(g)}
          </button>
        );
      })}
    </div>
  );
}
