import type { Role } from '../../types/onboarding';

type ChatRoomHeaderProps = {
  partnerName: string;
  partnerRole: Role;
  responseHint: string;
  avatarUrl?: string;
  onBack: () => void;
};

function roleLabel(role: Role): string {
  if (role === 'mentor') return 'M 멘토';
  if (role === 'mentee') return 'M 멘티';
  return '멘토/멘티';
}

export function ChatRoomHeader({
  partnerName,
  partnerRole,
  responseHint,
  onBack,
}: ChatRoomHeaderProps) {
  return (
    <header className="relative flex flex-col items-center pt-[24px] pb-[16px] border-b border-[#E6EBF3]">
      <button
        type="button"
        onClick={onBack}
        aria-label="뒤로"
        className="absolute left-[16px] top-[24px] w-[40px] h-[40px] flex items-center justify-center text-[20px]"
      >
        ←
      </button>
      <span
        className="w-[63px] h-[63px] rounded-full bg-[#D7E6FF]"
        aria-hidden="true"
      />
      <div className="mt-[8px] flex items-center gap-[6px]">
        <span className="font-inter text-[20px] font-medium text-black">
          {partnerName}
        </span>
        <span className="font-inter text-[13px] text-blue-500">
          [{roleLabel(partnerRole)}]
        </span>
      </div>
      <span className="font-inter text-[13px] text-[#8E8E8E]">
        {responseHint}
      </span>
    </header>
  );
}
