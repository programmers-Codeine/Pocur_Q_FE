import { SetDesignPresetData } from '@/types';
import { create } from 'zustand';

type DesignTypes = {
  id: string;
  title: string;
  image?: string;
  edit?: string;
};
type DesignState = {
  designs: DesignTypes[];

  selected: string;
  currentDesignId: string;
  setSelect: (id: string) => void;
  navigation: number;
  navigate: (page: number, use?: 'home' | 'update', id?: string) => void;

  setDesign: (data: SetDesignPresetData[]) => void;
  deleteDesign: (id: string) => void;

  addDesign: (design: DesignTypes) => void;
  updateDesign: (design: DesignTypes, id: string) => void;
};

const useDesignStore = create<DesignState>(set => ({
  designs: [],
  currentDesignId: '0',
  selected: '1',
  setSelect: id => set(() => ({ selected: id })),
  navigation: 1,
  navigate: (page, use, id) =>
    set(state => ({
      navigation: page,
      currentDesignId: use === 'home' ? '0' : use === 'update' ? id : state.currentDesignId,
    })),

  setDesign: data =>
    set(() => ({
      designs: data.map(item => ({
        id: item.id,
        title: item.name,
        image: item.designImage || '',
      })),
    })),

  deleteDesign: (id: string) =>
    set(state => ({
      designs: state.designs.filter(design => design.id !== id),
    })),

  addDesign: (design: DesignTypes) =>
    set(state => ({
      designs: [...state.designs, design],
    })),

  updateDesign: (newDesign: DesignTypes, id: string) =>
    set(state => ({
      designs: state.designs.map(design =>
        design.id === id ? { ...design, ...newDesign } : design
      ),
    })),
}));

export default useDesignStore;
