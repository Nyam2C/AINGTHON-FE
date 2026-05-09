import { useNavigate } from 'react-router-dom';

type BottomNavTab = 'home' | 'search' | 'match' | 'chat' | 'profile';

type BottomNavProps = {
  active: BottomNavTab;
  className?: string;
};

const TABS: ReadonlyArray<{
  key: BottomNavTab;
  label: string;
  path: string | null;
}> = [
  { key: 'home', label: '홈', path: '/home' },
  { key: 'search', label: '검색', path: '/search' },
  { key: 'match', label: '매칭', path: null },
  { key: 'chat', label: '채팅', path: null },
  { key: 'profile', label: '마이', path: null },
];

function TabIcon({ tab, active }: { tab: BottomNavTab; active: boolean }) {
  const stroke = active ? '#3B82F6' : '#8E8E8E';
  const fill = active ? '#3B82F6' : 'none';
  if (tab === 'home') {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <path d="M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" />
      </svg>
    );
  }
  if (tab === 'search') {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="6" fill={active ? '#3B82F6' : 'none'} />
        <path
          d="m20 20-3.5-3.5"
          strokeLinecap="round"
          stroke={active ? '#3B82F6' : '#8E8E8E'}
        />
      </svg>
    );
  }
  if (tab === 'match') {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <path d="M4 8c0-1 1-2 2-2h2v12H6c-1 0-2-1-2-2zM16 6h2c1 0 2 1 2 2v8c0 1-1 2-2 2h-2zM8 6l4 6 4-6v12l-4-6-4 6z" />
      </svg>
    );
  }
  if (tab === 'chat') {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <path d="M4 5h16v11H8l-4 4z" />
      </svg>
    );
  }
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={fill}
      stroke={stroke}
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 4-7 8-7s8 3 8 7" />
    </svg>
  );
}

export function BottomNav({ active, className }: BottomNavProps) {
  const navigate = useNavigate();

  const handleClick = (tab: BottomNavTab, path: string | null) => {
    if (path === null) {
      console.warn(`BottomNav: ${tab} route not implemented`);
      return;
    }
    if (tab === active) return;
    navigate(path);
  };

  return (
    <nav
      aria-label="하단 탭"
      className={`absolute bottom-0 left-0 right-0 h-[80px] bg-white border-t border-[#E6EBF3] flex justify-around items-center ${className ?? ''}`}
    >
      {TABS.map(t => {
        const isActive = t.key === active;
        const colorClass = isActive ? 'text-blue-500' : 'text-[#8E8E8E]';
        return (
          <button
            key={t.key}
            type="button"
            aria-current={isActive ? 'page' : undefined}
            onClick={() => handleClick(t.key, t.path)}
            className={`flex flex-col items-center justify-center gap-[4px] flex-1 h-full ${colorClass}`}
          >
            <span aria-hidden="true" className="w-[24px] h-[24px]">
              <TabIcon tab={t.key} active={isActive} />
            </span>
            <span className="font-inter text-[12px] font-medium">
              {t.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
