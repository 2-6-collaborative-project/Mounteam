import { authInstance } from '@/src/lib/axiosInstance';

export async function postTeamsRevieWrite(formData: any) {
  const BASE_URL = 'https://www.mounteam.site/api';
  const url = `${BASE_URL}/team-reviews`;

  try {
    const response = await authInstance.post(url, formData);

    return response.data.data;
  } catch (e) {
    console.log(e);
  }
}
