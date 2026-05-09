type TextBubbleProps = {
  text: string;
  mine: boolean;
  time?: string;
  className?: string;
};

export function TextBubble({ text, mine, time, className }: TextBubbleProps) {
  return (
    <div
      className={`flex ${mine ? 'justify-end' : 'justify-start'} ${className ?? ''}`}
    >
      {!mine && (
        <span
          className="w-[35px] h-[35px] rounded-full bg-[#D7E6FF] mr-[8px] shrink-0"
          aria-hidden="true"
        />
      )}
      <div className="flex flex-col items-end gap-[4px] max-w-[247px]">
        <div
          className={`rounded-[12px] px-[14px] py-[10px] text-[14px] ${
            mine
              ? 'bg-blue-500 text-white'
              : 'bg-white border border-blue-500 text-black'
          }`}
        >
          {text}
        </div>
        {time && <span className="text-[12px] text-[#8E8E8E]">{time}</span>}
      </div>
    </div>
  );
}
