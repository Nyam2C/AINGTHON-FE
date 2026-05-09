import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { ChatInputBar } from '../components/chat/ChatInputBar';
import { ChatRoomHeader } from '../components/chat/ChatRoomHeader';
import { MessageList } from '../components/chat/MessageList';
import { ScheduleEditSheet } from '../components/chat/ScheduleEditSheet';
import { BottomNav } from '../components/common/BottomNav';
import { useChatMessagesQuery } from '../hooks/useChatMessagesQuery';
import { useSendMessageMutation } from '../hooks/useSendMessageMutation';
import { useUpdateScheduleMutation } from '../hooks/useUpdateScheduleMutation';
import { MENTEE_USER_ID } from '../types/chat';
import type { ScheduleCardMessage, UpdateSchedulePayload } from '../types/chat';
import type { Role } from '../types/onboarding';

type LocationState = {
  userName?: string;
  chatRoomId?: string;
};

export function ChatRoomScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { matchId } = useParams<{ matchId: string }>();
  const state = (location.state ?? {}) as LocationState;

  const [editingSchedule, setEditingSchedule] =
    useState<ScheduleCardMessage | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { data: messages } = useChatMessagesQuery(matchId ?? '');
  const sendMessage = useSendMessageMutation();
  const updateSchedule = useUpdateScheduleMutation();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages?.length]);

  const partnerName = state.userName ?? '멘토';
  const partnerRole: Role = 'mentor';

  const handleBack = () => navigate(-1);

  const handleSend = (text: string) => {
    if (!matchId) return;
    sendMessage.mutate(
      { matchId, text },
      { onError: err => console.error(err) },
    );
  };

  const handleEditSchedule = (msg: ScheduleCardMessage) => {
    setEditingSchedule(msg);
  };

  const handleSubmitEdit = (payload: UpdateSchedulePayload) => {
    updateSchedule.mutate(payload, {
      onSuccess: () => setEditingSchedule(null),
      onError: err => console.error(err),
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="relative mx-auto w-[390px] min-h-[844px] bg-white flex flex-col">
        <ChatRoomHeader
          partnerName={partnerName}
          partnerRole={partnerRole}
          responseHint="보통 10분 이내 응답"
          onBack={handleBack}
        />
        <MessageList
          messages={messages ?? []}
          currentUserId={MENTEE_USER_ID}
          onEditSchedule={handleEditSchedule}
          className="flex-1 overflow-y-auto pb-[160px]"
        />
        <div ref={bottomRef} />
        <ChatInputBar
          onSend={handleSend}
          disabled={sendMessage.isPending}
          className="bottom-[80px]"
        />
        <BottomNav active="chat" />
        {editingSchedule && matchId && (
          <ScheduleEditSheet
            matchId={matchId}
            initial={editingSchedule.schedule}
            onClose={() => setEditingSchedule(null)}
            onSubmit={handleSubmitEdit}
            isPending={updateSchedule.isPending}
          />
        )}
      </div>
    </div>
  );
}
