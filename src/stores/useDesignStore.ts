import { InputDesignFormTypes } from '@/types';
import { create } from 'zustand';

type DesignState = {
  designs: {
    id: number;
    title: string;
    edit: string;
  }[];

  designInfos: {
    id: number;
    form: InputDesignFormTypes;
  }[];
  selected: number;
  currentDesignId: number;
  setSelect: (id: number) => void;
  navigation: number;
  navigate: (page: number, use?: 'home' | 'update', id?: number) => void;

  deleteDesign: (id: number) => void;

  addDesign: (design: InputDesignFormTypes) => void;
  updateDesign: (design: InputDesignFormTypes, id: number) => void;
};

const useDesignStore = create<DesignState>(set => ({
  designs: [
    {
      id: 1,
      title: '기본디자인',
      edit: '적용 중',
    },
  ],
  designInfos: [
    {
      id: 1,
      form: {
        designName: '기본 디자인',
        designImage: '',
        theme: {
          all: {
            background: '#ffffff',
            largeText: '#ffffff',
            smallText: '#ffffff',
            box: '#ffffff',
            boxOutline: '#ffffff',
            icon: '#ffffff',
          },
          button: {
            normal: {
              background: '#ffffff',
              textAndIcon: '#ffffff',
              outline: '#ffffff',
            },
            active: {
              background: '#ffffff',
              textAndIcon: '#ffffff',
              outline: '#ffffff',
            },
          },
          addOption: {
            label: {
              hot: '#ffffff',
              new: '#ffffff',
              soldOut: '#ffffff',
            },
          },
        },
      },
    },
  ],
  currentDesignId: 0,
  selected: 1,
  setSelect: id => set(() => ({ selected: id })),
  navigation: 1,
  navigate: (page, use, id) =>
    set(state => ({
      navigation: page,
      currentDesignId: use === 'home' ? 0 : use === 'update' ? id : state.currentDesignId,
    })),

  deleteDesign: (id: number) =>
    set(state => ({
      designs: state.designs.filter(design => design.id !== id),
    })),

  addDesign: (design: InputDesignFormTypes) =>
    set(state => {
      const newId = state.designs.length + 1;
      return {
        designs: [
          ...state.designs,
          {
            id: newId,
            title: design.designName,
            edit: '방금 생성됨',
          },
        ],
        designInfos: [
          ...state.designInfos,
          {
            id: newId,
            form: design,
          },
        ],
      };
    }),

  updateDesign: (design: InputDesignFormTypes, id: number) =>
    set(state => ({
      designInfos: state.designInfos.map(info =>
        info.id === id
          ? {
              ...info,
              form: design,
            }
          : info
      ),
      designs: state.designs.map(d =>
        d.id === id
          ? {
              ...d,
              title: design.designName,
              edit: '방금 수정됨',
            }
          : d
      ),
    })),
}));

export default useDesignStore;
