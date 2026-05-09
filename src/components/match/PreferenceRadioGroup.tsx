import type { MatchPreference } from '../../types/match';

type PreferenceRadioGroupProps = {
  value: MatchPreference;
  onChange: (v: MatchPreference) => void;
  className?: string;
};

const OPTIONS: ReadonlyArray<{ value: MatchPreference; label: string }> = [
  { value: 'online', label: '온라인' },
  { value: 'offline', label: '오프라인' },
  { value: 'any', label: '상관없음' },
];

export function PreferenceRadioGroup({
  value,
  onChange,
  className,
}: PreferenceRadioGroupProps) {
  return (
    <div
      role="radiogroup"
      aria-label="선호 방식"
      className={`flex flex-col gap-[12px] ${className ?? ''}`}
    >
      {OPTIONS.map(opt => {
        const selected = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(opt.value)}
            className="flex items-center gap-[8px]"
          >
            <span
              aria-hidden="true"
              className={`w-[14px] h-[14px] rounded-full border-2 ${
                selected
                  ? 'border-blue-500 bg-blue-500'
                  : 'border-[#8E8E8E] bg-white'
              }`}
            />
            <span className="text-[14px] text-black">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
