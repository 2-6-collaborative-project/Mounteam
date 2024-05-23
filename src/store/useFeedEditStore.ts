import { create } from 'zustand';
import type { UploadFile } from 'antd';

interface useFeedEditStore {
  tags: string[];
  setTags: (state: string[]) => void;
  fileList: UploadFile[];
  setFileList: (state: UploadFile[]) => void;
  contents: string;
  setContents: (state: string) => void;
}

const useFeedEditStore = create<useFeedEditStore>((set) => ({
  tags: [],
  setTags: (state: string[]) => set({ tags: [...state] }),
  fileList: [],
  setFileList: (state: UploadFile[]) => set({ fileList: [...state] }),
  contents: '',
  setContents: (state: string) => set({ contents: state }),
}));

export default useFeedEditStore;
