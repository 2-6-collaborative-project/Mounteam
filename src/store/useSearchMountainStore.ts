import { create } from 'zustand';

interface StoreState {
  keyword: string;
  setKeyword: (list: string) => void;
}

const useSearchMountainStore = create<StoreState>((set) => ({
  keyword: '',
  setKeyword: (state: string) => set({ keyword: state }),
}));

export default useSearchMountainStore;
