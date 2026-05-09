import { create } from 'zustand';

import type { GradeEnum } from '../types/profile';

type SearchFilterStore = {
  keyword: string;
  techStack: string;
  sameUniversity: boolean;
  grade: GradeEnum | null;
  page: number;
  setKeyword: (v: string) => void;
  setTechStack: (v: string) => void;
  setSameUniversity: (v: boolean) => void;
  setGrade: (v: GradeEnum | null) => void;
  setPage: (v: number) => void;
  reset: () => void;
};

const INITIAL: Pick<
  SearchFilterStore,
  'keyword' | 'techStack' | 'sameUniversity' | 'grade' | 'page'
> = {
  keyword: '',
  techStack: '',
  sameUniversity: false,
  grade: null,
  page: 0,
};

export const useSearchFilterStore = create<SearchFilterStore>(set => ({
  ...INITIAL,
  setKeyword: v => set({ keyword: v }),
  setTechStack: v => set({ techStack: v }),
  setSameUniversity: v => set({ sameUniversity: v }),
  setGrade: v => set({ grade: v }),
  setPage: v => set({ page: v }),
  reset: () => set(INITIAL),
}));
