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
  setTags: (state) => set({ tags: state }),
  fileList: [],
  setFileList: (state) => set({ fileList: state }),
  contents: '',
  setContents: (state) => set({ contents: state }),
}));

export default useFeedEditStore;
