type UniversityReadonlyRowProps = {
  label: string;
  value: string | undefined;
};

/**
 * readonly 표시 전용. input/textarea 아님.
 * value가 undefined 또는 빈 문자열이면 '—' 렌더.
 */
export function UniversityReadonlyRow({
  label,
  value,
}: UniversityReadonlyRowProps) {
  const display = value && value.trim() !== '' ? value : '—';

  return (
    <div>
      <span className="block font-bold text-[16px] text-black mb-[8px]">
        {label}
      </span>
      <div
        aria-readonly="true"
        className="w-full bg-[#F2F4F7] border border-[#E6EBF3] rounded-[8px] px-[14px] py-[12px] text-[14px] text-[#8E8E8E]"
      >
        {display}
      </div>
    </div>
  );
}
