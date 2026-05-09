import { useState } from 'react';

type CalendarPopoverProps = {
  value: string | null;
  onSelect: (v: string) => void;
  onClose: () => void;
};

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

function formatDate(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

type Cell = { day: number; currentMonth: boolean };

function getMonthDays(year: number, month: number): Cell[] {
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startWeekday = firstDayOfMonth.getDay();

  const prevMonthLastDay = new Date(year, month, 0).getDate();

  const cells: Cell[] = [];

  // 이전 달 잔여
  for (let i = startWeekday - 1; i >= 0; i--) {
    cells.push({ day: prevMonthLastDay - i, currentMonth: false });
  }
  // 이번 달
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, currentMonth: true });
  }
  // 다음 달로 채워서 42칸
  let nextDay = 1;
  while (cells.length < 42) {
    cells.push({ day: nextDay++, currentMonth: false });
  }
  return cells;
}

function parseInitialView(value: string | null): {
  year: number;
  month: number;
} {
  if (value) {
    const m = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (m) {
      return { year: Number(m[1]), month: Number(m[2]) - 1 };
    }
  }
  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth() };
}

export function CalendarPopover({
  value,
  onSelect,
  onClose,
}: CalendarPopoverProps) {
  const initial = parseInitialView(value);
  const [viewYear, setViewYear] = useState<number>(initial.year);
  const [viewMonth, setViewMonth] = useState<number>(initial.month);

  const handlePrev = () => {
    if (viewMonth === 0) {
      setViewYear(y => y - 1);
      setViewMonth(11);
    } else {
      setViewMonth(m => m - 1);
    }
  };

  const handleNext = () => {
    if (viewMonth === 11) {
      setViewYear(y => y + 1);
      setViewMonth(0);
    } else {
      setViewMonth(m => m + 1);
    }
  };

  const handleSelectDay = (day: number, currentMonth: boolean) => {
    if (!currentMonth) return;
    onSelect(formatDate(viewYear, viewMonth, day));
    onClose();
  };

  const cells = getMonthDays(viewYear, viewMonth);

  return (
    <div
      role="dialog"
      aria-label="달력"
      className="absolute z-10 mt-[8px] w-[320px] bg-white rounded-[12px] shadow-lg p-[16px]"
    >
      <div className="flex items-center justify-between mb-[12px]">
        <button type="button" onClick={handlePrev} aria-label="이전 달">
          ◀
        </button>
        <span className="text-[16px] font-medium">
          {viewYear}.{String(viewMonth + 1).padStart(2, '0')}
        </span>
        <button type="button" onClick={handleNext} aria-label="다음 달">
          ▶
        </button>
      </div>
      <div className="grid grid-cols-7 gap-[2px] text-center text-[12px] text-[#8E8E8E] mb-[8px]">
        {WEEKDAYS.map(w => (
          <span key={w}>{w}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-[2px]">
        {cells.map((cell, i) => {
          const dateStr = cell.currentMonth
            ? formatDate(viewYear, viewMonth, cell.day)
            : null;
          const isSelected = dateStr !== null && dateStr === value;
          const stateClass = !cell.currentMonth
            ? 'text-[#C0C0C0]'
            : isSelected
              ? 'bg-blue-500 text-white rounded-full'
              : 'text-black hover:bg-[#F2F4F7] rounded-full';
          return (
            <button
              key={i}
              type="button"
              onClick={() => handleSelectDay(cell.day, cell.currentMonth)}
              aria-pressed={isSelected}
              className={`w-[32px] h-[32px] mx-auto text-[14px] ${stateClass}`}
              disabled={!cell.currentMonth}
            >
              {cell.day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
