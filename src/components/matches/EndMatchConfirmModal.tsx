type EndMatchConfirmModalProps = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  isPending?: boolean;
};

export function EndMatchConfirmModal({
  open,
  onCancel,
  onConfirm,
  isPending,
}: EndMatchConfirmModalProps) {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-label="매칭 종료 확인"
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
      onClick={onCancel}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="bg-white rounded-[12px] w-[300px] p-[24px] flex flex-col gap-[12px]"
      >
        <h2 className="text-[17px] font-semibold text-black text-center">
          매칭을 종료하시겠어요?
        </h2>
        <p className="text-[14px] text-[#8E8E8E] text-center">
          종료 시 리뷰 작성 화면으로 이동합니다.
        </p>
        <div className="flex gap-[8px] mt-[8px]">
          <button
            type="button"
            onClick={onCancel}
            disabled={isPending}
            className="flex-1 h-[44px] rounded-[8px] border border-[#8E8E8E] text-[#8E8E8E] text-[15px]"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isPending}
            className="flex-1 h-[44px] rounded-[8px] bg-blue-500 text-white text-[15px] disabled:opacity-60"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
