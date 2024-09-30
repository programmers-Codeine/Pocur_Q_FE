import { axiosClient } from './axios';

export const healthCheck = async () => {
  const response = await axiosClient.get('health-check');

  return response.status; // status, data 자유롭게 사용
};
