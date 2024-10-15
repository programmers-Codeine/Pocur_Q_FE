import { SetDesignData } from '@/types';
import { axiosClient } from '../axios';

export const getAllDesignPreset = async () => {
  const response = await axiosClient.get('/designPresets');

  return response.data;
};

export const getCurrentDesignPreset = async () => {
  const response = await axiosClient.get('/designs');
  console.log(response.data);
  return response.data.id;
};

export const replaceCurrentDesignPreset = async (design_id: string) => {
  //TODO: 안됨
  const response = await axiosClient.put(`/designs/${design_id}`, {
    designPresetId: design_id,
  });
  console.log(response.data);
  return response.data.designPresetId;
};

export const addDesignPreset = async (designPreset: SetDesignData) => {
  const response = await axiosClient.post('/designPresets', designPreset);

  return response.data;
};

export const deleteDesignPreset = async (design_preset_id: string) => {
  const response = await axiosClient.delete(`/designPresets/${design_preset_id}`);
  console.log(response);
  return response.data;
};

export const getCurrentDesign = async (designPreset_id: string) => {
  const response = await axiosClient.get(`/designPresets/${designPreset_id}`);
  return response.data;
};

export const setDesignImage = async (file: File) => {
  const formData = new FormData();
  formData.append('upload', file);

  const response = await axiosClient.post('/img-upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
