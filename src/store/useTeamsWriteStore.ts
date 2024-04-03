import { create } from 'zustand';
import type { UploadFile } from 'antd';

interface TeamsWriteStore {
  title: string;
  setTitle: (state: string) => void;
  description: string;
  setDescription: (state: string) => void;
  place: string;
  setPlace: (state: string) => void;
  date: string;
  setDate: (state: string) => void;
  tags: string[];
  setTags: (state: string[]) => void;
  fileList: UploadFile[];
  setFileList: (state: UploadFile[]) => void;
  searchResult: string;
  setSearchResult: (state: string) => void;
}

export const useTeamsWriteStore = create<TeamsWriteStore>((set) => ({
  title: '',
  setTitle: (state: string) => set({ description: state }),
  description: '',
  setDescription: (state: string) => set({ description: state }),
  date: '',
  setDate: (state: string) => set({ date: state }),
  place: '',
  setPlace: (state: string) => set({ place: state }),
  tags: [],
  setTags: (state: string[]) => set({ tags: state }),
  fileList: [],
  setFileList: (state) => set({ fileList: state }),
  searchResult: '',
  setSearchResult: (state) => set({ searchResult: state }),
}));
