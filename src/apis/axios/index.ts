import axios, { AxiosRequestConfig } from 'axios';

const DEFAULT_TIMEOUT = 30000;

export const createClient = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL: process.env.VITE_SERVER_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      'content-type': 'application/json',
    },
    withCredentials: true,
    ...config,
  });

  return axiosInstance;
};

export const axiosClient = createClient();
