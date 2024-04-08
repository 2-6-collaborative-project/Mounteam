import { create } from 'zustand';
import mountainDataProps from '@/src/types/mountainDataProps';

interface StoreState {
  keyword: string;
  setKeyword: (list: string) => void;
  searchedMountain: mountainDataProps;
  setSearchedMountain: (list: mountainDataProps) => void;
}

const useSearchMountainStore = create<StoreState>((set) => ({
  keyword: '',
  searchedMountain: {
    X좌표: 0,
    Y좌표: 0,
    명산_높이: 0,
    명산_소재지: '',
    명산_이름: '',
    exploreId: 0,
    mountain: '',
    imageUrls: '',
    m_height: '',
    m_location: '',
    difficulty: '',
    teamCnt: 0,
    reveiwCnt: 0,
    hasNext: true,
    xdata: '',
    ydata: '',
  },
  setKeyword: (state: string) => set({ keyword: state }),
  setSearchedMountain: (state: mountainDataProps) =>
    set({ searchedMountain: state }),
}));

export default useSearchMountainStore;
