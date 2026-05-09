import { useState } from 'react';

import { CalendarPopover } from '../match/CalendarPopover';
import type { Schedule, UpdateSchedulePayload } from '../../types/chat';

type ScheduleEditSheetProps = {
  matchId: string;
  initial: Schedule;
  onClose: () => void;
  onSubmit: (next: UpdateSchedulePayload) => void;
  isPending?: boolean;
};

export function ScheduleEditSheet({
  matchId,
  initial,
  onClose,
  onSubmit,
  isPending,
}: ScheduleEditSheetProps) {
  const [date, setDate] = useState(initial.date);
  const [startTime, setStartTime] = useState(initial.startTime);
  const [endTime, setEndTime] = useState(initial.endTime);
  const [location, setLocation] = useState(initial.location);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleSubmit = () => {
    onSubmit({
      matchId,
      scheduleId: initial.scheduleId,
      date,
      startTime,
      endTime,
      location,
    });
  };

  return (
    <div
      role="dialog"
      aria-label="일정 수정"
      className="fixed inset-0 z-40 bg-black/40 flex items-end justify-center"
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="w-full max-w-[390px] bg-white rounded-t-[16px] p-[24px] flex flex-col gap-[16px]"
      >
        <h2 className="text-[20px] font-semibold">일정 수정</h2>

        <div className="relative">
          <label className="block text-[14px] font-medium mb-[6px]">날짜</label>
          <button
            type="button"
            onClick={() => setCalendarOpen(o => !o)}
            className="w-full h-[44px] border border-[#8E8E8E] rounded-[9px] px-[14px] text-left text-[14px]"
          >
            {date}
          </button>
          {calendarOpen && (
            <CalendarPopover
              value={date}
              onSelect={setDate}
              onClose={() => setCalendarOpen(false)}
            />
          )}
        </div>

        <div className="flex gap-[12px]">
          <div className="flex-1">
            <label className="block text-[14px] font-medium mb-[6px]">
              시작
            </label>
            <input
              type="time"
              value={startTime}
              onChange={e => setStartTime(e.target.value)}
              className="w-full h-[44px] border border-[#8E8E8E] rounded-[9px] px-[14px] text-[14px]"
            />
          </div>
          <div className="flex-1">
            <label className="block text-[14px] font-medium mb-[6px]">
              종료
            </label>
            <input
              type="time"
              value={endTime}
              onChange={e => setEndTime(e.target.value)}
              className="w-full h-[44px] border border-[#8E8E8E] rounded-[9px] px-[14px] text-[14px]"
            />
          </div>
        </div>

        <div>
          <label className="block text-[14px] font-medium mb-[6px]">장소</label>
          <input
            type="text"
            value={location}
            onChange={e => setLocation(e.target.value)}
            className="w-full h-[44px] border border-[#8E8E8E] rounded-[9px] px-[14px] text-[14px]"
          />
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isPending}
          className="w-full h-[52px] rounded-[9px] bg-blue-500 text-white font-medium text-[16px] disabled:opacity-60"
        >
          저장
        </button>
      </div>
    </div>
  );
}
