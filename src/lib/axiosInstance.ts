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
  // TODO: 토큰 관리 로직 추가
  const token =
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMzQ0IiwiZXhwIjoxNzEyMDc0MDA4fQ.6rhUVdtUdKatzad6BUCmtczDRD_LwHXwFqSF94aJO3Q';

  const instance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    timeout: 10000,
    headers: { Authorization: token },
    ...options,
  });

  return instance;
};

export const defaultInstance = axiosApi(BASE_URL);
export const authInstance = axiosAuthApi(BASE_URL);
