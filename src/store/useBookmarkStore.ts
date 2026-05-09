import { create } from 'zustand';

type BookmarkStore = {
  ids: ReadonlySet<number>;
  toggle: (id: number) => void;
};

/**
 * 클라이언트 전용 북마크 상태. 백엔드 API 부재로 메모리에만 저장됨.
 * 새로고침 시 초기 상태로 리셋된다 — 백엔드 endpoint 추가 시 mutation으로 교체.
 */
export const useBookmarkStore = create<BookmarkStore>(set => ({
  ids: new Set<number>(),
  toggle: id =>
    set(state => {
      const next = new Set(state.ids);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return { ids: next };
    }),
}));
