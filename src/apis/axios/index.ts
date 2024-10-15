import axios, { AxiosRequestConfig } from 'axios';

const DEFAULT_TIMEOUT = 30_000;

const config: AxiosRequestConfig = {};

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  timeout: DEFAULT_TIMEOUT,
  headers: {
    'content-type': 'application/json',
  },
  withCredentials: true,
  ...config,
});
