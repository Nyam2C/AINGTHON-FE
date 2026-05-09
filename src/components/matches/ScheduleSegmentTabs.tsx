import type { MeetingStatus } from '../../types/meeting';

type ScheduleSegmentTabsProps = {
  value: MeetingStatus;
  onChange: (v: MeetingStatus) => void;
  className?: string;
};

const TABS: ReadonlyArray<{ key: MeetingStatus; label: string }> = [
  { key: 'upcoming', label: '예정' },
  { key: 'past', label: '과거' },
];

export function ScheduleSegmentTabs({
  value,
  onChange,
  className,
}: ScheduleSegmentTabsProps) {
  return (
    <div role="tablist" className={`flex w-full ${className ?? ''}`}>
      {TABS.map(({ key, label }) => {
        const active = key === value;
        return (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(key)}
            className={`flex-1 h-[44px] text-[16px] border-b-2 ${
              active
                ? 'border-blue-500 text-blue-500 font-semibold'
                : 'border-[#B2B2B2] text-[#8E8E8E] font-medium'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
