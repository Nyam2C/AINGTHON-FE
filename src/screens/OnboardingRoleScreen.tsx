import { useNavigate } from 'react-router-dom';

import { PaginationDots } from '../components/onboarding/PaginationDots';
import { RoleCard } from '../components/onboarding/RoleCard';
import { useOnboardingStore } from '../store/useOnboardingStore';
import type { Role } from '../types/onboarding';

const ROLE_CARDS: ReadonlyArray<{
  role: Role;
  title: string;
  description: string;
}> = [
  {
    role: 'mentor',
    title: '멘토로 활동하고 싶어요.',
    description: '내 경험을 나누고\n다른 사람을 도와주고 싶어요.',
  },
  {
    role: 'mentee',
    title: '멘티로 배우고 싶어요.',
    description: '성장하고 싶은 분야의\n멘토를 찾고 싶어요.',
  },
  {
    role: 'both',
    title: '멘토와 멘티 둘 다 활동하고 싶어요.',
    description: '배우면서 함께 성장하고 싶어요.',
  },
];

export function OnboardingRoleScreen() {
  const navigate = useNavigate();
  const role = useOnboardingStore(s => s.role);
  const setRole = useOnboardingStore(s => s.setRole);

  const handleSelect = (nextRole: Role) => {
    setRole(nextRole);
    navigate('/onboarding/loading?next=/onboarding/profile&duration=700');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="relative mx-auto h-[844px] w-[390px] bg-white motion-safe:animate-fade-in motion-reduce:animate-none">
        <h1 className="absolute left-1/2 top-[120px] -translate-x-1/2 text-center font-inter text-[32px] font-bold leading-[40px] text-black">
          나의 역할은
          <br />
          무엇인가요?
        </h1>
        <div className="absolute left-1/2 top-[260px] flex -translate-x-1/2 flex-col gap-[16px]">
          {ROLE_CARDS.map(card => (
            <RoleCard
              key={card.role}
              title={card.title}
              description={card.description}
              selected={role === card.role}
              onSelect={() => handleSelect(card.role)}
            />
          ))}
        </div>
        <PaginationDots
          currentIndex={1}
          className="absolute bottom-[50px] left-1/2 -translate-x-1/2"
        />
      </div>
    </div>
  );
}
