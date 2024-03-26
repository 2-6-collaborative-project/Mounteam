import { create } from 'zustand';

interface StoreState {
  keyword: string;
  searchedMountain: string;
  setKeyword: (list: string) => void;
  setSearchedMountain: (list: string) => void;
}

const useSearchMountainStore = create<StoreState>((set) => ({
  keyword: '',
  searchedMountain: '',
  setKeyword: (state: string) => set({ keyword: state }),
  setSearchedMountain: (mountain: string) =>
    set({ searchedMountain: mountain }),
}));

export default useSearchMountainStore;
