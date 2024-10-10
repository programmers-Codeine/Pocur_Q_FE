import { Restaurant } from '@/stores/useRestaurantStore';
import { axiosClient } from './axios';

type ResponseOrder = {
  id: string;
  tableNum: number;
  orderedAt: string;
  count: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  restaurant: Restaurant;
  menu: {
    id: string;
    menuName: string;
    price: number;
    menuDetail: string;
    menuImg: string | null;
    origin: string | null;
    isActive: boolean;
    soldOut: boolean;
    hot: boolean;
    new: boolean;
    isRunningOut: boolean;
    created_at: string;
    updated_at: string;
    options: {
      id: string;
      optionName: string;
      optionPrice: number;
    }[];
  };
  options: {
    id: string;
    optionName: string;
    optionPrice: number;
  }[];
};

export const getAllOrders = async () => {
  const response = await axiosClient.get<ResponseOrder[]>('/orders');

  return response.data;
};

