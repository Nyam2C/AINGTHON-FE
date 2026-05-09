type SaveBarProps = {
  onSave: () => void;
  disabled: boolean;
  isPending: boolean;
};

/**
 * BottomNav 위 sticky 영역에 고정되는 저장 버튼.
 */
export function SaveBar({ onSave, disabled, isPending }: SaveBarProps) {
  const label = isPending ? '저장 중…' : '저장';

  return (
    <div className="flex w-full px-[34px] py-[12px] bg-white border-t border-[#E6EBF3]">
      <button
        type="button"
        onClick={onSave}
        disabled={disabled}
        className="w-full h-[48px] rounded-[12px] bg-blue-500 text-white text-[16px] font-medium disabled:bg-[#E6EBF3] disabled:text-[#8E8E8E]"
      >
        {label}
      </button>
    </div>
  );
}
