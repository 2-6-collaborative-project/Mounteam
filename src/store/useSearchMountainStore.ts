import { create } from 'zustand';
import mountainDataProps from '@/src/types/mountainDataProps';

interface StoreState {
  keyword: string;
  searchedMountain: string | mountainDataProps;
  setKeyword: (list: string) => void;
  setSearchedMountain: (list: string | mountainDataProps) => void;
}

const useSearchMountainStore = create<StoreState>((set) => ({
  keyword: '',
  searchedMountain: {
    X좌표: 0,
    Y좌표: 0,
    명산_높이: 0,
    명산_소재지: '',
    명산_이름: '',
  },
  setKeyword: (state: string) => set({ keyword: state }),
  setSearchedMountain: (state: string | mountainDataProps) =>
    set({ searchedMountain: state }),
}));

export default useSearchMountainStore;
