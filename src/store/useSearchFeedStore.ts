import { create } from 'zustand';

interface FeedStoreState {
  keyword: string;
  searchedFeed: string;
  setKeyword: (list: string) => void;
  setSearchedFeed: (list: string) => void;
}

const useSearchFeedStore = create<FeedStoreState>((set) => ({
  keyword: '',
  searchedFeed: '',
  setKeyword: (state: string) => set({ keyword: state }),
  setSearchedFeed: (feed: string) => set({ searchedFeed: feed }),
}));

export default useSearchFeedStore;
