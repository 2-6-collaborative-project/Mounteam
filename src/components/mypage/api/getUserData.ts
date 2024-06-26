import { authInstance } from '@/src/lib/axiosInstance';

export async function getUserData() {
  const BASE_URL = 'https://api.mounteam.site/api';
  const url = `${BASE_URL}/user/profile`;

  try {
    const response = await authInstance.get(url);
    return response.data.data;
  } catch (e) {
    console.log('에러', e);
  }
}
