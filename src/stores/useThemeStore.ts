import { DesignThemeTypes } from '@/types';
import { create } from 'zustand';

type themeState = {
  theme: DesignThemeTypes;

  setTheme: (data: DesignThemeTypes) => void;
};

const useThemeStore = create<themeState>(set => ({
  theme: {
    all: {
      background: '#ffffff',
      largeText: '#000000',
      smallText: '#000000a0',
      box: '#ffffff',
      boxOutline: '#d2d1d1',
      icon: '#505F79',
    },
    button: {
      normal: {
        background: '#ffffff',
        textAndIcon: '#000000bb',
        outline: '#000000bb',
      },
      active: {
        background: '#1b1ecf',
        textAndIcon: '#ffffffbb',
        outline: '#1b1ecf',
      },
    },
    addOption: {
      label: {
        hot: '#f10000',
        new: '#f1ff0c',
        soldOut: '#000527',
      },
    },
  },

  setTheme: data => set(() => ({ theme: data })),
}));

export default useThemeStore;
