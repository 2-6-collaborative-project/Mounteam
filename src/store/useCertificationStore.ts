import { create } from 'zustand';
import type { UploadFile } from 'antd';

interface useCertificationStore {
  fileList: UploadFile[];
  setFileList: (state: UploadFile[]) => void;
  place: string;
  setPlace: any;
  date: string;
  setDate: (state: string) => void;
}

const useCertificationStore = create<useCertificationStore>((set) => ({
  fileList: [],
  setFileList: (state: UploadFile[]) => set({ fileList: state }),
  place: '',
  setPlace: (state: string) => set({ place: state }),
  date: '',
  setDate: (state: string) => set({ date: state }),
}));

export default useCertificationStore;
