import { authInstance } from '@/src/lib/axiosInstance';

export async function getMyFeedData() {
  const BASE_URL = 'https://api.mounteam.site/api';
  const url = `${BASE_URL}/user/feeds?page=0&size=1000&sort=string`;

  try {
    const response = await authInstance.get(url);

    return response.data;
  } catch (e) {
    console.log(e);
  }
}
