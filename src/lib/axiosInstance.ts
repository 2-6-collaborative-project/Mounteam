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

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      const refreshToken = localStorage.getItem('refreshToken');

      if (
        error.response.status === 401 &&
        !originalRequest._retry &&
        refreshToken
      ) {
        originalRequest._retry = true;

        try {
          const response = await instance.post('/token', {
            refreshToken,
          });

          if (response.data.success) {
            localStorage.setItem('accessToken', response.data.data.accessToken);
            return instance(originalRequest);
          }
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    },
  );

  return instance;
};

export const defaultInstance = axiosApi(BASE_URL);
export const authInstance = axiosAuthApi(BASE_URL);
