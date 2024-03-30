import { create } from 'zustand';

interface FeedIdStore {
  editFeedId: number | null;
  setEditFeedId: (feedId: number) => void;
}

export const useFeedIdStore = create<FeedIdStore>((set) => ({
  editFeedId: null,
  setEditFeedId: (feedId: number) => set({ editFeedId: feedId }),
}));
