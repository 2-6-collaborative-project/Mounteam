import { authInstance } from '@/src/lib/axiosInstance';

export async function getTeamsData() {
  const BASE_URL = 'https://api.mounteam.site/api';
  const url = `${BASE_URL}/teams?page=0&size=100000&sort=string`;

  try {
    const response = await authInstance.get(url);

    return response.data.data;
  } catch (e) {
    console.log(e);
  }
}
