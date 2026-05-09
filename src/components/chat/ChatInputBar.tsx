import { useState, type FormEvent } from 'react';

import { PlusCircleIcon } from '../common/icons/PlusCircleIcon';
import { SendIcon } from '../common/icons/SendIcon';

type ChatInputBarProps = {
  onSend: (text: string) => void;
  disabled?: boolean;
  className?: string;
};

export function ChatInputBar({
  onSend,
  disabled,
  className,
}: ChatInputBarProps) {
  const [text, setText] = useState('');

  const trimmed = text.trim();
  const canSend = !disabled && trimmed.length > 0;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!canSend) return;
    onSend(trimmed);
    setText('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`absolute bottom-0 left-0 right-0 px-[16px] py-[12px] bg-white ${className ?? ''}`}
    >
      <div className="flex items-center gap-[8px] bg-[#F2F4F7] rounded-full px-[16px] py-[8px]">
        <button
          type="button"
          aria-label="추가"
          onClick={() => console.warn('add not implemented')}
          className="text-[#8E8E8E]"
        >
          <PlusCircleIcon size={24} className="text-current" />
        </button>
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
