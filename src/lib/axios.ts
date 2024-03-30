import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://www.mounteam.site/api/',
});

axiosInstance.interceptors.response.use(
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
        const response = await axiosInstance.post('token', {
          refreshToken,
        });

        if (response.data.success) {
          localStorage.setItem('accessToken', response.data.data.accessToken);
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
