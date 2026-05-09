import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { ChatInputBar } from '../components/chat/ChatInputBar';
import { ChatRoomHeader } from '../components/chat/ChatRoomHeader';
import { MessageList } from '../components/chat/MessageList';
import { BottomNav } from '../components/common/BottomNav';
import { useChatMessagesQuery } from '../hooks/useChatMessagesQuery';
import { useSendMessageMutation } from '../hooks/useSendMessageMutation';
import { useUploadChatFileMutation } from '../hooks/useUploadChatFileMutation';
import { useAuthStore } from '../store/useAuthStore';
import type { Role } from '../types/onboarding';

type LocationState = {
  userName?: string;
  partnerRole?: Role;
};

export function ChatRoomScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { roomId: roomIdParam } = useParams<{ roomId: string }>();
  const state = (location.state ?? {}) as LocationState;
  const currentUserId = useAuthStore(s => s.userId);

  const [notice, setNotice] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const roomId =
    roomIdParam && /^\d+$/.test(roomIdParam) ? Number(roomIdParam) : null;

  const { data: messages } = useChatMessagesQuery(roomId);
  const sendMessage = useSendMessageMutation();
  const uploadFile = useUploadChatFileMutation();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages?.length]);

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(null), 2500);
    return () => clearTimeout(t);
  }, [notice]);

  const partnerName = state.userName ?? '멘토';
  const partnerRole: Role = state.partnerRole ?? 'mentor';

  const handleBack = () => navigate(-1);

  const handleSend = (content: string) => {
    if (roomId == null) return;
    sendMessage.mutate(
      { roomId, content },
      {
        onError: () =>
          setNotice('메시지 송신 기능 준비 중 (WebSocket 연결 작업 대기)'),
      },
    );
  };

  const handleAttachFile = (file: File) => {
    if (roomId == null) return;
    uploadFile.mutate(
      { roomId, file },
      {
        onSuccess: () =>
          setNotice('파일 업로드 완료 — 채팅 송신은 추후 지원됩니다'),
        onError: err => setNotice(`업로드 실패: ${err.message}`),
      },
    );
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
          currentUserId={currentUserId}
          className="flex-1 overflow-y-auto pb-[160px]"
        />
        <div ref={bottomRef} />
        {notice && (
          <div
            role="status"
            className="absolute left-1/2 -translate-x-1/2 bottom-[150px] bg-black/80 text-white text-[12px] rounded-full px-[14px] py-[8px] z-30"
          >
            {notice}
          </div>
        )}
        <ChatInputBar
          onSend={handleSend}
          onAttachFile={roomId != null ? handleAttachFile : undefined}
          disabled={sendMessage.isPending}
          uploading={uploadFile.isPending}
          className="bottom-[80px]"
        />
        <BottomNav active="chat" />
      </div>
    </div>
  );
}
