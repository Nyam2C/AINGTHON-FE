export type Field =
  | 'BACKEND'
  | 'FRONTEND'
  | 'UI_UX'
  | 'AI_AGENT'
  | 'PLANNING_PM'
  | 'EMBEDDED'
  | 'ANDROID'
  | 'IOS'
  | 'GAME'
  | 'GRAPHICS';

export type GradeEnum = 'YEAR_1' | 'YEAR_2' | 'YEAR_3' | 'YEAR_4_OR_MORE';

export type ProfileCreateRequest = {
  name: string;
  introduction?: string;
  fields: Field[];
  major: boolean;
  techStacks?: string[];
  university?: string;
  grade?: GradeEnum;
  careers?: string[];
  projectExperiences?: string[];
  goal?: string;
  link?: string;
};

export type ProfileUpdateRequest = ProfileCreateRequest & {
  featuredReviewIds?: number[];
};

export type ProfileResponse = {
  id: number;
  userId: number;
  name: string;
  introduction?: string;
  fields: Field[];
  major: boolean;
  techStacks: string[];
  university?: string;
  grade?: GradeEnum;
  careers: string[];
  projectExperiences: string[];
  goal?: string;
  link?: string;
  profileImageUrl?: string;
  // ReviewResponse — review 도메인이 정리할 때까지 unknown 유지
  featuredReviews: unknown[];
  averageRating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
};
