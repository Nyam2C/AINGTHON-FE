type LabeledTextareaProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  maxLength?: number;
  placeholder?: string;
  helper?: string;
  rows?: number;
  className?: string;
};

export function LabeledTextarea({
  label,
  value,
  onChange,
  maxLength,
  placeholder,
  helper,
  rows = 4,
  className,
}: LabeledTextareaProps) {
  return (
    <div className={`flex flex-col gap-[6px] ${className ?? ''}`}>
      <div className="flex items-baseline justify-between">
        <label className="font-inter text-[16px] font-medium text-black">
          {label}
        </label>
        {helper && <span className="text-[13px] text-[#8E8E8E]">{helper}</span>}
      </div>
      <textarea
        value={value}
        onChange={e => {
          const next = maxLength
            ? e.target.value.slice(0, maxLength)
            : e.target.value;
          onChange(next);
        }}
        placeholder={placeholder}
        rows={rows}
        className="w-[321px] min-h-[114px] border border-[#8E8E8E] rounded-[9px] p-[14px] text-[14px] text-black placeholder:text-[#8E8E8E] focus:outline-none focus:border-blue-500 resize-none"
      />
      {maxLength !== undefined && (
        <span className="self-end text-[14px] text-[#8E8E8E]">
          {value.length}/{maxLength}
        </span>
      )}
    </div>
  );
}
