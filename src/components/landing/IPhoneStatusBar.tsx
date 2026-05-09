export function IPhoneStatusBar({ className }: { className?: string }) {
  return (
    <div
      className={`flex h-[47px] items-center justify-between px-6 pb-[19px] pt-[21px] ${className ?? ''}`}
    >
      <span className="text-[16px] font-semibold">9:41</span>
      <div className="flex items-center gap-[6px]">
        {/* 신호 아이콘 (막대 4개) */}
        <svg
          width="18"
          height="12"
          viewBox="0 0 18 12"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="5" y="5" width="3" height="7" rx="1" />
          <rect x="10" y="2" width="3" height="10" rx="1" />
          <rect x="15" y="0" width="3" height="12" rx="1" />
        </svg>
        {/* 와이파이 아이콘 (호 3개) */}
        <svg
          width="16"
          height="12"
          viewBox="0 0 16 12"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M8 11.5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z" />
          <path
            d="M3.4 6.6a6.5 6.5 0 0 1 9.2 0l-1.4 1.4a4.5 4.5 0 0 0-6.4 0L3.4 6.6Z"
            opacity="0.85"
          />
          <path
            d="M0.6 3.8a10.5 10.5 0 0 1 14.8 0l-1.4 1.4a8.5 8.5 0 0 0-12 0L0.6 3.8Z"
            opacity="0.7"
          />
        </svg>
        {/* 배터리 아이콘 (둥근 사각 + 안쪽 채움) */}
        <svg
          width="26"
          height="12"
          viewBox="0 0 26 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <rect
            x="0.5"
            y="0.5"
            width="22"
            height="11"
            rx="2.5"
            stroke="currentColor"
            opacity="0.5"
          />
          <rect
            x="2"
            y="2"
            width="19"
            height="8"
            rx="1.5"
            fill="currentColor"
          />
          <rect
            x="23.5"
            y="4"
            width="2"
            height="4"
            rx="0.8"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
}
