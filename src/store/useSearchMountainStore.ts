import { create } from 'zustand';
import mountainDataProps from '@/src/types/mountainDataProps';

interface StoreState {
  keyword: string;
  searchedMountain: mountainDataProps;
  setKeyword: (list: string) => void;
  setSearchedMountain: (list: mountainDataProps) => void;
}

const useSearchMountainStore = create<StoreState>((set) => ({
  keyword: '',
  searchedMountain: {
    exploredId: 0,
    imgUrl: '',
    m_height: '',
    m_location: '',
    mountain: '',
    teamCnt: 0,
    X좌표: 0,
    Y좌표: 0,
  },
  setKeyword: (state: string) => set({ keyword: state }),
  setSearchedMountain: (state: mountainDataProps) =>
    set({ searchedMountain: state }),
}));

export default useSearchMountainStore;
