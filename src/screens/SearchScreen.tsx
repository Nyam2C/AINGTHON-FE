import { useNavigate } from 'react-router-dom';

import { BottomNav } from '../components/common/BottomNav';
import { TechStackInput } from '../components/onboarding/TechStackInput';
import { GradeFilter } from '../components/search/GradeFilter';
import { KeywordChipGrid } from '../components/search/KeywordChipGrid';
import { ResultCountButton } from '../components/search/ResultCountButton';
import { RoleFilter } from '../components/search/RoleFilter';
import { SearchBar } from '../components/search/SearchBar';
import { useSearchCountQuery } from '../hooks/useSearchCountQuery';
import { useSearchFilterStore } from '../store/useSearchFilterStore';
import { SEARCH_RECOMMENDED_KEYWORDS } from '../types/match';

export function SearchScreen() {
  const navigate = useNavigate();
  const keyword = useSearchFilterStore(s => s.keyword);
  const role = useSearchFilterStore(s => s.role);
  const techStack = useSearchFilterStore(s => s.techStack);
  const grades = useSearchFilterStore(s => s.grades);
  const setKeyword = useSearchFilterStore(s => s.setKeyword);
  const setRole = useSearchFilterStore(s => s.setRole);
  const setTechStack = useSearchFilterStore(s => s.setTechStack);
  const setGrades = useSearchFilterStore(s => s.setGrades);

  const { data: countData } = useSearchCountQuery({
    keyword,
    role,
    techStack,
    grades,
  });
  const count = countData?.total ?? 0;

  const handleSubmit = () => navigate('/search/results');
  const handleKeywordChip = (kw: string) => setKeyword(kw);

  return (
    <div className="flex min-h-screen items-start justify-center bg-black">
      <div className="relative mx-auto w-[390px] min-h-[844px] bg-white pt-[20px] pb-[100px]">
        <div className="px-[34px]">
          <SearchBar
            value={keyword}
            onChange={setKeyword}
            onSubmit={handleSubmit}
          />
        </div>

        <h2 className="mt-[24px] px-[34px] font-inter text-[18px] font-bold">
          추천 키워드
        </h2>
        <KeywordChipGrid
          keywords={SEARCH_RECOMMENDED_KEYWORDS}
          onSelect={handleKeywordChip}
          className="mt-[12px] px-[34px]"
        />

        <div className="mt-[28px] px-[34px] flex items-center gap-[8px]">
          <h2 className="font-inter text-[18px] font-bold">필터</h2>
          <span aria-hidden="true">▼</span>
        </div>

        <div className="mt-[16px] px-[34px]">
          <span className="block text-[14px] font-medium text-[#5C6470] mb-[8px]">
            역할
          </span>
          <RoleFilter value={role} onChange={setRole} />
        </div>

        <div className="mt-[20px] px-[34px]">
          <TechStackInput value={techStack} onChange={setTechStack} max={10} />
        </div>

        <div className="mt-[20px] px-[34px]">
          <span className="block text-[14px] font-medium text-[#5C6470] mb-[8px]">
            학년
          </span>
          <GradeFilter value={grades} onChange={setGrades} />
        </div>

        <div className="mt-[40px] flex justify-center">
          <ResultCountButton count={count} onClick={handleSubmit} />
        </div>

        <BottomNav active="search" />
      </div>
    </div>
  );
}
