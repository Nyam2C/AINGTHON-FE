import type {
  MatchUser,
  MatchUserSummary,
  SearchUsersParams,
  SearchUsersResponse,
} from '../types/match';

const MOCK_USERS: MatchUser[] = [
  {
    userId: 'u-min',
    name: '김민수',
    role: 'mentor',
    jobTitle: '시니어 프론트엔드 엔지니어',
    rating: 4.8,
    ratingCount: 32,
    bookmarked: false,
    introLink: 'https://example.com/min',
    goal: '주니어 개발자가 빠르게 성장할 수 있도록 돕고 싶어요.',
    techStack: ['React', 'TypeScript', 'Next.js'],
    projects: '쇼핑몰 리뉴얼, 사내 디자인 시스템 구축, 실시간 차트 도입',
    career: '카카오 5년 → 토스 3년',
    interests: ['프론트엔드', 'UI/UX'],
  },
  {
    userId: 'u-jin',
    name: '이지은',
    role: 'mentor',
    jobTitle: 'AI 리서치 엔지니어',
    rating: 4.9,
    ratingCount: 18,
    bookmarked: true,
    introLink: 'https://example.com/jin',
    goal: 'LLM 기반 서비스 개발 경험을 나누고 싶어요.',
    techStack: ['Python', 'PyTorch', 'LangChain'],
    projects: 'LLM 사내 어시스턴트, 검색 RAG 파이프라인',
    career: '네이버 4년',
    interests: ['AI/에이전트', '백엔드'],
  },
  {
    userId: 'u-ho',
    name: '박상호',
    role: 'mentee',
    jobTitle: '컴퓨터공학 3학년',
    rating: 0,
    ratingCount: 0,
    bookmarked: false,
    introLink: 'https://example.com/ho',
    goal: '첫 프론트엔드 프로젝트로 포트폴리오를 만들고 싶어요.',
    techStack: ['JavaScript', 'React'],
    projects: '학교 동아리 홈페이지',
    career: '없음',
    interests: ['프론트엔드', 'UI/UX'],
  },
  {
    userId: 'u-yu',
    name: '최유진',
    role: 'mentor',
    jobTitle: '백엔드 엔지니어',
    rating: 4.6,
    ratingCount: 24,
    bookmarked: false,
    introLink: 'https://example.com/yu',
    goal: 'Spring과 분산 시스템 설계를 함께 공부하고 싶어요.',
    techStack: ['Java', 'Spring', 'Kafka'],
    projects: '결제 시스템, 실시간 알림 서버',
    career: '쿠팡 6년',
    interests: ['백엔드'],
  },
  {
    userId: 'u-soo',
    name: '한수아',
    role: 'mentee',
    jobTitle: 'UX 디자인 전공 4학년',
    rating: 0,
    ratingCount: 0,
    bookmarked: false,
    introLink: 'https://example.com/soo',
    goal: 'PM/기획으로 커리어 전환을 준비하고 있어요.',
    techStack: ['Figma'],
    projects: '학과 매거진 리뉴얼',
    career: '없음',
    interests: ['PM/기획', 'UI/UX'],
  },
];

function toSummary(user: MatchUser): MatchUserSummary {
  const { userId, name, role, jobTitle, rating, ratingCount, bookmarked } =
    user;
  return { userId, name, role, jobTitle, rating, ratingCount, bookmarked };
}

export function getMockRecommendedUsers(): MatchUserSummary[] {
  return MOCK_USERS.slice(0, 3).map(toSummary);
}

export function getMockSearchUsers(
  params: SearchUsersParams,
): SearchUsersResponse {
  const filtered = MOCK_USERS.filter(user => {
    if (params.role && params.role !== 'all' && user.role !== params.role) {
      return false;
    }
    if (params.keyword) {
      const keyword = params.keyword.toLowerCase();
      const haystack = [
        user.name,
        user.jobTitle,
        ...user.techStack,
        ...user.interests,
      ]
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(keyword)) return false;
    }
    if (params.techStack && params.techStack.length > 0) {
      const userStack = new Set(user.techStack.map(s => s.toLowerCase()));
      const matched = params.techStack.some(t =>
        userStack.has(t.toLowerCase()),
      );
      if (!matched) return false;
    }
    return true;
  });
  return { total: filtered.length, users: filtered.map(toSummary) };
}

export function getMockMatchUser(userId: string): MatchUser {
  return MOCK_USERS.find(user => user.userId === userId) ?? MOCK_USERS[0];
}
