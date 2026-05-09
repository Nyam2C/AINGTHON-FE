import { useId } from 'react';

type LabeledTextareaProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  rows?: number;
  error?: string;
  className?: string;
};

export function LabeledTextarea({
  label,
  value,
  onChange,
  placeholder,
  maxLength,
  rows = 3,
  error,
  className,
}: LabeledTextareaProps) {
  const textareaId = useId();
  const borderClass = error
    ? 'border-red-500 focus:border-red-500'
    : 'border-[#94A3B8] focus:border-blue-500';

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
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          rows={rows}
          aria-invalid={Boolean(error)}
          className={`w-full bg-white border ${borderClass} rounded-[8px] px-[14px] py-[12px] text-[14px] placeholder:text-[#8E8E8E] focus:outline-none resize-none`}
        />
        {maxLength !== undefined && (
          <span className="absolute bottom-[8px] right-[12px] text-[12px] text-[#8E8E8E]">
            {value.length}/{maxLength}
          </span>
        )}
      </div>
      {error && <p className="mt-[6px] text-[12px] text-red-500">{error}</p>}
    </div>
  );
}
