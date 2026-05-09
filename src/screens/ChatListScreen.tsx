import { useNavigate } from 'react-router-dom';

import { ChatRoomCard } from '../components/chat/ChatRoomCard';
import { BottomNav } from '../components/common/BottomNav';
import { useChatRoomsQuery } from '../hooks/useChatRoomsQuery';

export function ChatListScreen() {
  const navigate = useNavigate();
  const { data: rooms } = useChatRoomsQuery();

  const latest = rooms?.[0];

  const handleOpen = (matchId: string) => {
    navigate(`/chat/${matchId}`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="relative mx-auto w-[390px] min-h-[844px] bg-white pt-[24px] pb-[80px]">
        <h1 className="text-[24px] font-semibold text-center text-black mb-[24px]">
          채팅
        </h1>
        <div className="flex flex-col items-center gap-[12px]">
          {latest ? (
            <ChatRoomCard room={latest} onClick={handleOpen} />
          ) : (
            <p className="text-[14px] text-[#8E8E8E] mt-[40px]">
              아직 채팅이 없어요
            </p>
          )}
        </div>
        <BottomNav active="chat" />
      </div>
    </div>
  );
}
