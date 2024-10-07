import { create } from 'zustand';

type DesignState = {
  designs: {
    id: number;
    title: string;
    edit: string;
  }[];
  selected: number;
  setSelect: (id: number) => void;
  navigation: number;
  navigate: (page: number) => void;

  deleteDesign: (id: number) => void;
};

const useDesignStore = create<DesignState>(set => ({
  designs: [
    {
      id: 1,
      title: '기본디자인',
      edit: '적용 중',
    },
    {
      id: 2,
      title: '디자인명 1',
      edit: '1년전 수정',
    },
  ],
  selected: 1,
  setSelect: id => set(() => ({ selected: id })),
  navigation: 1,
  navigate: page => set(() => ({ navigation: page })),

  deleteDesign: (id: number) =>
    set(state => ({
      designs: state.designs.filter(design => design.id !== id),
    })),
}));

export default useDesignStore;
