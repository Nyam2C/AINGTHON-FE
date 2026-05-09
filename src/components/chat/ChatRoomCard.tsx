import type { ChatRoom } from '../../types/chat';

type ChatRoomCardProps = {
  room: ChatRoom;
  onClick: (matchId: string) => void;
  className?: string;
};

function formatTime(iso?: string): string {
  if (!iso) return '';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

export function ChatRoomCard({ room, onClick, className }: ChatRoomCardProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(room.matchId)}
      className={`w-[342px] h-[80px] bg-white border border-[#E6EBF3] rounded-[12px] flex items-center px-[16px] gap-[12px] text-left ${className ?? ''}`}
    >
      <span
        className="w-[48px] h-[48px] rounded-full bg-[#D7E6FF] shrink-0"
        aria-hidden="true"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-[8px]">
          <p className="font-inter text-[16px] font-bold text-black truncate">
            {room.partnerName}
          </p>
          <span className="text-[12px] text-[#8E8E8E] shrink-0">
            {formatTime(room.lastMessageAt)}
          </span>
        </div>
        <p className="font-inter text-[14px] text-[#8E8E8E] truncate">
          {room.lastMessage ?? room.responseHint}
        </p>
      </div>
    </button>
  );
}
