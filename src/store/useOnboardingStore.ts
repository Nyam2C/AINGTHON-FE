import { create } from 'zustand';

import type { OnboardingProfile, Role } from '../types/onboarding';

type OnboardingStore = {
  role: Role | null;
  profile: OnboardingProfile;
  setRole: (role: Role) => void;
  patchProfile: (patch: Partial<OnboardingProfile>) => void;
  reset: () => void;
};

const INITIAL_PROFILE: OnboardingProfile = {
  name: '',
  bio: '',
  interests: [],
  major: null,
  techStack: [],
  career: '',
  school: '',
  grade: null,
  projects: '',
  goals: '',
};

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  role: null,
  profile: INITIAL_PROFILE,
  setRole: (role) => set({ role }),
  patchProfile: (patch) =>
    set((state) => ({ profile: { ...state.profile, ...patch } })),
  reset: () => set({ role: null, profile: INITIAL_PROFILE }),
}));
