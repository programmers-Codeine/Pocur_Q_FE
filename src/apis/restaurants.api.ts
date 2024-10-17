import { RestaurantDefaultData } from '@/pages/Manage/Table/FirstPage.types';
import { SetEtcData } from '@/types';
import { axiosClient } from './axios';
import type { Restaurant } from '@/stores/useRestaurantStore';

type ResponseRestaurant = {
  id: string;
};

export const createRestaurant = async (defaultData: RestaurantDefaultData) => {
  const response = await axiosClient.post<ResponseRestaurant>('/restaurants', defaultData);

  return response.data;
};

export const getRestaurant = async () => {
  const response = await axiosClient.get<Restaurant>('/restaurants');

  return response.data;
};

export const saveRestaurants = async (restaurantsInfo: SetEtcData) => {
  const response = await axiosClient.put('/restaurants', restaurantsInfo);

  return response.data;
};

export const setLogoImage = async (file: File) => {
  const formData = new FormData();
  formData.append('upload', file);

  const response = await axiosClient.post('/img-upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
