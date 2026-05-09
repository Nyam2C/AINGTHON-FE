import type { ProfileResponse } from '../../types/profile';

const now = new Date().toISOString();

export const mockProfiles: ProfileResponse[] = [
  {
    id: 1,
    userId: 1,
    name: '김민준',
    introduction: '안녕하세요, 프론트엔드 멘토를 찾고 있는 학생입니다.',
    fields: ['FRONTEND', 'UI_UX'],
    major: true,
    techStacks: ['React', 'TypeScript', 'Tailwind'],
    university: '한양대학교',
    grade: 'YEAR_3',
    careers: ['스타트업 인턴 6개월'],
    projectExperiences: ['포트폴리오 사이트', '교내 학회 웹'],
    goal: '대규모 서비스 프론트엔드 경험 쌓기',
    link: 'https://github.com/me-kim',
    profileImageUrl: 'https://i.pravatar.cc/150?u=1',
    featuredReviews: [],
    averageRating: 4.6,
    reviewCount: 8,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 2,
    userId: 2,
    name: '이서연',
    introduction: '백엔드 7년차 시니어 개발자입니다. 멘토링 가능합니다.',
    fields: ['BACKEND', 'AI_AGENT'],
    major: true,
    techStacks: ['Spring', 'Kotlin', 'Postgres', 'Kafka'],
    university: '서울대학교',
    grade: 'YEAR_4_OR_MORE',
    careers: ['네이버 백엔드 5년', '카카오 백엔드 2년'],
    projectExperiences: ['검색 엔진 마이그레이션', 'AI 추천 시스템'],
    goal: '주니어 멘토링',
    link: 'https://github.com/seoyeon',
    profileImageUrl: 'https://i.pravatar.cc/150?u=2',
    featuredReviews: [],
    averageRating: 4.9,
    reviewCount: 24,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 3,
    userId: 3,
    name: '박지호',
    introduction: 'AI 에이전트 만드는 게 취미인 비전공자.',
    fields: ['AI_AGENT', 'BACKEND'],
    major: false,
    techStacks: ['Python', 'LangChain', 'FastAPI'],
    university: '한양대학교',
    grade: 'YEAR_2',
    careers: ['개인 프로젝트 다수'],
    projectExperiences: ['LLM 기반 챗봇', 'RAG 검색기'],
    goal: 'AI 분야 진로 탐색',
    profileImageUrl: 'https://i.pravatar.cc/150?u=3',
    featuredReviews: [],
    averageRating: 4.2,
    reviewCount: 5,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 4,
    userId: 4,
    name: '최유나',
    introduction: 'UI/UX 디자이너 + 프론트엔드 가능한 디자엔지니어.',
    fields: ['UI_UX', 'FRONTEND'],
    major: true,
    techStacks: ['Figma', 'React', 'Framer Motion'],
    university: '연세대학교',
    grade: 'YEAR_4_OR_MORE',
    careers: ['디자인 에이전시 3년'],
    projectExperiences: ['커머스 리디자인', '디자인 시스템 구축'],
    goal: '디자인-코드 가교 역할',
    link: 'https://yuna.design',
    profileImageUrl: 'https://i.pravatar.cc/150?u=4',
    featuredReviews: [],
    averageRating: 4.7,
    reviewCount: 12,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 5,
    userId: 5,
    name: '정현우',
    introduction: '게임 클라이언트 개발 동아리 회장.',
    fields: ['GAME', 'GRAPHICS'],
    major: true,
    techStacks: ['Unity', 'C#', 'Shader'],
    university: '고려대학교',
    grade: 'YEAR_1',
    careers: [],
    projectExperiences: ['인디 게임 출시'],
    goal: '게임 회사 인턴',
    profileImageUrl: 'https://i.pravatar.cc/150?u=5',
    featuredReviews: [],
    averageRating: 4.0,
    reviewCount: 2,
    createdAt: now,
    updatedAt: now,
  },
];

export function findProfile(id: number): ProfileResponse | undefined {
  return mockProfiles.find(p => p.id === id);
}

export function getMe(): ProfileResponse {
  return mockProfiles[0];
}

export function updateMe(patch: Partial<ProfileResponse>): ProfileResponse {
  const me = mockProfiles[0];
  mockProfiles[0] = {
    ...me,
    ...patch,
    id: me.id,
    userId: me.userId,
    updatedAt: new Date().toISOString(),
  };
  return mockProfiles[0];
}
