import { defaultInstance } from '@/src/lib/axiosInstance';
import { EXPLORE_URL } from '@/src/utils/apiUrl';

const getMountainList = async (
  page: null | number,
  size: number,
  orderBy?: 'popular' | 'name',
  cursor?: number,
) => {
  try {
    const response = await defaultInstance.get(`${EXPLORE_URL}`, {
      params: {
        page,
        size,
        orderBy,
        cursor,
        sort: '',
      },
    });

    return response?.data.data;
  } catch (error) {
    throw new Error('Failed to fetch mountain data');
  }
};

export default getMountainList;
