import { create } from 'zustand';

type ColorPaletteState = {
  isPaletteVisible: boolean;
  currentId: string;
  currentTitle: string;
  initColor: string;
  position: { x: number; y: number };
  openPalette: (x: number, y: number, initColor: string, id: string, title: string) => void;
  closePalette: () => void;
};

const useColorPaletteStore = create<ColorPaletteState>(set => ({
  isPaletteVisible: false,
  currentId: '',
  currentTitle: '',
  initColor: '#ffffff',
  position: { x: 0, y: 0 },
  openPalette: (x, y, initColor, id, title) =>
    set({
      isPaletteVisible: true,
      position: { x, y },
      initColor: initColor,
      currentId: id,
      currentTitle: title,
    }),
  closePalette: () => set({ isPaletteVisible: false }),
}));

export default useColorPaletteStore;
