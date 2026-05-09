import { ScheduleCardMessage as ScheduleCardMessageView } from './ScheduleCardMessage';
import { TextBubble } from './TextBubble';
import type { ChatMessage, ScheduleCardMessage } from '../../types/chat';

type MessageListProps = {
  messages: ChatMessage[];
  currentUserId: string;
  onEditSchedule: (msg: ScheduleCardMessage) => void;
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
  onEditSchedule,
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
        if (msg.type === 'text') {
          return (
            <TextBubble
              key={msg.messageId}
              text={msg.text}
              mine={mine}
              time={formatTime(msg.createdAt)}
            />
          );
        }
        return (
          <ScheduleCardMessageView
            key={msg.messageId}
            schedule={msg.schedule}
            mine={true}
            onEdit={() => onEditSchedule(msg)}
          />
        );
      })}
    </div>
  );
}
