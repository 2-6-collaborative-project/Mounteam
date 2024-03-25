import { create } from 'zustand';
import type { UploadFile } from 'antd';

interface ReviewWriteStore {
  description: string;
  setDescription: (state: string) => void;
  fileList: UploadFile[];
  setFileList: (state: UploadFile[]) => void;
  place: string;
  setPlace: (state: string) => void;
  date: string;
  setDate: (state: string) => void;
  tags: string[];
  setTags: (state: string[]) => void;
}

const useReviewWriteStore = create<ReviewWriteStore>((set) => ({
  description: '',
  setDescription: (state: string) => set({ description: state }),
  fileList: [],
  setFileList: (state: UploadFile[]) => set({ fileList: state }),
  place: '',
  setPlace: (state: string) => set({ place: state }),
  date: '',
  setDate: (state: string) => set({ date: state }),
  tags: [],
  setTags: (state: string[]) => set({ tags: state }),
}));

export default useReviewWriteStore;
