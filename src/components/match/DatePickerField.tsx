import { useState } from 'react';

import { CalendarPopover } from './CalendarPopover';

type DatePickerFieldProps = {
  value: string | null;
  onChange: (v: string | null) => void;
  placeholder?: string;
  className?: string;
};

export function DatePickerField({
  value,
  onChange,
  placeholder = 'YYYY.MM.DD',
  className,
}: DatePickerFieldProps) {
  const [isOpen, setIsOpen] = useState(false);

  const displayValue = value ? value.replace(/-/g, '.') : '';

  const handleToggle = () => setIsOpen(o => !o);
  const handleSelect = (next: string) => {
    onChange(next);
    setIsOpen(false);
  };
  const handleClose = () => setIsOpen(false);

  return (
    <div className={`relative ${className ?? ''}`}>
      <button
        type="button"
        onClick={handleToggle}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className="w-full bg-white border border-[#E6EBF3] rounded-[8px] px-[14px] py-[12px] text-left text-[14px] flex items-center justify-between"
      >
        <span className={displayValue ? 'text-black' : 'text-[#8E8E8E]'}>
          {displayValue || placeholder}
        </span>
        <span aria-hidden="true">📅</span>
      </button>
      {isOpen && (
        <CalendarPopover
          value={value}
          onSelect={handleSelect}
          onClose={handleClose}
        />
      )}
    </div>
  );
}
