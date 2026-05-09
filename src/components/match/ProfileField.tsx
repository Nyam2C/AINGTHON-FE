import type { ReactNode } from 'react';

type ProfileFieldProps = {
  label: string;
  value: string;
  multiline?: boolean;
  trailingIcon?: ReactNode;
  className?: string;
};

export function ProfileField({
  label,
  value,
  multiline = false,
  trailingIcon,
  className,
}: ProfileFieldProps) {
  return (
    <div className={className}>
      <span className="block font-bold text-[16px] text-black mb-[8px]">
        {label}
      </span>
      <div className="relative bg-white border border-[#E6EBF3] rounded-[8px] px-[14px] py-[12px]">
        {multiline ? (
          <p className="text-[14px] text-black whitespace-pre-wrap min-h-[80px]">
            {value}
          </p>
        ) : (
          <p className="text-[14px] text-black truncate pr-[24px]">{value}</p>
        )}
        {trailingIcon && (
          <span
            aria-hidden="true"
            className="absolute right-[12px] top-1/2 -translate-y-1/2"
          >
            {trailingIcon}
          </span>
        )}
      </div>
    </div>
  );
}
