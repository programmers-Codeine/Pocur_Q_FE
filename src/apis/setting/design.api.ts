import { SetDesignData } from '@/types';
import { axiosClient } from '../axios';

export const getAllDesignPreset = async () => {
  const response = await axiosClient.get('/designPresets');

  return response.data;
};

export const getCurrentDesignPreset = async () => {
  const response = await axiosClient.get('/designs');

  return response.data;
};

export const replaceCurrentDesignPreset = async (design_id: string) => {
  const response = await axiosClient.put('/designs', {
    designPresetId: design_id,
  });

  return response.data.designPresetId;
};

export const addDesignPreset = async (designPreset: SetDesignData) => {
  const response = await axiosClient.post('/designPresets', designPreset);

  return response.data;
};

export const deleteDesignPreset = async (design_preset_id: string) => {
  return await axiosClient.delete(`/designPresets/${design_preset_id}`);
};

export const updateDesignPreset = async (designPreset: SetDesignData, designPreset_id: string) => {
  const response = await axiosClient.put(`/designPresets/${designPreset_id}`, designPreset);

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
