import { RestaurantDefaultData } from '@/pages/Manage/Table/FirstPage.types';
import { axiosClient } from './axios';

export const createRestaurant = async (defaultData: RestaurantDefaultData) => {
  const response = await axiosClient.post('/restaurants', defaultData);

  return response.status;
};
