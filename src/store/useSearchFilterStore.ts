import { create } from 'zustand';

import type { RoleFilter } from '../types/match';
import type { GradeEnum } from '../types/profile';

type SearchFilterStore = {
  keyword: string;
  role: RoleFilter;
  techStack: string[];
  sameUniversity: boolean;
  grade: GradeEnum | null;
  page: number;
  setKeyword: (v: string) => void;
  setRole: (v: RoleFilter) => void;
  setTechStack: (v: string[]) => void;
  setSameUniversity: (v: boolean) => void;
  setGrade: (v: GradeEnum | null) => void;
  setPage: (v: number) => void;
  reset: () => void;
};

const INITIAL: Pick<
  SearchFilterStore,
  'keyword' | 'role' | 'techStack' | 'sameUniversity' | 'grade' | 'page'
> = {
  keyword: '',
  role: 'all',
  techStack: [],
  sameUniversity: false,
  grade: null,
  page: 0,
};

export const useSearchFilterStore = create<SearchFilterStore>(set => ({
  ...INITIAL,
  setKeyword: v => set({ keyword: v }),
  setRole: v => set({ role: v }),
  setTechStack: v => set({ techStack: v }),
  setSameUniversity: v => set({ sameUniversity: v }),
  setGrade: v => set({ grade: v }),
  setPage: v => set({ page: v }),
  reset: () => set(INITIAL),
}));
