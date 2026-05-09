import { useNavigate } from 'react-router-dom';

type BottomNavTab = 'home' | 'search' | 'matching' | 'chat' | 'profile';

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
  { key: 'matching', label: '매칭', path: '/matches' },
  { key: 'chat', label: '채팅', path: '/chat' },
  { key: 'profile', label: '마이', path: '/my' },
];

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
      className={`absolute bottom-0 left-0 right-0 flex h-[80px] items-center justify-around border-t border-[#E6EBF3] bg-white ${className ?? ''}`}
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
            className={`flex h-full flex-1 flex-col items-center justify-center gap-[4px] ${colorClass}`}
          >
            <img
              src={`/icon/${t.key}.svg`}
              alt=""
              aria-hidden="true"
              className={`h-[24px] w-[24px] ${isActive ? '' : 'opacity-40'}`}
            />
            <span className="font-inter text-[12px] font-medium">
              {t.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
