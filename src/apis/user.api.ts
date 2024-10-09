import { RegisterUserFormTypes } from '@/pages/AdminHome/AdminHome.types';
import { axiosClient } from './axios';

export const register = async (registerData: RegisterUserFormTypes) => {
  const response = await axiosClient.post('/users/join', registerData);

  return response.status;
};
