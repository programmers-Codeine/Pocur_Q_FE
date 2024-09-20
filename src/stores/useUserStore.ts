import { create } from 'zustand';
import { UserType } from '@/types';

type userState = {
  userInfo: UserType;
};

const useUserStore = create<userState>(() => ({
  userInfo: {
    id: null,
  },
}));

export default useUserStore;
