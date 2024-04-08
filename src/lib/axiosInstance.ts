import axios, { AxiosRequestConfig } from 'axios';
import { BASE_URL } from '@/src/utils/apiUrl';

const axiosApi = (baseURL: string, options?: AxiosRequestConfig) => {
  const instance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    timeout: 10000,
    ...options,
  });

  return instance;
};

const axiosAuthApi = (baseURL: string, options?: AxiosRequestConfig) => {
  const instance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    timeout: 10000,
    ...options,
  });

  instance.interceptors.request.use((config) => {
    const token = `${localStorage.getItem('accessToken')}`;
    // const token =
    //   'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyMjAiLCJleHAiOjE3MTIyMzcwMTV9.iGoAQkUYagdpRwUjeXOYgkbBR81NZpswcJvFCPCwXBU';

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });
  instance.interceptors.response.use(
    //성공적인 응답 처리
    (response) => {
      return response;
    },
    async (error) => {
      const originalConfig = error.config; // 기존에 수행하려고 했던 작업
      const errorMsg = error.response.data.message;
      const status = error.response.status;
      const refreshToken = localStorage.getItem('refreshToken');

      if (
        status === 401 &&
        errorMsg === 'ACCESS_TOKEN_EXPIRED' &&
        originalConfig.url !== '/token' // 토큰 갱신 요청이 계속 이루어지는 걸 방지
      ) {
        try {
          // 리프레쉬 토큰만 보내야해서 따로 axios 처리
          const res = await axios.post(`${BASE_URL}/token`, {
            refreshToken,
          });

          localStorage.setItem('accessToken', res.data.data.accessToken);
          originalConfig.headers.Authorization = `Bearer ${res.data.data.accessToken}`;

          return instance(originalConfig);
        } catch (e) {
          localStorage.clear();
          const confirmResult = window.confirm(
            '토큰이 만료되어 로그인 페이지로 이동합니다. 다시 로그인 해주세요.',
          );
          if (confirmResult) {
            window.location.href = '/signin';
          }
        }
      }

      return Promise.reject(error);
    },
  );

  return instance;
};

export const defaultInstance = axiosApi(BASE_URL);
export const authInstance = axiosAuthApi(BASE_URL);
