import { create } from 'zustand';
import mountainDataProps from '@/src/types/mountainDataProps';

interface StoreState {
  filteredItems: mountainDataProps[];
  setFilteredItems: (list: mountainDataProps[]) => void;
}

const useFilterMountainStore = create<StoreState>((set) => ({
  filteredItems: [],
  setFilteredItems: (state: mountainDataProps[]) =>
    set({ filteredItems: state }),
}));

export default useFilterMountainStore;
