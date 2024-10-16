import { axiosClient } from './axios';

/*
토큰 발급

데이터 조합
- 메뉴
- 카테고리
- 가게 정보(이름, 설명)
- 디자인 정보
*/
type ResponseToken = {
  message: string;
};

export const getCustomerToken = async (data: any) => {
  const response = await axiosClient.post<ResponseToken>('/customerJwt', data);

  return response.status;
};

type ResponseRestaurant = {
  id: string;
  name: string;
  defaultTableCount: number;
  totalTableCount: number;
  logo: string;
  introduce: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
};

export const getRestaurantData = async () => {
  const response = await axiosClient.get<ResponseRestaurant>('/restaurants');

  return response.data;
};

type ResponseMenu = {
  id: string;
  categoryId: string;
  menuName: string;
  price: number;
  menuDetail: string;
  menuImg: string;
  origin: string;
  isActive: boolean;
  soldOut: boolean;
  hot: boolean;
  new: boolean;
  isRunningOut: boolean;
  created_at: string;
  updated_at: string;
  options: ResponseOption[];
};

type ResponseOption = { id: string; menuId: string; optionName: string; optionPrice: number };

export const getMenuData = async () => {
  const response = await axiosClient.get<ResponseMenu[]>('/menus');

  return response.data;
};

type ResponseCategory = {
  id: string;
  categoryName: string;
  created_at: string;
  updated_at: string;
};

export const getCategoryData = async () => {
  const response = await axiosClient.get<ResponseCategory[]>('/categories');

  return response.data;
};
