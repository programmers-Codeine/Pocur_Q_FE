import { SetMenuData, SetOptionsData } from '@/types';
import { axiosClient } from '../axios';

export const getCategories = async () => {
  const response = await axiosClient.get('/categories');

  return response.data;
};

export const addCategories = async (categoryName: string) => {
  const response = await axiosClient.post('/categories', { categoryName: categoryName });

  return response.data.categoryId;
};

export const deleteCategories = async (categoryId: string) => {
  return await axiosClient.delete(`/categories/${categoryId}`);
};

export const deleteMenu = async (menuId: string) => {
  return await axiosClient.delete(`/menus/${menuId}`);
};

export const getMenu = async () => {
  const response = await axiosClient.get('/menus');

  return response.data;
};

export const addMenu = async (menuForm: SetMenuData) => {
  const response = await axiosClient.post('/menus', menuForm);

  return response.data.menuId;
};

export const applyMenu = async (menuForm: SetMenuData, menuId: string) => {
  const response = await axiosClient.put(`/menus/${menuId}`, menuForm);

  return response.data;
};

export const setMenuImage = async (file: File) => {
  const formData = new FormData();
  formData.append('upload', file);

  const response = await axiosClient.post('/img-upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const addMenuOptionsForm = async (optionsForm: SetOptionsData[], menuId: string) => {
  const response = await axiosClient.post(`/options/${menuId}`, optionsForm);

  return response.data;
};
