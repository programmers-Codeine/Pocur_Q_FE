import { Restaurant } from '@/stores/useRestaurantStore';
import { axiosClient } from './axios';

export type ResponseAllTable = {
  id: string;
  table_num: number;
  created_at: string;
  updated_at: string;
};

export const getAllTables = async () => {
  const response = await axiosClient.get<ResponseAllTable[]>('/restaurantTables');

  return response.data;
};

export interface ResponseTable extends ResponseAllTable {
  restaurant: Restaurant;
}

export const addTable = async () => {
  // TODO 필요없는 response data 정리해서 back에 알려주기
  const response = await axiosClient.post<ResponseTable>('/restaurantTables');

  return response.data;
};
