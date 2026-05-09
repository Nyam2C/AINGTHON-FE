import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { BottomNav } from '../components/common/BottomNav';
import { MeetingCard } from '../components/matches/MeetingCard';
import { ScheduleSegmentTabs } from '../components/matches/ScheduleSegmentTabs';
import { usePastSchedulesQuery } from '../hooks/usePastSchedulesQuery';
import { useUpcomingSchedulesQuery } from '../hooks/useUpcomingSchedulesQuery';
import { localTimeToString } from '../types/schedule';
import type { ScheduleResponse } from '../types/schedule';
import type { Meeting, MeetingStatus } from '../types/meeting';

function toMeeting(schedule: ScheduleResponse, status: MeetingStatus): Meeting {
  return {
    scheduleId: schedule.id,
    matchId: schedule.matchId,
    partnerUserId: schedule.receiverId,
    partnerName: '상대방',
    partnerRole: 'mentor',
    title: '미팅',
    date: schedule.scheduledDate,
    time: localTimeToString(schedule.scheduledTime),
    location: schedule.location,
    status,
  };
}

export function MatchesScreen() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<MeetingStatus>('upcoming');

  const upcomingQuery = useUpcomingSchedulesQuery();
  const pastQuery = usePastSchedulesQuery();
  const schedules = tab === 'upcoming' ? upcomingQuery.data : pastQuery.data;

  const handleClickCard = (matchId: number) => {
    if (tab === 'upcoming') navigate(`/match/${matchId}`);
  };

  const handleReview = (scheduleId: number) => {
    navigate(`/schedules/${scheduleId}/review`);
  };

  const handleAddSchedule = () => {
    console.warn('add schedule route not implemented');
  };

  const list = (schedules ?? []).map(s => toMeeting(s, tab));

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="relative mx-auto w-[390px] min-h-[844px] bg-white pb-[80px]">
        <ScheduleSegmentTabs
          value={tab}
          onChange={setTab}
          className="px-[24px] pt-[24px]"
        />
        <h2 className="text-[20px] font-semibold px-[24px] py-[16px]">
          {tab === 'upcoming' ? '다가오는 일정' : '지난 일정'}
        </h2>
        <div className="flex flex-col items-center gap-[16px]">
          {list.length === 0 ? (
            <p className="text-[14px] text-[#8E8E8E] mt-[24px]">
              {tab === 'upcoming' ? '예정된' : '지난'} 미팅이 없어요.
            </p>
          ) : (
            list.map(m => (
              <MeetingCard
                key={m.scheduleId}
                meeting={m}
                onClick={tab === 'upcoming' ? handleClickCard : undefined}
                onReview={handleReview}
              />
            ))
          )}
          {tab === 'upcoming' && (
            <button
              type="button"
              onClick={handleAddSchedule}
              className="w-[255px] h-[42px] rounded-[9px] border border-blue-500 text-blue-500 text-[15px] font-semibold mt-[8px] flex items-center justify-center gap-[6px]"
            >
              <img
                src="/icon/plus-square.svg"
                alt=""
                aria-hidden="true"
                className="h-[18px] w-[18px]"
              />
              일정 추가
            </button>
          )}
        </div>
        <BottomNav active="matching" />
      </div>
    </div>
  );
}
