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
