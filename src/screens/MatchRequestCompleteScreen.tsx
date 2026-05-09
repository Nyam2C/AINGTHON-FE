import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { BottomNav } from '../components/common/BottomNav';
import { CheckCircleIcon } from '../components/match/CheckCircleIcon';
import { PrimaryButton } from '../components/onboarding/PrimaryButton';

type CompleteState = {
  matchRequestId?: string;
  userName?: string;
};

export function MatchRequestCompleteScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const state = (location.state ?? {}) as CompleteState;
  const userName = state.userName ?? '';
  const matchRequestId = state.matchRequestId ?? '';

  const handleOpenChat = () => {
    if (!matchRequestId) {
      console.warn('matchRequestId missing; cannot open chat', { userId });
      return;
    }
    navigate(`/chat/${matchRequestId}`, {
      state: { userName, chatRoomId: matchRequestId },
    });
  };
  const handleViewMyRequests = () => {
    console.warn('match requests route not implemented');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="relative mx-auto w-[390px] min-h-[844px] bg-white flex flex-col items-center pt-[200px] pb-[80px]">
        <CheckCircleIcon size={113} />

        <h1 className="mt-[20px] font-inter text-[24px] font-semibold text-black">
          신청이 완료되었습니다!
        </h1>
        <p className="mt-[16px] font-inter text-[20px] font-medium text-[#8E8E8E] text-center">
          {userName
            ? `${userName} 멘토님에게 신청 메시지를 보냈어요.`
            : '신청 메시지를 보냈어요.'}
        </p>

        <div className="mt-[80px] flex flex-col items-center gap-[12px]">
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
