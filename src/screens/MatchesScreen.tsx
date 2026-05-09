import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { BottomNav } from '../components/common/BottomNav';
import { EndMatchConfirmModal } from '../components/matches/EndMatchConfirmModal';
import { MeetingCard } from '../components/matches/MeetingCard';
import { ScheduleSegmentTabs } from '../components/matches/ScheduleSegmentTabs';
import { useEndMatchMutation } from '../hooks/useEndMatchMutation';
import { useMatchesQuery } from '../hooks/useMatchesQuery';
import type { Meeting, MeetingStatus } from '../types/meeting';

export function MatchesScreen() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<MeetingStatus>('upcoming');
  const [endTarget, setEndTarget] = useState<Meeting | null>(null);

  const { data: meetings } = useMatchesQuery(tab);
  const endMatch = useEndMatchMutation();

  const handleClickCard = (matchId: string) => {
    if (tab === 'upcoming') navigate(`/chat/${matchId}`);
  };

  const handleEndMatch = (matchId: string) => {
    const target = meetings?.find(m => m.matchId === matchId);
    if (target) setEndTarget(target);
  };

  const handleConfirmEnd = () => {
    if (!endTarget) return;
    const id = endTarget.matchId;
    endMatch.mutate(id, {
      onSuccess: () => {
        setEndTarget(null);
        navigate(`/matches/${id}/review`);
      },
      onError: err => console.error(err),
    });
  };

  const handleReview = (matchId: string) => {
    navigate(`/matches/${matchId}/review`);
  };

  const handleAddSchedule = () => {
    console.warn('add schedule route not implemented');
  };

  const list = meetings ?? [];

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
                key={m.matchId}
                meeting={m}
                onClick={tab === 'upcoming' ? handleClickCard : undefined}
                onEnd={handleEndMatch}
                onReview={handleReview}
              />
            ))
          )}
          {tab === 'upcoming' && (
            <button
              type="button"
              onClick={handleAddSchedule}
              className="w-[255px] h-[42px] rounded-[9px] border border-blue-500 text-blue-500 text-[15px] font-semibold mt-[8px]"
            >
              일정 추가
            </button>
          )}
        </div>
        <BottomNav active="matching" />
        <EndMatchConfirmModal
          open={endTarget !== null}
          onCancel={() => setEndTarget(null)}
          onConfirm={handleConfirmEnd}
          isPending={endMatch.isPending}
        />
      </div>
    </div>
  );
}
