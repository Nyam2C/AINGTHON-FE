import { useNavigate } from 'react-router-dom';

import { BottomNav } from '../components/common/BottomNav';
import { RecommendationCard } from '../components/home/RecommendationCard';
import { SectionHeader } from '../components/home/SectionHeader';
import { WelcomeBanner } from '../components/home/WelcomeBanner';
import { CodemateWordmark } from '../components/landing/CodemateWordmark';
import { useRecommendedUsersQuery } from '../hooks/useRecommendedUsersQuery';

export function HomeScreen() {
  const navigate = useNavigate();
  const { data: recommendations } = useRecommendedUsersQuery();

  const handleSearchClick = () => navigate('/search');
  const handleMore = () => navigate('/search');
  const handleCardClick = (userId: string) => navigate(`/match/${userId}`);

  const hasRecommendations = recommendations && recommendations.length > 0;

  return (
    <div className="flex min-h-screen items-start justify-center bg-black">
      <div className="relative mx-auto w-[390px] min-h-[844px] bg-white pb-[80px]">
        <header className="px-[34px] pt-[20px] flex items-center justify-between">
          <CodemateWordmark className="!text-[20px] !leading-[24px]" />
          <span
            className="w-[40px] h-[40px] rounded-full bg-[#D7E6FF]"
            aria-hidden="true"
          />
        </header>

        <div className="mt-[20px] px-[34px]">
          <WelcomeBanner onSearchClick={handleSearchClick} />
        </div>

        <SectionHeader
          title="맞춤 추천"
          actionLabel="더보기"
          onAction={handleMore}
          className="mt-[28px] px-[34px]"
        />

        <div className="mt-[12px] px-[34px] flex flex-col gap-[12px]">
          {!hasRecommendations ? (
            <RecommendationCard />
          ) : (
            recommendations.map(u => (
              <RecommendationCard
                key={u.userId}
                user={u}
                onClick={handleCardClick}
              />
            ))
          )}
        </div>

        <BottomNav active="home" />
      </div>
    </div>
  );
}
