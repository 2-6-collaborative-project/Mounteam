import { authInstance } from '@/src/lib/axiosInstance';

export async function deleteMyTeam(id: number) {
  const BASE_URL = 'https://www.mounteam.site/api';
  const url = `${BASE_URL}/teams/${id}`;

  try {
    const response = await authInstance.delete(url);

    return response.data;
  } catch (e) {
    console.log(e);
  }
}
