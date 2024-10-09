import { RegisterUserFormTypes, UserLoginFormTypes } from '@/pages/AdminHome/AdminHome.types';
import { axiosClient } from './axios';

export const register = async (registerData: RegisterUserFormTypes) => {
  const response = await axiosClient.post('/users/join', registerData);

  return response.status;

export const login = async (loginData: UserLoginFormTypes) => {
  const response = await axiosClient.post('/users/login', loginData);

  return response.data;
};
