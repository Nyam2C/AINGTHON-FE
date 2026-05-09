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
    title: '멘토',
    description: '경험을 나누며 후배의 성장을 돕고 싶어요.',
  },
  {
    role: 'mentee',
    title: '멘티',
    description: '선배에게 배우며 빠르게 성장하고 싶어요.',
  },
  {
    role: 'both',
    title: '둘 다',
    description: '배움과 나눔을 동시에 경험하고 싶어요.',
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
        <h1 className="absolute left-[34px] top-[120px] font-inter text-[32px] font-bold leading-[40px] text-black">
          나의 역할은
          <br />
          무엇인가요?
        </h1>
        <div className="absolute left-1/2 top-[240px] flex -translate-x-1/2 flex-col gap-[16px]">
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
