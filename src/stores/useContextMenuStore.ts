import { create } from 'zustand';

type ContextMenuState = {
  parentId: string;
  isVisible: boolean;
  position: { x: number; y: number };
  openMenu: (id: string, x: number, y: number) => void;
  closeMenu: () => void;
};

const useContextMenuStore = create<ContextMenuState>(set => ({
  parentId: '0',
  isVisible: false,
  position: { x: 0, y: 0 },
  openMenu: (id, x, y) => set({ parentId: id, isVisible: true, position: { x, y } }),
  closeMenu: () => set({ parentId: '0', isVisible: false }),
}));

export default useContextMenuStore;
