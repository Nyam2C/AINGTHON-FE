import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';

import { PaperclipIcon } from '../common/icons/PaperclipIcon';
import { SendIcon } from '../common/icons/SendIcon';

type ChatInputBarProps = {
  onSend: (text: string) => void;
  onAttachFile?: (file: File) => void;
  disabled?: boolean;
  uploading?: boolean;
  className?: string;
};

export function ChatInputBar({
  onSend,
  onAttachFile,
  disabled,
  uploading,
  className,
}: ChatInputBarProps) {
  const [text, setText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const trimmed = text.trim();
  const canSend = !disabled && trimmed.length > 0;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!canSend) return;
    onSend(trimmed);
    setText('');
  };

  const handlePickFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onAttachFile) onAttachFile(file);
    if (e.target) e.target.value = '';
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`absolute bottom-0 left-0 right-0 px-[16px] py-[12px] bg-white ${className ?? ''}`}
    >
      <div className="flex items-center gap-[8px] bg-[#F2F4F7] rounded-full px-[16px] py-[8px]">
        <button
          type="button"
          aria-label="파일 첨부"
          onClick={handlePickFile}
          disabled={uploading || !onAttachFile}
          className={
            uploading || !onAttachFile ? 'text-[#8E8E8E]' : 'text-[#1D6DFE]'
          }
        >
          <PaperclipIcon size={24} className="text-current" />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
          aria-hidden="true"
        />
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="메세지 입력..."
          className="flex-1 bg-transparent text-[14px] outline-none placeholder:text-[#8E8E8E]"
          aria-label="메시지 입력"
        />
        <button
          type="submit"
          aria-label="보내기"
          disabled={!canSend}
          className={canSend ? 'text-blue-500' : 'text-[#8E8E8E]'}
        >
          <SendIcon size={24} className="text-current" />
        </button>
      </div>
    </form>
  );
}
