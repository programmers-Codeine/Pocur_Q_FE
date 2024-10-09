import { create } from 'zustand';

export type Restaurant = {
  id: string;
  user_id: string;
  name: string;
  defaultTableCount: number;
  totalTableCount: number;
  logo: string | null;
  introduce: string | null;
  comment: string | null;
  createdAt: string;
  updatedAt: string;
};

type RestaurantState = {
  restaurant: Restaurant | null;

  setRestaurant: (newRestaurant: Restaurant) => void;
};

const useRestaurantStore = create<RestaurantState>(set => ({
  restaurant: null,
  setRestaurant: newRestaurant => {
    set(() => ({ restaurant: newRestaurant }));
  },
}));

export default useRestaurantStore;
