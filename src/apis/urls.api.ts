import { axiosClient } from './axios';

type ResponseUrl = {
  id: string;
  url: string;
};

export const getAllUrls = async () => {
  const response = await axiosClient.get<ResponseUrl[]>('/urls');

  return response.data;
};
