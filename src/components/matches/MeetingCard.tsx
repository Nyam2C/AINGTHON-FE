import type { MouseEvent } from 'react';

import { CalendarCheckIcon } from '../common/icons/CalendarCheckIcon';
import { ClockIcon } from '../common/icons/ClockIcon';
import { MarkerPinIcon } from '../common/icons/MarkerPinIcon';
import type { Meeting } from '../../types/meeting';
import type { Role } from '../../types/onboarding';

type MeetingCardProps = {
  meeting: Meeting;
  onReview?: (scheduleId: number) => void;
  onClick?: (matchId: number) => void;
  className?: string;
};

function roleLabel(role: Role): string {
  if (role === 'mentor') return 'M 멘토';
  if (role === 'mentee') return 'M 멘티';
  return '멘토/멘티';
}

function computeDDay(date: string): string {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  if (Number.isNaN(target.getTime())) return '';
  const diff = Math.round((target.getTime() - today.getTime()) / 86_400_000);
  if (diff === 0) return 'D-Day';
  if (diff > 0) return `D-${diff}`;
  return `D+${-diff}`;
}

export function MeetingCard({
  meeting,
  onReview,
  onClick,
  className,
}: MeetingCardProps) {
  const dDay = meeting.status === 'upcoming' ? computeDDay(meeting.date) : '';

  const showReview = meeting.status === 'past' && !meeting.reviewed;

  const handleReviewClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onReview?.(meeting.scheduleId);
  };

  return (
    <article
      onClick={() => onClick?.(meeting.matchId)}
      className={`relative w-[324px] h-[160px] border border-blue-500 rounded-[9px] bg-white p-[16px] ${
        onClick ? 'cursor-pointer' : ''
      } ${className ?? ''}`}
    >
      <div className="flex items-center gap-[8px] mb-[8px]">
        <span
          className="w-[41px] h-[41px] rounded-full bg-[#D7E6FF] shrink-0"
          aria-hidden="true"
        />
        <span className="text-[20px] font-medium text-black">
          {meeting.partnerName}
        </span>
        <span className="text-[13px] text-blue-500">
          [{roleLabel(meeting.partnerRole)}]
        </span>
        {meeting.status === 'upcoming' && (
          <span className="ml-auto text-[16px] font-semibold text-blue-500">
            {dDay}
          </span>
        )}
      </div>
      <h3 className="text-[15px] font-medium text-black mb-[6px]">
        {meeting.title}
      </h3>
      <div className="flex items-center gap-[6px] text-[16px] text-[#8E8E8E] mb-[2px]">
        <CalendarCheckIcon size={16} className="text-[#8E8E8E]" />
        <span>{meeting.date}</span>
        <ClockIcon size={16} className="text-[#8E8E8E] ml-[8px]" />
        <span>{meeting.time}</span>
      </div>
      <div className="flex items-center gap-[6px] text-[16px] text-[#8E8E8E]">
        <MarkerPinIcon size={16} className="text-[#8E8E8E]" />
        <span>{meeting.location}</span>
      </div>
      <div className="absolute right-[16px] bottom-[16px]">
        {showReview && (
          <button
            type="button"
            onClick={handleReviewClick}
            className="h-[34px] px-[12px] rounded-[9px] bg-blue-500 text-white text-[13px]"
          >
            리뷰 작성
          </button>
        )}
      </div>
    </article>
  );
}
