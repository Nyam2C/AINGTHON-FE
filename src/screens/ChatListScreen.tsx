import { useNavigate } from 'react-router-dom';

import { ChatRoomCard } from '../components/chat/ChatRoomCard';
import { BottomNav } from '../components/common/BottomNav';
import { useChatRoomsQuery } from '../hooks/useChatRoomsQuery';
import { useAuthStore } from '../store/useAuthStore';

export function ChatListScreen() {
  const navigate = useNavigate();
  const userId = useAuthStore(s => s.userId);
  const { data: rooms } = useChatRoomsQuery();

  const handleOpen = (roomId: number) => {
    navigate(`/chat/${roomId}`);
  };

  const showLoginNotice = userId == null;
  const list = rooms ?? [];

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="relative mx-auto w-[390px] min-h-[844px] bg-white pt-[24px] pb-[80px]">
        <h1 className="text-[24px] font-semibold text-center text-black mb-[24px]">
          채팅
        </h1>
        <div className="flex flex-col items-center gap-[12px]">
          {showLoginNotice ? (
            <p className="text-[14px] text-[#8E8E8E] mt-[40px]">
              로그인이 필요합니다
            </p>
          ) : list.length === 0 ? (
            <p className="text-[14px] text-[#8E8E8E] mt-[40px]">
              아직 채팅이 없어요
            </p>
          ) : (
            list.map(room => (
              <ChatRoomCard
                key={room.roomId}
                room={room}
                onClick={handleOpen}
              />
            ))
          )}
        </div>
        <BottomNav active="chat" />
      </div>
    </div>
  );
}
