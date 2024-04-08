import { defaultInstance } from '@/src/lib/axiosInstance';

const getMountainList = async (page: null | number, size: number) => {
  try {
    const response = await defaultInstance.get('/explores', {
      params: {
        page,
        size,
        sort: '',
      },
    });

    return response?.data.data;
  } catch (error) {
    throw new Error('Failed to fetch mountain data');
  }
};

export default getMountainList;
