import { useId } from 'react';

type LabeledTextInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export function LabeledTextInput({
  label,
  value,
  onChange,
  placeholder,
  className,
}: LabeledTextInputProps) {
  const inputId = useId();

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
        className="w-full bg-white border border-[#E6EBF3] rounded-[8px] px-[14px] py-[12px] text-[14px] placeholder:text-[#8E8E8E] focus:outline-none focus:border-blue-500"
      />
    </div>
  );
}
