import { create } from 'zustand';

type ContextMenuState = {
  isVisible: boolean;
  position: { x: number; y: number };
  openMenu: (x: number, y: number) => void;
  closeMenu: () => void;
};

const useContextMenuStore = create<ContextMenuState>(set => ({
  isVisible: false,
  position: { x: 0, y: 0 },
  openMenu: (x, y) => set({ isVisible: true, position: { x, y } }),
  closeMenu: () => set({ isVisible: false }),
}));

export default useContextMenuStore;
