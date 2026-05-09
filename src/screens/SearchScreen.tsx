import { useNavigate } from 'react-router-dom';

import { BottomNav } from '../components/common/BottomNav';
import { GradeFilter } from '../components/search/GradeFilter';
import { KeywordChipGrid } from '../components/search/KeywordChipGrid';
import { ResultCountButton } from '../components/search/ResultCountButton';
import { SearchBar } from '../components/search/SearchBar';
import { useSearchProfilesQuery } from '../hooks/useSearchProfilesQuery';
import { useSearchFilterStore } from '../store/useSearchFilterStore';
import { SEARCH_RECOMMENDED_KEYWORDS } from '../types/match';

export function SearchScreen() {
  const navigate = useNavigate();
  const keyword = useSearchFilterStore(s => s.keyword);
  const techStack = useSearchFilterStore(s => s.techStack);
  const sameUniversity = useSearchFilterStore(s => s.sameUniversity);
  const grade = useSearchFilterStore(s => s.grade);
  const setKeyword = useSearchFilterStore(s => s.setKeyword);
  const setTechStack = useSearchFilterStore(s => s.setTechStack);
  const setSameUniversity = useSearchFilterStore(s => s.setSameUniversity);
  const setGrade = useSearchFilterStore(s => s.setGrade);

  // 카운트 미리보기: size=1로 가벼운 호출. 결과 페이지에서 동일 query는 다른 page/size를 가지므로 cache 분리.
  const { data: countData } = useSearchProfilesQuery({
    keyword: keyword || undefined,
    techStack: techStack || undefined,
    sameUniversity: sameUniversity || undefined,
    grade: grade ?? undefined,
    page: 0,
    size: 1,
  });
  const count = countData?.totalElements ?? 0;

  const handleSubmit = () => navigate('/search/results');
  const handleKeywordChip = (kw: string) => setKeyword(kw);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
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
          <img
            src="/icon/filter-funnel-01.svg"
            alt=""
            aria-hidden="true"
            className="h-[20px] w-[20px]"
          />
          <h2 className="font-inter text-[18px] font-bold">필터</h2>
        </div>

        <div className="mt-[16px] px-[34px]">
          <label className="block text-[14px] font-medium text-[#5C6470] mb-[8px]">
            기술 스택
          </label>
          <input
            type="text"
            value={techStack}
            onChange={e => setTechStack(e.target.value)}
            placeholder="예: React"
            className="w-full bg-white border border-[#E6EBF3] rounded-[8px] px-[14px] py-[12px] text-[14px] placeholder:text-[#8E8E8E] focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mt-[20px] px-[34px]">
          <label className="flex items-center gap-[8px] text-[14px] font-medium text-[#5C6470]">
            <input
              type="checkbox"
              checked={sameUniversity}
              onChange={e => setSameUniversity(e.target.checked)}
              className="w-[18px] h-[18px] accent-blue-500"
            />
            같은 학교만 보기
          </label>
        </div>

        <div className="mt-[20px] px-[34px]">
          <span className="block text-[14px] font-medium text-[#5C6470] mb-[8px]">
            학년
          </span>
          <GradeFilter value={grade} onChange={setGrade} />
        </div>

        <div className="mt-[40px] flex justify-center">
          <ResultCountButton count={count} onClick={handleSubmit} />
        </div>

        <BottomNav active="search" />
      </div>
    </div>
  );
}
