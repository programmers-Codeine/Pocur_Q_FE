import { create } from 'zustand';

type Option = {
  id: number;
  optionName: string;
  optionPrice: number;
};

export type Menu = {
  id: number;
  title: string;
  description: string;
  category: number;
  price: number;
  hot: boolean;
  new: boolean;
  soldOut: boolean;
  origin: string;
  image?: string;
  options?: Option[];
};

// TODO menu 관리자 작업 후 타입 재정의 필요
export type ListItem = {
  id: string;
  menu: Menu;
  quantity: number;
};

type CustomerState = {
  categories: { id: number; title: string }[];
  selectedCategory: number;

  changeCategory: (categoryId: number) => void;

  menus: Menu[];
  selectedMenu: Menu | null;

  selectMenu: (menu: Menu) => void;

  cart: ListItem[];
  addCartItem: () => void;
  changeCartItem: () => void;
  deleteCartItem: () => void;

  orders: ListItem[];
};

const useCustomerStore = create<CustomerState>(set => ({
  categories: [
    { id: 1, title: '메인메뉴' },
    { id: 2, title: '한정메뉴' },
    { id: 3, title: '사이드메뉴' },
    { id: 4, title: '주류' },
    { id: 5, title: '기타' },
  ],
  selectedCategory: 0,
  changeCategory: () => {},
  menus: [
    {
      id: 1,
      title: '샘플 1',
      description: '샘플 1 내용',
      category: 1,
      price: 5000,
      hot: false,
      new: false,
      soldOut: false,
      origin: '돼지고기: 국내산, 배추김치: 국내산',
      options: [
        {
          id: 1,
          optionName: '곱빼기',
          optionPrice: 1000,
        },
      ],
    },
    {
      id: 2,
      title: '샘플 2',
      description: '샘플 2 내용',
      category: 2,
      price: 5000,
      hot: false,
      new: false,
      soldOut: false,
      origin: '돼지고기: 국내산, 배추김치: 국내산',
      options: [
        {
          id: 2,
          optionName: '곱빼기',
          optionPrice: 2000,
        },
      ],
    },
    {
      id: 3,
      title: '샘플 3',
      description: '샘플 3 내용',
      category: 3,
      price: 5000,
      hot: false,
      new: false,
      soldOut: false,
      origin: '돼지고기: 국내산, 배추김치: 국내산',
      options: [
        {
          id: 3,
          optionName: '곱빼기',
          optionPrice: 3000,
        },
      ],
    },
    {
      id: 4,
      title: '샘플 4',
      description: '샘플 4 내용',
      category: 4,
      price: 5000,
      hot: false,
      new: false,
      soldOut: false,
      origin: '돼지고기: 국내산, 배추김치: 국내산',
      options: [
        {
          id: 4,
          optionName: '곱빼기',
          optionPrice: 4000,
        },
      ],
    },
  ],
  selectedMenu: null,
  selectMenu: selectedMenu => {
    set(state => ({ selectedMenu }));
  },
  cart: [],
  addCartItem: () => {},
  changeCartItem: () => {},
  deleteCartItem: () => {},
  orders: [],
}));

export default useCustomerStore;
