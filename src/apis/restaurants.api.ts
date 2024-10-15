import { RestaurantDefaultData } from '@/pages/Manage/Table/FirstPage.types';
import { axiosClient } from './axios';
import type { Restaurant } from '@/stores/useRestaurantStore';

export const createRestaurant = async (defaultData: RestaurantDefaultData) => {
  const response = await axiosClient.post('/restaurants', defaultData);

  return response.status;
};

export const getRestaurant = async () => {
  const response = await axiosClient.get<Restaurant>('/restaurants');

  return response.data;
};
