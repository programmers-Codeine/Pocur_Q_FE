import { create } from 'zustand';

type AddOption = {
  id: number;
  optionName: string;
  price: number;
};

type Menu = {
  id: number;
  title: string;
  description: string;
  category: number;
  price: number;
  origin: string;
  image?: string;
  addOptions?: AddOption[] | null;
};
type MenuState = {
  categories: { id: number; title: string }[];
  menus: Menu[];

  toggleMenu: number[];
  currentId: number;
  step: number;
  //TODO: 매직넘버
  // 1: 카테고리 선택 및 메뉴 선택
  // 2: 메뉴 입력
  // 3: 추가 옵션 수정

  addCategory: (title: string) => void;
  deleteCategory: (id: number) => void;

  setCurrentId: (next: number) => void;
  setStep: (next: number) => void;

  saveMenu: (menu: Menu) => void;
  deleteMenu: (id: number) => void;
};

const useMenuStore = create<MenuState>(set => ({
  categories: [
    { id: 1, title: '메인메뉴' },
    { id: 2, title: '한정메뉴' },
    { id: 3, title: '사이드메뉴' },
    { id: 4, title: '주류' },
    { id: 5, title: '기타' },
  ],

  menus: [
    {
      id: 1,
      title: '샘플 1',
      description: '샘플 1 내용',
      category: 1,
      price: 5000,
      origin: '돼지고기: 국내산, 배추김치: 국내산',
      addOptions: [
        {
          id: 1,
          optionName: '곱빼기',
          price: 1000,
        },
      ],
    },
  ],

  toggleMenu: [1],
  currentId: 0,
  step: 1,

  addCategory: (title: string) =>
    set(state => ({
      categories: [
        ...state.categories,
        { id: Math.max(...state.categories.map(c => c.id)) + 1, title }, // 새로운 id를 생성하여 추가
      ],
    })),

  deleteCategory: (id: number) =>
    set(state => ({
      categories: state.categories.filter(category => category.id !== id),
    })),

  setCurrentId: (next: number) =>
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
          currentId: 0,
        };
      } else {
        return {
          menus: [
            ...state.menus,
            {
              ...menu,
            },
          ],
          currentId: 0,
        };
      }
    }),
  deleteMenu: (id: number) =>
    set(state => ({
      menus: state.menus.filter(menu => menu.id !== id),
    })),
}));

export default useMenuStore;