import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type Option = {
  id: string;
  menuId: string;
  optionName: string;
  optionPrice: string;
};

export type Menu = {
  id: string;
  categoryId: string;
  categoryName: string;
  menuName: string;
  price: number;
  menuDetail: string;
  menuImg: string;
  origin: string;
  isActive: boolean;
  soldOut: boolean;
  hot: boolean;
  new: boolean;
  isRunningOut: boolean;
  created_at: string;
  updated_at: string;
  options: Option[];
};

type ListItemMenu = {
  categoryName: string;
  menuName: string;
  options: string[];
};

export type ListItem = {
  id: string;
  menu: ListItemMenu;
  quantity: number;
  totalPrice: number;
};

type RestaurantInfo = { name: string; logo: string; introduce: string };

type Category = {
  [key: string]: string;
};

type CustomerState = {
  customerTableNo: number;

  setCustomerTableNo: (tableNo: number) => void;

  restaurantInfo: RestaurantInfo | null;

  setRestaurantInfo: (newInfo: RestaurantInfo) => void;

  categories: Category;
  selectedCategory: string;

  setCategories: (newCategories: Category) => void;
  changeCategory: (category: string) => void;

  menus: Menu[];
  selectedMenu: Menu | null;

  setMenus: (newMenus: Menu[]) => void;
  selectMenu: (menu: Menu) => void;

  cart: ListItem[];
  addCartItem: () => void;
  changeCartItem: () => void;
  deleteCartItem: () => void;

  orders: ListItem[];
  setOrders: (newOrders: ListItem[]) => void;
};

const useCustomerStore = create<CustomerState>()(
  devtools(set => ({
    customerTableNo: Number(localStorage.getItem('tableNo') ?? 0),
    setCustomerTableNo: customerTableNo => {
      localStorage.setItem('tableNo', customerTableNo.toString());
      set(() => ({ customerTableNo }));
    },
    restaurantInfo: null,
    setRestaurantInfo: restaurantInfo => {
      set(() => ({ restaurantInfo }));
    },
    categories: {},
    selectedCategory: '',
    setCategories: categories => {
      set(() => ({ categories }));
    },
    changeCategory: selectedCategory => {
      set(() => ({ selectedCategory }));
    },
    menus: [],
    selectedMenu: null,
    setMenus: menus => {
      set(() => ({ menus }));
    },
    selectMenu: selectedMenu => {
      set(() => ({ selectedMenu }));
    },
    cart: [],
    addCartItem: () => {},
    changeCartItem: () => {},
    deleteCartItem: () => {},
    orders: [],
    setOrders: orders => {
      set(() => ({ orders }));
    },
  }))
);

export default useCustomerStore;
