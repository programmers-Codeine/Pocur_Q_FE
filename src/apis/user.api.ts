import { UserLoginFormTypes } from '@/pages/AdminHome/AdminHome.types';
import { axiosClient } from './axios';

export const login = async (loginData: UserLoginFormTypes) => {
  const response = await axiosClient.post('/users/login', loginData);

  return response.data;
};
