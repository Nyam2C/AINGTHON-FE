import { http, HttpResponse } from 'msw';

import { findProfile, getMe, mockProfiles, updateMe } from '../fixtures/profiles';
import type { ProfileResponse, ProfileUpdateRequest } from '../../types/profile';
import type { Page } from '../../types/match';

function ok<T>(data: T) {
  return HttpResponse.json({ success: true, data });
}

function err(status: number, message: string) {
  return HttpResponse.json({ success: false, message }, { status });
}

export const profileHandlers = [
  http.get('*/api/profiles/me', () => ok(getMe())),

  http.put('*/api/profiles/me', async ({ request }) => {
    const body = (await request.json()) as ProfileUpdateRequest;
    return ok(updateMe(body));
  }),

  http.put('*/api/profiles/me/image', () => {
    const url = `https://i.pravatar.cc/150?u=${Date.now()}`;
    return ok(updateMe({ profileImageUrl: url }));
  }),

  http.get('*/api/profiles', ({ request }) => {
    const url = new URL(request.url);
    const keyword = url.searchParams.get('keyword')?.toLowerCase() ?? '';
    const techStack = url.searchParams.get('techStack');
    const sameUniversity = url.searchParams.get('sameUniversity') === 'true';
    const grade = url.searchParams.get('grade');
    const page = Number(url.searchParams.get('page') ?? '0');
    const size = Number(url.searchParams.get('size') ?? '10');

    const me = getMe();
    let list = mockProfiles.filter(p => p.id !== me.id);

    if (keyword) {
      list = list.filter(
        p =>
          p.name.toLowerCase().includes(keyword) ||
          p.introduction?.toLowerCase().includes(keyword) ||
          p.techStacks.some(t => t.toLowerCase().includes(keyword)),
      );
    }
    if (techStack) {
      list = list.filter(p =>
        p.techStacks.some(t => t.toLowerCase() === techStack.toLowerCase()),
      );
    }
    if (sameUniversity && me.university) {
      list = list.filter(p => p.university === me.university);
    }
    if (grade) {
      list = list.filter(p => p.grade === grade);
    }

    const totalElements = list.length;
    const totalPages = Math.max(1, Math.ceil(totalElements / size));
    const start = page * size;
    const content = list.slice(start, start + size);

    const result: Page<ProfileResponse> = {
      content,
      totalElements,
      totalPages,
      first: page === 0,
      last: page >= totalPages - 1,
      size,
      number: page,
      numberOfElements: content.length,
      empty: content.length === 0,
    };
    return ok(result);
  }),

  http.get('*/api/profiles/:profileId', ({ params }) => {
    const id = Number(params.profileId);
    const p = findProfile(id);
    if (!p) return err(404, '프로필을 찾을 수 없습니다.');
    return ok(p);
  }),
];
