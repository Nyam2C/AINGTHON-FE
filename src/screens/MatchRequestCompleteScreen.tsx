import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { BottomNav } from '../components/common/BottomNav';
import { CheckCircleIcon } from '../components/match/CheckCircleIcon';
import { PrimaryButton } from '../components/onboarding/PrimaryButton';

type CompleteState = {
  matchId?: number;
  chatRoomId?: number;
  userName?: string;
  scheduledDate?: string;
};

export function MatchRequestCompleteScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const state = (location.state ?? {}) as CompleteState;
  const userName = state.userName ?? '';
  const chatRoomId = state.chatRoomId;
  const scheduledDate = state.scheduledDate;

  const handleOpenChat = () => {
    if (chatRoomId == null) {
      console.warn('chatRoomId missing; cannot open chat', { userId });
      return;
    }
    navigate(`/chat/${chatRoomId}`, {
      state: { userName, chatRoomId, scheduledDate },
    });
  };
  const handleViewMyRequests = () => {
    navigate('/matches');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="relative mx-auto w-[390px] min-h-[844px] bg-white flex flex-col items-center pt-[200px] pb-[80px]">
        <div className="motion-safe:animate-pop-in motion-reduce:animate-none">
          <CheckCircleIcon size={113} />
        </div>

        <h1 className="mt-[20px] font-inter text-[24px] font-semibold text-black motion-safe:animate-fade-in-up-200 motion-reduce:animate-none">
          신청이 완료되었습니다!
        </h1>
        <p className="mt-[16px] font-inter text-[20px] font-medium text-[#8E8E8E] text-center motion-safe:animate-fade-in-up-400 motion-reduce:animate-none">
          {userName
            ? `${userName} 멘토님에게 신청 메시지를 보냈어요.`
            : '신청 메시지를 보냈어요.'}
        </p>

        <div className="mt-[80px] flex flex-col items-center gap-[12px] motion-safe:animate-fade-in-delayed motion-reduce:animate-none">
          <PrimaryButton
            label="채팅방 열기"
            width={321}
            onClick={handleOpenChat}
          />
          <button
            type="button"
            onClick={handleViewMyRequests}
            className="w-[321px] h-[52px] rounded-[9px] bg-white border border-blue-500 text-blue-500 font-inter text-[16px] font-medium"
          >
            내 신청 내역 보기
          </button>
        </div>
        <BottomNav active="search" />
      </div>
    </div>
  );
}
