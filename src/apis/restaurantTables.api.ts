import { axiosClient } from './axios';

export type ResponseTable = {
  id: string;
  table_num: number;
};

export const getAllTables = async () => {
  const response = await axiosClient.get<ResponseTable[]>('/restaurantTables');

  return response.data;
};
