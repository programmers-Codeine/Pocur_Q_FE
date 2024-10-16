import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type Option = {
  id: string;
  menuId: string;
  optionName: string;
  optionPrice: number;
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
  options: string[]; // TODO Option으로 수정 필요
  price: number;
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
  addCartItem: (newItem: ListItem) => void;
  changeCartItem: (id: string, newQuantity: number, newItem?: ListItem) => void;
  deleteCartItem: (itemId: string) => void;

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
    cart: JSON.parse(localStorage.getItem('cart') ?? '[]'),
    addCartItem: newItem => {
      set(state => {
        const newCart = [...state.cart, newItem];

        localStorage.setItem('cart', JSON.stringify(newCart));

        return { cart: newCart };
      });
    },
    changeCartItem: (itemId, newQuantity = 0, newItem) => {
      set(state => {
        const modifiedItem = state.cart.find(({ id }) => id === itemId);
        let newCart = [
          ...state.cart.map(item =>
            item.id === itemId
              ? {
                  ...modifiedItem!,
                  totalPrice: item.menu.price * newQuantity,
                  quantity: newQuantity,
                }
              : item
          ),
        ];

        // TODO 옵션 수정 로직 구현

        localStorage.setItem('cart', JSON.stringify(newCart));

        return { cart: newCart };
      });
    },
    deleteCartItem: delItemId => {
      set(state => {
        const newCart = state.cart.filter(item => item.id !== delItemId);

        localStorage.setItem('cart', JSON.stringify(newCart));

        return { cart: newCart };
      });
    },
    orders: [],
    setOrders: orders => {
      set(() => ({ orders }));
    },
  }))
);

export default useCustomerStore;
