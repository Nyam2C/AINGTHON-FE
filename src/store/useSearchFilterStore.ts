import { create } from 'zustand';

import type { RoleFilter } from '../types/match';
import type { Grade } from '../types/onboarding';

type SearchFilterStore = {
  keyword: string;
  role: RoleFilter;
  techStack: string[];
  grades: Grade[];
  setKeyword: (v: string) => void;
  setRole: (v: RoleFilter) => void;
  setTechStack: (v: string[]) => void;
  setGrades: (v: Grade[]) => void;
  reset: () => void;
};

const INITIAL: Pick<
  SearchFilterStore,
  'keyword' | 'role' | 'techStack' | 'grades'
> = {
  keyword: '',
  role: 'all',
  techStack: [],
  grades: [],
};

export const useSearchFilterStore = create<SearchFilterStore>(set => ({
  ...INITIAL,
  setKeyword: v => set({ keyword: v }),
  setRole: v => set({ role: v }),
  setTechStack: v => set({ techStack: v }),
  setGrades: v => set({ grades: v }),
  reset: () => set(INITIAL),
}));
