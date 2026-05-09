import { useId } from 'react';

type LabeledTextInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  className?: string;
};

export function LabeledTextInput({
  label,
  value,
  onChange,
  placeholder,
  error,
  className,
}: LabeledTextInputProps) {
  const inputId = useId();
  const borderClass = error
    ? 'border-red-500 focus:border-red-500'
    : 'border-[#94A3B8] focus:border-blue-500';

  return (
    <div className={className}>
      <label
        htmlFor={inputId}
        className="block font-bold text-[16px] text-black mb-[8px]"
      >
        {label}
      </label>
      <input
        id={inputId}
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        className={`w-full bg-white border ${borderClass} rounded-[8px] px-[14px] py-[12px] text-[14px] placeholder:text-[#8E8E8E] focus:outline-none`}
      />
      {error && <p className="mt-[6px] text-[12px] text-red-500">{error}</p>}
    </div>
  );
}
