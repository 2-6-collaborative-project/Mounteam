import { create } from 'zustand';
import type { UploadFile } from 'antd';
import mountainDataProps from '@/src/types/mountainDataProps';

interface ReviewWriteStore {
  description: string;
  setDescription: (state: string) => void;
  fileList: UploadFile[];
  setFileList: (state: UploadFile[]) => void;
  place: any;
  setPlace: (state: mountainDataProps | string) => void;
  date: string | string[] | any;
  setDate: (state: string | string[]) => void;
  tags: string[];
  setTags: (state: string[]) => void;
}

const useReviewWriteStore = create<ReviewWriteStore>((set) => ({
  description: '',
  setDescription: (state) => set({ description: state }),
  fileList: [],
  setFileList: (state) => set({ fileList: state }),
  place: '',
  setPlace: (state) => set({ place: state }),
  date: '',
  setDate: (state) => set({ date: state }),
  tags: [],
  setTags: (state) => set({ tags: state }),
}));

export default useReviewWriteStore;
