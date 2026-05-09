import { CalendarCheckIcon } from '../common/icons/CalendarCheckIcon';
import { ClockIcon } from '../common/icons/ClockIcon';
import { MarkerPinIcon } from '../common/icons/MarkerPinIcon';
import type { Schedule } from '../../types/chat';

type ScheduleCardMessageProps = {
  schedule: Schedule;
  mine: boolean;
  onEdit: () => void;
  className?: string;
};

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

function formatDate(date: string): string {
  const m = date.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return date;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  if (Number.isNaN(d.getTime())) return date;
  const weekday = WEEKDAYS[d.getDay()];
  return `${m[1]}.${m[2]}.${m[3]} (${weekday})`;
}

export function ScheduleCardMessage({
  schedule,
  mine,
  onEdit,
  className,
}: ScheduleCardMessageProps) {
  const confirmed = schedule.status === 'confirmed';

  return (
    <div
      className={`flex ${mine ? 'justify-end' : 'justify-start'} ${className ?? ''}`}
    >
      <article className="w-[276px] border border-blue-500 rounded-[9px] bg-white p-[20px]">
        {confirmed && (
          <p className="font-inter text-[16px] font-bold text-blue-500 mb-[8px]">
            일정이 확정되었습니다!
          </p>
        )}
        <h3 className="font-inter text-[20px] font-semibold text-black mb-[12px]">
          {schedule.title}
        </h3>
        <div className="flex items-center gap-[8px] mb-[6px]">
          <CalendarCheckIcon size={20} className="text-[#8E8E8E]" />
          <span className="text-[16px] text-black">
            {formatDate(schedule.date)}
          </span>
        </div>
        <div className="flex items-center gap-[8px] mb-[6px]">
          <ClockIcon size={20} className="text-[#8E8E8E]" />
          <span className="text-[16px] text-black">
            {schedule.startTime} - {schedule.endTime}
          </span>
        </div>
        <div className="flex items-center gap-[8px] mb-[16px]">
          <MarkerPinIcon size={20} className="text-[#8E8E8E]" />
          <span className="text-[16px] text-black">{schedule.location}</span>
        </div>
        {confirmed ? (
          <button
            type="button"
            onClick={() =>
              console.warn(
                'schedule detail route not implemented',
                schedule.scheduleId,
              )
            }
            className="w-full h-[34px] rounded-[9px] border border-blue-500 text-blue-500 text-[13px]"
          >
            일정 상세 보기
          </button>
        ) : (
          <button
            type="button"
            onClick={onEdit}
            className="w-[63px] h-[34px] rounded-[9px] border border-blue-500 text-blue-500 text-[13px]"
          >
            수정
          </button>
        )}
      </article>
    </div>
  );
}
