import { TextBubble } from './TextBubble';
import type { ChatMessage } from '../../types/chat';

type MessageListProps = {
  messages: ChatMessage[];
  currentUserId: number | null;
  className?: string;
};

function formatTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

export function MessageList({
  messages,
  currentUserId,
  className,
}: MessageListProps) {
  return (
    <div className={`flex flex-col gap-[12px] p-[16px] ${className ?? ''}`}>
      {messages.length === 0 && (
        <p className="text-center text-[14px] text-[#8E8E8E] py-[24px]">
          아직 메시지가 없습니다.
        </p>
      )}
      {messages.map(msg => {
        const mine = msg.senderId === currentUserId;
        return (
          <TextBubble
            key={msg.id}
            text={msg.content}
            mine={mine}
            time={formatTime(msg.sentAt)}
          />
        );
      })}
    </div>
  );
}
