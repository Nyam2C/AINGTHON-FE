import { useId } from 'react';

type LabeledTextareaProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  rows?: number;
  className?: string;
};

export function LabeledTextarea({
  label,
  value,
  onChange,
  placeholder,
  maxLength,
  rows = 3,
  className,
}: LabeledTextareaProps) {
  const textareaId = useId();

  return (
    <div className={className}>
      <label
        htmlFor={textareaId}
        className="block font-bold text-[16px] text-black mb-[8px]"
      >
        {label}
      </label>
      <div className="relative">
        <textarea
          id={textareaId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          rows={rows}
          className="w-full bg-white border border-[#E6EBF3] rounded-[8px] px-[14px] py-[12px] text-[14px] placeholder:text-[#8E8E8E] focus:outline-none focus:border-blue-500 resize-none"
        />
        {maxLength !== undefined && (
          <span className="absolute bottom-[8px] right-[12px] text-[12px] text-[#8E8E8E]">
            {value.length}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
}
