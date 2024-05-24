import { authInstance } from '@/src/lib/axiosInstance';

export async function postUserData(formData: any) {
  const BASE_URL = 'https://api.mounteam.site/api';
  const url = `${BASE_URL}/user/profile`;

  try {
    const response = await authInstance.post(url, formData);

    return response.data.data;
  } catch (e) {
    console.log(e);
  }
}
