type SchedulePinnedCardProps = {
  title?: string;
  subtitle?: string;
  scheduledDate?: string; // YYYY-MM-DD
  scheduledTimeRange?: string; // 예: "오후 2:00 - 3:00 (1시간)"
  location?: string;
  onEdit?: () => void;
};

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

function formatScheduledDate(iso?: string): string | null {
  if (!iso) return null;
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return null;
  const year = Number(m[1]);
  const month = Number(m[2]);
  const day = Number(m[3]);
  const weekday = WEEKDAYS[new Date(year, month - 1, day).getDay()];
  return `${year}.${String(month).padStart(2, '0')}.${String(day).padStart(2, '0')} (${weekday})`;
}

export function SchedulePinnedCard({
  title = '첫 번째 미팅',
  subtitle = '커피챗',
  scheduledDate,
  scheduledTimeRange = '오후 2:00 - 3:00 (1시간)',
  location = '스타벅스 강남역점',
  onEdit,
}: SchedulePinnedCardProps) {
  const dateLabel = formatScheduledDate(scheduledDate) ?? '일정 미정';

  const handleEdit = () => {
    if (onEdit) {
      onEdit();
      return;
    }
    console.warn('schedule edit not implemented');
  };

  return (
    <div className="mx-auto mt-[12px] w-[276px] min-h-[292px] rounded-[9px] border border-blue-500 bg-white p-[20px]">
      <h2 className="font-inter text-[20px] font-bold leading-[28px] text-black">
        {title}
        <br />
        {subtitle}
      </h2>
      <ul className="mt-[16px] flex flex-col gap-[10px] text-[16px] text-black">
        <li className="flex items-center gap-[10px]">
          <img
            src="/icon/calendar.svg"
            alt=""
            aria-hidden="true"
            className="h-[18px] w-[18px]"
          />
          <span>{dateLabel}</span>
        </li>
        <li className="flex items-center gap-[10px]">
          <img
            src="/icon/clock.svg"
            alt=""
            aria-hidden="true"
            className="h-[18px] w-[18px]"
          />
          <span>{scheduledTimeRange}</span>
        </li>
        <li className="flex items-center gap-[10px]">
          <img
            src="/icon/location.svg"
            alt=""
            aria-hidden="true"
            className="h-[18px] w-[18px]"
          />
          <span>{location}</span>
        </li>
      </ul>
      <div className="mt-[16px] flex justify-center">
        <button
          type="button"
          onClick={handleEdit}
          className="h-[34px] w-[80px] rounded-[8px] border border-blue-500 bg-white text-[14px] font-medium text-blue-500"
        >
          수정
        </button>
      </div>
    </div>
  );
}
