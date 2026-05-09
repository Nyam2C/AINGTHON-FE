import type { Major } from '../../types/onboarding';

type MajorToggleProps = {
  value: Major | null;
  onChange: (value: Major) => void;
  className?: string;
};

const OPTIONS: ReadonlyArray<{ value: Major; label: string }> = [
  { value: 'non-major', label: '비전공자' },
  { value: 'major', label: '전공자' },
];

export function MajorToggle({ value, onChange, className }: MajorToggleProps) {
  return (
    <div className={`flex gap-[8px] ${className ?? ''}`}>
      {OPTIONS.map((option) => {
        const selected = value === option.value;
        const stateClass = selected
          ? 'bg-blue-500 text-white border-blue-500'
          : 'bg-white text-black border-[#E6EBF3]';
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option.value)}
            className={`flex-1 h-[44px] rounded-[8px] border ${stateClass} text-[14px] font-medium transition-colors`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
