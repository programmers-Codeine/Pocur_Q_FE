import { create } from 'zustand';
import { SetMenuData } from '@/types';

type AddOption = {
  id: string;
  optionName: string;
  price: number;
};

type Category = {
  id: string;
  title: string;
};

export type Menu = {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  origin: string;
  image?: string;
  addOptions?: AddOption[] | null;
  isActive?: boolean;
  soldOut?: boolean;
  hot?: boolean;
  new?: boolean;
  isRunningOut?: boolean;
};

type MenuState = {
  categories: Category[];
  menus: Menu[];
  selectedMenu: string[];
  selectedTools: string[];
  currentId: string;
  step: number;
  //TODO: 매직넘버
  // 1: 카테고리 선택 및 메뉴 선택
  // 2: 메뉴 입력
  // 3: 추가 옵션 수정

  setCategories: (data: { id: string; categoryName: string }[]) => void;
  addCategory: (id: string, title: string) => void;
  deleteCategory: (id: string) => void;

  setCurrentId: (next: string) => void;
  setStep: (next: number) => void;
  setSelectedMenu: (ids: string[]) => void;

  setMenu: (data: SetMenuData[]) => void;
  saveMenu: (menu: Menu) => void;
  cancelMenu: (id: string) => void;
  toggleMenu: (id: string) => void;
  toggleTool: (id: string) => void;
};

const useMenuStore = create<MenuState>(set => ({
  categories: [],
  menus: [],

  selectedMenu: [],
  selectedTools: [],
  currentId: '',
  step: 1,

  setCategories: data =>
    set(() => ({
      categories: data.map(item => ({
        id: item.id,
        title: item.categoryName,
      })),
    })),

  setMenu: data =>
    set(() => ({
      menus: data.map(item => ({
        id: item.id as string,
        title: item.menuName,
        description: item.menuDetail,
        category: item.categoryId,
        price: item.price,
        image: item.menuImg,
        origin: item.origin || '',
        isActive: !!item.isActive,
        hot: !!item.hot,
        new: !!item.new,
        soldOut: !!item.soldOut,
        addOptions:
          item.options?.map(option => ({
            id: option.id as string,
            optionName: option.optionName,
            price: option.optionPrice,
          })) || [],
      })),
    })),

  setSelectedMenu: (ids: string[]) => set(() => ({ selectedMenu: ids })),

  addCategory: (id: string, title: string) =>
    set(state => ({
      categories: [...state.categories, { id, title }],
    })),

  deleteCategory: (id: string) =>
    set(state => ({
      categories: state.categories.filter(category => category.id !== id),
    })),

  setCurrentId: (next: string) =>
    set(() => ({
      currentId: next,
    })),
  setStep: (next: number) =>
    set(() => ({
      step: next,
    })),

  saveMenu: (menu: Menu) =>
    set(state => {
      const existingMenuIndex = state.menus.findIndex(existingMenu => existingMenu.id === menu.id);

      if (existingMenuIndex !== -1) {
        const updatedMenus = [...state.menus];
        updatedMenus[existingMenuIndex] = { ...state.menus[existingMenuIndex], ...menu };

        return {
          menus: updatedMenus,
          currentId: '',
        };
      } else {
        return {
          menus: [...state.menus, menu],
          currentId: '',
        };
      }
    }),

  cancelMenu: (id: string) =>
    set(state => ({
      menus: state.menus.filter(menu => menu.id !== id),
    })),

  toggleMenu: (id: string) =>
    set(state => ({
      selectedMenu: state.selectedMenu.includes(id)
        ? state.selectedMenu.filter(menuId => menuId !== id)
        : [...state.selectedMenu, id],
    })),

  toggleTool: (id: string) =>
    set(state => ({
      selectedTools: state.selectedTools.includes(id)
        ? state.selectedTools.filter(toolId => toolId !== id)
        : [...state.selectedTools, id],
    })),
}));

export default useMenuStore;
